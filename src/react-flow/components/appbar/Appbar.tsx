import { Typography, Button, Toolbar, Box, AppBar } from "@mui/material";

import { useReactFlow } from "reactflow";

import { useAppContext } from "../../../hooks/useAppContext";
import { useEffect, useState, useCallback } from "react";

//interfaces
import { ModuleType } from "../../../types/interfaces";

let id = 3;
let y = 700;

export const Appbar = () => {
  const { editMode, changeMode, zoomedOut, changeZoom } = useAppContext();

  const { getNode, getNodes, setNodes, getViewport, zoomTo, getZoom } =
    useReactFlow();
  const viewport = getViewport();
  // console.log(viewport)
  const nodes = getNodes();

  const addElements = useCallback(() => {
    let newElements: ModuleType[] = [];

    for (let i = 0; i < 100; i++) {
      const newNode: ModuleType = {
        id: id.toString(),
        data: { id: id.toString(), ip: "10.01.01", type: "sterownik prosty" },
        type: "module",
        position: { x: 300, y },
        draggable: editMode,
        deletable: editMode,
        connectable: editMode,
      };
      newElements.push(newNode);
      id++;
      y = y + 300;
    }

    setNodes((nds) => nds.concat(newElements));
  }, [editMode, setNodes]);

  const addElementsPlace = useCallback(() => {
    let newElements: ModuleType[] = [];

    for (let i = 0; i < 100; i++) {
      const newNode: ModuleType = {
        id: id.toString(),
        data: { id: id.toString(), ip: "10.01.01", type: "sterownik prosty" },
        type: "default",
        position: {
          x: Math.floor(Math.random() * (100 - 15000) + 15000),
          y: Math.floor(Math.random() * (100 - 12000) + 12000),
        },
        draggable: editMode,
        deletable: editMode,
        connectable: editMode,
      };
      newElements.push(newNode);
      id++;
      y = y + 300;
    }

    setNodes((nds) => nds.concat(newElements));
  }, [editMode, setNodes]);

  const changeType = useCallback(
    (type: string) => {
      setNodes((nds) => {
        nds.map((node) => {
          node.type = type;
          return node;
        });

        return nds;
      });
    },
    [setNodes]
  );

  useEffect(() => {
    setNodes((nds) => {
      console.log("effect render");
      nds.map((node) => {
        node.draggable = editMode;
        node.connectable = editMode;
        node.deletable = editMode;
        return node;
      });

      return nds;
    });
  }, [editMode, setNodes]);

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
          <Button onClick={addElements} size="large" color="inherit">
            ADD 100 ELEMENTS
          </Button>
          <Button onClick={addElementsPlace} size="large" color="inherit">
            ADD 100 ELEMENTS IN ONE PLACE
          </Button>
          <Button
            onClick={() => changeType("svgModule")}
            size="large"
            color="inherit"
          >
            CHANGE TYPES TO SVG
          </Button>
          <Button
            onClick={() => changeType("module")}
            size="large"
            color="inherit"
          >
            CHANGE TYPES TO DOM ELEMENT
          </Button>
          <Typography>{nodes.length} ELEMENTS</Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
