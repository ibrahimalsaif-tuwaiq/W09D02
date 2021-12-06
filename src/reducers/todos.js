const initialState = {
  user: null,
  token: "",
};

const Todo = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case "GET":
      const { todos } = payload;
      return { todos };
    default:
      return state;
  }
};

export default Todo;

export const todosGet = (data) => {
  return {
    type: "GET",
    payload: data,
  };
};
