import {
  Typography,
  Button,
  Toolbar,
  Box,
  AppBar,
  TextField,
} from "@mui/material";

import { useReactFlow, Edge, Node } from "reactflow";

import { useAppContext } from "../../../hooks/useAppContext";
import { useEffect, useState, useCallback } from "react";

//interfaces
import { ModuleType } from "../../../types/interfaces";

let id = 3;
let edgeId = 0;
const currentNodes: Node[] = [];
const currentEdges: Edge[] = [];

const nodesIds: string[] = [];

const newNodes = (number: number) => {
  for (let i = 0; i < number; i++) {
    currentNodes.push({
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

const newEdges = (number: number) => {
  for (let i = 0; i < number; i++) {
    console.log(nodesIds.length);
    const index1 = pickNumber(nodesIds.length);
    const index2 = pickNumber(nodesIds.length);
    currentEdges.push({
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

export const Appbar = () => {
  const { editMode, changeMode, zoomedOut, changeZoom } = useAppContext();
  const [edgesNumber, setEdgesNumber] = useState(1000);
  const [nodesNumber, setNodesNumber] = useState(1000);

  const {
    getNode,
    getNodes,
    getEdges,
    setNodes,
    setEdges,
    getViewport,
    zoomTo,
    getZoom,
  } = useReactFlow();
  const viewport = getViewport();
  // console.log(viewport)
  const nodes = getNodes();
  const edges = getEdges();

  const addNodesAndEdges = () => {
    newNodes(nodesNumber);
    newEdges(edgesNumber);
    setNodes(currentNodes);
    setEdges(currentEdges);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Toolbar>
          <Button
            onClick={() => {
              changeMode(!editMode);
            }}
            size="large"
            color="inherit"
          >
            EDIT MODE
          </Button>

          <Button onClick={addNodesAndEdges} size="large" color="inherit">
            ADD NODES AND EDGES IN ONE PLACE
          </Button>
          <label className="label-app">Nodes</label>
          <input
            type="number"
            value={nodesNumber}
            onChange={(e) => {
              setNodesNumber(Number(e.target.value));
            }}
          />
          <label className="label-app">Edges</label>
          <input
            type="number"
            value={edgesNumber}
            onChange={(e) => {
              setEdgesNumber(Number(e.target.value));
            }}
          />

          {/* <Button
            onClick={() => changeType("svgModule")}
            size="large"
            color="inherit"
          >
            CHANGE TYPES TO SVG
          </Button> */}
          {/* <Button
            onClick={() => changeType("module")}
            size="large"
            color="inherit"
          >
            CHANGE TYPES TO DOM ELEMENT
          </Button> */}
          <Typography sx={{ marginLeft: 1 }}>{nodes.length} NODES</Typography>
          <Typography sx={{ marginLeft: 1 }}>{edges.length} EDGES</Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
