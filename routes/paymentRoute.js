const express = require("express");
const router = express.Router();
const {
  createNewPayment,
  getPaymentById,
  getPaymentsByClient,
  updatePaymentStatus,
  deletePaymentRecord,
  getAllPayments,
} = require("../controllers/paymentController");

const {
  verifyToken,
  adminVerfied,
  clientVerfied,
  freelancerVerified,
  adminOrFreelancerVerified,
  freelancerOrClientVerified,
  adminOrClientVerified,
} = require("../middlewares/auth");

// Get payment by ID

// Create a new payment
router.post("/", verifyToken, clientVerfied, createNewPayment);

// // Update payment
// router.put("/payments/:paymentId", updatePayment);

// Get payments by client ID
// router.get("/client/:clientId", getPaymentsByClient);
router.get("/client", verifyToken, clientVerfied, getPaymentsByClient);
router.get("/:paymentId", getPaymentById);
// Get all payments
router.get("/", getAllPayments);

router.patch("/:paymentId", updatePaymentStatus);
// Update payment status by ID

// Delete payment record by ID
router.delete("/:paymentId", adminOrClientVerified, deletePaymentRecord);

// Export the router
module.exports = router;
