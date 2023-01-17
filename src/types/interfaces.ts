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