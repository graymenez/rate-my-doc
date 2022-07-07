const express = require("express");
const { NotFoundError } = require("../expressError");
const { ensureLoggedIn } = require("../middleware/auth");
const Gallery = require("../models/gallery");
const User = require("../models/user");
const router = express.Router();

router.get(`/gallery/:id`, ensureLoggedIn, async (req, res, next) => {
  try {
    const check_user = await User.getUserById(req.params.id);
    if (!check_user) {
      throw new NotFoundError("User not found");
    }
    let results = await Gallery.getAllImages(req.params.id);
    return res.json(results.rows);
  } catch (e) {
    next(e);
  }
});
router.patch(`/gallery/:id`, ensureLoggedIn, async (req, res, next) => {
  try {
    const checkUser = await User.getUserById(req.params.id);
    if (!checkUser) {
      throw new NotFoundError("User not found");
    }
    const { image_url } = req.body;
    await Gallery.updateProfilePicture(req.params.id, image_url);
    return res.status(201).json({ msg: `Success` });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
