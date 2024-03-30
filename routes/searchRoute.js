const express = require("express");
const router = express.Router();
const {
  searchServiceAndCourse,
  searchService,
  searchCourse,
  searchServiceInSubCategory,
  searchCourseInSubCategory,
  searchServiceAndCourseInSubCategory,
} = require("../controllers/searchController");

// search for a service or course by part of its title
router.get("/:search", searchServiceAndCourse);

// search for a service by part of its title
router.get("/service/:search", searchService);

// search for a course by part of its title
router.get("/course/:search", searchCourse);

// search for a service by part of its title in a subcategory

// search service title in subcategory
router.get("/service/:search/:subCategoryID", searchServiceInSubCategory);

// search course title in subcategory
router.get("/course/:search/:subCategoryID", searchCourseInSubCategory);

// search for a service or course by part of its title in a subcategory
router.get("/:search/:subCategoryID", searchServiceAndCourseInSubCategory);

module.exports = router;
