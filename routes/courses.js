const express = require("express");
const Router = express.Router();
const {
  createCourses,
  getCourses,
  updateCourses,
  getCoursesById,
  deleteCourses,
} = require("../controllers/courses");

// Create a new Courses
Router.post("/", createCourses);

// Get allCourses
Router.get("/", getCourses);
// get Courses by id
Router.get("/:id", getCoursesById);
// Update a Courses
Router.patch("/:id", updateCourses);
// Delete a Courses
Router.delete("/:id", deleteCourses);

module.exports = Router;
