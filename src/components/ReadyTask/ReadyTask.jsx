import React, { useContext } from "react";
import { DataContext } from "../../context/DataContext";
import TaskCard from "../TaskCard/TaskCard";

const ReadyTask = () => {
  const { dataState } = useContext(DataContext);
  const readyTask = dataState?.data?.filter((task) => task?.status === "Ready");
  return (
    <div>
      {readyTask?.map((task) => (
        <TaskCard task={task} key={task?.id} />
      ))}
    </div>
  );
};

export default ReadyTask;
