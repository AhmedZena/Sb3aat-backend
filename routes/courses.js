const express = require("express");
const Router = express.Router();
const {
  createCourses,
  getCourses,
  updateCourses,
  getCoursesById,
  deleteCourById,
  deleteAllCourses,
  getCoursesByCategoryId,  
} = require("../controllers/courses");

// Create a new Courses
Router.post("/", createCourses);
Router.delete("/", deleteAllCourses);

// Get all Courses
Router.get("/", getCourses);
// Get Courses by id
Router.get("/:id", getCoursesById);
// Update a Courses
Router.patch("/:id", updateCourses);
// Delete a Courses by id
Router.delete("/:id", deleteCourById);
// Get Courses by categoryId
Router.get("/category/:categoryId", getCoursesByCategoryId);

module.exports = Router;
