"use strict";

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert("Users", [
			{
				email: "DemoUser@demo.com",
				username: "DemoUser",
				password:
					"$2a$10$HK/LmoLuyI0cikqNyYMST.sJesu8KyQrt.50D1sN9Bo6lpw6Nz.XK",
				firstName: "Demo",
				lastName: "User",
				phoneNum: "1111111111",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				email: "mai@gmail.com",
				username: "mai",
				password: "password",
				firstName: "Mai",
				lastName: "VW",
				phoneNum: "1111111112",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete("Users", null, {});
	},
};
