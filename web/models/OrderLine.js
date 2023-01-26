const mongoose = require("mongoose");

const orderLineSchema = mongoose.Schema(
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
    shopifyProductId: {
      type: Number,
      trim: true,
    },
    shopifyVariantId: {
      type: Number,
      trim: true,
    },
    image: {
      type: String,
      trim: true,
    },
    name: {
      type: String,
      trim: true,
    },
    qty: {
      type: String,
      trim: true,
    },
    sku: {
      type: String,
      trim: true,
    },
    productPrice: {
      type: Number,
      trim: true,
    },
    originalVariantId:{
      type: Number,
      trim: true,
    },
    testId:{
      type: String,
      trim: true,
    }
  },
  { timestamps: { currentTime: () => new Date().getTime() } }
);

const OrderLine = mongoose.model("orderLine", orderLineSchema
);

module.exports = OrderLine;
