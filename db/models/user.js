"use strict";
module.exports = (sequelize, DataTypes) => {
	const User = sequelize.define(
		"User",
		{
			email: DataTypes.STRING,
			username: DataTypes.STRING,
			password: DataTypes.STRING,
			firstName: DataTypes.STRING,
			lastName: DataTypes.STRING,
			phoneNum: DataTypes.STRING,
		},
		{}
	);
	User.associate = function (models) {
		User.hasMany(models.Order, { foreignKey: "userId" });
		User.hasMany(models.Payment, { foreignKey: "userId" });
	};
	return User;
};
