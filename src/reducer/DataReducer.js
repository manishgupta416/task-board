export const initialState = {
  data: [],
};

export const DataReducer = (state, action) => {
  switch (action.type) {
    case "getAllTask":
      return { ...state, data: [...action.payload] };
    case "addTask":
      console.log(action.payload, "accc");
      return { ...state, data: [...state.data, action.payload] };

    default:
      return { ...state };
  }
};
