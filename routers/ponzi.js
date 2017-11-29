var express = require("express");
var router = express.Router();

const mongoose = require("mongoose");
var models = require("./../models");
var User = mongoose.model("User");

const passport = require("passport");

router.get("/", (req, res) => {
	if (req.user) {
		res.render("home", { user: req.user });
	} else {
		res.redirect("/login");
	}
});

module.exports = router;
