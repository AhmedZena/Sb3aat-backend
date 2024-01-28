const express = require("express");
const Router = express.Router();
const {
  createService,
  getServices,
  updateService,
  getServiceById,
  deleteService,
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
// Delete a service
// Router.delete("/:id",freelancerVerfied, deleteService);
// both admin and freelancer can delete service
// Router.delete("/:id", freelancerVerfied, deleteService);
Router.delete("/:id", adminOrFreelancerVerfied, deleteService);

module.exports = Router;
