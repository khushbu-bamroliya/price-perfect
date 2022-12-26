const express = require("express");

const { GetAllShopifyProduct } = require("../api/GetallproductApi.js");

const router = express.Router();

router.post("/get-products", verifyUser, Products.allProducts);

module.exports = router;