const express = require("express");

const { allProducts } = require("../api/products.js");

const router = express.Router();

router.post("/get-products", allProducts);

module.exports = router;