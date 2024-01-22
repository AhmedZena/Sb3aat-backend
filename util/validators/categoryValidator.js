const { check } = require("express-validator");
let validatorMiddleware = require("../../middlewares/validatorMiddleware");
exports.getCategoryByIdValidator = [
  check("id").isMongoId().withMessage("Invalid category id"),
  validatorMiddleware,
];

// make validator for create category , update category, delete category
exports.createCategoryValidator = [
  check("name").notEmpty().withMessage("Category name is required"),
  check("description")
    .notEmpty()
    .withMessage("Category description is required"),
  check("catImgSrc").notEmpty().withMessage("Category image is required"),
  validatorMiddleware,
];

exports.updateCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid category id"),
  check("name")
    .optional()
    .notEmpty()
    .withMessage("Category name is must not be empty it is  required "),
  check("slug").optional().notEmpty().withMessage("Category slug is required"),
  check("description")
    .optional()
    .notEmpty()
    .withMessage("Category description is required"),
  check("catImgSrc")
    .optional()
    .notEmpty()
    .withMessage("Category image is required"),
  validatorMiddleware,
];

exports.deleteCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid category id"),
  validatorMiddleware,
];
