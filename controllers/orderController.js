const {Order}= require("../models/order")

// create order
 const createOrder =  async (req, res) => {
    try {
      const order = new Order(req.body);
      await order.save();
      res.status(201).json(order);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

//  get Orders for Client by id
  const getOrderByClient = async (req, res) => {
    try {
      const orders = await Order.find({ clientId: req.params.clientId });
      res.status(200).json(orders);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  //  get Orders for freelancer by id
   const getOrderByFreelancer =  async (req, res) => {
    try {
      const orders = await Order.find({ freelancerId: req.params.freelancerId });
      res.status(200).json(orders);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // get order by id
  const getOrderById = async (req, res) => {
    try {
      const order = await Order.findOne({ orderId: req.params.orderId });
      if (!order) {
        return res.status(404).json({ error: 'Order not found' });
      }
      res.status(200).json(order);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // update order
 const updateOrderById = async (req, res) => {
    try {
      const order = await Order.findOneAndUpdate(
        { orderId: req.params.orderId },
        { $set: req.body },
        { new: true }
      );
      if (!order) {
        return res.status(404).json({ error: 'Order not found' });
      }
      res.status(200).json(order);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // delete order 
  const deleteOrder = async (req, res) => {
    try {
      const order = await Order.findOneAndDelete({ orderId: req.params.orderId });
      if (!order) {
        return res.status(404).json({ error: 'Order not found' });
      }
      res.status(200).json({ message: 'Order deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  module.exports = {createOrder, getOrderByClient,getOrderByFreelancer, getOrderById , updateOrderById, deleteOrder}