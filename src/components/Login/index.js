import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { userLogin } from "./../../reducers/users";
import "./style.css";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const state = useSelector((state) => {
    return {
      token: state.Users.token,
    };
  });

  const login = async () => {
    try {
      const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/login`, {
        email,
        password,
      });
      dispatch(
        userLogin({ role: res.data.result.role.role, token: res.data.token })
      );
      navigate("/");
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };

  return (
    <div className="wrapper">
      {!state.token ? (
        <div className="formCon">
          <h1>Login</h1>
          {message ? <div className="message">{message}</div> : ""}
          <div className="formInput">
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <br />
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <input
            type="submit"
            value="login"
            className="submitButton"
            onClick={login}
          />
          <Link to="/signup">if you don't have an account, register now</Link>
        </div>
      ) : (
        <h1>
          You are already logged in, go to your <Link to="/">todos</Link>
        </h1>
      )}
    </div>
  );
};

export default Login;
