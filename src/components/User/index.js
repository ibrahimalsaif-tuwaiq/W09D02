import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userTodosGet } from "./../../reducers/userTodos";
import axios from "axios";
import Navbar from "./../Navbar";

const User = () => {
  const dispatch = useDispatch();
  const { userId } = useParams();

  const state = useSelector((state) => {
    return {
      token: state.Users.token,
      todos: state.userTodos.todos || [],
    };
  });

  useEffect(() => {
    getUserTodos(state.token);
    // eslint-disable-next-line
  }, []);

  const getUserTodos = async (token) => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/userTodos/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(userTodosGet({ todos: res.data }));
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUserTodo = async (id) => {
    try {
      await axios.put(
        `${process.env.REACT_APP_BASE_URL}/deleteUserTodo/${id}`,
        {
          userId,
        },
        {
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        }
      );
      getUserTodos(state.token);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar page="User" />
      <div className="wrapper">
        {!state.token ? (
          <h1>
            You are not logeddin yet, so <Link to="/login">login</Link> or
            <Link to="/signup">signup</Link>
          </h1>
        ) : (
          <div className="ItemsCon">
            {state.todos.length ? (
              <ul className="list">
                {state.todos.map((todo) => (
                  <div key={todo._id} className="listItem">
                    <li>{todo.name}</li>
                    <div>
                      <button
                        className="delete"
                        onClick={() => deleteUserTodo(todo._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </ul>
            ) : (
              <h2>The user doesn't have any todos yet!!</h2>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default User;
