var express = require("express");
var router = express.Router();

const mongoose = require("mongoose");
var models = require("./../models");
var User = mongoose.model("User");

const passport = require("passport");

// home page
router.get("/", (req, res) => {
	if (req.user) {
		res.render("home", { user: req.user });
	} else {
		res.redirect("/login");
	}
});

// referral link
router.get("/ponzert/:referralid", (req, res) => {
	req.logout();
	res.render("referral", { id: req.params.referralid });
});

// sign up under a friend
router.post("/ponzert", (req, res) => {
	const { username, password, refferalid } = req.body;
	const user = new User({
		username: username,
		password: password,
		points: 0,
		parent: refferalid
	});

	// update parent
	User.update(
		{ _id: refferalid },
		{
			$push: { children: user._id }
		},
		err => {
			if (err) throw err;
		}
	);

	// save new user and redirect
	user.save((err, user) => {
		req.login(user, function(err) {
			if (err) {
				return next(err);
			}
			return res.redirect("/");
		});
	});
});

module.exports = router;
