import React, { useContext, useEffect, useState } from "react";
import "./TaskBoard.css";
import TaskCard from "../../components/TaskCard/TaskCard";
import { DataContext } from "../../context/DataContext";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { CiLight } from "react-icons/ci";
import { MdDarkMode } from "react-icons/md";
import { FaPlus } from "react-icons/fa";
import { AiOutlineBarChart } from "react-icons/ai";
import AddTask from "../../components/AddTask/AddTask";
import TaskMetrices from "../../components/TaskMetrices/TaskMetrices";
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
  //to store col data
  const [colData, setColData] = useState({
    ready: [],
    testing: [],
    inProgress: [],
    done: [],
  });
  useEffect(() => {
    const filteredTasks = {
      Ready: dataState?.data?.filter((task) => task?.status === "Ready"),
      InProgress: dataState?.data?.filter(
        (task) => task?.status === "In Progress"
      ),
      Testing: dataState?.data?.filter((task) => task?.status === "Testing"),
      Done: dataState?.data?.filter((task) => task?.status === "Done"),
    };
    setColData({
      ...colData,
      ready: filteredTasks.Ready,
      done: filteredTasks.Done,
      testing: filteredTasks.Testing,
      inProgress: filteredTasks.InProgress,
    });
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
      const [removedItem] = sourceItems.splice(source.index, 1);
      removedItem.status = destination.droppableId;

      const updatedDestItems = destItems.map((item, index) =>
        index === destination.index
          ? { ...item, status: destination.droppableId }
          : item
      );

      updatedDestItems.splice(destination.index, 0, removedItem);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          task: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          task: updatedDestItems,
        },
      });
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.task];
      const [removedItem] = copiedItems.splice(source.index, 1);
      removedItem.status = source.droppableId;

      const updatedDestItems = copiedItems.map((item, index) =>
        index === destination.index
          ? { ...item, status: destination.droppableId }
          : item
      );

      updatedDestItems.splice(destination.index, 0, removedItem);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          task: updatedDestItems,
        },
      });
    }
  };

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

  const getStyle = (title) => {
    return getPriorityBadgeColor(title);
  };

  const [showTaskPopup, setShowTaskPopup] = useState(false);
  const handleAddTask = () => {
    setShowTaskPopup(!showTaskPopup);
  };

  const sendColData = (colname) => {
    switch (colname) {
      case "Ready":
        return colData.ready;
      case "Done":
        return colData.done;
      case "Testing":
        return colData.testing;
      case "In Progress":
        return colData.inProgress;
      default:
      // return "gray";
    }
  };
  const [colname, setColname] = useState([]);
  const [showChart, setShowChart] = useState(false);
  const handleColname = (colnm) => {
    const name = sendColData(colnm);
    setColname(name);
    setShowChart(true);
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
      {colname.length !== 0 && showChart && (
        <TaskMetrices column={colname} onClose={() => setShowChart(false)} />
      )}
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
                    onClick={() => handleColname(column.title)}
                  >
                    {column.title} ({column.task.length}){" "}
                    <span className="cursor">
                      <AiOutlineBarChart />
                    </span>
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
