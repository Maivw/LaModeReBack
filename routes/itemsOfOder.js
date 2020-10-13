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

const { User, Order, Category, Product, ProductList, ItemOfOrder } = db;

router.get(
	"/",
	// requireAuth,
	asyncHandler(async (req, res) => {
		const items = await ItemOfOrder.findAll({
			order: [["createdAt", "DESC"]],
		});
		res.json({ items });
	})
);
const itemNotFoundError = (id) => {
	const err = Error("Item not found");
	err.errors = [`Item with id of ${id} could not be found.`];
	err.title = "Item not found.";
	err.status = 404;
	return err;
};
router.get(
	"/:id",
	// requireAuth,
	asyncHandler(async (req, res) => {
		const item = await ItemOfOrder.findOne({
			where: {
				id: req.params.id,
			},
			// include: [Category, ProductList, Product, User],
		});
		if (item) {
			res.json({ item });
		} else {
			next(itemNotFoundError(req.params.id));
		}
	})
);
router.put(
	"/:id",
	// requireAuth,
	asyncHandler(async (req, res) => {
		const { id, productId, orderId, quantity } = req.body;
		const item = await ItemOfOrder.findOne({
			where: {
				id: req.params.id,
			},
			// include: [Category, ProductList, Product, User],
		});
		if (item) {
			await item.update({
				id,
				orderId,
				productId,
				quantity,
			});
			res.json({ item });
		} else {
			next(itemNotFoundError(req.params.id));
		}
	})
);

router.post(
	"/",
	asyncHandler(async (req, res, next) => {
		const { id, orderId, productId, quantity } = req.body;
		let item = await ItemOfOrder.create({
			orderId,
			productId,
			quantity,
		});
		item = await ItemOfOrder.findOne({
			where: {
				id: item.id,
			},
		});

		res.status(201).json({ item });
	})
);
router.delete(
	"/:id",
	// requireAuth,
	asyncHandler(async (req, res) => {
		const { id } = req.body;
		const item = await ItemOfOrder.findOne({
			where: {
				id: req.params.id,
			},
		});

		if (item) {
			await item.destroy();
			res.json({ id: req.params.id });
		} else {
			next(itemNotFoundError(req.params.id));
		}
	})
);
module.exports = router;
