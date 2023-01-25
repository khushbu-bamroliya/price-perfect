const express = require("express");

const { allProducts, getVariants, createDuplicateProduct } = require("../api/products.js");
const { SignUpUserDetails,manualSignIn } = require("../api/users")
const  googleUserFound  = require("../api/googleUserCheck.js");
const { createTestCaseApi, getTestCase,  
    deleteTestCaseData,getSingleTestCase, updateTestStatus } = require("../api/createTest");

    const { createProfile,
        getSingleProfile,
        getSingleProfileandUpdateById} = require("../api/profile");

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

router.get("/getTestCase", getTestCase)

router.post("/create-profile", createProfile)

router.get("/getSingleProfile/:token", getSingleProfile)

router.put("/update-profile/:token", getSingleProfileandUpdateById)
router.put("/updatetest", updateTestStatus)

router.delete("/deleteTestCase/:id", deleteTestCaseData)

router.get("/get-single-testcase/:id", getSingleTestCase)

router.get('/signin', manualSignIn);

module.exports = router;
