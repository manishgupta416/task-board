export const initialState = {
  data: [],
};

export const DataReducer = (state, action) => {
  switch (action.type) {
    case "getAllTask":
      return { ...state, data: [...action.payload] };

    default:
      return { ...state };
  }
};
