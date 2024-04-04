const mongoose = require("mongoose");

const CartPaymentModel = mongoose.Schema(
  {
    orderId: { type: mongoose.Schema.Types.ObjectId, ref: "Order" },
    clientId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    amount: { type: Number, ref: "Order", required: true },
    paymentMethod: { type: String, required: true },
    paymentDate: { type: Date, required: true },
    deliveredStatus: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const CartPayment = mongoose.model("CartPayment", CartPaymentModel);

module.exports = CartPayment;
