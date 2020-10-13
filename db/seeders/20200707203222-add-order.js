"use strict";

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert("Orders", [
			{
				userId: 1,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				userId: 2,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete("Orders", null, {});
	},
};
