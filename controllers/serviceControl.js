// serviceControl.js
const { parse } = require("dotenv");
const serviceModel = require("../models/serviceModel");

const createService = (req, res) => {
  console.log(req.body);
  const {
    freelancerId,
    categoryID,
    title,
    description,
    price,
    deliveryTime,
    serviceImage,
  } = req.body;
  console.log(
    freelancerId,
    categoryID,
    title,
    description,
    price,
    deliveryTime,
    serviceImage
  );

  try {
    const newService = new serviceModel({
      freelancerId,
      categoryID,
      title,
      description,
      price,
      deliveryTime,
      serviceImage,
    });

    newService
      .save()
      .then((savedService) => {
        res.status(201).json(savedService);
      })
      .catch((error) => {
        res
          .status(500)
          .json({ error: "Failed to create service", details: error });
      });
  } catch (error) {
    res.status(400).json({ error: "Invalid request", details: error });
  }
};

// get all service...
const getServices = (req, res) => {
  if (!req.body) {
    return res.status(400).json({ error: "Empty request body" });
  }

  serviceModel
    .find()
    .then((services) => {
      res.status(200).json(services);
    })
    .catch((error) => {
      res
        .status(500)
        .json({ error: "Failed to retrieve services", details: error });
    });
};
//get service by id :-
const getServiceById = (req, res) => {
  let serviceId = req.params.serviceId;
  //checking for valid id or not
  if (!serviceId) {
    serviceModel.find().then((services) => {
      res.status(200).json(services);
    });
  } else {
    serviceModel.findOne({ _id: serviceId }).then((service) => {
      res.status(200).json(service);
    });
  }
};

// update service :-

const updateService = (req, res) => {
  const serviceId = req.params.id;
  const updatedFields = req.body;

  if (!serviceId || Object.keys(updatedFields).length === 0) {
    return res
      .status(400)
      .json({ error: "Invalid request. Missing id or updatedFields." });
  }

  serviceModel
    .findOneAndUpdate(
      { _id: serviceId },
      { $set: updatedFields },
      { new: true }
    )
    .then((updatedService) => {
      res.status(200).json(updatedService);
    })
    .catch((error) => {
      res
        .status(500)
        .json({ error: "Failed to update service", details: error });
    });
};
//delete serivce :-
const deleteService = (req, res) => {
  let serviceId = req.params.id;

  serviceModel
    .findOneAndDelete({ _id: serviceId })
    .then((service) => {
      res.status(200).json("service deleted successfully");
    })
    .catch((error) => {
      res
        .status(500)
        .json({ error: "Failed to delete service", details: error });
    });
};

module.exports = {
  createService,
  getServices,
  updateService,
  getServiceById,
  deleteService,
};
