import React from "react";
import "./TaskCard.css";

const TaskCard = ({ task }) => {
  return (
    <div className="task-container">
      <div className="task-info flex">
        <div className="task-no">{task?.name}</div>
        <div className="task-proprity">{task?.priority}</div>
      </div>
      <div className="task-des flex">
        <div className="task-type">{task?.type}</div>
        <div className="task-summary">{task?.summary}</div>
      </div>
      <div className="task-assignee flex">
        <div className="name">{task?.assignee}</div>
        <div className="date">{task?.endDate}</div>
      </div>
    </div>
  );
};

export default TaskCard;
