"use strict";

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert("ProductLists", [
			{
				productListName: "dresses",
				categoryId: 1,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				productListName: "swimwear",
				categoryId: 1,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				productListName: "tops",
				categoryId: 1,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				productListName: "sleep",
				categoryId: 1,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				productListName: "graphictee",
				categoryId: 2,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				productListName: "bottoms",
				categoryId: 2,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				productListName: "jeans & demin",
				categoryId: 2,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				productListName: "hoodies",
				categoryId: 2,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				productListName: "swearshirt",
				categoryId: 3,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				productListName: "tops",
				categoryId: 3,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				productListName: "kid-dresses",
				categoryId: 3,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete("ProductLists", null, {});
	},
};
