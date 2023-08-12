import React, { useContext } from "react";
import "./TaskCard.css";
import { Draggable } from "react-beautiful-dnd";
import { DataContext } from "../../context/DataContext";

const TaskCard = ({ task, index }) => {
  const {
    dataState,
    handleDarkMode,
    theme,
    isDarkMode,
    getPriorityBadgeColor,
  } = useContext(DataContext);
  const getItemStyle = (isDragging, draggableStyle) => ({
    userSelect: "none",
    padding: "10px",
    margin: "6px",
    background: isDragging ? "lightgreen" : "lightgrey",
    ...draggableStyle,
  });

  const badgeColor = getPriorityBadgeColor(task?.priority);
  const cardColor = getPriorityBadgeColor(task?.status);
  return (
    <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
      {(provided, snapshot) => {
        return (
          <div
            className="task-container"
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={{
              ...getItemStyle(
                snapshot.isDragging,
                provided.draggableProps.style
              ),
              backgroundColor: cardColor,
              color: isDarkMode ? theme.text : "white", // Call a function to get the appropriate color based on taskState
            }}
          >
            <div className="task-info flex">
              <div className="task-no">{task?.name}</div>
              <div
                className="task-proprity border"
                style={{ backgroundColor: badgeColor }}
              >
                {task?.priority}
              </div>
            </div>
            <div className="task-des flex">
              <div className="task-type">#{task?.type}</div>
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
