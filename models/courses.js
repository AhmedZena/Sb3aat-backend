const { string } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const coursesSchema = new Schema({
  title: {
    type: String,
    required: [true, "course title is required"],
    unique: [true, "course title must be unique"],
  },
  description: {
    type: String,
    required: [true, "course description is required"],
  },
  freelancerId: { // Changed field name from freelanceId to freelancerId
    type: Schema.Types.ObjectId,
    required: [true, "freelancer idd is required"],
  },
  categoryId: {
    type: Schema.Types.ObjectId,
    required: [true, "course category is required"],
  },
  price: {
    type: String,
    required: [true, "course price is required"],
  },
  duration: {
    type: String,
    required: [true, "course duration is required"],
  },
  courseMaterial: {
    type: Object,
    // required: [true, "course material is required"],
  },
  CourseImg: {
    type: String,
    required: [true, "course image is required"],
  },
  isAccepted: {
    type: Boolean,
    default: false,
  },
});

// check if category name is unique
const coursesModel = mongoose.model("course", coursesSchema);


module.exports = coursesModel;
