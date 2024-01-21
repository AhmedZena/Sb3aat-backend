// Importing modules and make app
const express = require("express");
const app = express();
const morgan = require("morgan");

// import util ApiError
let ApiError = require("./util/apiError");

// import middleware of errors
let errorMiddleWare = require("./middlewares/errorMiddleware");

// importing config for the db connection
const dbConnect = require("./config/DbConnect");

// importing routes
// category
const categoryRoutes = require("./routes/categories");

// service
const serviceRoutes = require("./routes/serviceRoute");

// courses
const coursesRoutes = require("./routes/courses");

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
  res.send("Welcome to my E-commerce API");
});

// Routes
// category
app.use("/api/categories", categoryRoutes);

// service
app.use("/api/services", serviceRoutes);

// courses
app.use("/api/courses", coursesRoutes);

// Handling unhandled routes
app.all("*", (req, res, next) => {
  next(new ApiError(`Can't find ${req.originalUrl} on this server`, 400));
});

//Global Error handling middleware
app.use(errorMiddleWare);

// Listening to port
let port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Listening to port ${port}...`);
});
