"use strict";

require("dotenv").config();
require("colors");
const CLOUDINARY_NAME = "dzirl005q";
const CLOUDINARY_API_KEY = "499182318514335";
const CLOUDINARY_API_SECRET = "6JyHROOjTafLAgDM3qm7o9eRbo8";
const SECRET_KEY = process.env.SECRET_KEY || "^&%&%EUFYIU^YRT56ytfg&^&%&Y%TYfg";

const PORT = +process.env.PORT || 3001;

function getDatabaseUri() {
  return process.env.NODE_ENV === "test"
    ? "rmd_test"
    : process.env.DATABASE_URL || "rmd";
}

const BCRYPT_WORK_FACTOR = process.env.NODE_ENV === "test" ? 1 : 12;

console.log("RMD Config:".green);
console.log("SECRET_KEY:".yellow, SECRET_KEY);
console.log("PORT:".yellow, PORT.toString());
console.log("BCRYPT_WORK_FACTOR:".yellow, BCRYPT_WORK_FACTOR);
console.log("Database:".yellow, getDatabaseUri());
console.log("---");

module.exports = {
  SECRET_KEY,
  PORT,
  BCRYPT_WORK_FACTOR,
  getDatabaseUri,
  CLOUDINARY_NAME,
  CLOUDINARY_API_SECRET,
  CLOUDINARY_API_KEY,
};
