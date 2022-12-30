const express = require("express");

const { allProducts, getVariants } = require("../api/products.js");
const { SignUpUserDetails } = require("../api/users")
const  googleUserFound  = require("../api/googleUserCheck.js");

const router = express.Router();

//get all product with pagination, searching and sorting
router.post("/get-products", allProducts);

//Store user details into db
router.post("/signupdetails", SignUpUserDetails)

//Get all product variants api
router.post("/get-variants", getVariants)

router.get("/googleuser/:token", googleUserFound );

module.exports = router;