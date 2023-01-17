export interface FlowNode {
  id: string;
  position: { x: number; y: number };
  data: {};
  type: string;
}
export interface AppContextProps {
  editMode: boolean
  changeMode:(editMode:boolean)=>void

}

export interface ModuleType {
  id: string;
  position: { x: number; y: number };
  data: { id: string; ip: string; type: string };
  type: "module";
  draggable: boolean;
  deletable: boolean;
  connectable: boolean;
}