import React, { useContext, useEffect, useState } from "react";
import "./TaskBoard.css";
import TaskCard from "../../components/TaskCard/TaskCard";
import { DataContext } from "../../context/DataContext";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { CiLight } from "react-icons/ci";
import { MdDarkMode } from "react-icons/md";
import { FaPlus } from "react-icons/fa";
import AddTask from "../../components/TaskCard/AddTask/AddTask";
const TaskBoard = () => {
  const {
    dataState,
    handleDarkMode,
    theme,
    isDarkMode,
    getPriorityBadgeColor,
  } = useContext(DataContext);
  const sampleData = {
    Ready: { id: 1, title: "Ready", task: [] },
    InProgress: { id: 2, title: "In Progress", task: [] },
    Testing: { id: 3, title: "Testing", task: [] },
    Done: { id: 4, title: "Done", task: [] },
  };

  const [columns, setColumns] = useState(sampleData);
  const [searchInput, setSearchInput] = useState("");
  const [priorityValue, setPriorityValue] = useState("");
  const [assigneeValue, setAssigneeValue] = useState("");

  useEffect(() => {
    const filteredTasks = {
      Ready: dataState?.data?.filter((task) => task?.status === "Ready"),
      InProgress: dataState?.data?.filter(
        (task) => task?.status === "In Progress"
      ),
      Testing: dataState?.data?.filter((task) => task?.status === "Testing"),
      Done: dataState?.data?.filter((task) => task?.status === "Done"),
    };

    const updatedColumns = {
      ...columns,
      Ready: {
        ...columns.Ready,
        task: filterTasks(
          filteredTasks.Ready,
          searchInput,
          priorityValue,
          assigneeValue
        ),
      },
      InProgress: {
        ...columns.InProgress,
        task: filterTasks(
          filteredTasks.InProgress,
          searchInput,
          priorityValue,
          assigneeValue
        ),
      },
      Testing: {
        ...columns.Testing,
        task: filterTasks(
          filteredTasks.Testing,
          searchInput,
          priorityValue,
          assigneeValue
        ),
      },
      Done: {
        ...columns.Done,
        task: filterTasks(
          filteredTasks.Done,
          searchInput,
          priorityValue,
          assigneeValue
        ),
      },
    };

    setColumns(updatedColumns);
  }, [dataState.data, searchInput, priorityValue, assigneeValue]);

  const getListStyle = (isDraggingOver) => ({
    background: isDraggingOver ? "lightblue" : "lightgrey",
    padding: "10px",
    margin: "6px",
  });

  const onDragEnd = (result, columns, setColumns) => {
    if (!result.destination) return;
    const { source, destination } = result;
    console.log(source, "des", destination);
    //source and destinon diff then
    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.task];
      const destItems = [...destColumn.task];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      console.log("s", sourceColumn);
      console.log("d", destColumn);
      console.log("si", sourceItems);
      console.log("d", destItems);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          task: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          task: destItems,
        },
      });
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.task];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          task: copiedItems,
        },
      });
    }
  };
  console.log(columns);

  const filterTasks = (tasks, searchValue, priorityValue, assigneeValue) => {
    return tasks.filter(
      (task) =>
        task.name.toLowerCase().includes(searchValue.toLowerCase()) &&
        (!priorityValue ||
          task.priority.toLowerCase() === priorityValue.toLowerCase()) &&
        (!assigneeValue ||
          task.assignee.toLowerCase() === assigneeValue.toLowerCase())
    );
  };

  console.log(filterTasks);
  const getStyle = (title) => {
    return getPriorityBadgeColor(title);
  };

  const [showTaskPopup, setShowTaskPopup] = useState(false);
  const handleAddTask = () => {
    setShowTaskPopup(!showTaskPopup);
  };
  return (
    <div
      className="main-container"
      style={{ backgroundColor: theme.background, color: theme.text }}
    >
      <div className="heade flx-col">
        <div className="heading flx-row ">
          <h1>Task Board</h1>
          <span onClick={handleDarkMode} className="font-sz">
            {isDarkMode ? <CiLight /> : <MdDarkMode />}
          </span>
        </div>
        <div className="spbtw">
          <div className="flx ">
            <span onClick={handleAddTask} className="spn-btn btn-add">
              <FaPlus />
              Add Task
            </span>
            {showTaskPopup && (
              <AddTask onClose={() => setShowTaskPopup(false)} />
            )}
            <input
              type="text"
              className="inp"
              placeholder="search"
              onChange={(e) => setSearchInput(e.target.value.toLowerCase())}
            />
          </div>
          <div className="flx sz colum">
            Priority :{" "}
            <select
              name="Priority-filter"
              id="Priority-filter"
              className="cursor"
              onChange={(e) => setPriorityValue(e.target.value.toLowerCase())}
            >
              <option value="">Select</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
            Assignee :{" "}
            <select
              name="assignee-filter"
              id="assignee-filter"
              className="cursor"
              onChange={(e) => setAssigneeValue(e.target.value.toLowerCase())}
            >
              <option value="">Select</option>
              <option value="High">Alice</option>
              <option value="Bob">Bob</option>
              <option value="Charlie">Charlie</option>
              <option value="David">David</option>
              <option value="Eve">Eve</option>
              <option value="Frank">Frank</option>
              <option value="Henry">Henry</option>
              <option value="Ivy">Ivy</option>
              <option value="Grace">Grace</option>
              <option value="Jack">Jack</option>
            </select>
          </div>
        </div>
      </div>

      <div className="layout">
        <div className="col">
          <DragDropContext
            onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
            className="layout"
          >
            {Object.entries(columns).map(([columnId, column], index) => {
              console.log(column, "collllllll");
              if (!column.task) {
                return null;
              }
              return (
                <div key={column.id} className="layout">
                  <h2
                    style={{
                      borderBottom: `4px solid ${getStyle(column.title)} `,
                      color: `${getStyle(column.title)} `,
                    }}
                  >
                    {column.title} ({column.task.length})
                  </h2>
                  <div>
                    <Droppable
                      droppableId={columnId}
                      key={columnId}
                      className="col"
                    >
                      {(provided, snapshot) => {
                        return (
                          <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            style={getListStyle(snapshot.isDraggingOver)}
                          >
                            {column.task.map((item, index) => {
                              return (
                                <div>
                                  <TaskCard
                                    task={item}
                                    key={item.id}
                                    index={index}
                                  />
                                </div>
                              );
                            })}
                            {provided.placeholder}
                          </div>
                        );
                      }}
                    </Droppable>
                  </div>
                </div>
              );
            })}
          </DragDropContext>
        </div>
      </div>
    </div>
  );
};

export default TaskBoard;
