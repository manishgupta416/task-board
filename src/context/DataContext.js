import { DataReducer, initialState } from "../reducer/DataReducer";
import { getAllTask } from "../services/DataServices";

const { createContext, useReducer, useEffect } = require("react");

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [dataState, dataDispatch] = useReducer(DataReducer, initialState);

  useEffect(() => {
    getAllTask(dataDispatch);
  }, []);
  return (
    <DataContext.Provider value={{ task: "onging", dataState, dataDispatch }}>
      {children}
    </DataContext.Provider>
  );
};
