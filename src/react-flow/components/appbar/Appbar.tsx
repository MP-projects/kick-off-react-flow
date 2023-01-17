
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';

import { useReactFlow } from 'reactflow';

import { useAppContext } from '../../../hooks/useAppContext';
 import { useEffect } from 'react';

export const Appbar = () => {

    const {editMode, changeMode} = useAppContext()
  
    const { getNode, setNodes } = useReactFlow();
  
    useEffect(() => {
      console.log("effect");
      setNodes((nds) => {
        nds.map((node) => {
          console.log(node);
          node.draggable = editMode;
          node.connectable = editMode;
          node.deletable = editMode;
          return node;
        });
        console.log(nds);
        return nds;
      });
    }, [editMode, setNodes]);
  
   

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={{display:"flex", justifyContent:"center", alignItems:"center"}} >
        <Toolbar>
          <Button onClick={()=>{changeMode(!editMode)}} size='large' color="inherit" >EDIT MODE</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}