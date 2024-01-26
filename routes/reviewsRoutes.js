const express = require("express");
const router = express.Router();
const {
  getReviews,
  getReviewsByServiceId,
  createNewReview,
  updateReview,
  deleteReview,
} = require("../controllers/reviewsApi");

// get all reviews
router.get("/", getReviews);

// get reviews by service id
router.get("/:service_id", getReviewsByServiceId);
// creat review
router.post("/", createNewReview);
// update review
router.put("/", updateReview);
// delete review
router.delete("/:id", deleteReview);

// Export the router
module.exports = router;
