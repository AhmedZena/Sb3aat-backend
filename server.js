// Importing modules and make app
const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");

// importing config for the db connection
const dbConnect = require("./middleware/DbConnect");

// importing routes
const categoryRoutes = require("./routes/categories");

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

// Routes
app.use("/api/categories", categoryRoutes);

// Importing routes
app.get("/", (req, res) => {
  res.send("Welcome to my E-commerce API");
});

// Listening to port
let port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Listening to port ${port}...`);
});
