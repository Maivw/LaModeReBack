const express = require("express");
const router = express.Router();
const { asyncHandler } = require("../utils");

const db = require("../db/models");
const { Category } = db;

router.get(
	"/",
	asyncHandler(async (req, res) => {
		const categories = await Category.findAll();
		res.json({ categories });
	})
);

module.exports = router;
