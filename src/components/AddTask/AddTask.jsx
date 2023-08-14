import React, { useContext, useEffect, useState } from "react";
import "./AddTask.css";
import { v4 as uuidv4 } from "uuid";
import { DataContext } from "../../context/DataContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddTask = ({ onClose }) => {
  const { dataState, dataDispatch } = useContext(DataContext);
  const [taskDetails, setTaskDetails] = useState({
    id: uuidv4(),
    name: "",
    type: "",
    assignee: "",
    priority: "",
    status: "",
    effortSpent: "",
    startDate: "",
    endDate: "",
    summary: "",
  });
  console.log(taskDetails);
  const handleClose = () => {
    dataDispatch({ type: "editTaskId", payload: null });
    onClose();
  };

  const handleAddTask = () => {
    if (dataState.taskId) {
      //edit existing task
      if (
        (taskDetails.name !== "",
        taskDetails.type !== "",
        taskDetails.assignee !== "",
        taskDetails.status !== "",
        taskDetails.effortSpent !== "",
        taskDetails.startDate !== "",
        taskDetails.endDate !== "",
        taskDetails.summary !== "",
        taskDetails.priority !== "")
      ) {
        dataDispatch({ type: "editTask", payload: taskDetails });
        toast.success("Task Updated Sucessfully!", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        onClose();
        dataDispatch({ type: "editTaskId", payload: null });
      } else {
        toast.warn("Please enter in all input fields ", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } else {
      //add new task
      if (
        (taskDetails.name !== "",
        taskDetails.type !== "",
        taskDetails.assignee !== "",
        taskDetails.status !== "",
        taskDetails.effortSpent !== "",
        taskDetails.startDate !== "",
        taskDetails.endDate !== "",
        taskDetails.summary !== "",
        taskDetails.priority !== "")
      ) {
        dataDispatch({ type: "addTask", payload: taskDetails });
        toast.success("Task Added Sucessfully!", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        onClose();
      } else {
        toast.warn("Please enter in all input fields ", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    }
  };
  useEffect(() => {
    if (dataState?.taskId) {
      const taskData = dataState.data?.find(
        (task) => dataState.taskId?.toString() === task.id?.toString()
      );
      setTaskDetails(taskData);
    }
  }, [dataState.taskId]);
  return (
    <div className=" add-task-container popup-background">
      <div className=" popup-content pop-width">
        <div className="flx-row flex-inp-column">
          <div className="flx-col pd">
            <div className="sp-even  pd">
              <div>
                <label htmlFor="name">Name</label>
              </div>
              <div>
                <input
                  type="text"
                  required
                  onChange={(e) =>
                    setTaskDetails({ ...taskDetails, name: e.target.value })
                  }
                  value={taskDetails.name}
                />
              </div>
            </div>
            <div className="sp-even  pd">
              <div>
                <label htmlFor="assignee">Assignee</label>
              </div>
              <div>
                <input
                  type="text"
                  required
                  onChange={(e) =>
                    setTaskDetails({
                      ...taskDetails,
                      assignee: e.target.value,
                    })
                  }
                  value={taskDetails.assignee}
                />
              </div>
            </div>
            <div className="">
              <div className="sp-even  pd">
                <div>
                  <label htmlFor="status">Status</label>
                </div>
                <div>
                  <select
                    className="cursor"
                    required
                    onChange={(e) =>
                      setTaskDetails({
                        ...taskDetails,
                        status: e.target.value,
                      })
                    }
                  >
                    <option value="">Select</option>
                    <option value="Ready">Ready</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Testing">Testing</option>
                    <option value="Done">Done</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="">
              <div className="sp-even  pd">
                <div>
                  <label htmlFor="priority">Priority</label>
                </div>
                <select
                  className="cursor"
                  required
                  onChange={(e) =>
                    setTaskDetails({
                      ...taskDetails,
                      priority: e.target.value,
                    })
                  }
                >
                  <option value="">Select</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>
            </div>
          </div>
          <div className="flx-col pd">
            <div className="sp-even  pd">
              <div>
                <label htmlFor="type">Type</label>
              </div>
              <div>
                <input
                  type="text"
                  required
                  onChange={(e) =>
                    setTaskDetails({ ...taskDetails, type: e.target.value })
                  }
                  value={taskDetails.type}
                />
              </div>
            </div>
            <div className="sp-even  pd">
              <div>
                <label htmlFor="effort-spnt">Effort </label>
              </div>
              <div>
                <input
                  type="number"
                  required
                  onChange={(e) =>
                    setTaskDetails({
                      ...taskDetails,
                      effortSpent: e.target.value,
                    })
                  }
                  value={taskDetails.effortSpent}
                />
              </div>
            </div>
            <div className="sp-even  pd">
              <div>
                <label htmlFor="start-date">Start Date</label>
              </div>
              <div>
                <input
                  type="date"
                  name=""
                  id=""
                  required
                  onChange={(e) =>
                    setTaskDetails({
                      ...taskDetails,
                      startDate: e.target.value,
                    })
                  }
                  value={taskDetails.startDate}
                />
              </div>
            </div>
            <div className="sp-even pd">
              <div>
                <label htmlFor="end-date">End Date</label>
              </div>
              <div>
                <input
                  type="date"
                  name=""
                  required
                  id=""
                  onChange={(e) =>
                    setTaskDetails({ ...taskDetails, endDate: e.target.value })
                  }
                  value={taskDetails.endDate}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flx-col pd">
          <div className="sp-btw sp-even">
            <div>
              <label htmlFor="summary">Summary </label>
            </div>
            <div>
              <input
                type="text"
                required
                onChange={(e) =>
                  setTaskDetails({ ...taskDetails, summary: e.target.value })
                }
                value={taskDetails.summary}
              />
            </div>
          </div>
        </div>
        <div className="flx-col pd">
          <div className="sp-btw sp-even">
            <button className="btn btn-sv cursor" onClick={handleAddTask}>
              Save
            </button>
            <button className="btn btn-x cursor" onClick={handleClose}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTask;
