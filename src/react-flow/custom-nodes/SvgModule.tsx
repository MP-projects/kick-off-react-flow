import { Handle, Position } from "reactflow";

import { useAppContext } from "../../hooks/useAppContext";
//styles
import "./CustomModule.css";

//assets
import socket from "../../assets/socket.png";
import module from "../../assets/module.png";

export const SvgModule = (props: any) => {
  const { editMode } = useAppContext();

  const isValidConnectionTarget = (connection: any) => {
    return connection.source !== props.id;
  };
  const isValidConnectionSource = (connection: any) => {
    return connection.target !== props.id;
  };

  return (
    <>
      <svg width="300" height="100">
        <text x="20" y="50"> 10.20.30</text>
        <rect
          width="400"
          height="100"
          style={{fill:"rgb(0,0,255)", strokeWidth:"10",stroke: "rgb(0,0,0)"}}
        />
      </svg>

      <Handle
        type="target"
        position={Position.Left}
        style={{
          backgroundColor: "#4472c4",
          border: "2px solid #2f528f",
          width: "20px",
          height: "20px",
          top: "50%",
          left: "0",
          transform: "translate(-50%, -48.5%)",
          zIndex: "-1",
        }}
        id="a"
        //   onConnect={() => {
        //     setIsConnectable(false);
        //   }}
        isConnectable={editMode}
        isValidConnection={isValidConnectionTarget}
      />

      <Handle
        type="source"
        position={Position.Right}
        style={{
          backgroundColor: "#4472c4",
          border: "2px solid #2f528f",
          width: "20px",
          height: "20px",
          top: "16.5%",
          right: "0",
          transform: "translate(50%, -48.5%)",
          zIndex: "-1",
        }}
        id="b"
        isConnectable={editMode}
        isValidConnection={isValidConnectionSource}
      />

      <Handle
        type="source"
        position={Position.Right}
        style={{
          backgroundColor: "#4472c4",
          border: "2px solid #2f528f",
          width: "20px",
          height: "20px",
          top: "50%",
          right: "0",
          transform: "translate(50%, -48.5%)",
          zIndex: "-1",
        }}
        id="c"
        isConnectable={editMode}
        isValidConnection={isValidConnectionSource}
      />

      <Handle
        type="source"
        position={Position.Right}
        style={{
          backgroundColor: "#4472c4",
          border: "2px solid #2f528f",
          width: "20px",
          height: "20px",
          top: "78.5%",
          right: "0",
          transform: "translate(50%)",
          zIndex: "-1",
        }}
        id="d"
        isConnectable={editMode}
        isValidConnection={isValidConnectionSource}
      />
    </>
  );
};
