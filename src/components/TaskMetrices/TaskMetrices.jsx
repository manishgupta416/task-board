import React, { useContext } from "react";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { DataContext } from "../../context/DataContext";
Chart.register(...registerables);

const TaskMetrices = ({ column, onClose }) => {
  const priorityCounts = column.reduce(
    (acc, task) => {
      acc.totalEffort += task.effortSpent;
      const priority = task.priority;
      if (priority === "High") {
        acc.high += 1;
      } else if (priority === "Medium") {
        acc.medium += 1;
      } else if (priority === "Low") {
        acc.low += 1;
      }
      return acc;
    },
    { high: 0, medium: 0, low: 0, totalEffort: 0 }
  );

  console.log(priorityCounts, "ppppppppp");
  const state = {
    labels: ["Total Task", "High", "Medium", "low", "Total Effort Spent"],
    datasets: [
      {
        label: "Task Metrices",
        backgroundColor: "rgb(66, 165, 245)",
        borderColor: "rgba(219, 79, 79, 0.77)",
        borderWidth: 2,
        data: [
          column.length,
          priorityCounts.high,
          priorityCounts.medium,
          priorityCounts.low,
          priorityCounts.totalEffort,
        ],
      },
    ],
  };
  const handleClose = () => {
    onClose();
  };
  return (
    <div className="popup-background">
      <div className="popup-content">
        <button className="btn btn-sv" onClick={handleClose}>
          X
        </button>
        <Bar
          data={state}
          options={{
            title: {
              display: true,
              text: "Class strength",
              fontSize: 40,
            },
            legend: {
              display: true,
              position: "right",
            },
          }}
        />
      </div>
    </div>
  );
};

export default TaskMetrices;
