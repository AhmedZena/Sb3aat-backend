const express = require("express");
const Router = express.Router();
const {
  createService,
  getServices,
  updateService,
  getServiceById,
  deleteService,
  getServicesByCategoryId // Import the function here
} = require("../controllers/serviceControl");

let {
  freelancerVerfied,
  adminVerfied,
  adminOrFreelancerVerfied,
} = require("../middlewares/auth");

// Create a new service
Router.post("/", freelancerVerfied, createService);

// Get all services
Router.get("/", getServices);
// get service by id
Router.get("/:id", getServiceById);
// Update a service
Router.patch("/:id", freelancerVerfied, updateService);
// delete a service
Router.delete("/:id", adminOrFreelancerVerfied, deleteService);
// Get services by category
Router.get("/category/:subCategoryID", getServicesByCategoryId);

module.exports = Router;
