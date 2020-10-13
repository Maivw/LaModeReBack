const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");
const paypal = require("paypal-rest-sdk");
const { ValidationError } = require("sequelize");
const indexRouter = require("./routes/index");
const userRouter = require("./routes/user");
const categoryRouter = require("./routes/category");
const productListRouter = require("./routes/productList");
const productRouter = require("./routes/product");
const orderRouter = require("./routes/order");
const itemOfOrderRouter = require("./routes/itemsOfOder");
const paymentRouter = require("./routes/payment");

paypal.configure({
	mode: "sandbox",
	client_id:
		"AbsLL0PJYBM_PKQP0PCjGSDpkcU6r-zz2l-jvVhEt3zmtGa8FHoe_IpBj_rPgtkYE431GewAo96itzsF",
	client_secret:
		"EOrUdAcIkmni65gMSPMJRq1SxXVZSzyIDNNtd9e8_S0m5yqeWpOblfzCOytJxyTvKqNTgzkuDtnujdbs",
});

const { environment } = require("./config");

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(cors({ origin: "*" }));
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
app.use("/", indexRouter);
app.use("/users", userRouter);
app.use("/category", categoryRouter);
app.use("/productlist", productListRouter);
app.use("/products", productRouter);
app.use("/orders", orderRouter);
app.use("/items", itemOfOrderRouter);
app.use("/payment", paymentRouter);

app.use((req, res, next) => {
	const err = new Error("The requested resource couldn't be found.");
	err.errors = ["The requested resource couldn't be found."];
	err.status = 404;
	next(err);
});

app.use((err, req, res, next) => {
	if (err instanceof ValidationError) {
		err.errors = err.errors.map((e) => e.message);
		err.title = "Sequelize Error";
	}
	next(err);
});
app.use((err, req, res, next) => {
	console.log(err);
	res.status(err.status || 500);
	const isProduction = environment === "production";
	res.json({
		title: err.title || "Server Error",
		errors: err.errors,
		stack: isProduction ? null : err.stack,
	});
});

module.exports = app;
