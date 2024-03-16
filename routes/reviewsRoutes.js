const express = require("express");
const router = express.Router();
const {
  getReviews,
  getReviewsByServiceId,
  createNewReview,
  updateReview,
  deleteReview,
} = require("../controllers/reviewsApi");

// auth
const {
  verifyToken,
  adminVerfied,
  clientVerfied,
} = require("../middlewares/auth");

// get all reviews
router.get("/", getReviews);

// get reviews by service id
router.get("/:service_id", getReviewsByServiceId);
// creat review
router.post("/", verifyToken, clientVerfied, createNewReview);
// update review
router.put("/", updateReview);
// delete review
router.delete("/:id", verifyToken, adminVerfied, deleteReview);

// Export the router
module.exports = router;
