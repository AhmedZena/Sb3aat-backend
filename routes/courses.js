const express = require("express");
const Router = express.Router();
const {
  createCourses,
  getCourses,
  updateCourses,
  getCoursesById,
  deleteCourById,
  deleteAllCourses
} = require("../controller/courses");

// Create a new Courses
Router.post("/", createCourses);
Router.delete("/",deleteAllCourses)

// Get allCourses
Router.get("/", getCourses);
// get Courses by id
Router.get("/:id", getCoursesById);
// Update a Courses
Router.patch("/:id", updateCourses);
// Delete a Courses
Router.delete("/:id", deleteCourById);

module.exports = Router;
