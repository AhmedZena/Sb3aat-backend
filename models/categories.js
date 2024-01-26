// schema
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Category name is required"],
      unique: [true, "Category name must be unique"],
    },
    slug: {
      type: String,
      required: [true, "Category slug is required"],
      unique: [true, "Category slug must be unique"],
      lowercase: true,
    },
    description: {
      type: String,
      required: [true, "Category description is required"],
    },

    // • CatImgSrc: String (URL format)
    catImgSrc: {
      type: String,
      required: [true, "Category image is required"],
    },
  },
  {
    timestamps: true,
  }
);

// check if category name is unique
categorySchema.path("name").validate(async (value) => {
  const nameCount = await mongoose.models.Category.countDocuments({
    name: value,
  });
  return !nameCount;
}, "Category name already exists");

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
