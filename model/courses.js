const mongoose = require("mongoose");

const coursesSchema = mongoose.Schema({
  
FreelancerId: Number,
Title: String,
Description: String,
CategoryID: Number,
Price: Number,
Duration: String,
CourseMaterial: String,
});

const coursesModel = mongoose.model("course", coursesSchema);

module.exports = coursesModel;