// serviceControl.js
const { parse } = require("dotenv");
const coursesModel = require("./../model/coursesModel");

const createCourses = (req, res) => {
  console.log(req.body);
  const {
    FreelancerId,
    Title,
    Description,
    CategoryID,
    Price,
    Duration,
    CourseMaterial,
  } = req.body;
  console.log(
    FreelancerId,
    Title,
    Description,
    CategoryID,
    Price,
    Duration,
    CourseMaterial
  );

  try {
    const newCourses = new coursesModel({
      FreelancerId,
      Title,
      Description,
      CategoryID,
      Price,
      Duration,
      CourseMaterial,
    });

    newCourses
      .save()
      .then((savedCourses) => {
        res.status(201).json(savedCourses);
      })
      .catch((error) => {
        res
          .status(500)
          .json({ error: "Failed to create Courses", details: error });
      });
  } catch (error) {
    res.status(400).json({ error: "Invalid request", details: error });
  }
};

// get all service...
const getCourses = (req, res) => {
  if (!req.body) {
    return res.status(400).json({ error: "Empty request body" });
  }

  serviceModel
    .find()
    .then((courses) => {
      res.status(200).json(courses);
    })
    .catch((error) => {
      res
        .status(500)
        .json({ error: "Failed to retrieve courses", details: error });
    });
};
//get courses by id :-
const getCoursesById = (req, res) => {
  let coursesId = req.params.coursesId;
  //checking for valid id or not
  if (!coursesId) {
    coursesModel.find().then((courses) => {
      res.status(200).json(courses);
    });
  } else {
    coursesModel.findOne({ _id: coursesId }).then((courses) => {
      res.status(200).json(courses);
    });
  }
};

// update courses :-

const updateCourses = (req, res) => {
  const coursesId = parseInt(req.params.id);
  const updatedFields = req.body;

  if (!coursesId || Object.keys(updatedFields).length === 0) {
    return res
      .status(400)
      .json({ error: "Invalid request. Missing id or updatedFields." });
  }

  coursesModel
    .findOneAndUpdate(
      { coursesId: coursesId },
      { $set: updatedFields },
      { new: true }
    )
    .then((updatedCourses) => {
      res.status(200).json(updatedCourses);
    })
    .catch((error) => {
      res
        .status(500)
        .json({ error: "Failed to update courses", details: error });
    });
};
//delete courses :-
const deleteCourses = (req, res) => {
  let coursesId = parseInt(req.params.id);

  coursesModel.findOneAndDelete({ _id: coursesId }, (error, result) => {
    if (error) {
      console.error("Error deleting courses:", error);
      res.status(500).json({ error: "Internal Server Error" });
    } else if (!result) {
      res.status(404).json({ error: "courses not found" });
    } else {
      res.status(200).json({ message: "courses deleted successfully" });
    }
  });
};

module.exports = {
  createCourses,
  getCourses,
  updateCourses,
  getCoursesById,
  deleteCourses,
};
