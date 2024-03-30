// search service or course by part of title in params
const serviceModel = require("../models/serviceModel");
const courseModel = require("../models/courses");
const subCategoryModel = require("../models/subCategories");
// Search for a service and course by part of its title
const searchServiceAndCourse = (req, res) => {
  const searchQuery = req.params.search;

  // Execute both searches in parallel
  Promise.all([
    serviceModel.find({ title: { $regex: searchQuery, $options: "i" } }),
    courseModel.find({ title: { $regex: searchQuery, $options: "i" } }),
  ])
    .then(([services, courses]) => {
      // Combine the results
      const combinedResults = { services, courses };
      res.status(200).json(combinedResults);
    })
    .catch((error) => {
      res
        .status(500)
        .json({ error: "Error retrieving data", details: error.message });
    });
};

// search service
const searchService = (req, res) => {
  const searchQuery = req.params.search;

  serviceModel
    .find({ title: { $regex: searchQuery, $options: "i" } })
    .then((services) => {
      res.status(200).json(services);
    })
    .catch((error) => {
      res
        .status(500)
        .json({ error: "Error retrieving data", details: error.message });
    });
};

// search course
const searchCourse = (req, res) => {
  const searchQuery = req.params.search;

  courseModel
    .find({ title: { $regex: searchQuery, $options: "i" } })
    .then((courses) => {
      res.status(200).json(courses);
    })
    .catch((error) => {
      res
        .status(500)
        .json({ error: "Error retrieving data", details: error.message });
    });
};

// search service title in subcategory
const searchServiceInSubCategory = (req, res) => {
  const searchQuery = req.params.search;
  const subCategoryID = req.params.subCategoryID;

  serviceModel
    .find({
      title: { $regex: searchQuery, $options: "i" },
      subCategoryID,
    })
    .then((services) => {
      res.status(200).json(services);
    })
    .catch((error) => {
      res
        .status(500)
        .json({ error: "Error retrieving data", details: error.message });
    });
};

// search course title in subcategory
const searchCourseInSubCategory = (req, res) => {
  const searchQuery = req.params.search;
  const subCategoryID = req.params.subCategoryID;

  courseModel
    .find({
      title: { $regex: searchQuery, $options: "i" },
      subCategoryID,
    })
    .then((courses) => {
      res.status(200).json(courses);
    })
    .catch((error) => {
      res
        .status(500)
        .json({ error: "Error retrieving data", details: error.message });
    });
};

// search both service and course in subcategory
const searchServiceAndCourseInSubCategory = (req, res) => {
  const searchQuery = req.params.search;
  const subCategoryID = req.params.subCategoryID;

  // Execute both searches in parallel
  Promise.all([
    serviceModel.find({
      title: { $regex: searchQuery, $options: "i" },
      subCategoryID,
    }),
    courseModel.find({
      title: { $regex: searchQuery, $options: "i" },
      subCategoryID,
    }),
  ])
    .then(([services, courses]) => {
      // Combine the results
      const combinedResults = { services, courses };
      res.status(200).json(combinedResults);
    })
    .catch((error) => {
      res
        .status(500)
        .json({ error: "Error retrieving data", details: error.message });
    });
};

module.exports = {
  searchServiceAndCourse,
  searchService,
  searchCourse,
  searchServiceInSubCategory,
  searchCourseInSubCategory,
  searchServiceAndCourseInSubCategory,
};
