import React, { useContext } from "react";
import { DataContext } from "../../context/DataContext";
import TaskCard from "../TaskCard/TaskCard";

const InProgress = () => {
  const { dataState } = useContext(DataContext);
  const inProgressTasks = dataState?.data?.filter(
    (task) => task?.status === "In Progress"
  );
  return (
    <div>
      {inProgressTasks?.map((task) => (
        <TaskCard task={task} key={task?.id} />
      ))}
    </div>
  );
};

export default InProgress;
