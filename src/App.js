import React, { useContext } from "react";
import { DataContext } from "./context/DataContext";
import { getAllTask } from "./services/DataServices";

const App = () => {
  const { task } = useContext(DataContext);

  return <div>{task}</div>;
};

export default App;
