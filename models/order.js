// models/Order.js
const mongoose = require("mongoose");
let Schema = mongoose.Schema;
const orderSchema = new Schema({
  serviceOrCourseId: { type: String, required: true },
  clientId: { type: String, required: true },
  orderDate: { type: Date, required: true },
  deliveryDate: { type: Date },
  numsOrdered: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
  isPaid: { type: Boolean, default: false },
});

const OrderModel = mongoose.model("Order", orderSchema);

module.exports = OrderModel;
