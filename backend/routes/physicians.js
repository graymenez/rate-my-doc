const express = require("express");
const { ensureLoggedIn } = require("../middleware/auth");
const Physician = require("../models/physician");
const router = new express.Router();

router.get("/", async function (req, res, next) {
  const q = req.query;
  const physicians = await Physician.getAllPhysicians(q);
  return res.json({ physicians });
});
router.get("/:name", async function (req, res, next) {
  const physician = await Physician.getPhysicianByName(req.params.name);
  const physicianHostpital = await Physician.getPhysiciansHospital(
    physician.rows[0].located,
    physician.rows[0].first_name
  );
  return res.json({ physician, physicianHostpital });
});
router.get("/ratings/:id", async function (req, res, next) {
  const physicianRatings = await Physician.getRatings(req.params.id);
  return res.json({ physicianRatings });
});
router.post("/ratings", ensureLoggedIn, async function (req, res, next) {
  const { user_id, physician_id, reviewVal, newRating } = req.body;
  const physicianRatings = await Physician.updatePhysicianRating(
    user_id,
    physician_id,
    reviewVal,
    newRating
  );
  return res.json({ physicianRatings });
});

module.exports = router;
