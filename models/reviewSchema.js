const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema(
  {
    reviewID: String,
    serviceID: { type: mongoose.Schema.Types.ObjectId, required: true },
    clientID: { type: mongoose.Schema.Types.ObjectId, required: true },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
      validate: {
        validator: Number.isInteger,
        message: "{VALUE} is not an integer value for rating.",
      },
    },
    comment: String,
  },
  {
    timestamps: true,
  }
);

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
