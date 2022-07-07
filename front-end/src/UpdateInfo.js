import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/UpdateInfo.css";
import userHelper from "./helpers/userHelper";
import RmdApi from "./api";
import ProfileImage from "./ProfileImage";

// Renders a form to allow users to update their profile data, requires auth to change password

const UpdateInfo = ({ show }) => {
  const CONFIRM_INITIAL_STATE = {
    password: "",
  };
  const INITIAL_STATE = {
    first_name: "",
    last_name: "",
    password: "",
  };
  const currentUserToken = localStorage.getItem("_token");
  const [currUser, setCurrUser] = useState({});
  const navigate = useNavigate();
  const [confirmPasswordData, setConfirmPasswordData] = useState(
    CONFIRM_INITIAL_STATE
  );
  const [formData, setFormData] = useState(INITIAL_STATE);
  console.log(currUser);
  useEffect(() => {
    if (!currentUserToken) {
      window.location.reload(navigate("/physicians"));
    } else {
      userHelper.getUser(setCurrUser, localStorage.getItem("lU-id"));
    }
  }, []);

  async function handleSubmit(e) {
    try {
      e.preventDefault();
      let res = await RmdApi.authenticateUser(
        currUser.username,
        confirmPasswordData.password
      );
      if (res.token) {
        await RmdApi.updateUser(
          localStorage.getItem("lU-id"),
          formData.first_name !== ""
            ? formData.first_name
            : currUser.first_name,
          formData.last_name !== "" ? formData.last_name : currUser.last_name,
          formData.password !== ""
            ? formData.password
            : confirmPasswordData.password
        );
        setFormData(INITIAL_STATE);
        window.location.reload(false);
      }
    } catch (e) {
      console.log(e);
      return e;
    }
  }
  console.log(currUser);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((data) => ({
      ...data,
      [name]: value,
    }));
  };

  const handlePasswordConfirmChange = (e) => {
    const { name, value } = e.target;
    setConfirmPasswordData((data) => ({
      ...data,
      [name]: value,
    }));
  };

  return (
    <div className="ProfileUpdateInfoForm-container">
      <div className="ProfileForm-section">
        <form onSubmit={handleSubmit} className="ProfileUpdateInfoForm">
          <h1 className="form-title">Update Personal Info</h1>
          <input value={currUser.username || ""} disabled />
          <input value={currUser.email || ""} disabled />

          <input
            id="first_name"
            name="first_name"
            type="text"
            placeholder="Update first name"
            onChange={handleChange}
            value={formData.first_name}
          />

          <input
            id="last_name"
            name="last_name"
            type="text"
            placeholder="Update last name"
            onChange={handleChange}
            value={formData.last_name}
          />

          <input
            id="passwordFirstAttempt"
            name="password"
            type="text"
            placeholder="Update Password"
            onChange={handleChange}
            value={formData.password}
          />
          <input
            id="password"
            type="text"
            name="password"
            placeholder="Confirm Current Password"
            onChange={handlePasswordConfirmChange}
            value={confirmPasswordData.password}
          />
          <button>Make Changes</button>
        </form>
        <div className="current-information">
          <h3 className="current-information-title">Your profile details</h3>
          <ul className="info-list">
            <li>
              <p className="detail-title">Username:</p>
              <p className="user-detail">{currUser.username}</p>
            </li>
            <li>
              <p className="detail-title">Email:</p>
              <p className="user-detail">{currUser.email}</p>{" "}
            </li>
            <li>
              <p className="detail-title">First name:</p>
              {currUser.first_name === "" || currUser.first_name === null ? (
                <p className="user-detail-empty">
                  Please update &mdash;
                  <ion-icon
                    class="informationlist-warning-icon"
                    name="warning-outline"
                  ></ion-icon>
                </p>
              ) : (
                <p className="user-detail">{currUser.first_name}</p>
              )}
            </li>
            <li>
              <p className="detail-title">Last name</p>
              {currUser.last_name === "" || currUser.last_name === null ? (
                <p className="user-detail-empty">
                  Please update &mdash;
                  <ion-icon
                    class="informationlist-warning-icon"
                    name="warning-outline"
                  ></ion-icon>
                </p>
              ) : (
                <p className="user-detail">{currUser.last_name}</p>
              )}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
export default UpdateInfo;
