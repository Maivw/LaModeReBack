const express = require("express");
const { asyncHandler } = require("../utils");

const router = express.Router();
const db = require("../db/models");
const { Category, ProductList, Product } = db;

router.get(
	"/:productListName",
	asyncHandler(async (req, res) => {
		const { productListName } = req.params;
		const productList = await ProductList.findAll({
			include: [Category, Product],
			where: { productListName },
		});
		res.json({ productList });
	})
);

module.exports = router;
