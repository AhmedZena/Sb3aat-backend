const mongoose = require("mongoose");

const serviceSchema = mongoose.Schema({

  title:{
    type: String,
    required: [true, "service title is required"],
    unique: [true, "service title must be unique"],
  },
  freelanceId:{
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "freelancer id is required"],
  },
  description: {
    type: String,
    required: [true, "service description is required"],
  },
  price: {
    type: String,
    required: [true, "service price is required"],
  },
  deliveryTime: {
    type: String,
    required: [true, "service deliveryTime is required"],
  },
  serviceImage: {
    type: String,
    required: [true, "service image is required"],
  },
  subCategoryID: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "category id is required"],
  },
});

const secviceModel = mongoose.model("service", serviceSchema);

module.exports = secviceModel;
