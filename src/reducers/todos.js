const initialState = {
  user: null,
  token: "",
};

const todos = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case "GET":
      const { todos } = payload;
      return { todos };
    default:
      return state;
  }
};

export default todos;

export const todosGet = (data) => {
  return {
    type: "GET",
    payload: data,
  };
};
