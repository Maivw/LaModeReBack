"use strict";
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable("Products", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			productName: {
				type: Sequelize.STRING,
				allowNull: false,
				unique: true,
			},
			color: {
				type: Sequelize.STRING(100),
				allowNull: false,
			},
			price: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
			productCode: {
				type: Sequelize.STRING(100),
				allowNull: false,
				unique: true,
			},
			description: {
				type: Sequelize.TEXT(1000),
				allowNull: false,
			},
			availableSize: {
				type: Sequelize.ARRAY(Sequelize.STRING),
				allowNull: false,
			},
			photo: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			productListId: {
				allowNull: false,
				type: Sequelize.INTEGER,
				references: {
					model: "ProductLists",
					key: "id",
				},
			},
			volume: {
				allowNull: false,
				type: Sequelize.INTEGER,
			},
			promotion: {
				allowNull: false,
				type: Sequelize.STRING,
			},
			category: {
				allowNull: false,
				type: Sequelize.STRING,
			},
			isFreeShipping: {
				allowNull: false,
				type: Sequelize.BOOLEAN,
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
		return queryInterface.dropTable("Products");
	},
};
