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
let edgeId = 1;
const initialEdges = [
  {
    id: "e1-2",
    source: "1",
    target: "2",
    type: "step",
    sourceHandle: "b",

    targetHandle: "a",
  },
];

const getId = () => new Date().getTime().toString();

const initialNodes: ModuleType[] = [
  {
    id: "1",
    position: { x: 1300, y: 2100 },
    data: { id: "0001", ip: "10.01.01", type: "sterownik prosty" },
    type: "module",
  },

  {
    id: "2",
    position: { x: 1300, y: 2400 },
    data: { id: "0001", ip: "10.01.01", type: "sterownik prosty" },
    type: "module",
  },
];

export const Flow = () => {
  const nodesIds: string[] = [];

  const newNodes = () => {
    for (let i = 0; i < 1000; i++) {
      initialNodes.push({
        id: id.toString(),
        position: {
          x: Math.floor(Math.random() * (1000 - 25000) + 25000),
          y: Math.floor(Math.random() * (1700 - 12000) + 12000),
        },
        data: { id: id.toString(), ip: "10.01.01", type: "sterownik prosty" },
        type: "module",
      });
      nodesIds.push(id.toString());
      id++;
    }
  };

  // newNodes();

  const pickNumber = (max: number) => {
    return Math.floor(Math.random() * max);
  };

  const newEdges = () => {
    for (let i = 0; i < 2000; i++) {
      console.log(nodesIds.length);
      const index1 = pickNumber(nodesIds.length);
      const index2 = pickNumber(nodesIds.length);
      initialEdges.push({
        id: edgeId.toString(),
        source: nodesIds[index1],
        sourceHandle: "b",
        target: nodesIds[index2],
        targetHandle: "a",
        type: "step",
      });
      if (i % 2 === 0) {
        nodesIds.splice(index2, 1);
      }

      edgeId++;
    }
  };
  // newEdges()
  const { editMode, zoomedOut, changeZoom } = useAppContext();

  const [panClicked, setPanClicked] = useState(false);

  const reactFlowWrapper = useRef<HTMLDivElement>(null);

  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);
  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);
  const [zoomLevel, setZoomLevel] = useState(1);

  // console.log(nodes);
  // console.log(edges);

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

      console.log(position);
      const newNode: ModuleType = {
        id: getId(),
        data: { id: "0001", ip: "10.01.01", type: "sterownik prosty" },
        type,
        position,
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

  const handleZoom = (e:any, viewport:any) => {
    if (reactFlowInstance) {
      const currentZoom = reactFlowInstance.getZoom();
      setZoomLevel(currentZoom);
      const currentViewport = reactFlowInstance.getViewport();
      console.log(currentZoom)
      console.log(zoomLevel)
      console.log(viewport)

      console.log("onZoom or Move");
      if (
        currentZoom < 0.25 &&
        currentZoom > 0.05 &&
        currentZoom < zoomLevel &&
        zoomedOut === false
      ) {
        changeZoom(true);

        reactFlowInstance.setViewport({
          x: 0,
          y: 0,
          zoom: 0.05,
        });
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
  };

  reactFlowWrapper.current?.addEventListener("wheel", () => {
    console.log("wheel");
  });

  reactFlowWrapper.current?.addEventListener("dblclick", (e: any) => {
    const pos = reactFlowWrapper.current!.getBoundingClientRect();

    const currentZoom = reactFlowInstance.getZoom();

    const position = reactFlowInstance!.project({
      x: e.clientX - pos.left,
      y: e.clientY - pos.top,
    });
    console.log(position.x * currentZoom);
    console.log(position.y * currentZoom);

    reactFlowInstance.setViewport({
      x: -(position.x * 0.5) + 800 * 0.5,
      y: -(position.y * 0.5) + +600 * 0.5,
      zoom: 0.5,
    });
  });

  const showMousePosition = (e: any) => {
    const pos = reactFlowWrapper.current!.getBoundingClientRect();
    const viewPort = reactFlowInstance.getViewport();

    const currentZoom = reactFlowInstance.getZoom();

    const position = reactFlowInstance!.project({
      x: e.clientX - pos.left,
      y: e.clientY - pos.top,
    });
    console.log(position.x);
    console.log(position.y);
    console.log(viewPort);
  };

  reactFlowWrapper.current?.addEventListener("click", showMousePosition);

  return (
    <ReactFlowProvider>
      <ReactFlow
        defaultViewport={{
          x: 0,
          y: 0,
          zoom: 0.05,
        }}
        // preventScrolling={false}
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
        // panOnScrollSpeed={0.5}
        elementsSelectable={editMode}
        nodesConnectable={editMode}
        nodesDraggable={editMode}
        nodesFocusable={editMode}
        edgesFocusable={editMode}
        panOnDrag={!zoomedOut}
        zoomOnDoubleClick={false}
        // onPaneClick={showMousePosition}
      >
        {!zoomedOut && <MiniMap zoomable={true} pannable={true} />}
        <Controls />
      </ReactFlow>
      {editMode && <SideBar />}
      <Appbar />
    </ReactFlowProvider>
  );
};
