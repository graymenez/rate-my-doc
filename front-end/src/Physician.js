import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../src/styles/Physician.css";
import getPhysician from "./helpers/Physician";
import PhysicianDetails from "./PhysicianDetails";

const Physician = () => {
  const [currPhysician, setCurrentPhysician] = useState(false);
  const [rating, setRating] = useState();
  const [ratingIsLoaded, setRatingIsLoaded] = useState(false);
  const { name } = useParams();
  // Gets Physician by first_name from parameter. makes api call to get Physician
  useEffect(() => {
    getPhysician(setCurrentPhysician, setRating, setRatingIsLoaded, name);
  }, []);
  return (
    <>
      <PhysicianDetails
        currPhysician={currPhysician}
        rating={rating}
        ratingIsLoaded={ratingIsLoaded}
      />
    </>
  );
};
export default Physician;
