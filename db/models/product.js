"use strict";
module.exports = (sequelize, DataTypes) => {
	const Product = sequelize.define(
		"Product",
		{
			productName: DataTypes.STRING,
			color: DataTypes.STRING,
			price: DataTypes.INTEGER,
			productCode: DataTypes.STRING,
			description: DataTypes.STRING,
			availableSize: DataTypes.ARRAY(DataTypes.STRING),
			photo: DataTypes.STRING,
			productListId: DataTypes.INTEGER,
			volume: DataTypes.INTEGER,
			promotion: DataTypes.STRING,
			category: DataTypes.STRING,
			isFreeShipping: DataTypes.BOOLEAN,
		},
		{}
	);
	Product.associate = function (models) {
		Product.belongsTo(models.ProductList, {
			foreignKey: "productListId",
		});
		Product.belongsToMany(models.Order, {
			through: "ItemOfOrders",
			foreignKey: "productId",
			otherKey: "orderId",
			as: "orders",
		});
	};
	return Product;
};
