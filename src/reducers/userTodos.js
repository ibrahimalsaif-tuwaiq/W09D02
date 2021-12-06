const initialState = {
  todos: [],
};

const userTodos = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case "GET":
      const { todos } = payload;
      return { todos };
    default:
      return state;
  }
};

export default userTodos;

export const userTodosGet = (data) => {
  return {
    type: "GET",
    payload: data,
  };
};
