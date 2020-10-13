"use strict";
module.exports = (sequelize, DataTypes) => {
	const ItemOfOrder = sequelize.define(
		"ItemOfOrder",
		{
			orderId: DataTypes.INTEGER,
			productId: DataTypes.INTEGER,
			quantity: DataTypes.INTEGER,
		},
		{}
	);
	ItemOfOrder.associate = function (models) {
		// ItemOfOrder.belongsTo(models.Order, { foreignKey: "orderId" });
		// ItemOfOrder.hasMany(models.Product, { foreignKey: "productId" });
	};
	return ItemOfOrder;
};
