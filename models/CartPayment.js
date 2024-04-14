const mongoose = require("mongoose");

const CartPaymentModel = mongoose.Schema(
  {
    cartItems: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "service" || "course",
          required: true,
        },
        productType: {
          type: String,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    totalCartPrice: {
      type: Number,
      required: true,
    },
    totalPriceAfterDiscount: {
      type: Number,
    },
    isPaid:{
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);
const CartPayment = mongoose.model("CartPayment", CartPaymentModel);

module.exports = CartPayment;
