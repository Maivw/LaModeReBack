"use strict";

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert("Categories", [
			{
				categoryName: "women",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				categoryName: "men",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				categoryName: "girls",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete("Categories", null, {});
	},
};
