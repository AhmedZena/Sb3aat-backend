let express = require("express");
let router = express.Router();
// let Category = require("../model/categories");

let {
  getCategoryByIdValidator,
  createCategoryValidator,
  updateCategoryValidator,
  deleteCategoryValidator,
} = require("../util/validators/categoryValidator");

let {
  getAllCategories,
  getCategoryById,
  addCategory,
  updateCategory,
  deleteCategory,
  deleteAllCategories,
} = require("../controllers/categories");

//  one line
router
  .route("/")
  .get(getAllCategories)
  .post(createCategoryValidator, addCategory)
  .delete(deleteAllCategories);

router
  .route("/:id")
  .get(getCategoryByIdValidator, getCategoryById)
  .patch(updateCategoryValidator, updateCategory)
  .delete(deleteCategoryValidator, deleteCategory);

// router.route("/:id").get(

module.exports = router;
