// controller for categories it is data access layer

let SubCategories = require("../models/subCategories");
const asyncHandler = require("express-async-handler");

// import class ApiError for sending error to it
let ApiError = require("../util/apiError");

// Get all categories with pagination and if there is no page or limit in the query string it will return all categories
let getAllSubCategories = (req, res) => {
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit) || 10;
  const startIndex = (page - 1) * limit;
  console.log(`page: ${page}, limit: ${limit}, startIndex: ${startIndex}`); // page: 1, limit: 2, startIndex: 0
  if (page && limit) {
    SubCategories.find()
      .limit(limit)
      .skip(startIndex)
      .then((subCategories) => {
        res.json({
          results: subCategories.length,
          subCategories,
        });
      })
      .catch((err) => res.status(400).json(`Error: ${err}`));
  } else {
    SubCategories.find()
      .then((subCategories) =>
        res.status(200).json({ results: subCategories.length, subCategories })
      )
      .catch((err) => res.status(400).json(`Error: ${err}`));
  }
}; // http://localhost:8000/api/categories?page=1&limit=2

// Get category by id
let getSubCategoryById = asyncHandler(async (req, res, next) => {
  let subCategory = await SubCategories.findById(req.params.id);
  console.log(subCategory);
  if (subCategory) {
    res.status(200).json({ subCategory });
  } else {
    next(new ApiError("category not found", 404));
  }
});
// Get all subcategories by category ID
let getAllSubByCategoryId = asyncHandler(async (req, res, next) => {
  let subCategories = await SubCategories.find({
    categoryId: req.params.categoryId,
  });
  console.log(subCategories);
  if (subCategories) {
    res.status(200).json({ subCategories });
  } else {
    next(new ApiError("subcategories not found", 404));
  }
});

//  Get subcategories by category id
let getSubByCategoriesByCategoryId = (req, res) => {
  SubCategories.find({ categoryId: req.params.id })
    .then((subCategories) => res.json(subCategories))
    .catch((err) => res.status(400).json(`Error: ${err}`));
};

// Add new category
let addSubCategory = (req, res) => {
  //   const newCategory = new Category(req.body);
  const { name, description, subCatImgSrc, categoryId } = req.body;
  let slug = name.trim().replace(/ /g, "-");
  const newSubCategory = new SubCategories({
    name,
    description,
    slug,
    subCatImgSrc,
    categoryId,
  });
  console.log(newSubCategory);
  newSubCategory
    .save()
    .then((subCategory) => res.status(201).json(subCategory))
    .catch((err) => res.status(400).json(`Error: ${err}`));
};

// Update sub category by id
let updateSubCategory = asyncHandler(async (req, res, next) => {
  //   console.log(req.params.id);
  //   console.log(req.body);
  let { name, description, subCatImgSrc } = req.body;
  let slug = name.trim().replace(/ /g, "-");

  let subCategory = await SubCategories.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        name,
        description,
        slug,
        subCatImgSrc,
      },
    },
    {
      new: true,
    }
  );
  if (subCategory) {
    console.log({ msg: "subCategory updated successfully", data: subCategory });
    res
      .status(200)
      .json({ msg: "subCategory updated successfully", data: subCategory });
  } else {
    next(new ApiError("subCategory not found", 404));
  }
});

// Delete subcat by id with asyncHandler
let deleteSubCategory = asyncHandler(async (req, res, next) => {
  const subCategory = await SubCategories.findByIdAndDelete(req.params.id);
  console.log(subCategory);
  if (subCategory) {
    res.json({ msg: "Category deleted successfully", subCategory });
  } else {
    next(new ApiError("category not found", 404));
  }
});

// delete all categories
let deleteAllSubCategories = (req, res) => {
  SubCategories.deleteMany()
    .then(() => res.json("All SubCategories deleted successfully"))
    .catch((err) => res.status(400).json(`Error: ${err}`));
};

module.exports = {
  getAllSubCategories,
  getSubCategoryById,
  getAllSubByCategoryId,
  addSubCategory,
  updateSubCategory,
  deleteSubCategory,
  deleteAllSubCategories,
  getSubByCategoriesByCategoryId,
};
