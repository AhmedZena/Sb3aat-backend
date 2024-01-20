let express = require("express");
let router = express.Router();
let Category = require("../model/categories");
let {
  getAllCategories,
  getCategoryById,
  addCategory,
  updateCategory,
  deleteCategory,
  deleteAllCategories,
} = require("../controller/categories");

//  one line
router
  .route("/")
  .get(getAllCategories)
  .post(addCategory)
  .delete(deleteAllCategories);

router
  .route("/:id")
  .get(getCategoryById)
  .patch(updateCategory)
  .delete(deleteCategory);

module.exports = router;
