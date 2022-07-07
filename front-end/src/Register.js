import { improve } from "@cloudinary/url-gen/actions/adjust";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RmdApi from "./api";
import "./styles/Register.css";

// Register form for users
const Register = () => {
  const loggedInUser = localStorage.getItem("_token");
  const navigate = useNavigate();
  const INITIAL_STATE = {
    username: "",
    email: "",
    password: "",
  };
  useEffect(() => {
    if (loggedInUser) {
      window.location.reload(navigate("/"));
    }
  }, []);

  const [formData, setFormData] = useState(INITIAL_STATE);
  async function register(username, password, email) {
    try {
      const res = await RmdApi.registerUser(username, password, email);
      localStorage.setItem("_token", res.token);
      localStorage.setItem("lU-id", res.loggedInUser);
      window.location.reload(navigate("/"));
    } catch (e) {
      if (e[0] === "Username already exists") {
        document.querySelector(".username").classList.add("error");
      }
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((data) => ({
      ...data,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    register(formData.username, formData.password, formData.email);
  };

  return (
    <div>
      <div className="container">
        <div className="register-form-container">
          <form onSubmit={handleSubmit} className="Register">
            <h1 className="form-heading">Join Us!</h1>
            <div className="input-container">
              <div className="username">
                <label className="form-label">Username</label>
                <input
                  className="input-register username"
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
              <label className="form-label">Email</label>
              <input
                className="input-register"
                type="email"
                name="email"
                placeholder="Email"
                onChange={handleChange}
                value={formData.email}
                required
              />
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
              Already have an account?{" "}
              <a className="question-link" href="/login">
                Login
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Register;
