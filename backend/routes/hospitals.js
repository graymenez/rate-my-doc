const express = require("express");
const { ensureLoggedIn } = require("../middleware/auth");
const Hospital = require("../models/hospital");
const router = new express.Router();

router.get("/", async function (req, res, next) {
  const q = req.query;
  const hospitals = await Hospital.getAllHospitals(q);
  return res.json({ hospitals });
});

router.get("/:name", async function (req, res, next) {
  const hospital = await Hospital.getHospitalByName(req.params.name);
  return res.json({ hospital });
});
router.get("/ratings/:id", async function (req, res, next) {
  const hospitalRatings = await Hospital.getRatings(req.params.id);
  return res.json({ hospitalRatings });
});
router.post("/ratings", ensureLoggedIn, async function (req, res, next) {
  const { user_id, hospital_id, reviewVal, newRating } = req.body;
  const hospitalRatings = await Hospital.updateHospitalRating(
    user_id,
    hospital_id,
    reviewVal,
    newRating
  );
  return res.json({ hospitalRatings });
});
module.exports = router;
