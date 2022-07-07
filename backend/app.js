const express = require("express");
const cors = require("cors");
const { NotFoundError } = require("./expressError");
const hospitalRoutes = require("./routes/hospitals");
const physicianRoutes = require("./routes/physicians");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");
const galleryRoutes = require("./routes/galleryRoute");
const { authenticateJWT } = require("./middleware/auth");

const reviewRoutes = require("./routes/reviews");

const morgan = require("morgan");
const app = express();

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json());
app.use(authenticateJWT);
app.use(morgan("tiny"));
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/gal", galleryRoutes);
app.use("/hospitals", hospitalRoutes);
app.use("/physicians", physicianRoutes);
app.use("/reviews", reviewRoutes);

app.use(function (req, res, next) {
  return next(new NotFoundError());
});

app.use(function (err, req, res, next) {
  if (process.env.NODE_ENV !== "test") console.error(err.stack);
  const status = err.status || 500;
  const message = err.message;

  return res.status(status).json({
    error: { message, status },
  });
});

module.exports = app;
