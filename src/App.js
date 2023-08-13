import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import TaskBoard from "./pages/TaskBoard/TaskBoard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const App = () => {
  return (
    <div>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Routes>
        <Route path="/" element={<TaskBoard />} />
      </Routes>
    </div>
  );
};

export default App;
