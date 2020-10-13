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
const router = express.Router();

const { User, Order, ItemOfOrder } = db;

router.get(
	"/:userId",
	// requireAuth,
	asyncHandler(async (req, res) => {
		const userId = req.params.userId;
		const orders = await Order.findAll({
			where: { userId: userId },
			include: [User],
		});
		res.json({ orders });
	})
);
const OrderNotFoundError = (id) => {
	const err = Error("Order not found");
	err.errors = [`Order with id of ${id} could not be found.`];
	err.title = "Order not found.";
	err.status = 404;
	return err;
};
router.get(
	"/:userId/:id",
	// requireAuth,
	asyncHandler(async (req, res) => {
		const order = await Order.findOne({
			where: {
				userId: req.params.userId,
				id: req.params.id,
			},
			include: [User],
		});
		if (order) {
			res.json({ order });
		} else {
			next(OrderNotFoundError(req.params.id));
		}
	})
);
router.post(
	"/:userId",
	// requireAuth,
	asyncHandler(async (req, res) => {
		const userId = req.params.userId;
		const order = await Order.create({
			userId,
		});
		res.status(201).json({ order });
	})
);
router.delete(
	"/:userId/:id",
	// requireAuth,
	asyncHandler(async (req, res) => {
		const order = await Order.findOne({
			where: {
				userId: req.params.userId,
				id: req.params.id,
			},
		});
		if (order) {
			const item = await ItemOfOrder.destroy({
				where: {
					orderId: req.params.id,
				},
			});
			await order.destroy();
			res.json({
				message: `Deleted order with id of ${req.params.id}`,
				id: req.params.id,
			});
		} else {
			next(OrderNotFoundError(req.params.id));
		}
	})
);
module.exports = router;
