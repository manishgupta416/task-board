import React from "react";
import "./TaskCard.css";
import { Draggable } from "react-beautiful-dnd";
const TaskCard = ({ task, index }) => {
  const getItemStyle = (isDragging, draggableStyle) => ({
    userSelect: "none",
    padding: "10px",
    margin: "6px",
    background: isDragging ? "lightgreen" : "lightgrey",
    ...draggableStyle,
  });

  const getPriorityBadgeColor = (priority) => {
    switch (priority) {
      case "High":
        return "red";
      case "Medium":
        return "yellow";
      case "Low":
        return "green";
      default:
        return "gray";
    }
  };
  const badgeColor = getPriorityBadgeColor(task?.priority);
  return (
    <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
      {(provided, snapshot) => {
        return (
          <div
            className="task-container"
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={getItemStyle(
              snapshot.isDragging,
              provided.draggableProps.style
            )}
          >
            <div className="task-info flex">
              <div className="task-no">{task?.name}</div>
              <div
                className="task-proprity"
                style={{ backgroundColor: badgeColor }}
              >
                {task?.priority}
              </div>
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
      }}
    </Draggable>
  );
};

export default TaskCard;
