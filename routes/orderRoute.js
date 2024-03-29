// routes/order.js
const express = require("express");
const router = express.Router();
const {
  createOrder,
  getOrderByClient,
  getOrderByFreelancer,
  getOrderById,
  updateOrderById,
  deleteOrder,
  getOrders,
} = require("../controllers/orderController");

const {
  clientVerfied,
  freelancerVerfied,
  verifyToken,
} = require("../middlewares/auth");

// @route   POST api/orders

// router.post("/", createOrder);
// Create Order
router.post("/", createOrder);

// Get Orders
router.get("/", getOrders);

// Orders by Client
router.get("/client/:clientId", getOrderByClient);

// Orders by Freelancer
router.get(
  "/freelancer/:freelancerId",
  freelancerVerfied,
  getOrderByFreelancer
);

// Order Details
router.get("/:orderId", getOrderById);

// Update Order
router.patch("/:orderId", verifyToken, updateOrderById);

// Delete Order
router.delete("/:orderId", clientVerfied, deleteOrder);

module.exports = router;
