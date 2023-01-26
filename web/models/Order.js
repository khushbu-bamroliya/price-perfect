const mongoose = require("mongoose");

const OrderSchema = mongoose.Schema(
  {
    shop: {
        type: String,
        trim: true,
    },
    userId:{
        type: String,
        trim: true,
    },
    orderId: {
      type: String,
      trim: true,
    },
    orderNumber: {
      type: String,
      trim: true,
    },
    orderTotal: {
      type: Number,
      trim: true,
    },
    orderCreatedAt: {
      type: Number,
      trim: true,
    },
    orderUpdatedAt: {
      type: Number,
      trim: true,
    },
    cancelled_at: {
      type: String,
      trim: true,
    },
    paymentStatus: {
      type: String,
      trim: true,
    },
    createdAt: {
        type: Number,
        trim: true,
    },
    updatedAt: {
        type: Number,
        trim: true,
    },
},
{ timestamps: { currentTime: () => new Date().getTime() } }
);

const Order = mongoose.model("Order", OrderSchema);

module.exports = Order;