const express = require("express");

const bcrypt = require("bcryptjs");
const { check } = require("express-validator");
const {
	asyncHandler,
	handleValidationErrors,
	validatePassword,
} = require("../utils");
const { getUserToken, requireAuth } = require("../auth");

const db = require("../db/models");

const { User, Order } = db;
const router = express.Router();
const userNotFound = (userId) => {
	const err = new Error("User not found");
	err.errors = [`User with id: ${userId} could not be found.`];
	err.title = "User not found.";
	err.status = 404;
	return err;
};

const validateLoginInfo = [
	check("email")
		.exists({ checkFalsy: true })
		.isEmail()
		.withMessage("Please provide a valid email."),
	check("password")
		.exists({ checkFalsy: true })
		.withMessage("Please provide a password."),
	handleValidationErrors,
];

router.get(
	"/:id",
	requireAuth,
	asyncHandler(async (req, res) => {
		const userId = parseInt(req.params.id, 10);

		if (!req.user || req.user.id !== userId) {
			const err = new Error("Unauthorized");
			err.status = 401;
			err.message = "You do not have permission(s) to do that.";
			err.title = "Unauthorized";
			throw err;
		}

		const user = await User.findByPk(userId, {
			attributes: {
				exclude: ["password"],
			},
			// include: [Order],
		});
		res.json({ user });
	})
);

router.post(
	"/",
	check("username")
		.exists({ checkFalsy: true })
		.withMessage("Please provide a username")
		.isLength({ max: 32 })
		.withMessage("Max username length is 32"),
	check("firstName")
		.exists({ checkFalsy: true })
		.withMessage("Please provide a first name")
		.isLength({ max: 64 })
		.withMessage("Max firt name length is 64"),
	check("lastName")
		.exists({ checkFalsy: true })
		.withMessage("Please provide a last name")
		.isLength({ max: 64 })
		.withMessage("Max last name length is 64"),
	check("password")
		.exists({ checkFalsy: true })
		.withMessage("Please provide a password."),
	check("confirmPassword")
		.exists({ checkFalsy: true })
		.withMessage("Please provide a value for Confirm Password")
		.isLength({ max: 50 })
		.withMessage("Confirm Password must not be more than 50 characters long")
		.custom((value, { req }) => {
			if (value !== req.body.password) {
				throw new Error("Confirm Password does not match Password");
			}
			return true;
		}),
	asyncHandler(async (req, res, next) => {
		const {
			email,
			username,
			password,
			firstName,
			lastName,
			phoneNum,
		} = req.body;
		const hashedPassword = await bcrypt.hash(password, 10);

		const user = await User.create({
			email,
			username: username,
			password: hashedPassword,
			firstName,
			lastName,
			phoneNum,
		});

		const token = getUserToken(user);
		res.status(201).json({
			user: { id: user.id },
			token,
			name: username,
		});
	})
);

router.post(
	"/login",
	asyncHandler(async (req, res, next) => {
		const { email, password } = req.body;
		const user = await User.findOne({
			where: { email },
		});
		console.log("user", user);
		console.log("user.password", user.password);

		if (!user || !validatePassword(password, user.password)) {
			const err = new Error("Failed to log in.");
			err.errors = ["The provided credentials were invalid"];
			err.status = 401;
			err.title = "Login failed.";
			return next(err);
		}
		const token = getUserToken(user);
		res.json({
			token,
			user: { id: user.id },
			name: user.username,
		});
	})
);

router.put(
	"/:id",
	requireAuth,
	asyncHandler(async (req, res, next) => {
		const userId = parseInt(req.params.id, 10);
		const user = await User.findByPk(userId);
		if (user) {
			await user.update({
				email: req.body.email,
				username: req.body.username,
				password: req.password,
				firstName: req.body.firstName,
				lastName: req.body.lastName,
			});

			const updatedUser = await User.findByPk(userId, {
				attributes: { exclude: ["password"] },
			});
			res.json({ updatedUser });
		} else {
			next(userNotFound(userId));
		}
	})
);

module.exports = router;
