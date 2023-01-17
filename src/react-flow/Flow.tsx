import { useCallback, useMemo, useState, useRef, useEffect } from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  ReactFlowProvider,
  Node,
  Edge,
  NodeChange,
  EdgeChange,
  Connection,
} from "reactflow";

//hooks
import { useAppContext } from "../hooks/useAppContext";

//components
import { CustomModule } from "./custom-nodes/CustomModule";
import { SideBar } from "./components/sidebar/Sidebar";
import { Appbar } from "./components/appbar/Appbar";

import "reactflow/dist/style.css";

interface ModuleType {
  id: string;
  position: { x: number; y: number };
  data: { id: string; ip: string; type: string };
  type: "module";
  draggable: boolean;
  deletable: boolean;
  connectable: boolean;
}
let id = 3;
let y = 700;
const initialEdges = [
  { id: "e1-2", source: "1", target: "2", type: "step" },
];

const getId = () => new Date().getTime().toString();

export const Flow = () => {
  const { editMode } = useAppContext();

  const initialNodes: ModuleType[] = [
    {
      id: "1",
      position: { x: 300, y: 100 },
      data: { id: "0001", ip: "10.01.01", type: "sterownik prosty" },
      type: "module",
      draggable: editMode,
      deletable: editMode,
      connectable: editMode,
    },

    {
      id: "2",
      position: { x: 300, y: 400 },
      data: { id: "0001", ip: "10.01.01", type: "sterownik prosty" },
      type: "module",
      draggable: editMode,
      deletable: editMode,
      connectable: editMode,
    },
  ];

  const newNodes = () => {
    for (let i = 0; i < 400; i++) {
      initialNodes.push({
        id: id.toString(),
        position: { x: 300, y: y },
        data: { id: id.toString(), ip: "10.01.01", type: "sterownik prosty" },
        type: "module",
        draggable: editMode,
        deletable: editMode,
        connectable: editMode,
      });
      id++;
      y = y + 300;
    }
  };

  const reactFlowWrapper = useRef<HTMLDivElement>(null);

  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);

  console.log(`render`);
  console.log(nodes);

  const onNodesChange = useCallback(
    (changes: NodeChange[]) =>
      setNodes((nds) => {
        console.log(changes);
        return applyNodeChanges(changes, nds);
      }),

    [setNodes]
  );
  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) =>
      setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );

  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);

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
    }),
    []
  );
  // useEffect(() => {
  //   console.log("effect");
  //   setNodes((nds) => {
  //     nds.map((node) => {
  //       console.log(node);
  //       node.draggable = editMode;
  //       node.connectable = editMode;
  //       node.deletable = editMode;
  //       return node;
  //     });
  //     console.log(nds);
  //     return nds;
  //   });
  // }, [editMode, setNodes]);
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
      >
        <MiniMap zoomable={true} pannable={true} />
        <Controls />
        <Background />
      </ReactFlow>
      {editMode && <SideBar />}
      <Appbar />
    </ReactFlowProvider>
  );
};
