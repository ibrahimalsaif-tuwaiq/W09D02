import { createStore, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import Users from "./users";
import Todo from "./todos";
import userTodos from "./userTodos";
import adminUsers from "./admin";

const reducers = combineReducers({ Users, Todo, userTodos, adminUsers });

const store = () => {
  return createStore(reducers, composeWithDevTools());
};

export default store();
