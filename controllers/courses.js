const coursesModel = require("../models/courses");

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

  // try {
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
        .json({ error: "Failed to create Courses", details: error.message });
    });
  // } catch (error) {
  //   res.status(400).json({ error: "Invalid request", details: error });
  // }
};

// get all ...
const getCourses = (req, res) => {
  coursesModel
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
//get courses by categoryID:-
const getCoursesByCategoryId = (req, res) => {
  coursesModel
    .find({ CategoryID: req.params.id })
    .then((courses) => res.json(courses))
    .catch((err) => res.status(400).json(`Error: ${err}`));
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
    .findByIdAndUpdate(
      req.params.id,

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
const deleteCourById = async (req, res) => {
  let courseId = req.params.id;

  try {
    const result = await coursesModel.findByIdAndDelete(courseId);
    console.log(result);
    if (!result) {
      res.status(404).json({ error: "Course not found" });
    } else {
      res.status(200).json({ message: "Course deleted successfully" });
    }
  } catch (error) {
    console.error("Error deleting course:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

let deleteAllCourses = (req, res) => {
  coursesModel
    .deleteMany()
    .then(() => res.json("All courses deleted successfully"))
    .catch((err) => res.status(400).json(`Error: ${err}`));
};

module.exports = {
  createCourses,
  getCourses,
  updateCourses,
  getCoursesById,
  deleteCourById,
  deleteAllCourses,
  getCoursesByCategoryId,
};
