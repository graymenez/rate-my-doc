import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../src/styles/Hospital.css";
import getHospital from "./helpers/Hospital";
import HospitalDetails from "./HospitalDetails";

const Hospital = () => {
  const [currHospital, setCurrentHospital] = useState(false);
  const [rating, setRating] = useState();
  const [ratingIsLoaded, setRatingIsLoaded] = useState(false);
  const { name } = useParams();
  // Gets Hospital first_name from parameter. makes api call to get Hospital
  useEffect(() => {
    getHospital(setCurrentHospital, setRating, setRatingIsLoaded, name);
  }, []);
  return (
    <>
      <HospitalDetails
        currHospital={currHospital}
        rating={rating}
        ratingIsLoaded={ratingIsLoaded}
      />
    </>
  );
};
export default Hospital;
