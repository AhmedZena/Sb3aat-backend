const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const coursesSchema = new Schema({
  FreelancerId: String,
  Title: {
    type: String,
    required: [true, "Category name is required"],
    unique: true,
  },
  Description: String,
  CategoryID: String,
  Price: Number,
  Duration: String,
  CourseMaterial: Object,
});
// check if category name is unique
const coursesModel = mongoose.model("course", coursesSchema);
coursesSchema.path("Title").validate(async function (value) {
    console.log(value);
    const nameCount = await coursesModel.countDocuments({
      Title: value,
    });
    return !nameCount;
  }, "course Title already exists");

module.exports = coursesModel;
