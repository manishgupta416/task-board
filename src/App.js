import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import TaskBoard from "./pages/TaskBoard/TaskBoard";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<TaskBoard />} />
      </Routes>
    </div>
  );
};

export default App;
