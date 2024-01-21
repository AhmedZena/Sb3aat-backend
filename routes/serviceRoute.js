<<<<<<< HEAD
const express = require("express");
const Router = express.Router();
const {
  createService,
  getServices,
  updateService,
  getServiceById,
  deleteService,
} = require("../controllers/serviceControl");

// Create a new service
Router.post("/", createService);

// Get all services
Router.get("/", getServices);
// get service by id
Router.get("/:id", getServiceById);
// Update a service
Router.patch("/:id", updateService);
// Delete a service
Router.delete("/:id", deleteService);

module.exports = Router;
=======
const express = require("express");
const Router = express.Router();
const {
  createService,
  getServices,
  updateService,
  getServiceById,
  deleteService,
} = require("../controller/serviceControl");

// Create a new service
Router.post("/", createService);

// Get all services
Router.get("/", getServices);
// get service by id
Router.get("/:id", getServiceById);
// Update a service
Router.patch("/:id", updateService);
// Delete a service
Router.delete("/:id", deleteService);

module.exports = Router;
>>>>>>> e53305fcb8a35cfd9c60b9fb0ad06bcad5f4cdaa
