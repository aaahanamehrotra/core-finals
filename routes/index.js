const express = require("express");
const res = require("express/lib/response");
const { ensureAuthenticated } = require("../config/auth");
const router = express.Router();
const Product = require("../models/Product");

router.get("/", (req, res) => res.render("dashboard"));
router.get("/about", (req, res) => res.render("about"));
router.get("/checkout", ensureAuthenticated, (req, res) =>
  res.render("checkout")
);

router.get("/profile", ensureAuthenticated, (req, res) =>
  res.render("profile", {
    user: req.user,
  })
);
module.exports = router;
