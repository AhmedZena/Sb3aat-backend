// models/Order.js
const mongoose = require("mongoose");
let Schema = mongoose.Schema;

/*
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
  },
  {
    timestamps: true,
  }
);
const CartPayment = mongoose.model("CartPayment", CartPaymentModel);

module.exports = CartPayment;

*/
const orderSchema = new Schema({
  //   serviceOrCourseId: { type: String, required: true },
  //   clientId: { type: String, required: true },
  //   orderDate: { type: Date, required: true },
  //   deliveryDate: { type: Date },
  //   numsOrdered: { type: Number, required: true },
  //   totalPrice: { type: Number, required: true },
  //   isPaid: { type: Boolean, default: false },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Order must belong to a user"],
  },

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

  taxPrice: {
    type: Number,
    default: 0,
  },

  shippingPrice: {
    type: Number,
    default: 0,
  },

  totalPrice: {
    type: Number,
    required: true,
  },

  paymentMethod: {
    type: String,

    default: "card",
  },

  isPaid: {
    type: Boolean,
    default: false,
  },

  paidAt: {
    type: Date,
  },
});

const OrderModel = mongoose.model("Order", orderSchema);

module.exports = OrderModel;
