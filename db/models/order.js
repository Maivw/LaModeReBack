"use strict";
module.exports = (sequelize, DataTypes) => {
	const Order = sequelize.define(
		"Order",
		{
			userId: DataTypes.INTEGER,
		},
		{}
	);
	Order.associate = function (models) {
		Order.belongsTo(models.User, {
			foreignKey: "userId",
		});
		Order.belongsToMany(models.Product, {
			through: "ItemOfOrders",
			foreignKey: "orderId",
			otherKey: "productId",
			as: "items",
		});
	};
	return Order;
};
