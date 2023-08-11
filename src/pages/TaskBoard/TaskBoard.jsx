import React from "react";
import "./TaskBoard.css";
import TaskCard from "../../components/TaskCard/TaskCard";
import DoneTask from "../../components/DoneTask/DoneTask";
import InProgress from "../../components/InProgressTask/InProgress";
import ReadyTask from "../../components/ReadyTask/ReadyTask";
import TestingTask from "../../components/TestingTask/TestingTask";

const TaskBoard = () => {
  return (
    <div className="main-container">
      <div className="heading">
        <h1>Task Board</h1>
      </div>
      <div className="layout">
        <div className="ready-col col">
          <div className="layout-heading">Ready Task</div>
          <ReadyTask />
        </div>
        <div className="inProgress-col col">
          <div className="layout-heading">InProgress Task</div>
          <InProgress />
        </div>
        <div className="testing-col col">
          <div className="layout-heading">Testing Task</div>
          <TestingTask />
        </div>
        <div className="done-col col ">
          <div className="layout-heading">Done Task</div>
          <DoneTask />
        </div>
      </div>
    </div>
  );
};

export default TaskBoard;
