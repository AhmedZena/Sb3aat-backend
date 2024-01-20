// controller for categories it is data access layer

let Category = require("../model/categories");

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
let getCategoryById = (req, res) => {
  Category.findById(req.params.id)
    .then((category) => res.json(category))
    .catch((err) => res.status(400).json(`Error: ${err}`));
};

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
let updateCategory = (req, res) => {
  console.log(req.params.id);
  Category.findById(req.params.id)
    .then((category) => {
      category.name = req.body.name;
      category.description = req.body.description;
      console.log(category);
      category
        .save()
        .then(() => res.json("Category updated successfully"))
        .catch((err) => res.status(400).json(`Error: ${err}`));
    })
    .catch((err) => res.status(400).json(`Error: ${err}`));
};

// Delete category by id
let deleteCategory = (req, res) => {
  Category.findByIdAndDelete(req.params.id).then((data) => {
    if (!data) {
      res.status(404).json("Category not found");
    } else {
      res.json("Category deleted successfully");
    }
  });
};

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
