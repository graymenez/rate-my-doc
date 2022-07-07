import fullStar from "../images/star_rating_full.ico";
import emptyStar from "../images/star_rating_empty.ico";
import { v4 as uuidv4 } from "uuid";
const maxNumRating = 5;

function pushStarEl(arr, num) {
  if (num > 5) {
    console.error("Star Ratings Cannot be larger than 5");
  } else {
    for (let i = 0; i < num; i++) {
      arr.push(<img key={uuidv4()} src={fullStar} />);
    }
  }
  return arr;
}
function pushEmptyStarEl(arr) {
  let num = maxNumRating - arr.length;
  for (let i = 0; i < num; i++) {
    arr.push(<img key={uuidv4()} src={emptyStar} />);
  }
  return arr;
}

let starClassCountDown = [];
let radioClassCountDown = [];
let starClassCountUp = [];
let radioClassCountUp = [];

//finds all radio buttons and stars behind the most up-front clicked radio button and clicked star and pushes to array

function countDown(radioId, imgId) {
  // gets last character of imgId which is a sequenced number from 1 to 5 to determine between stars. Counts down then pushes

  for (let n = Number(imgId.slice(-1)); n >= 1; n--) {
    starClassCountDown.push(`${imgId.slice(0, -1)}${n}`);
  }
  // gets last character of radioId which is a sequenced number from 1 to 5 to determine between radio buttons. Counts down then pushes
  for (let n = Number(radioId.slice(-1)); n >= 1; n--) {
    radioClassCountDown.push(`${radioId.slice(0, -1)}${n}`);
  }
}

// does the same thing as "countDown" expect it counts up from the most up-front clicked radio and clicked star

function countUp(radioId, imgId) {
  for (let n = Number(imgId.slice(-1)) + 1; n <= 5; n++) {
    starClassCountUp.push(`${imgId.slice(0, -1)}${n}`);
  }
  for (let n = Number(radioId.slice(-1)) + 1; n <= 5; n++) {
    radioClassCountUp.push(`${radioId.slice(0, -1)}${n}`);
  }
}

export default {
  pushStarEl,
  pushEmptyStarEl,
  countDown,
  countUp,
};
