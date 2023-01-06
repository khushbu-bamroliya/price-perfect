const express = require("express");

const { allProducts, getVariants, createDuplicateProduct } = require("../api/products.js");
const { SignUpUserDetails } = require("../api/users")
const  googleUserFound  = require("../api/googleUserCheck.js");
const { createTestCaseApi } = require("../api/createTest")

const router = express.Router();

//get all product with pagination, searching and sorting
router.post("/get-products", allProducts);

//Store user details into db
router.post("/signupdetails", SignUpUserDetails)

//Get all product variants api
router.post("/get-variants", getVariants)

router.get("/googleuser/:token", googleUserFound );

// create duplicate product
router.post("/createDuplicateProduct", createDuplicateProduct);

//create test case api
router.post("/createTestCase", createTestCaseApi)

module.exports = router;