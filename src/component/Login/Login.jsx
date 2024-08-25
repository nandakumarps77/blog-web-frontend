import "./login.css";
import { useState } from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

const Login = () => {
  const [data, setData] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const onInput = (e, name) => {
    setData({ ...data, [name]: e.target.value });
  };
  const onRegister = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5555/api/log/login",
        data
      );
      console.log("login");
      navigate("/");
      localStorage.setItem("token", response.data.token);
      setData({
        username: "",
        password: "",
      });
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="d-flex flex-column align-items-center p-5 border rounded shadow-sm bg-light">
        <h5 className="mb-4">Login</h5>
        <div className="w-100 mb-3">
          <TextField
            required
            id="outlined-required"
            label="Username"
            defaultValue="Hello World"
            onChange={(e) => onInput(e, 'username')}
            value={data.username}
            fullWidth
          />
        </div>
        <div className="w-100 mb-3">
          <TextField
            id="outlined-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
            onChange={(e) => onInput(e, 'password')}
            value={data.password}
            fullWidth
          />
        </div>
        <button onClick={onRegister} className="btn btn-primary mt-3">
          Log in
        </button>
        <NavLink to="/signup" className="signup mt-2">
          SignUp
        </NavLink>
      </div>
    </div>
    </>
  );
};

export default Login;
