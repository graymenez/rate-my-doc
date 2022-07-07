import React, { useState } from "react";
import emptyStar from "../src/images/star_rating_empty.ico";
import fullStar from "../src/images/star_rating_full.ico";
import RmdApi from "./api";
import "./styles/RatingForm.css";
const RatingForm = ({ currData, formFor }) => {
  const loggedInUserId = localStorage.getItem("lU-id");
  const INITIAL_STATE = {
    commentReview: "",
  };
  const [isChecked, setIsChecked] = useState(false);
  const [formData, setFormData] = useState(INITIAL_STATE);
  const [points, setPoints] = useState(0);
  const [isError, setIsError] = useState(null);
  const [errMsg, setErrMsg] = useState(null);
  function checkStarRadio(radioId, imgId) {
    let starClassCountDown = [];
    let radioClassCountDown = [];
    let starClassCountUp = [];
    let radioClassCountUp = [];
    //finds all radio buttons and stars behind the most up-front clicked radio button and clicked star and pushes to array

    function countDown() {
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
    function countUp() {
      for (let n = Number(imgId.slice(-1)) + 1; n <= 5; n++) {
        starClassCountUp.push(`${imgId.slice(0, -1)}${n}`);
      }
      for (let n = Number(radioId.slice(-1)) + 1; n <= 5; n++) {
        radioClassCountUp.push(`${radioId.slice(0, -1)}${n}`);
      }
    }
    countUp();
    countDown();
    // checks if radio is checked, if not counts down from the current clicked radio and star then checks all radios behind it and adds -checked to star rating class
    function checkIfChecked() {
      if (!isChecked) {
        starClassCountDown.map(
          (s) => (document.getElementById(s).className = `${s}-checked`)
        );
        radioClassCountDown.map((r) =>
          document.getElementById(r).setAttribute("checked", true)
        );
        setIsChecked(true);
      } else {
        starClassCountUp.map(
          (s) => (document.getElementById(s).className = `${s}`)
        );
        radioClassCountUp.map((r) =>
          document.getElementById(r).setAttribute("checked", false)
        );
        setIsChecked(false);
      }
    }
    checkIfChecked();
    //sets points to the length of the array, each item is 1 point
    setPoints(starClassCountDown.length);
  }
  //iterates through arr and sets src attribute to full star img
  function checkStars(arr) {
    arr.map((c) => document.getElementById(c).setAttribute("src", fullStar));
  }
  //iterates through arr and sets src attribure to empty star img
  function uncheckStars(arr) {
    arr.map((c) => document.getElementById(c).setAttribute("src", emptyStar));
  }
  //on click closes the rating form box
  const closeRateBox = () => {
    let e = document.querySelector(".form");
    e.classList.remove("open");
  };
  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormData(INITIAL_STATE);
    // Gets star rating and comment review then saves it to database
    const saveReview = async () => {
      try {
        if (points !== 0) {
          if (formFor === "physician") {
            let res = await RmdApi.updatePhysicianRatings(
              loggedInUserId,
              currData.id,
              formData.commentReview,
              points
            );
          } else if (formFor === "hospital") {
            let res = await RmdApi.updateHospitalRatings(
              loggedInUserId,
              currData.id,
              formData.commentReview,
              points
            );
          }

          // Reloads page to see results
          window.location.reload(false);
        } else {
          throw new Error("points === 0. rating must be > than 0");
        }
      } catch (e) {
        if (e.message === "points === 0. rating must be > than 0") {
          setIsError("No info");
          setErrMsg("Please select atleast one star rating");
          console.error(e);
        }
        if (e[0] === "Unauthorized User") {
          setIsError(e[0]);
          setErrMsg("Must be logged In to do that");
          console.error(e);
        }
      }
    };

    saveReview();
    return true;
  };
  // HSandles form change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((data) => ({
      ...data,
      [name]: value,
    }));
  };

  return (
    <div id="RatingForm" className="RatingForm">
      <div className="form">
        <div className="form-container">
          <form
            onSubmit={handleSubmit}
            id="RatingForm-close"
            className={`RatingForm-close`}
          >
            <a onClick={closeRateBox} className="closeRatingFormBtn">
              &#10006;
            </a>
            <div className="question-container">
              <h3 className="form-title">
                How was your experience with{" "}
                {formFor === "physician" ? currData.first_name : null}
                {formFor === "hospital" ? currData.name : null}?
              </h3>
              <fieldset className={`RatingFormFieldset`}>
                <input
                  id="RatingFormRadio1"
                  type="radio"
                  name="star1"
                  className="RatingFormRadio1"
                  value={1}
                />
                <img
                  id="RatingFormStar1"
                  className="RatingFormStar1"
                  src={emptyStar}
                  onClick={() =>
                    checkStarRadio("RatingFormRadio1", "RatingFormStar1")
                  }
                  onMouseOver={() => checkStars(["RatingFormStar1"])}
                  onMouseLeave={() =>
                    uncheckStars([
                      "RatingFormStar1",
                      "RatingFormStar2",
                      "RatingFormStar3",
                      "RatingFormStar4",
                      "RatingFormStar5",
                    ])
                  }
                />
                <input
                  id="RatingFormRadio2"
                  type="radio"
                  name="star2"
                  className="RatingFormRadio2"
                  value={1}
                />
                <img
                  id="RatingFormStar2"
                  className="RatingFormStar2"
                  src={emptyStar}
                  onClick={() =>
                    checkStarRadio("RatingFormRadio2", "RatingFormStar2")
                  }
                  onMouseOver={() =>
                    checkStars(["RatingFormStar1", "RatingFormStar2"])
                  }
                  onMouseLeave={() =>
                    uncheckStars([
                      "RatingFormStar1",
                      "RatingFormStar2",
                      "RatingFormStar3",
                      "RatingFormStar4",
                      "RatingFormStar5",
                    ])
                  }
                />
                <input
                  id="RatingFormRadio3"
                  type="radio"
                  name="star3"
                  className="RatingFormRadio3"
                  value={1}
                />
                <img
                  id="RatingFormStar3"
                  className="RatingFormStar3"
                  src={emptyStar}
                  onClick={() =>
                    checkStarRadio("RatingFormRadio3", "RatingFormStar3")
                  }
                  onMouseOver={() =>
                    checkStars([
                      "RatingFormStar1",
                      "RatingFormStar2",
                      "RatingFormStar3",
                    ])
                  }
                  onMouseLeave={() =>
                    uncheckStars([
                      "RatingFormStar1",
                      "RatingFormStar2",
                      "RatingFormStar3",
                      "RatingFormStar4",
                      "RatingFormStar5",
                    ])
                  }
                />
                <input
                  id="RatingFormRadio4"
                  type="radio"
                  name="star4"
                  className="RatingFormRadio4"
                  value={1}
                />
                <img
                  id="RatingFormStar4"
                  className="RatingFormStar4"
                  src={emptyStar}
                  onClick={() =>
                    checkStarRadio("RatingFormRadio4", "RatingFormStar4")
                  }
                  onMouseOver={() =>
                    checkStars([
                      "RatingFormStar1",
                      "RatingFormStar2",
                      "RatingFormStar3",
                      "RatingFormStar4",
                    ])
                  }
                  onMouseLeave={() =>
                    uncheckStars([
                      "RatingFormStar1",
                      "RatingFormStar2",
                      "RatingFormStar3",
                      "RatingFormStar4",
                      "RatingFormStar5",
                    ])
                  }
                />
                <input
                  id="RatingFormRadio5"
                  type="radio"
                  name="star5"
                  className="RatingFormRadio5"
                  value={1}
                />
                <img
                  id="RatingFormStar5"
                  className="RatingFormStar5"
                  src={emptyStar}
                  onClick={() =>
                    checkStarRadio("RatingFormRadio5", "RatingFormStar5")
                  }
                  onMouseOver={() =>
                    checkStars([
                      "RatingFormStar1",
                      "RatingFormStar2",
                      "RatingFormStar3",
                      "RatingFormStar4",
                      "RatingFormStar5",
                    ])
                  }
                  onMouseLeave={() =>
                    uncheckStars([
                      "RatingFormStar1",
                      "RatingFormStar2",
                      "RatingFormStar3",
                      "RatingFormStar4",
                      "RatingFormStar5",
                    ])
                  }
                />
              </fieldset>
            </div>
            <div className="text-section">
              {isError === "Unauthorized User" ? (
                <div className="RatingFormError">{errMsg}</div>
              ) : isError === "No info" ? (
                <div className="RatingFormError">{errMsg}</div>
              ) : null}
              <div className="RatingFormTextAreaContainer">
                <textarea
                  onChange={handleChange}
                  name="commentReview"
                  rows={5}
                  id="RatingFormTextArea"
                  className="RatingFormTextArea"
                  value={formData.commentReview}
                />
              </div>
              <button className="sub-btn" type="submit">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default RatingForm;
