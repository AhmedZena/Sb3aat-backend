const mongoose = require("mongoose");

const couponSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Coupon name is required"],
      unique: [true, "Coupon name must be unique"],
      trim: true,
    },
    expire: {
      type: Date,
      required: [true, "Coupon expire date is required"],
    },
    discount: {
      type: Number,
      required: [true, "Coupon discount is required"],
    },
    status: {
      type: String,
      default: "active",
      enum: ["active", "expired"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Coupon", couponSchema);
