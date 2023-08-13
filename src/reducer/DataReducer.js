export const initialState = {
  data: [],
  taskId: "",
};

export const DataReducer = (state, action) => {
  switch (action.type) {
    case "getAllTask":
      return { ...state, data: [...action.payload] };
    case "addTask":
      console.log(action.payload, "accc");
      return { ...state, data: [...state.data, action.payload] };
    case "editTaskId":
      console.log(action.payload, "edit iD");
      return { ...state, taskId: action.payload };
    case "editTask":
      console.log(action.payload, "edit iD");
      return {
        ...state,
        data: state.data.map((task) =>
          task.id === state.taskId ? { ...action.payload } : task
        ),
      };

    case "deleteTask":
      console.log(action.payload, "dell");
      return {
        ...state,
        data: state.data.filter((task) => task.id !== action.payload),
      };

    default:
      return { ...state };
  }
};
