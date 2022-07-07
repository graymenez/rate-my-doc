import React from "react";
import starRatingFunctions from "./helpers/starRatingFunctions";
// Creates a number amount of stars depending of starCount prop
const StarRating = ({ starCount }) => {
  let numFullStars = [];
  starRatingFunctions.pushStarEl(numFullStars, starCount);
  starRatingFunctions.pushEmptyStarEl(numFullStars);
  return <>{numFullStars.map((e) => e)}</>;
};
export default StarRating;
