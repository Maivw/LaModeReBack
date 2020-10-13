const express = require("express");
const bcrypt = require("bcryptjs");

const { asyncHandler } = require("../utils");
const { requireAuth } = require("../auth");
const router = express.Router();

const db = require("../db/models");
const { Category, ProductList, Product, ItemOfOrder } = db;

router.get(
	"/",
	asyncHandler(async (req, res) => {
		const products = await Product.findAll({
			order: [["createdAt", "DESC"]],
			// include: [Category, ProductList],
		});
		res.json({ products });
	})
);

const productNotFoundError = (id) => {
	const err = Error("Product not found");
	err.errors = [`Product with id of ${id} could not be found.`];
	err.title = "Product not found.";
	err.status = 404;
	return err;
};

router.get(
	"/:id",
	asyncHandler(async (req, res, next) => {
		const product = await Product.findOne({
			where: {
				id: req.params.id,
			},
			include: [ProductList],
		});
		if (product) {
			res.json({ product });
		} else {
			next(productNotFoundError(req.params.id));
		}
	})
);
router.get(
	"/promotion/:promotion",
	asyncHandler(async (req, res, next) => {
		const { promotion } = req.params;

		const products = await Product.findAll({
			where: {
				promotion: promotion,
			},
			include: [ProductList],
		});
		if (products) {
			res.json({ products });
		} else {
			next(productNotFoundError(req.params.id));
		}
	})
);
router.get(
	"/promotion/:category/:promotion",
	asyncHandler(async (req, res, next) => {
		const { promotion, category } = req.params;

		const products = await Product.findAll({
			where: {
				category,
				promotion: promotion,
			},
			include: [ProductList],
		});
		if (products) {
			res.json({ products });
		} else {
			next(productNotFoundError(req.params.id));
		}
	})
);

router.delete(
	"/:id",
	// requireAuth,
	asyncHandler(async (req, res, next) => {
		const product = await Product.findOne({
			where: {
				id: req.params.id,
			},
			// include: [ProductList, Category],
		});

		// if (!req.user && !req.user.id) {
		// 	const err = new Error("Unauthorized");
		// 	err.status = 401;
		// 	err.message = "You are not authorized to delete this pet.";
		// 	err.title = "Unauthorized";
		// 	throw err;
		// }
		if (product) {
			const item = await ItemOfOrder.destroy({
				where: {
					productId: req.params.id,
				},
				// include: [ProductList, Category],
			});
			await product.destroy();
			res.json({
				message: `Deleted product with id of ${req.params.id}`,
				id: req.params.id,
			});
		} else {
			next(productNotFoundError(req.params.id));
		}
	})
);

module.exports = router;
