import { Handle, Position } from "reactflow";
import { Card } from "@mui/material";
import { useState } from "react";

//styles
import "./CustomModule.css";

//assets
import socket from "../../assets/socket.png";

export const CustomModule = (props: any) => {
//   const [isConnectable, setIsConnectable] = useState(true);

  return (
    <>
      <div className="customModule">
        <aside className="customModule__input-container">
          <div className="customModule__input">
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
            //   isConnectable={isConnectable}
            />
            {/* <div className="circle circle--blue circle--blue-input"></div> */}
            <p className="customModule__input-p">in 1 </p>
            <img
              className="customModule__input-img"
              src={socket}
              alt="socket"
            />
          </div>
        </aside>
        <main className="customModule__info info">
          <div className="circle-container">
            <div className="circle circle--orange"></div>
            <div className="circle circle--red"></div>
            <div className="circle circle--green"></div>
          </div>
          <div className="info__text info__text--id">{props.data.id}</div>
          <div className="info__text info__text--ip">{props.data.ip}</div>
          <div className="info__text info__texy--type">{props.data.type}</div>
        </main>
        <aside className="customModule__output-container">
          <div className="customModule__output">
            {/* <div className="circle circle--blue"></div> */}
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
            />
            <p className="customModule__output-p">out 3 </p>
            <img
              className="customModule__output-img"
              src={socket}
              alt="socket"
            />
          </div>
          <div className="customModule__output">
            {/* <div className="circle circle--blue"></div> */}
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
            />
            <p className="customModule__output-p">out 2</p>
            <img
              className="customModule__output-img"
              src={socket}
              alt="socket"
            />
          </div>
          <div className="customModule__output">
            {/* <div className="circle circle--blue"></div> */}
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
            />
            <p className="customModule__output-p">out 3</p>
            <img
              className="customModule__output-img"
              src={socket}
              alt="socket"
            />
          </div>
        </aside>
      </div>
    </>
  );
};
