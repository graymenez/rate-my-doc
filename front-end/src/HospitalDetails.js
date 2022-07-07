import React from "react";
import StarRating from "./StarRating";
import { useNavigate } from "react-router-dom";
import RatingForm from "./RatingForm";
import Comments from "./Comments";
const HospitalDetails = ({ currHospital, rating, ratingIsLoaded }) => {
  const navigate = useNavigate();
  // Accepts props and displays all Hospitals details on individual page

  const {
    id,
    name,
    city,
    service_type,
    address,
    fax,
    phone,
    hospital_website,
  } = currHospital;
  const openRateBox = () => {
    let e = document.querySelector(".form");
    e.classList.add("open");
  };
  return (
    <div className="Hospital">
      <div id="fade-out" className="Hospital-detail container">
        <div className="sub-nav">
          <a className="back-btn" href="#" onClick={() => navigate(-1)}>
            <ion-icon className="icon" name="return-up-back-outline"></ion-icon>
          </a>
        </div>
        <div className="hospital-info">
          <h1 className="info-name">{name}</h1>
          <p className="info-location">{city}</p>
          <p className="info-phone">{phone}</p>
          <p className="info-fax">F{fax}</p>

          <p className="info-specialty">{service_type}</p>
          <p className="info-address">{address}</p>
          <p className="info-website">{hospital_website}</p>

          <a className="rate-btn" onClick={openRateBox}>
            Rate
          </a>
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
            <div id="HospitalCommentSectionLineBreak"></div>
          </div>
        </div>
        <div className="comments">
          <Comments currData={currHospital} commentsFor="hospital" />
        </div>
      </div>
      <RatingForm
        currData={currHospital}
        formFor="hospital"
        commentsFor="hospital"
      />
    </div>
  );
};
export default HospitalDetails;
