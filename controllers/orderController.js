// const OrderModel = require("../models/order");
const OrderModel = require("../models/order");

// create order
const createOrder = (req, res) => {
  console.log(req.body);
  let body = req.body;
  if (!body) {
    return res.status(400).json({ error: "Empty request body" });
  }
  const newOrder = new OrderModel(body);
  newOrder
    .save()
    .then((savedOrder) => {
      res.status(201).json(savedOrder);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: "Failed to create order", details: error });
    });
};

//  get Orders for Client by id
const getOrderByClient = async (req, res) => {
  try {
    const orders = await OrderModel.find({ clientId: req.params.clientId });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//  get Orders for freelancer by id
const getOrderByFreelancer = async (req, res) => {
  try {
    const orders = await OrderModel.find({
      freelancerId: req.params.freelancerId,
    });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// get order by id
const getOrderById = async (req, res) => {
  try {
    // const order = await OrderModel.findOne({ orderId: req.params.orderId });

    const order = await OrderModel.findById(req.params.orderId);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// update order
const updateOrderById = async (req, res) => {
  try {
    const order = await OrderModel.findOneAndUpdate(
      //   { orderId: req.params.orderId },
      { _id: req.params.orderId },
      { $set: req.body },
      { new: true }
    );
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// delete order
const deleteOrder = async (req, res) => {
  try {
    const order = await OrderModel.findOneAndDelete({
      //   orderId: req.params.orderId,
      _id: req.params.orderId,
    });
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createOrder,
  getOrderByClient,
  getOrderByFreelancer,
  getOrderById,
  updateOrderById,
  deleteOrder,
};
