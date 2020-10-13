"use strict";

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert("ItemOfOrders", [
			{
				orderId: 1,
				productId: 1,
				quantity: 3,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				orderId: 1,
				productId: 2,
				quantity: 5,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				orderId: 2,
				productId: 1,
				quantity: 4,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				orderId: 2,
				productId: 3,
				quantity: 1,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				orderId: 2,
				productId: 4,
				quantity: 2,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete("ItemOfOrders", null, {});
	},
};
