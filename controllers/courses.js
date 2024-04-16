const coursesModel = require("../models/courses");
const serviceModel = require("../models/serviceModel");
const createCourses = (req, res) => {
  const {
    freelancerId,
    title,
    description,
    categoryId,
    price,
    duration,
    courseMaterial,
    CourseImg,
  } = req.body;

  const newCourses = new coursesModel({
    freelancerId,
    title,
    description,
    categoryId,
    price,
    duration,
    courseMaterial,
    CourseImg,
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
};

//get all courses
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

//get courses by subcategory id
const getCoursesByCategoryId = async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    const courses = await coursesModel.find({ categoryId });

    if (!courses || courses.length === 0) {
      res.status(404).json({ error: "Courses not found" });
    } else {
      res.status(200).json(courses);
    }
  } catch (error) {
    console.error("Error getting courses by category ID:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//get courses by id
const getCoursesById = async (req, res) => {
  try {
    const coursesId = req.params.id;
    const courses = await coursesModel.findById(coursesId);

    if (!courses) {
      res.status(404).json({ error: "Course not found" });
    } else {
      res.status(200).json(courses);
    }
  } catch (error) {
    console.error("Error getting course by ID:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// update courses
const updateCourses = async (req, res) => {
  const courseId = req.params.id;
  const updatedFields = req.body;

  try {
    const updatedCourses = await coursesModel.findByIdAndUpdate(
      courseId,
      updatedFields,
      { new: true }
    );

    if (!updatedCourses) {
      res.status(404).json({ error: "Course not found" });
    } else {
      res.status(200).json(updatedCourses);
    }
  } catch (error) {
    console.error("Error updating course:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// delete course
const deleteCourById = async (req, res) => {
  const courseId = req.params.id;

  try {
    const result = await coursesModel.findByIdAndDelete(courseId);

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

// delete all courses
const deleteAllCourses = async (req, res) => {
  try {
    await coursesModel.deleteMany();
    res.json("All courses deleted successfully");
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//acceptCourseRequest
const acceptCourseRequest = async (req, res) => {
  const courseId = req.params.id;
  const updatedFields = { isAccepted: true };

  try {
    const updatedCourse = await coursesModel.findByIdAndUpdate(
      (_id = courseId),
      { $set: updatedFields },
      { new: true }
    );

    if (!updatedCourse) {
      res.status(404).json({ error: "Course not found" });
    } else {
      res.status(200).json(updatedCourse);
    }
  } catch (error) {
    console.error("Error accepting course request:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  createCourses,
  getCourses,
  updateCourses,
  getCoursesById,
  deleteCourById,
  deleteAllCourses,
  getCoursesByCategoryId,
  acceptCourseRequest,
};
