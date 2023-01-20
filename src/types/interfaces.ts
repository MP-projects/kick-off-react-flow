export interface FlowNode {
  id: string;
  position: { x: number; y: number };
  data: {};
  type: string;
}
export interface AppContextProps {
  editMode: boolean;
  zoomedOut: boolean;
  changeMode: (editMode: boolean) => void;
  changeZoom: (zoomedOut: boolean) => void;
}

export interface ModuleType {
  id: string;
  position: { x: number; y: number };
  data: { id: string; ip: string; type: string };
  type: "module" | "svgModule"|"default";
}
