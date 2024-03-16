const mongoose = require("mongoose");

const serviceSchema = mongoose.Schema({
  freelancerId: mongoose.Schema.Types.ObjectId,
  subCategoryID: mongoose.Schema.Types.ObjectId,
  title: String,
  description: String,
  price: Number,
  deliveryTime: String,
  serviceImage: String,
  isAccepted: {
    type: Boolean,
    default: false,
  },
});

const secviceModel = mongoose.model("service", serviceSchema);

module.exports = secviceModel;
