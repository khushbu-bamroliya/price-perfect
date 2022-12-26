const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  shop: {
    type: String,
    trim: true,
    required: true,
  },
  variantId: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
  isEnable: {
    type: Boolean,
    trim: true,
    default: false,
  },
  product_name: {
    type: String,
    trim: true,
  },
  variant_name: {
    type: String,
    trim: true,
  },
  image: {
    type: String,
    trim: true,
  },
  handle: {
    type: String,
    trim: true,
  },
  productId: {
    type: String,
    trim: true,
  },
  isDeleted: {
    type: Boolean,
    trim: true,
  },
  variantPrice: {
    type: Number,
    trim: true,
  },
});

const Product = mongoose.model("product", productSchema);

module.exports = Product;