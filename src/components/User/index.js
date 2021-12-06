import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Navbar from "./../Navbar";

const User = () => {
  const { userId } = useParams();
  const [token, setToken] = useState("");
  const [role, setRole] = useState("");
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const StorgeToken = localStorage.getItem("token");
    setToken(StorgeToken);
    const StorgeRole = localStorage.getItem("role");
    setRole(StorgeRole);
    getUserTodos(StorgeToken);
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
      setTodos(res.data);
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
            Authorization: `Bearer ${token}`,
          },
        }
      );
      getUserTodos(token);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar role={role} page="User" />
      <div className="wrapper">
        {!token ? (
          <h1>
            You are not logeddin yet, so <Link to="/login">login</Link> or
            <Link to="/signup">signup</Link>
          </h1>
        ) : (
          <div className="ItemsCon">
            {todos.length ? (
              <ul className="list">
                {todos.map((todo) => (
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
