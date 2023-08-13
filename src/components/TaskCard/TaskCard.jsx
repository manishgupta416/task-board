import React, { useContext, useState } from "react";
import "./TaskCard.css";
import { Draggable } from "react-beautiful-dnd";
import { DataContext } from "../../context/DataContext";
import { CiMenuKebab } from "react-icons/ci";
import AddTask from "../AddTask/AddTask";
const TaskCard = ({ task, index }) => {
  const {
    dataState,
    handleDarkMode,
    theme,
    isDarkMode,
    dataDispatch,
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
  const [showMenu, setShowMenu] = useState(false);
  const handlePopup = () => {
    setShowMenu(!showMenu);
  };
  const handleDialogOutsideClick = () => {
    setShowMenu(false);
    setShowEditPopup(false);
  };
  const [showEditPopup, setShowEditPopup] = useState(false);
  const handleEditTask = (taskId) => {
    dataDispatch({ type: "editTaskId", payload: taskId });
    setShowMenu(false);
    setShowEditPopup(true);
  };

  const handleDeleteTask = (taskId) => {
    dataDispatch({ type: "deleteTask", payload: taskId });
    setShowMenu(false);
  };
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
            <div className="menu-btn cursor" onClick={handlePopup}>
              <CiMenuKebab />
              {showMenu && (
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0,
                    // background: "rgba(0, 0, 0, 0.5)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  onClick={handleDialogOutsideClick}
                >
                  <div
                    style={{
                      background: "#fff",
                      padding: "16px",
                      borderRadius: "8px",
                      boxShadow: "0 0 16px rgba(0, 0, 0, 0.3)",
                      maxWidth: "240px",
                      position: "absolute",
                      right: "25px",
                      top: "6px",
                    }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ul style={{ listStyleType: "none", padding: 0 }}>
                      <li
                        onClick={() => handleEditTask(task.id)}
                        style={{ cursor: "pointer", marginBottom: "8px" }}
                      >
                        Edit
                      </li>
                      <li
                        onClick={() => handleDeleteTask(task.id)}
                        style={{ cursor: "pointer", marginBottom: "8px" }}
                      >
                        Delete
                      </li>
                    </ul>
                  </div>
                </div>
              )}
              {showEditPopup && (
                <AddTask onClose={() => setShowEditPopup(false)} />
              )}
            </div>
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
