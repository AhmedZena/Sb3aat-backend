let express = require("express");
let router = express.Router();
// let Category = require("../model/categories");

let {
  addProductToCart,
  getCartByUser,
  getAllCarts,
  removeProductFromCart,
  updateProductInCart,
  updateManyProductsInCart,
  removeAllProductsFromCart,
} = require("../controllers/CartPayment");
let {
  verifyToken,
  freelancerOrClientVerified,
} = require("../middlewares/auth");

router.get("/", verifyToken, getCartByUser);
router.post("/", verifyToken, freelancerOrClientVerified, addProductToCart);
router.get("/getAllCarts", verifyToken, getAllCarts);
router.delete(
  "/removeProduct/:productId",
  verifyToken,
  freelancerOrClientVerified,
  removeProductFromCart
);

router.patch(
  "/updateProduct/:productId",
  verifyToken,
  freelancerOrClientVerified,
  updateProductInCart
);

router.patch(
  "/updateManyProducts",
  verifyToken,
  freelancerOrClientVerified,
  updateManyProductsInCart
);

router.delete(
  "/removeAllProducts",
  verifyToken,
  freelancerOrClientVerified,
  removeAllProductsFromCart
);

module.exports = router;
