import { createContext, useReducer } from "react";

//types
import { AppContextProps } from "../types/interfaces";




export const AppContext = createContext<AppContextProps>({editMode:false, changeMode:()=>{}});

type ChangeModeFunction = (arg1:boolean)=>void

const appReducer = (state:any, action:any) => {
  switch (action.type) {
    case "CHANGE_MODE":
      return { ...state, editMode: action.payload };
    default:
      return state;
  }
};

export const AppProvider = ({ children }:any)=> {

  const [state, dispatch] = useReducer(appReducer, {
  editMode:false
  });

  const changeMode:ChangeModeFunction = (editMode:boolean) => {
    dispatch({ type: "CHANGE_MODE", payload: editMode});
  };

  return (
    <AppContext.Provider value={{ ...state, changeMode}}>
      {children}
    </AppContext.Provider>
  )
}