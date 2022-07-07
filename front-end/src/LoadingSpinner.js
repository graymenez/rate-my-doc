import React from "react";
import "../src/styles/LoadingSpinner.css";

const LoadSpinner = () => {
  // Renders a loading spinner
  return (
    <>
      <div id="LoadingSpinnerContainer">
        <div id="LoadingSpinner"></div>
      </div>
      <p className="LoadingSpinnerText">Loading Data..</p>
    </>
  );
};
export default LoadSpinner;
