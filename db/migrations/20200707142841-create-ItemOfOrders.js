"use strict";
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable("ItemOfOrders", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			orderId: {
				allowNull: false,
				type: Sequelize.INTEGER,
				references: {
					model: "Orders",
					key: "id",
				},
			},
			productId: {
				allowNull: false,
				type: Sequelize.INTEGER,
				references: {
					model: "Products",
					key: "id",
				},
			},
			quantity: {
				allowNull: false,
				type: Sequelize.INTEGER,
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable("ItemOfOrders");
	},
};
