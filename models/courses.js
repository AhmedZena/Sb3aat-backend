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
  freelancerId: {
    type: String,
    required: [true, "freelancer idd   is required"],
  },
  categoryId: {
    type: Schema.Types.ObjectId,
    required: [true, "course category is required"],
  },
  price: {
    type: Number,
    required: [true, "course price is required"],
  },
  duration: {
    type: String,
    required: [true, "course duration is required"],
  },
  courseMaterial: {
    type: Object,
    required: [true, "course material is required"],
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
// coursesSchema.path("title").validate(async function (value) {
//   console.log(value);
//   const nameCount = await coursesModel.countDocuments({
//     Title: value,
//   });
//   return !nameCount;
// }, "course Title already exists");

module.exports = coursesModel;
