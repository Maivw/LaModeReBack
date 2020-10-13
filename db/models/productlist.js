"use strict";
module.exports = (sequelize, DataTypes) => {
	const ProductList = sequelize.define(
		"ProductList",
		{
			productListName: DataTypes.STRING,
			categoryId: DataTypes.INTEGER,
		},
		{}
	);
	ProductList.associate = function (models) {
		ProductList.belongsTo(models.Category, {
			foreignKey: "categoryId",
			onDelete: "cascade",
			hooks: true,
		});
		ProductList.hasMany(models.Product, {
			foreignKey: "productListId",
			onDelete: "cascade",
			hooks: true,
		});
	};
	return ProductList;
};
