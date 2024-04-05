const asyncHandler = require("express-async-handler");

const ApiError = require("../util/apiError");

const cartPaymentModel = require("../models/CartPayment");

const serviceModel = require("../models/serviceModel");
const courseModel = require("../models/courses");

/*const CartPaymentModel = mongoose.Schema(
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
*/
// add product to cart ,
const addProductToCart = asyncHandler(async (req, res, next) => {
  const { productId, productType, quantity } = req.body;
  // prdouct may be service or course
  let product;
  if (productType === "service") {
    product = await serviceModel.findById(productId);
  } else if (productType === "course") {
    product = await courseModel.findById(productId);
  }
  if (!product) {
    return next(new ApiError("Product not found", 404));
  }
  // get cart from user
  let cart = await cartPaymentModel.findOne({ user: req.user.id });
  if (!cart) {
    cart = await cartPaymentModel.create({
      user: req.user.id,
      cartItems: [
        { product: productId, productType, quantity, price: product.price },
      ],
      totalCartPrice: product.price * quantity,
    });
  } else {
    // check if product already exist in cart
    const productExist = cart.cartItems.find(
      (item) => item.product == productId
    );
    if (productExist) {
      productExist.quantity = quantity;
      productExist.price = product.price * quantity;
    } else {
      cart.cartItems.push({
        product: productId,
        productType,
        quantity,
        price: product.price * quantity,
      });
    }
    cart.totalCartPrice = cart.cartItems.reduce(
      (acc, item) => acc + item.price,
      0
    );
    await cart.save();
  }
  res.status(200).json({
    status: "success",
    data: cart,
  });
});

// get cart by user
const getCartByUser = asyncHandler(async (req, res, next) => {
  const cart = await cartPaymentModel.findOne({ user: req.user.id });
  if (!cart) {
    return next(new ApiError("Cart not found", 404));
  }
  //   get service or course details
  const cartItems = await Promise.all(
    cart.cartItems.map(async (item) => {
      let product = await serviceModel.findById(item.product);
      if (!product) {
        product = await courseModel.findById(item.product);
      }
      return {
        product,
        productType: item.productType,
        quantity: item.quantity,
        price: item.price,
      };
    })
  );
  res.status(200).json({
    cartItems,
    totalCartPrice: cart.totalCartPrice,
  });
});

// get all carts
const getAllCarts = asyncHandler(async (req, res, next) => {
  const carts = await cartPaymentModel.find();
  res.status(200).json({
    status: "success",
    data: carts,
  });
});

// remove product from cart
const removeProductFromCart = asyncHandler(async (req, res, next) => {
  const { productId } = req.params;
  const cart = await cartPaymentModel.findOne({ user: req.user.id });
  if (!cart) {
    return next(new ApiError("Cart not found", 404));
  }
  const productExist = cart.cartItems.find((item) => item.product == productId);
  if (!productExist) {
    return next(new ApiError("Product not found in cart", 404));
  }
  cart.cartItems = cart.cartItems.filter((item) => item.product != productId);
  cart.totalCartPrice = cart.cartItems.reduce(
    (acc, item) => acc + item.price,
    0
  );
  await cart.save();
  res.status(200).json({
    status: "success",
    data: cart,
  });
});

module.exports = {
  addProductToCart,
  getCartByUser,
  getAllCarts,
  removeProductFromCart,
};
