const asyncHandler = require("express-async-handler");

const ApiError = require("../util/apiError");

const cartPaymentModel = require("../models/CartPayment");

const serviceModel = require("../models/serviceModel");
const courseModel = require("../models/courses");

const couponModel = require("../models/coupon");

// function to calculate total price of cart
const calculateTotalPrice = (cart) => {
  // make
  cart.totalPriceAfterDiscount = undefined;
  return cart.cartItems.reduce((acc, item) => acc + item.price, 0);
};

// add product to cart ,
const addProductToCart = asyncHandler(async (req, res, next) => {
  let { productId, productType, quantity } = req.body;
  // prdouct may be service or course
  let product;
  if (productType === "service") {
    product = await serviceModel.findById(productId);
  } else if (productType === "course") {
    product = await courseModel.findById(productId);
    quantity = 1;
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
    cart.totalCartPrice = calculateTotalPrice(cart);
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

// update product in cart
const updateProductInCart = asyncHandler(async (req, res, next) => {
  const { productId } = req.params;
  const { quantity } = req.body;
  const cart = await cartPaymentModel.findOne({ user: req.user.id });
  if (!cart) {
    return next(new ApiError("Cart not found", 404));
  }
  const productExist = cart.cartItems.find((item) => item.product == productId);
  if (!productExist) {
    return next(new ApiError("Product not found in cart", 404));
  }
  productExist.quantity = quantity;
  productExist.price = productExist.product.price * quantity;
  cart.totalCartPrice = calculateTotalPrice(cart);
  await cart.save();
  res.status(200).json({
    status: "success",
    data: cart,
  });
});

// usage
// {
//   "quantity": 2
// }

// update many products in cart
const updateManyProductsInCart = asyncHandler(async (req, res, next) => {
  const { cartItems } = req.body;
  console.log(cartItems);
  const cart = await cartPaymentModel.findOne({ user: req.user.id });
  if (!cart) {
    return next(new ApiError("Cart not found", 404));
  }
  cartItems.forEach((item) => {
    const productExist = cart.cartItems.find(
      (cartItem) => cartItem.product == item.productId
    );
    if (productExist) {
      productExist.quantity = item.quantity;
      productExist.price = productExist.product.price * item.quantity;
    }
  });
  cart.totalCartPrice = calculateTotalPrice(cart);
  await cart.save();
  res.status(200).json({
    status: "success",
    data: cart,
  });
});

// usage of updateManyProductsInCart
// [
//   {
//     productId: "60f4c5a4d0f9f4d9b4a5b2b3",
//     quantity: 2,
//   },
//   {
//     productId: "60f4c5a4d0f9f4d9b4a5b2b4",
//     quantity: 3,
//   },
// ];

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
  cart.totalCartPrice = calculateTotalPrice(cart);
  await cart.save();
  res.status(200).json({
    status: "success",
    data: cart,
  });
});

//remove all products from cart
const removeAllProductsFromCart = asyncHandler(async (req, res, next) => {
  //  find one and delete
  const cart = await cartPaymentModel.findOneAndDelete({ user: req.user.id });
  if (!cart) {
    return next(new ApiError("Cart not found", 404));
  }
  res.status(200).json({
    status: "success",
    message: "Cart deleted successfully",
  });
});

// applay coupon
const applyCoupon = asyncHandler(async (req, res, next) => {
  const { couponCode } = req.body;
  const coupon = await couponModel.findOne({ name: couponCode });
  if (!coupon) {
    return next(new ApiError("Coupon not found", 404));
  }
  const cart = await cartPaymentModel.findOne({ user: req.user.id });
  if (!cart) {
    return next(new ApiError("Cart not found", 404));
  }
  cart.totalPriceAfterDiscount = Math.round(
    cart.totalCartPrice - (cart.totalCartPrice * coupon.discount) / 100
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
  updateProductInCart,
  updateManyProductsInCart,
  removeAllProductsFromCart,
  applyCoupon,
};
