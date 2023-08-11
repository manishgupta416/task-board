import React, { useContext } from "react";
import { DataContext } from "../../context/DataContext";
import TaskCard from "../TaskCard/TaskCard";

const TestingTask = () => {
  const { dataState } = useContext(DataContext);
  const testingTasks = dataState?.data?.filter(
    (task) => task?.status === "Testing"
  );

  return (
    <div>
      {testingTasks?.map((task) => (
        <TaskCard task={task} key={task?.id} />
      ))}
    </div>
  );
};

export default TestingTask;
