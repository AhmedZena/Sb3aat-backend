let express = require("express");
let router = express.Router();
// let SubCategories = require("../models/subCategories");

// let {
//   getCategoryByIdValidator,
//   createCategoryValidator,
//   updateCategoryValidator,
//   deleteCategoryValidator,
// } = require("../util/validators/categoryValidator");

let {
  getAllSubCategories,
  getSubCategoryById,
  addSubCategory,
  updateSubCategory,
  deleteSubCategory,
  deleteAllSubCategories,
  getAllSubByCategoryId,
  getSubByCategoriesByCategoryId,
} = require("../controllers/subCategories");

//  one line
router
  .route("/")
  .get(getAllSubCategories)
  .post(addSubCategory)
  .delete(deleteAllSubCategories);

router
  .route("/:id")
  .get(getSubCategoryById)
  .patch(updateSubCategory)
  .delete(deleteSubCategory);

// get subcategories by category id
router.route("/category/:id").get(getAllSubByCategoryId);

module.exports = router;
