import { createContext, useReducer, useCallback } from "react";

//types
import { AppContextProps } from "../types/interfaces";

export const AppContext = createContext<AppContextProps>({
  editMode: false,
  zoomedOut: false,
  changeMode: () => {},
  changeZoom: () => {},
});

type ChangeModeFunction = (arg1: boolean) => void;

const appReducer = (state: any, action: any) => {
  switch (action.type) {
    case "CHANGE_MODE":
      return { ...state, editMode: action.payload };
    case "CHANGE_ZOOM":
      return { ...state, zoomedOut: action.payload };
    default:
      return state;
  }
};

export const AppProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(appReducer, {
    editMode: false,
    zoomedOut: false,
  });

  const changeMode: ChangeModeFunction = useCallback((editMode: boolean) => {
    dispatch({ type: "CHANGE_MODE", payload: editMode });
  }, []);
  const changeZoom: ChangeModeFunction = useCallback((zoomedOut: boolean) => {
    dispatch({ type: "CHANGE_ZOOM", payload: zoomedOut });
  }, []);

  return (
    <AppContext.Provider value={{ ...state, changeMode, changeZoom }}>
      {children}
    </AppContext.Provider>
  );
};
