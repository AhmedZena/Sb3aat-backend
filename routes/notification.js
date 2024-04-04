const express = require("express");
const router = express.Router();
// const notificationController = require("../controllers/notificationController");

const {
  getAllNotifications,
  updateNotificationReadStatus,
  postNotification,
  getUnreadNotificationsByUserId,
  getNotificationByUserId,
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
router.get("/unread", verifyToken, getUnreadNotificationsByUserId);
router.patch("/:id", verifyToken, updateNotificationReadStatus);
router.post("/", verifyToken, postNotification);
router.get("/user", verifyToken, getNotificationByUserId);

module.exports = router;
