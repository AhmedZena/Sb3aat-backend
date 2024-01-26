// models/Order.js
const mongoose = require("mongoose");
let Schema = mongoose.Schema;
const orderSchema = new Schema({
  orderId: { type: String, unique: true, required: true },
  serviceId: { type: String, required: true },
  clientId: { type: String, required: true },
  freelancerId: { type: String, required: true },
  orderDate: { type: Date, required: true },
  deliveryDate: { type: Date },
  numsOrdered: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
});

const OrderModel = mongoose.model("Order", orderSchema);

module.exports = OrderModel;
