import React, { useContext } from "react";
import { DataContext } from "../../context/DataContext";
import TaskCard from "../TaskCard/TaskCard";

const DoneTask = () => {
  const { dataState } = useContext(DataContext);
  const doneTasks = dataState?.data?.filter((task) => task?.status === "Done");

  return (
    <div>
      {doneTasks?.map((task) => (
        <TaskCard task={task} key={task?.id} />
      ))}
    </div>
  );
};

export default DoneTask;
