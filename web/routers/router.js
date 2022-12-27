const express = require("express");
const { GetAllShopifyProduct } = require("../controllers/GetallproductApi.js");

const router = express.Router();

router.get("/GetAllShopifyProduct", GetAllShopifyProduct);

module.exports = router;