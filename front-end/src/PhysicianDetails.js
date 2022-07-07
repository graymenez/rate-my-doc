import React from "react";
import StarRating from "./StarRating";
import { useNavigate } from "react-router-dom";
import RatingForm from "./RatingForm";
import Comments from "./Comments";
const PhysicianDetails = ({ currPhysician, rating, ratingIsLoaded }) => {
  const navigate = useNavigate();
  // Accepts props and displays all Physicians details on individual page

  const {
    id,
    image_url,
    first_name,
    located,
    phone,
    specialty,
    street_name,
    bio,
  } = currPhysician;
  const openRateBox = () => {
    let e = document.querySelector(".form");
    e.classList.add("open");
  };
  return (
    <div className="Physician">
      <div id="fade-out" className="Physician-detail container">
        <div className="sub-nav">
          <a className="back-btn" href="#" onClick={() => navigate(-1)}>
            <ion-icon className="icon" name="return-up-back-outline"></ion-icon>
          </a>
        </div>
        <div className="Physician-info">
          <h1 className="info-name">{first_name}</h1>
          <p className="info-location">{located}</p>
          <p className="info-phone">{phone}</p>

          <p className="info-specialty">{specialty}</p>
          <p className="info-address">{street_name}</p>
          <p className="info-website">{bio}</p>
          {localStorage.getItem("_token") ? (
            <a className="rate-btn" onClick={openRateBox}>
              Rate
            </a>
          ) : (
            <a className="rate-btn-inactive" href="/login">
              Login to rate
            </a>
          )}
        </div>
        <div id="commentSection" className="commentSection">
          <p className="reviews">
            Reviews({ratingIsLoaded ? rating.allRatings.length : null})
          </p>
          <p className="ratings">
            Rating:{ratingIsLoaded ? rating.totalRating : null}
            /5
          </p>
          <div className="stars">
            {<StarRating starCount={ratingIsLoaded ? rating.totalRating : 0} />}
            <div id="PhysicianCommentSectionLineBreak"></div>
          </div>
        </div>
        <div className="comments">
          <Comments currData={currPhysician} commentsFor="physician" />
        </div>
      </div>
      <RatingForm
        currData={currPhysician}
        formFor="physician"
        commentsFor="hysician"
      />
    </div>
  );
};
export default PhysicianDetails;
