// const OrderModel = require("../models/order");
const OrderModel = require("../models/order");
/*
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
*/

const cartPaymentModel = require("../models/CartPayment");

const ApiError = require("../utils/ApiError");
const factory = require("../util/handlersFactory");
const asyncHandler = require("express-async-handler");

// create order
const createOrder = asyncHandler(async (req, res, next) => {
  const cart = await cartPaymentModel.findById(req.body.cartId);
  if (!cart) {
    return next(new ApiError("Cart not found", 404));
  }
  const cartPrice = cart.totalPriceAfterDiscount
    ? cart.totalPriceAfterDiscount
    : cart.totalCartPrice;

  const order = await OrderModel.create({
    user: req.user.id,
    cartItems: cart.cartItems,
    totalPrice: cartPrice,
    paymentMethod: req.body.paymentMethod,
  });
  res.status(201).json({
    status: "success",
    data: {
      order,
    },
  });
});

// get all orders
const getOrders = (req, res) => {};

//  get Orders for Client by id
const getOrderByClient = async (req, res) => {};

//  get Orders for freelancer by id
const getOrderByFreelancer = async (req, res) => {};

// get order by id
const getOrderById = async (req, res) => {};

// update order
const updateOrderById = async (req, res) => {};

// delete order
const deleteOrder = async (req, res) => {};

module.exports = {
  createOrder,
  getOrderByClient,
  getOrderByFreelancer,
  getOrderById,
  updateOrderById,
  deleteOrder,
  getOrders,
};
