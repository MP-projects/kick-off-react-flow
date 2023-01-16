import { useCallback, useMemo, useState, useRef } from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  ReactFlowProvider,
} from "reactflow";

//hooks
import { useAppContext } from "../hooks/useAppContext";

//components
import { CustomModule } from "./custom-nodes/CustomModule";
import SideBar from "./components/sidebar/Sidebar";

import "reactflow/dist/style.css";

interface ModuleType {
  id: string;
  position: { x: number; y: number };
  data: { id: string; ip: string; type: string };
  type: "module";
}

const initialNodes: ModuleType[] = [
  {
    id: "1",
    position: { x: 300, y: 100 },
    data: { id: "0001", ip: "10.01.01", type: "sterownik prosty" },
    type: "module",
  },

  {
    id: "2",
    position: { x: 300, y: 400 },
    data: { id: "0001", ip: "10.01.01", type: "sterownik prosty" },
    type: "module",
  },
];

const initialEdges = [{ id: "e1-2", source: "1", target: "2" }];

const getId = () => new Date().getTime().toString();

export const Flow = () => {
  
  const { editMode } = useAppContext();

  const reactFlowWrapper = useRef<HTMLDivElement>(null);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);

  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);

  const onConnect = useCallback(
    (params: any) => setEdges((eds) => addEdge(params, eds)),
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

      const newNode = {
        id: getId(),
        data: { id: "0001", ip: "10.01.01", type: "sterownik prosty" },
        type,
        position,
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, setNodes]
  );
  const nodeTypes = useMemo(
    () => ({
      module: CustomModule,
    }),
    []
  );

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
      >
        <MiniMap />
        <Controls />
        <Background />
      </ReactFlow>
      <SideBar />
    </ReactFlowProvider>
  );
};
