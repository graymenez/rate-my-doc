import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RmdApi from "./api";
import "./styles/Login.css";

const Login = () => {
  const navigate = useNavigate();
  const loggedInUser = localStorage.getItem("_token");
  const INITIAL_STATE = {
    username: "",
    password: "",
  };
  const [formData, setFormData] = useState(INITIAL_STATE);
  useEffect(() => {
    if (loggedInUser) {
      window.location.reload(navigate("/"));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((data) => ({
      ...data,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let result = await RmdApi.authenticateUser(
        formData.username,
        formData.password
      );
      localStorage.setItem("lU-id", result.loggedInUser);
      localStorage.setItem("_token", result.token);
      navigate("/");
    } catch (e) {
      if (e) {
        document
          .querySelector(".username")
          .classList.add("error-invalid-creds");
        document.querySelector(".e-call").classList.add("error");

        console.error(e);
      }
    }
  };
  return (
    <div>
      <div className="container">
        <div className="register-form-container">
          <form onSubmit={handleSubmit} className="Register">
            <h1 className="form-heading">Login</h1>
            <div className="input-container">
              <div className="username">
                <label className="form-label">Username</label>
                <input
                  className="input-register e-call"
                  type="text"
                  name="username"
                  placeholder="Username"
                  onChange={handleChange}
                  value={formData.username}
                  required
                />
              </div>
            </div>

            <div className="input-container">
              <label className="form-label">Password</label>
              <input
                className="input-register"
                type="password"
                name="password"
                placeholder="*Required"
                onChange={handleChange}
                value={formData.password}
                required
              />{" "}
            </div>
            <button className="register-btn">Register</button>
            <p className="question">
              Dont have an account?{" "}
              <a className="question-link" href="/register">
                Register
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
