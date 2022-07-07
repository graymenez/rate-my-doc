const e = require("express");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");
const { UnauthorizedError } = require("../expressError");

function authenticateJWT(req, res, next) {
  try {
    const payload = jwt.verify(req.headers.authorization, SECRET_KEY);
    req.locals = payload;
    console.log("Valid Token");
    return next();
  } catch (e) {
    next();
  }
}

function ensureLoggedIn(req, res, next) {
  if (!req.locals) {
    let e = new UnauthorizedError("Unauthorized User");
    next(e);
  } else {
    console.log("444444444444444444444444444444444");
    console.log(req.locals);
    console.log("444444444444444444444444444444444");
    return next();
  }
}
function ensureAdminLoggedIn(req, res, next) {
  if (!req.locals) {
    let e = new UnauthorizedError("Unauthorized User");
    next(e);
  }
  if (!req.locals.isAdmin) {
    let e = new UnauthorizedError("Unauthorized User. Admins Only");
    next(e);
  }
  return next();
}
function ensureAdminOrLoggedInUser(req, res, next) {
  if (!req.locals) {
    let e = new UnauthorizedError("Unauthorized User");
    next(e);
  }
  if (req.locals.isAdmin) {
    return next();
  }
  return next();
}
module.exports = {
  authenticateJWT,
  ensureLoggedIn,
  ensureAdminLoggedIn,
  ensureAdminOrLoggedInUser,
};
