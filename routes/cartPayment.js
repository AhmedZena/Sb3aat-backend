let express = require("express");
let router = express.Router();
// let Category = require("../model/categories");

let {
  addProductToCart,
  getCartByUser,
  getAllCarts,
} = require("../controllers/CartPayment");
let {
  verifyToken,
  freelancerOrClientVerified,
} = require("../middlewares/auth");

router.get("/", verifyToken, getCartByUser);
router.post("/", verifyToken, freelancerOrClientVerified, addProductToCart);
router.get("/getAllCarts", verifyToken, getAllCarts);
module.exports = router;
