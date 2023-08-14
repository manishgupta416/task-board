export const initialState = {
  data: [],
  taskId: "",
};

export const DataReducer = (state, action) => {
  switch (action.type) {
    case "getAllTask":
      return { ...state, data: [...action.payload] };

    case "addTask":
      return { ...state, data: [...state.data, action.payload] };

    case "editTaskId":
      return { ...state, taskId: action.payload };

    case "editTask":
      return {
        ...state,
        data: state.data.map((task) =>
          task.id === state.taskId ? { ...action.payload } : task
        ),
      };

    case "deleteTask":
      return {
        ...state,
        data: state.data.filter((task) => task.id !== action.payload),
      };

    default:
      return { ...state };
  }
};
