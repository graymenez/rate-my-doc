import React, { useEffect, useState } from "react";
import "./styles/Profile.css";
import UpdateInfo from "./UpdateInfo";
import img from "./images/profile-icon-png-913.png";
import ProfileImage from "./ProfileImage";
import RmdApi from "./api";
import Gallery from "./Gallery";
import toggler from "./helpers/ProfileToggleHandler";
const Profile = () => {
  const [toggleUpdateInfo, setToggleUpdateInfo] = useState("-show");
  const [toggleImageEdit, setToggleImageEdit] = useState("-hide");
  const [toggleGallery, setToggleGallery] = useState("-hide");

  const [profileImage, setProfileImage] = useState();
  const [imageLoading, setImageLoading] = useState(false);
  useEffect(() => {
    const getUser = async () => {
      let res = await RmdApi.getUserById(localStorage.getItem("lU-id"));
      setProfileImage(res.image_url);
      setImageLoading(true);
    };
    getUser();
  }, []);
  // Renders all setting buttons and sets an onlcick event to toggle through setting pages
  return (
    <>
      <div className="ProfileSideBarContainer container">
        <div className="sideBar">
          <img
            className="ProfileImage"
            src={profileImage ? profileImage : img}
          />
          <div className="sideBarContainer">
            <ul className="ProfileSideBar">
              <li>Update Info</li>
              <li>Photo Gallery</li>
              <li>Add or Update Profile Picture</li>
              <li>Deleting Account</li>
            </ul>
          </div>
        </div>
        <div className="right-side">
          <div className="top-bar-disclaimer">
            <h3 className="disclaimer-word">Disclaimer</h3>
            <div className="disclaimer-content">
              <p>
                Deleting your account is{" "}
                <spam className="important-words">permanant</spam> and you will
                no longer have access to your account.
              </p>
              <p>
                This information is sensitive. Your name and email is{" "}
                <span className="important-words">unchanable</span>.
              </p>
              <p>
                You are free to delete your account and create a new one{" "}
                <a href="/register">here</a> if you have made a mistake.
              </p>
              <p>
                <span className="important-words">Pause:</span> Your data will
                be erased along with your account. You will no longer have
                access to it.
              </p>
              <ion-icon
                class="disclaimer-icon"
                name="alert-circle-outline"
              ></ion-icon>
              <ion-icon class="disclaimer-icon" name="key-outline"></ion-icon>
              <ion-icon
                class="disclaimer-icon"
                name="reader-outline"
              ></ion-icon>
              <ion-icon class="disclaimer-icon" name="pause-outline"></ion-icon>
            </div>
          </div>
          <div className="Profile">
            <UpdateInfo show={toggleUpdateInfo} />

            <Gallery show={toggleGallery} />
          </div>
        </div>
        <div className="add-photo-container">
          <ProfileImage />
        </div>
      </div>
    </>
  );
};
export default Profile;
