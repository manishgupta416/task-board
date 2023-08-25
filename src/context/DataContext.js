import { DataReducer, initialState } from "../reducer/DataReducer";
import { getAllTask } from "../services/DataServices";

const { createContext, useReducer, useEffect, useState } = require("react");

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [dataState, dataDispatch] = useReducer(DataReducer, initialState);
  const lightTheme = {
    background: "#feefc3",
    text: "#333333",
  };

  const darkTheme = {
    background: "#102b3f",
    text: "#FFFFFF",
  };
  const [isDarkMode, setIsDarkMode] = useState(false);
  const handleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };
  const theme = isDarkMode ? darkTheme : lightTheme;
  useEffect(() => {
    getAllTask(dataDispatch);
  }, []);

  const getPriorityBadgeColor = (priority) => {
    switch (priority) {
      case "High":
        return "red";
      case "Medium":
        return "#d4d426";
      case "Low":
        return "green";
      case "Ready":
        return "#42A5F5";
      case "Done":
        return "#1976D2";
      case "In Progress":
        return "#FFA726";
      case "InProgress":
        return "#FFA726";
      case "Testing":
        return "#AB47BC";
      default:
      // return "gray";
    }
  };
  return (
    <DataContext.Provider
      value={{
        task: "onging",
        dataState,
        dataDispatch,
        handleDarkMode,
        theme,
        isDarkMode,
        getPriorityBadgeColor,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
