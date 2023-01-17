import { Typography, Button, Toolbar, Box, AppBar } from "@mui/material";

import { useReactFlow } from "reactflow";

import { useAppContext } from "../../../hooks/useAppContext";
import { useEffect } from "react";

//interfaces
import { ModuleType } from "../../../types/interfaces";

let id = 3;
let y = 700;

export const Appbar = () => {
  const { editMode, changeMode } = useAppContext();

  const { getNode, getNodes, setNodes } = useReactFlow();
  const nodes = getNodes();
  const addElements = () => {
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
  };
  const addElementsPlace = () => {
    let newElements: ModuleType[] = [];

    for (let i = 0; i < 100; i++) {
      const newNode: ModuleType = {
        id: id.toString(),
        data: { id: id.toString(), ip: "10.01.01", type: "sterownik prosty" },
        type: "module",
        position: { x: 300, y: 300 },
        draggable: editMode,
        deletable: editMode,
        connectable: editMode,
      };
      newElements.push(newNode);
      id++;
      y = y + 300;
    }

    setNodes((nds) => nds.concat(newElements));
  };

  useEffect(() => {
    setNodes((nds) => {
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
          <Typography>{nodes.length} ELEMENTS</Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
