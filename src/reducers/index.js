import { createStore, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import Users from "./users";
import Todo from "./todos";

const reducers = combineReducers({ Users, Todo });

const store = () => {
  return createStore(reducers, composeWithDevTools());
};

export default store();
