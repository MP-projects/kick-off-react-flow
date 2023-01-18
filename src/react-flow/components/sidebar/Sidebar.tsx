import { Typography, Box, List, ListItem, Divider } from "@mui/material";

import { useReactFlow } from "reactflow";

//assets
import Module from "../../../assets/module.png";

export const SideBar = () => {
  const reactFlowInstance = useReactFlow();

  const { setNodes, setEdges, setViewport } = useReactFlow();

  const onDragStart = (event: React.DragEvent, nodeType: any) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 225,
        bgcolor: "background.paper",
        position: "fixed",
        top: 100,
        left: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: "10000",
      }}
    >
      <nav>
        <List
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ListItem
            sx={{
              p: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography variant="h6"> Drag elements to add them</Typography>
          </ListItem>
          <ListItem>
            <Typography variant="h6">
              Select element and click backspace to delete it
            </Typography>
          </ListItem>
          <ListItem
            sx={{
              p: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              style={{ width: "80%" }}
              src={Module}
              alt="module"
              onDragStart={(event) => onDragStart(event, "module")}
            />
          </ListItem>
          <Divider />
        </List>
      </nav>
    </Box>
  );
};
