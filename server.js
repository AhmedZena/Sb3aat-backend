// Importing modules and make app
const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");

// import util ApiError
let ApiError = require("./util/apiError");

// import middleware of errors
let errorMiddleWare = require("./middlewares/errorMiddleware");

// importing config for the db connection
const dbConnect = require("./config/DbConnect");

// importing routes

//auth
const authRoutes = require("./routes/authRoute");

// category
const categoryRoutes = require("./routes/categories");

// sub category
const subCategoryRoutes = require("./routes/subCategories");

// service
const serviceRoutes = require("./routes/serviceRoute");

// courses
const coursesRoutes = require("./routes/courses");

// orders
const orderRoutes = require("./routes/orderRoute");

// reviews
const reviewsRoutes = require("./routes/reviewsRoutes");

// notifcation
const notificationRoutes = require("./routes/notification");

// payment
const paymentRoutes = require("./routes/paymentRoute");

// dontenv config
require("dotenv").config({ path: "./.config.env" });
console.log(process.env.PORT);
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
} else if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
  console.log("Morgan enabled...");
}

// Connecting to database
dbConnect();

// Middlewares
app.use(express.json());

// Importing routes
app.get("/", (req, res) => {
  res.send("Welcome to Sb3aat Platform");
});

// Routes

// auth
app.use("/api/auth", authRoutes);

// category
app.use("/api/categories", categoryRoutes);

// sub category
app.use("/api/subCategories", subCategoryRoutes);

// service
app.use("/api/services", serviceRoutes);

// courses
app.use("/api/courses", coursesRoutes);

// orders
app.use("/api/orders", orderRoutes);

// reviews
app.use("/api/reviews", reviewsRoutes);

// notification
app.use("/api/notifications", notificationRoutes);

// payment
app.use("/api/payments", paymentRoutes);

// Handling unhandled routes
app.all("*", (req, res, next) => {
  next(new ApiError(`Can't find ${req.originalUrl} on this server`, 400));
});

//Global Error handling middleware
app.use(errorMiddleWare);

// cors
app.use(cors());

// Listening to port
let port = process.env.PORT || 8000;
const server = app.listen(port, () => {
  console.log(`Listening to port ${port}...`);
});

// handle rejection outside express
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Shutting down the server due to unhandled promise rejection");
  server.close(() => {
    console.log("Server is down");
    process.exit(1);
  });
});
