const express = require("express");
const paypal = require("paypal-rest-sdk");
const { asyncHandler } = require("../utils");
const { getUserToken, requireAuth } = require("../auth");

const router = express.Router();
const db = require("../db/models");
const { User, Payment } = db;

router.post(
	"/",

	asyncHandler(async (req, res, next) => {
		console.log("before");
		const {
			payerId,
			userId,
			emailAddress,
			amount,
			currentcyCode,
			payerName,
			shippingAddress,
		} = req.body;
		// const userId = req.user.id;
		// console.log("88888", userId);
		const payment = await Payment.create({
			payerId,
			userId,
			emailAddress,
			amount,
			currentcyCode,
			payerName,
			shippingAddress,
		});
		res.status(201).json({ payment, message: "Update successfully" });
	})
);

module.exports = router;
