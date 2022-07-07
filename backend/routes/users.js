const express = require("express");
const User = require("../models/user");
const router = express.Router();
const { cloudinary } = require("../utils/cloudinary");
const {
  ensureLoggedIn,
  ensureAdminOrLoggedInUser,
} = require("../middleware/auth");
const { NotFoundError, BadRequestError } = require("../expressError");
router.get("/:id", ensureAdminOrLoggedInUser, async (req, res, next) => {
  try {
    const results = await User.getUserById(req.params.id);
    if (!results.rows[0]) {
      throw new NotFoundError("User Not Found");
    }
    return res.json(results.rows[0]);
  } catch (e) {
    next(e);
  }
});
router.patch("/update/:id", ensureLoggedIn, async (req, res, next) => {
  try {
    let { first_name, last_name, image_url, password } = req.body;
    if (!first_name && !last_name && !password && !image_url)
      throw new BadRequestError("No data recieved");
    let user = await User.getUserById(req.params.id);
    if (!user) {
      throw new NotFoundError("User not found");
    }
    let results = await User.updateUser(
      req.params.id,
      first_name,
      last_name,
      image_url,
      password
    );

    return res.status(201).json(results);
  } catch (e) {
    next(e);
  }
});
router.post("/api/upload/:id", ensureLoggedIn, async (req, res, next) => {
  try {
    const { base64EncodedImage } = req.body;
    const uploadResponse = await cloudinary.uploader.upload(base64EncodedImage);
    const image_url = uploadResponse.url;
    await User.updateUser(req.params.id, null, null, image_url, null);
    await User.addToGallery(req.params.id, image_url);
    return res.json({ msg: "photo uploaded" });
  } catch (e) {
    next(e);
  }
});
module.exports = router;
