// schema
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const subCategorySchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "subCategory name is required"],
      unique: [true, "subCategory name must be unique"],
    },
    slug: {
      type: String,
      required: [true, "subCategory slug is required"],
      unique: [true, "subCategory slug must be unique"],
      lowercase: true,
    },
    description: {
      type: String,
      required: [true, "subCategory description is required"],
    },

    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "category",
      required: [true, "category id is required"],
    },

    // • CatImgSrc: String (URL format)
    subCatImgSrc: {
      type: String,
      required: [true, "subCategory image is required"],
    },
  },
  {
    timestamps: true,
  }
);

// check if subCategory name is unique
subCategorySchema.path("name").validate(async (value) => {
  const nameCount = await mongoose.models.subCategory.countDocuments({
    name: value,
  });
  return !nameCount;
}, "subCategory name already exists");

const subCategory = mongoose.model("subCategory", subCategorySchema);

module.exports = subCategory;
