const express = require("express");
const { ensureLoggedIn } = require("../middleware/auth");
const router = new express.Router();
const Review = require("../models/review");

router.get("/physician/:physician_id", async function (req, res, next) {
  const results = await Review.getAllPhysicianReviews(req.params.physician_id);
  return res.json({ results });
});
router.get("/hospital/:id", async function (req, res, next) {
  const results = await Review.getAllHospitalReviews(req.params.id);
  return res.json({ results });
});
router.post("/new", ensureLoggedIn, async function (req, res, next) {
  const { user_id, curr_id, value, createFor } = req.body;
  const newReview = await Review.createReview(
    user_id,
    curr_id,
    value,
    createFor
  );
  return res.json({ newReview });
});
// router.get("/rating/physician/:id", async function (req, res, next) {
//   let results = await Review.getReviewsAndRatingsP(req.params.id);
//   return res.json({ results });
// });
// router.get("/rating/hospital/:id", async function (req, res, next) {
//   let results = await Review.getReviewsAndRatingsH(req.params.id);
//   return res.json({ results });
// });
module.exports = router;
