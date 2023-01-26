const mongoose = require("mongoose");

const analyticsSchema = new mongoose.Schema(
  {
    shop: {
        type: String,
        trim: true,
    },
    userId:{
        type: String,
        trim: true,
    },
    event: {
        type: String,
        trim: true,
    },
    productId: {
        type: String,
        trim: true,
    },
    handle: {
        type: String,
        trim: true,
    },
    testResult: {
      type: Array,
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

const Analytics = mongoose.model("Analytics", analyticsSchema);
module.exports = Analytics;