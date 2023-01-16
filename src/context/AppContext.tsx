import { createContext, useReducer } from "react";

export const AppContext = createContext(undefined);

const appReducer = (state:any, action:any) => {
  switch (action.type) {
    case "CHANGE_MODE":
      return { ...state, editMode: action.payload };
    default:
      return state;
  }
};

export const AppProvider = ({ children } : {children:any})=> {

  const [state, dispatch] = useReducer(appReducer, {
  editMode:false
  });

  const changeMode = (editMode:boolean) => {
    dispatch({ type: "CHANGE_MODE", payload: editMode});
  };

  return (
    <AppContext.Provider value={{ ...state, changeMode }}>
      {children}
    </AppContext.Provider>
  )
}