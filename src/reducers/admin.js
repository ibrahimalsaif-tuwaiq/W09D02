const initialState = {
  users: [],
};

const adminUsers = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case "GET":
      const { users } = payload;
      return { users };
    default:
      return state;
  }
};

export default adminUsers;

export const adminUsersGet = (data) => {
  return {
    type: "GET",
    payload: data,
  };
};
