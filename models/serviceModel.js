const mongoose = require("mongoose");

const serviceSchema = mongoose.Schema({
  freelancerId: mongoose.Schema.Types.ObjectId,
  categoryID: mongoose.Schema.Types.ObjectId,
  title: String,
  description: String,
  price: Number,
  deliveryTime: String,
  serviceImage: String,
});

const secviceModel = mongoose.model("service", serviceSchema);

module.exports = secviceModel;
