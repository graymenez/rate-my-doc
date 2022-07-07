import React from "react";
import { NavLink } from "react-router-dom";
import "../src/styles/PhysicianCard.css";
import img from "../src/images/profile-icon-png-913.png";
import StarRating from "./StarRating";

const PhysicianCard = ({ physician_details }) => {
  // Takes physician_details prop and renders details of a physician. if the value is null then render null

  return (
    <div className="PhysicianCard">
      <img
        className="image"
        src={physician_details.image_url ? physician_details.image_url : img}
      />

      <section className="details">
        <div className="card-heading">
          <h3 className="name">
            {physician_details.first_name}{" "}
            {physician_details.last_name ? physician_details.last_name : null}
          </h3>
          <p className="specialty">{physician_details.specialty}</p>
          <div className="rating">
            <div className="stars">
              <StarRating starCount={physician_details.rating} />
            </div>
          </div>
        </div>
      </section>
      <section className="card-footer">
        <NavLink
          className="physician-card-link"
          to={`/physicians/${physician_details.first_name}`}
        >
          View Physician
        </NavLink>
      </section>
    </div>
  );
};
export default PhysicianCard;
