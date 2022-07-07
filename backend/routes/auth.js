const express = require("express");
const router = new express.Router();
const User = require("../models/user");
const jsonschema = require("jsonschema");
const registerSchema = require("../schemas/registerSchema.json");
const { ensureLoggedIn, ensureAdminLoggedIn } = require("../middleware/auth");
const { BadRequestError } = require("../expressError");

router.get("/", (req, res, next) => {
  res.send("App working");
});

router.post("/register", async (req, res, next) => {
  try {
    const schemaResult = jsonschema.validate(req.body, registerSchema);
    console.log(schemaResult.valid);
    if (schemaResult.valid) {
      const { username, password, email } = req.body;
      let result = await User.register(username, password, email);
      return res.json(result);
    }
    const errors = schemaResult.errors.map((e) => e.stack);
    let e = new BadRequestError(schemaResult.errors);
    throw e;
  } catch (e) {
    return next(e);
  }
});
router.post("/login", async (req, res, next) => {
  try {
    const authorization = req.headers.authorization;
    console.log(authorization);
    const { username, password } = req.body;
    const results = await User.authenticate(username, password);
    return res.json(results);
  } catch (e) {
    return next(e);
  }
});

router.get("/secret", ensureLoggedIn, (req, res, next) => {
  try {
    return res.json({ message: "yessss", payload: req.locals });
  } catch (e) {
    next(e);
  }
});
router.get("/big-secret", ensureAdminLoggedIn, (req, res, next) => {
  try {
    return res.json({ message: "yessss", payload: req.locals });
  } catch (e) {
    next(e);
  }
});
module.exports = router;
