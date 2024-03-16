let express = require("express");
let router = express.Router();

let {
  getAllSubCategories,
  getSubCategoryById,
  addSubCategory,
  updateSubCategory,
  deleteSubCategory,
  deleteAllSubCategories,
  getAllSubByCategoryId,
} = require("../controllers/subCategories");

// Define routes
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

// Route to get all subcategories by category id
router.route("/category/:categoryId").get(getAllSubByCategoryId);

module.exports = router;
