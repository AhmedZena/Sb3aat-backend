const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const dbConnection = require("./modules/DB");

const app = express();
app.use(express.json());
dotenv.config({ path: "./config.env" });

// Database connection
dbConnection();

// Service Routes
const serviceRoute = require("./routes/serviceRoute");
app.use("/api", serviceRoute);
app.get("/api", serviceRoute);
app.patch("/api", serviceRoute);

// Middleware
app.use(morgan("dev"));

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
