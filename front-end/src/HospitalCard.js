import React from "react";
import { NavLink } from "react-router-dom";
import "../src/styles/HospitalCard.css";
import StarRating from "./StarRating";

const HospitalsCard = ({ hospitals_details }) => {
  // Takes hospitals_details prop and renders details of a hospitals. if the value is null then render null

  return (
    <div className="HospitalsCard">
      <section className="details">
        <div className="card-heading">
          <h3 className="name">
            {hospitals_details.name ? hospitals_details.name : null}
          </h3>
          <p className="specialty">{hospitals_details.service_type}</p>
          <div className="rating">
            <StarRating
              starCount={
                hospitals_details.rating ? hospitals_details.rating : 0
              }
            />
          </div>
        </div>
      </section>
      <section className="card-footer">
        <NavLink
          className="hospital-card-link"
          to={`/hospitals/${hospitals_details.name}`}
        >
          View Hospital
        </NavLink>
      </section>
    </div>
  );
};
export default HospitalsCard;
