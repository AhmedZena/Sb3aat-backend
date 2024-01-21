const mongoose = require("mongoose");

const serviceSchema = mongoose.Schema({
  serviceId: Number,
  freelancerId: Number,
  categoryID: Number,
  title: String,
  description: String,
  price: Number,
  deliveryTime: Number,
  serviceImage: String,
});

const secviceModel = mongoose.model("service", serviceSchema);

module.exports = secviceModel;
