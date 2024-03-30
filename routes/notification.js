const express = require("express");
const router = express.Router();
// const notificationController = require("../controllers/notificationController");

const {
  getAllNotifications,
  getNotificationsByUserId,
  updateNotificationReadStatus,
  postNotification,
  getUnreadNotificationsByUserId,
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
router.get("/unread", verifyToken, getUnreadNotificationsByUserId);
router.patch("/:id", verifyToken, updateNotificationReadStatus);
router.post("/", verifyToken, postNotification);

module.exports = router;
