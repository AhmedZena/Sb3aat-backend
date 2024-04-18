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
  acceptCourseRequest,
  getNotAcceptedCourses,
} = require("../controllers/courses");
const { adminVerfied } = require("../middlewares/auth");

// Create a new Courses
Router.post("/", createCourses);
Router.delete("/", deleteAllCourses);

// get not accepted courses
Router.get("/notAccepted", getNotAcceptedCourses);

// Get all Courses
Router.get("/", getCourses);
// Get Courses by id
Router.get("/:id", getCoursesById);

// Accept service request
Router.patch("/accept/:id", adminVerfied, acceptCourseRequest);

// Update a Courses
Router.patch("/:id", updateCourses);
// Delete a Courses by id
Router.delete("/:id", deleteCourById);
// Get Courses by categoryId
Router.get("/category/:categoryId", getCoursesByCategoryId);

module.exports = Router;
