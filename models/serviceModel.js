const mongoose = require("mongoose");

const serviceSchema = mongoose.Schema({
  isAccepted: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    required: [true, "service title is required"],
    unique: [true, "service title must be unique"],
  },
  freelanceId: {
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
    required: [true, "sub category id is required"],
  },

  //    array of tags
  tags: {
    type: Array,
    required: [true, "tags id is required"],
  },

  //   buyer instrunctions
  buyerInstruction: {
    type: String,
    required: [true, "buyer instrunctions is required"],
  },
});

const secviceModel = mongoose.model("service", serviceSchema);

module.exports = secviceModel;
