import React, { useContext, useEffect, useState } from "react";
import "./TaskBoard.css";
import TaskCard from "../../components/TaskCard/TaskCard";
import { DataContext } from "../../context/DataContext";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const TaskBoard = () => {
  const { dataState } = useContext(DataContext);
  const sampleData = {
    Ready: { id: 1, title: "Ready", task: [] },
    "In Progress": { id: 2, title: "InProgress", task: [] },
    Testing: { id: 3, title: "Testing", task: [] },
    Done: { id: 4, title: "Done", task: [] },
  };

  const [columns, setColumns] = useState(sampleData);

  useEffect(() => {
    const updatedColumns = {
      ...columns,
      Ready: {
        ...columns.Ready,
        task: dataState?.data?.filter((task) => task?.status === "Ready"),
      },
      InProgress: {
        ...columns.InProgress,
        task: dataState?.data?.filter((task) => task?.status === "In Progress"),
      },
      Testing: {
        ...columns.Testing,
        task: dataState?.data?.filter((task) => task?.status === "Testing"),
      },
      Done: {
        ...columns.Done,
        task: dataState?.data?.filter((task) => task?.status === "Done"),
      },
    };

    setColumns(updatedColumns);
  }, [dataState]);

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
  return (
    <div className="main-container">
      <div className="heading">
        <h1>Task Board</h1>
      </div>
      <div className="layout">
        <div className="col">
          <DragDropContext
            onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
            className="layout"
          >
            {Object.entries(columns).map(([columnId, column], index) => {
              if (!column.task) {
                return null; // Skip rendering for missing statuses
              }
              return (
                <div key={column.id} className="layout">
                  <h2>{column.title}</h2>
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
                          >
                            {column.task.map((item, index) => {
                              {
                                /* console.log(item); */
                              }
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
