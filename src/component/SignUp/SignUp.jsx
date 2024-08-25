import { useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";

const SignUp = () => {
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const onInput = (e, name) => {
    setData({ ...data, [name]: e.target.value });
  };

  const onRegister = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5555/api/user/createUser",
        data
      );
      console.log("posted successfully");

      setData({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch (e) {
      console.log(e);
    }
  };

  console.log(data);

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="d-flex flex-column align-items-center p-5 border rounded shadow-sm bg-light">
        <h5 className="mb-4">Sign Up</h5>
        <div className="w-100 mb-3">
          <div className="mb-3 w-100">
            <label htmlFor="username" className="form-label">Username</label>
            <input
              type="text"
              id="username"
              className="form-control"
              placeholder="Enter your username"
              onChange={(e) => onInput(e, "username")}
              value={data.username}
            />
          </div>
          <div className="mb-3 w-100">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              id="email"
              className="form-control"
              placeholder="Enter your email"
              onChange={(e) => onInput(e, "email")}
              value={data.email}
            />
          </div>
          <div className="mb-3 w-100">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              id="password"
              className="form-control"
              placeholder="Enter your password"
              onChange={(e) => onInput(e, "password")}
              value={data.password}
            />
          </div>
          <div className="mb-3 w-100">
            <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              className="form-control"
              placeholder="Confirm your password"
              onChange={(e) => onInput(e, "confirmPassword")}
              value={data.confirmPassword}
            />
          </div>
        </div>
        <button onClick={onRegister} className="btn btn-primary mt-3">
          Sign Up
        </button>
        <NavLink to="/login" className="signup btn-link mt-2">
          Login
        </NavLink>
      </div>
    </div>
  );
};

export default SignUp;
