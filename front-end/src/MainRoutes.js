import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./NavBar";
import Physician from "./Physician";
import Physicians from "./Physicians";
import Hospitals from "./Hospitals";
import Hospital from "./Hospital";
import Register from "./Register";
import Profile from "./Profile";
import Home from "./Home";
import PageNotFound from "./PageNotFound";
import Login from "./Login";
const MainRoutes = () => {
  // All routes

  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/physicians" element={<Physicians />} />
        <Route path="/physicians/:name" element={<Physician />} />
        <Route path="/hospitals" element={<Hospitals />} />
        <Route path="/hospitals/:name" element={<Hospital />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
};
export default MainRoutes;
