import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

import "../src/styles/NavBar.css";
import image from "../src/images/924edeef395d45c783f88b906cb70bb7.ico";
import userHelper from "./helpers/userHelper";

const NavBar = () => {
  const user = localStorage.getItem("_token");
  const navigate = useNavigate();
  // Renders nav bar
  return (
    <header id="NavContainer" className="NavContainer container">
      <div className="NavBarLogo">
        <img className="logo" src={image} />
      </div>
      {user ? (
        <nav id="Nav" className="Nav ">
          <ul className="Nav-links">
            <li>
              <NavLink className="nav-link" to="/physicians">
                Physicians
              </NavLink>
            </li>
            <li>
              <NavLink className="nav-link" to="/hospitals">
                Hospitals
              </NavLink>
            </li>
            <li>
              <NavLink className="nav-link" to="/profile">
                Profile Settings
              </NavLink>
            </li>
            <li>
              <NavLink
                className="nav-link"
                to="/login"
                onClick={() => userHelper.logout(navigate("physicians"))}
              >
                Logout
              </NavLink>
            </li>
          </ul>
        </nav>
      ) : (
        <nav id="Nav" className="Nav">
          <ul className="Nav-links">
            <li>
              <NavLink className="nav-link" to="/">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink className="nav-link" to="/physicians">
                Physicians
              </NavLink>
            </li>
            <li>
              <NavLink className="nav-link" to="/hospitals">
                Hospitals
              </NavLink>
            </li>
            <li>
              <NavLink className="nav-link" to="/register">
                Sign Up
              </NavLink>
            </li>
            <li>
              <NavLink className="nav-link" to="/login">
                Login
              </NavLink>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default NavBar;
