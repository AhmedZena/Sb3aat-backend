const review = require("../models/reviewSchema");

// get all reviews
const getReviews = (req, res) => {
  review
    .find()
    .then((reviews) => {
      res.status(200).json(reviews);
    })
    .catch((error) => {
      res.status(500).json({ error: "Internal Server Error", details: error });
    });
};

const getReviewsByServiceId = (req, res) => {
  let serviceID = req.params.service_id;
  if (!serviceID) {
    return res.status(400).json({ message: "No Service ID provided" });
  }

  review.find({ serviceID: serviceID }).then((reviews) => {
    if (!reviews || reviews.length === 0) {
      return res
        .status(404)
        .json({ message: "No Reviews found for this service" });
    }
    res.status(200).json({ reviews });
  });
};

const createNewReview = (req, res) => {
  let { reviewID, serviceID, clientID, rating, comment } = req.body;

  try {
    const newReview = new review({
      reviewID: reviewID,
      serviceID: serviceID,
      clientID: clientID,
      rating: rating,
      comment: comment,
    });

    // Saving the new review to the database
    newReview
      .save()
      .then((savedReview) => {
        return res.status(201).json(savedReview);
      })
      .catch((err) => {
        res
          .status(400)
          .json({ error: "Invalid request", details: err.message });
      });
  } catch (error) {
    res.status(400).json({ error: "Invalid request", details: error.message });
  }
};
// update review
const updateReview = (req, res) => {
  let { reviewID, serviceID, clientID, rating, comment } = req.body;
  if (!reviewID || !serviceID || !clientID) {
    return res.status(400).json({ error: "Missing required parameters" });
  }
  review
    .findOneAndUpdate(
      { reviewID: reviewID, serviceID: serviceID, clientID: clientID },
      { rating: rating, comment: comment },
      { runValidators: true },
      { new: true }
    )
    .then((updatedReview) => {
      if (!updatedReview) {
        return res.status(404).json({ error: "Review not found" });
      }
      res.status(200).json(updatedReview);
    })
    .catch((error) => {
      res
        .status(500)
        .json({ error: "Internal Server Error", details: error.message });
    });
};

// delete review
const deleteReview = (req, res) => {
  let reviewID = req.params.id;
  console.log(reviewID);
  if (!reviewID) {
    return res.status(400).json({ error: "Missing required parameters" });
  }
  console.log(review.findById(reviewID).then((review) => console.log(review)));
  review
    .findOneAndDelete({ reviewID })
    .then((deletedReview) => {
      if (!deletedReview) {
        return res.status(404).json({ error: "Review not found" });
      }
      res.status(200).json(deletedReview);
    })
    .catch((error) => {
      res
        .status(500)
        .json({ error: "Internal Server Error", details: error.message });
    });
};
module.exports = {
  getReviews,
  getReviewsByServiceId,
  createNewReview,
  updateReview,
  deleteReview,
};
