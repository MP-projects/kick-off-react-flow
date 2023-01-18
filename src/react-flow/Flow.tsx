import { useCallback, useMemo, useState, useRef, useEffect } from "react";

import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  ReactFlowProvider,
  Node,
  Edge,
  NodeChange,
  EdgeChange,
} from "reactflow";

//hooks
import { useAppContext } from "../hooks/useAppContext";

//components
import { CustomModule } from "./custom-nodes/CustomModule";
import { SvgModule } from "./custom-nodes/SvgModule";
import { SideBar } from "./components/sidebar/Sidebar";
import { Appbar } from "./components/appbar/Appbar";

import "reactflow/dist/style.css";

//interfaces

import { ModuleType } from "../types/interfaces";

let id = 3;
let y = 700;
const initialEdges = [{ id: "e1-2", source: "1", target: "2", type: "step" }];

const getId = () => new Date().getTime().toString();

const initialNodes: ModuleType[] = [
  {
    id: "1",
    position: { x: 300, y: 100 },
    data: { id: "0001", ip: "10.01.01", type: "sterownik prosty" },
    type: "default",
    draggable: false,
    deletable: false,
    connectable: false,
  },

  {
    id: "2",
    position: { x: 300, y: 400 },
    data: { id: "0001", ip: "10.01.01", type: "sterownik prosty" },
    type: "default",
    draggable: false,
    deletable: false,
    connectable: false,
  },
];

const newNodes = () => {
  for (let i = 0; i < 1000; i++) {
    initialNodes.push({
      id: id.toString(),
      position: { x: Math.floor(Math.random() * (100 - 15000) + 15000), y: Math.floor(Math.random() * (100 - 15000) + 15000) },
      data: { id: id.toString(), ip: "10.01.01", type: "sterownik prosty" },
      type: "module",
      draggable: false,
      deletable: false,
      connectable: false,
    });
    id++;
  }
};

newNodes()
export const Flow = () => {
  const { editMode, zoomedOut, changeZoom } = useAppContext();


  const reactFlowWrapper = useRef<HTMLDivElement>(null);

  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);
  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);
  const [zoomLevel, setZoomLevel] = useState(1);

  // console.log(reactFlowInstance)

  // console.log(nodes)

  const onNodesChange = useCallback(
    (changes: NodeChange[]) =>
      setNodes((nds) => {
        // console.log(changes);
        return applyNodeChanges(changes, nds);
      }),

    [setNodes]
  );
  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) =>
      setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );

  const onConnect = useCallback(
    (params: any) =>
      setEdges((eds) => addEdge({ ...params, type: "step" }, eds)),
    [setEdges]
  );
  const onDragOver = useCallback((event: any) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event: any) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current!.getBoundingClientRect();

      const type = event.dataTransfer.getData("application/reactflow");

      if (typeof type === "undefined" || !type) {
        return;
      }
      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      const newNode: ModuleType = {
        id: getId(),
        data: { id: "0001", ip: "10.01.01", type: "sterownik prosty" },
        type,
        position,
        draggable: editMode,
        deletable: editMode,
        connectable: editMode,
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, setNodes, editMode]
  );
  const nodeTypes = useMemo(
    () => ({
      module: CustomModule,
      svgModule: SvgModule,
    }),
    []
  );

  const handleZoom = useCallback(() => {
    if (reactFlowInstance) {
      const currentZoom = reactFlowInstance.getZoom();
      setZoomLevel(currentZoom);

      // if (currentZoom < 0.6) {
      //   setNodes((nds) => {
      //     const newNodes: Node<any>[] = []
      //     nds.forEach((node) => {
      //       node.type = "svgModule";
      //       newNodes.push(node)
      //     });

      //     return newNodes      });
      // } else {
      //   setNodes((nds) => {
      //     const newNodes: Node<any>[] = []
      //     nds.forEach((node) => {
      //       node.type = "module";
      //       newNodes.push(node)
      //     });

      //     return newNodes;
      //   });
      // }

      if (
        currentZoom < 0.25 &&
        currentZoom > 0.05 &&
        currentZoom < zoomLevel &&
        zoomedOut === false
      ) {
        changeZoom(true);
        reactFlowInstance.zoomTo(0.05);
        return;
      }
      if (
        currentZoom < 0.25 &&
        currentZoom > 0.05 &&
        currentZoom > zoomLevel &&
        zoomedOut === true
      ) {
        changeZoom(false);
        reactFlowInstance.zoomTo(0.25);
        return;
      }
    }
  }, [changeZoom, reactFlowInstance, zoomLevel, zoomedOut]);

 
  return (
    <ReactFlowProvider>
      <ReactFlow
        ref={reactFlowWrapper}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onInit={setReactFlowInstance}
        fitView={true}
        className="validationflow"
        maxZoom={3}
        minZoom={0.05}
        snapToGrid={true}
        snapGrid={[20, 20]}
        onlyRenderVisibleElements={true}
        onMove={handleZoom}
        connectOnClick={true}
        panOnScrollSpeed={1}
      >
        {!zoomedOut && <MiniMap zoomable={true} pannable={true} />}
        <Controls />
      </ReactFlow>
      {editMode && <SideBar />}
      <Appbar />
    </ReactFlowProvider>
  );
};
