import starRatingFunctions from "../helpers/starRatingFunctions";
import fullStar from "../images/star_rating_full.ico";
import emptyStar from "../images/star_rating_empty.ico";

//tests star rating helper functions in the ./helpers/starRatingFunctions.js file

test("test pushStarEl to push full star ico", () => {
  expect(starRatingFunctions.pushStarEl([], 5)).toStrictEqual([
    <img src={fullStar} />,
    <img src={fullStar} />,
    <img src={fullStar} />,
    <img src={fullStar} />,
    <img src={fullStar} />,
  ]);
});
test("test pushEmptyStarEl to push empty star ico", () => {
  let maxNumRating = 5;
  function pushEmptyStarEl(arr) {
    let num = maxNumRating - arr.length;
    for (let i = 0; i < num; i++) {
      arr.push(<img src={emptyStar} />);
    }
    return arr;
  }

  expect(
    pushEmptyStarEl([
      <img src={fullStar} />,
      <img src={fullStar} />,
      <img src={fullStar} />,
    ])
  ).toStrictEqual([
    <img src={fullStar} />,
    <img src={fullStar} />,
    <img src={fullStar} />,
    <img src={emptyStar} />,
    <img src={emptyStar} />,
  ]);
});
test("test countDown function", () => {
  let starClassCountDown = [];
  let radioClassCountDown = [];
  function countDown(radioId, imgId) {
    for (let n = Number(imgId.slice(-1)); n >= 1; n--) {
      starClassCountDown.push(`${imgId.slice(0, -1)}${n}`);
    }
    for (let n = Number(radioId.slice(-1)); n >= 1; n--) {
      radioClassCountDown.push(`${radioId.slice(0, -1)}${n}`);
    }
  }
  countDown("testRadioId4", "testImgId4");
  expect(starClassCountDown).toEqual([
    "testImgId4",
    "testImgId3",
    "testImgId2",
    "testImgId1",
  ]);
  expect(radioClassCountDown).toEqual([
    "testRadioId4",
    "testRadioId3",
    "testRadioId2",
    "testRadioId1",
  ]);
});
test("test countDown function", () => {
  let starClassCountUp = [];
  let radioClassCountUp = [];
  function countUp(radioId, imgId) {
    for (let n = Number(imgId.slice(-1)) + 1; n <= 5; n++) {
      starClassCountUp.push(`${imgId.slice(0, -1)}${n}`);
    }
    for (let n = Number(radioId.slice(-1)) + 1; n <= 5; n++) {
      radioClassCountUp.push(`${radioId.slice(0, -1)}${n}`);
    }
  }
  countUp("testRadioId1", "testImgId1");
  expect(starClassCountUp).toEqual([
    "testImgId2",
    "testImgId3",
    "testImgId4",
    "testImgId5",
  ]);
  expect(radioClassCountUp).toEqual([
    "testRadioId2",
    "testRadioId3",
    "testRadioId4",
    "testRadioId5",
  ]);
});
