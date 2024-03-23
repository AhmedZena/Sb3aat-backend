const express = require("express");
const Router = express.Router();
const {
  createService,
  getServices,
  updateService,
  getServiceById,
  deleteService,
  getServicesByCategoryId, // Import the function here
  acceptServiceRequest,
  getAcceptedServices,
  getNotAcceptedServices,
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

// Get accepted services
Router.get("/accepted", adminVerfied, getAcceptedServices);

// Get not accepted services
Router.get("/not-accepted", adminVerfied, getNotAcceptedServices);

// get service by id
Router.get("/:id", getServiceById);
// Accept service request
Router.patch("/accept/:id", adminVerfied, acceptServiceRequest);
// Update a service
Router.patch("/:id", freelancerVerfied, updateService);
// delete a service
Router.delete("/:id", adminOrFreelancerVerfied, deleteService);
// Get services by category
Router.get("/category/:subCategoryID", getServicesByCategoryId);

module.exports = Router;
