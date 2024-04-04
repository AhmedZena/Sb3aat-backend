const express = require("express");

const router = express.Router();

const {
  getAllCoupons,
  getCoupon,
  createCoupon,
  updateCoupon,
  deleteCoupon,
} = require("../controllers/couponController");

// admin in middleware auth
const { adminVerfied } = require("../middlewares/auth");

router
  .route("/")
  .get(adminVerfied, getAllCoupons)
  .post(adminVerfied, createCoupon);

router
  .route("/:id")
  .get(getCoupon)
  .patch(adminVerfied, updateCoupon)
  .delete(adminVerfied, deleteCoupon);
module.exports = router;
