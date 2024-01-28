const express = require("express");
const router = express.Router();
// const notificationController = require("../controllers/notificationController");

const {
  getAllNotifications,
  getNotificationsByUserId,
  updateNotificationReadStatus,
  postNotification,
} = require("../controllers/notificationController");

// Destructured imports
const {
  verifyToken,
  adminVerfied,
  clientVerfied,
  freelancerVerified,
  adminOrFreelancerVerified,
  freelancerOrClientVerified,
} = require("../middlewares/auth");

// Routes using the middleware
router.get("/", verifyToken, adminVerfied, getAllNotifications);
router.get("/user", verifyToken, getNotificationsByUserId);
router.patch("/:id", verifyToken, adminVerfied, updateNotificationReadStatus);
router.post("/", verifyToken, postNotification);

module.exports = router;
