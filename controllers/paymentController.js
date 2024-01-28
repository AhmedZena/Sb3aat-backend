const Payment = require("../models/paymentSchema");

// Create a new payment (authenticated, client only)
const createNewPayment = (req, res) => {
  const { orderId, clientId, amount, paymentMethod, paymentDate } = req.body;

  try {
    const newPayment = new Payment({
      orderId,
      clientId,
      amount,
      paymentMethod,
      paymentDate,
    });

    newPayment
      .save()
      .then((savedPayment) => {
        res.status(201).json(savedPayment);
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

// get all payments
let getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find();
    res.status(200).json(payments);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Get payment details by ID
const getPaymentById = (req, res) => {
  const { paymentId } = req.params;

  Payment.findOne({ _id: paymentId })
    .then((payment) => {
      if (!payment) {
        return res
          .status(404)
          .json({ error: "Payment with that id not found" });
      }
      res.status(200).json(payment);
    })
    .catch((error) => {
      res
        .status(500)
        .json({ error: "Internal Server Error", details: error.message });
    });
};

// Get payments by client ID (authenticated, client only)
const getPaymentsByClient = (req, res) => {
  console.log(req.user);
  const { id } = req.user;
  console.log(id);
  console.log(id);
  console.log(id);
  console.log(id);
  console.log(id);
  console.log(id);
  Payment.find({ clientId: id })
    .then((payments) => {
      if (!payments) {
        return res.status(404).json({ error: "Payment not found" });
      }
      res.status(200).json(payments);
    })
    .catch((error) => {
      res
        .status(500)
        .json({ error: "Internal Server Error", details: error.message });
    });
};

// Update payment status by ID (authenticated)
const updatePaymentStatus = (req, res) => {
  const { paymentId } = req.params;
  const { deliveredStatus } = req.body;
  console.log(paymentId);
  Payment.findOneAndUpdate(
    { _id: paymentId },
    { deliveredStatus },
    { new: true }
  )
    .then((updatedPayment) => {
      if (!updatedPayment) {
        return res.status(404).json({ error: "Payment not found" });
      }
      res.status(200).json(updatedPayment);
    })
    .catch((error) => {
      res
        .status(500)
        .json({ error: "Internal Server Error", details: error.message });
    });
};

// Delete payment record by ID (authenticated, client only)
const deletePaymentRecord = (req, res) => {
  const { paymentId } = req.params;

  Payment.findOneAndDelete({ _id: paymentId })
    .then((deletedPayment) => {
      if (!deletedPayment) {
        return res.status(404).json({ error: "Payment not found" });
      }
      res.status(200).json({ message: "Payment deleted successfully" });
    })
    .catch((error) => {
      res
        .status(500)
        .json({ error: "Internal Server Error", details: error.message });
    });
};

module.exports = {
  createNewPayment,
  getPaymentById,
  getAllPayments,
  getPaymentsByClient,
  updatePaymentStatus,
  deletePaymentRecord,
};
