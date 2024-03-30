const express = require("express");
const router = express.Router();
const {
  searchServiceAndCourse,
  searchService,
  searchCourse,
} = require("../controllers/searchController");

// search for a service or course by part of its title
router.get("/:search", searchServiceAndCourse);

// search for a service by part of its title
router.get("/service/:search", searchService);

// search for a course by part of its title
router.get("/course/:search", searchCourse);

module.exports = router;
