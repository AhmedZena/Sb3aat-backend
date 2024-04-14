let Coupon = require("../models/coupon");
let factory = require("../util/handlersFactory");
console.log(factory.getAll(Coupon));
// get all
// @desc      Get all coupons
// @route     GET /api/coupons
// @access    private by admin
exports.getAllCoupons = factory.getAll(Coupon);

// get one
// @desc      Get one coupon
// @route     GET /api/coupons/:id
// @access  public
exports.getCoupon = factory.getOne(Coupon);

// create one
// @desc      Create one coupon
// @route     POST /api/coupons
// @access    private by admin
exports.createCoupon = factory.createOne(Coupon);

// update one
// @desc      Update one coupon
// @route     PATCH /api/coupons/:id
// @access    private by admin
exports.updateCoupon = factory.updateOne(Coupon);

// delete one
// @desc      Delete one coupon
// @route     DELETE /api/coupons/:id
// @access    private by admin
exports.deleteCoupon = factory.deleteOne(Coupon);
