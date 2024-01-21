// controller for categories it is data access layer

let Category = require("../model/categories");
const asyncHandler = require("express-async-handler");

// import class ApiError for sending error to it
let ApiError = require("../util/apiError");

// Get all categories
// let getAllCategories = (req, res) => {
//   Category.find().then((categories) =>
//     res.status(200).json({ results: categories.length, categories })
//   );
// };

// // get categroy in a specific page and limit
// let getCategoriesLimitSkip = (req, res) => {
//   const page = parseInt(req.query.page) || 1;
//   const limit = parseInt(req.query.limit) || 10;
//   const startIndex = (page - 1) * limit;
//   Category.find()
//     .limit(limit)
//     .skip(startIndex)
//     .then((categories) => {
//       res.json({
//         results: categories.length,
//         categories,
//       });
//     })
//     .catch((err) => res.status(400).json(`Error: ${err}`));
// };

// Get all categories with pagination and if there is no page or limit in the query string it will return all categories
let getAllCategories = (req, res) => {
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit) || 10;
  const startIndex = (page - 1) * limit;
  console.log(`page: ${page}, limit: ${limit}, startIndex: ${startIndex}`); // page: 1, limit: 2, startIndex: 0
  if (page && limit) {
    Category.find()
      .limit(limit)
      .skip(startIndex)
      .then((categories) => {
        res.json({
          results: categories.length,
          categories,
        });
      })
      .catch((err) => res.status(400).json(`Error: ${err}`));
  } else {
    Category.find()
      .then((categories) =>
        res.status(200).json({ results: categories.length, categories })
      )
      .catch((err) => res.status(400).json(`Error: ${err}`));
  }
}; // http://localhost:8000/api/categories?page=1&limit=2

// Get category by id
let getCategoryById = asyncHandler(async (req, res, next) => {
  console.log("hi");
  //   Category.findById(req.params.id)
  //     .then((category) => res.json(category))
  //     .catch((err) => res.status(400).json(`Error: ${err}`));
  let category = await Category.findById(req.params.id);
  console.log(category);
  if (category) {
    res.status(200).json({ category });
  } else {
    next(new ApiError("category not found", 404));
  }
});

// Add new category
let addCategory = (req, res) => {
  const newCategory = new Category({
    name: req.body.name,
    description: req.body.description,
  });
  newCategory
    .save()
    .then((category) => res.status(201).json(category))
    .catch((err) => res.status(400).json(`Error: ${err}`));
};

// Update category by id
let updateCategory = asyncHandler(async (req, res, next) => {
  console.log(req.params.id);
  console.log(req.body);
  let { name, description } = req.body;
  let category = await Category.findByIdAndUpdate(
    req.params.id,
    {
      name,
      description,
    },
    {
      new: true,
    }
  );
  if (category) {
    console.log({ msg: "cagtegory updated successfully", data: category });
    res
      .status(200)
      .json({ msg: "cagtegory updated successfully", data: category });
  } else {
    next(new ApiError("category not found", 404));
  }
});

// Delete category by id with asyncHandler
let deleteCategory = asyncHandler(async (req, res, next) => {
  const category = await Category.findByIdAndDelete(req.params.id);
  console.log(category);
  if (category) {
    res.json({ msg: "Category deleted successfully", category });
  } else {
    next(new ApiError("category not found", 404));
  }
});

// delete all categories
let deleteAllCategories = (req, res) => {
  Category.deleteMany()
    .then(() => res.json("All categories deleted successfully"))
    .catch((err) => res.status(400).json(`Error: ${err}`));
};
module.exports = {
  getAllCategories,
  getCategoryById,
  addCategory,
  updateCategory,
  deleteCategory,
  deleteAllCategories,
};
