const express = require("express");

const { allProducts, getVariants, createDuplicateProduct, updateDuplicateProduct, deleteOneTestCase } = require("../api/products.js");
const { SignUpUserDetails,manualSignIn } = require("../api/users")
const  googleUserFound  = require("../api/googleUserCheck.js");
const { createTestCaseApi, getTestCase,  
    deleteTestCaseData,getSingleTestCase, updateTestStatus, updateSingleTestStatus, checkTest } = require("../api/createTest");
const { createProfile,
        getSingleProfile,
        getSingleProfileandUpdateById} = require("../api/profile");

const { enableDisableApp } = require("../api/settings");
const verifyToken = require("../middlewares/verifyToken.js");

const router = express.Router();

//get all product with pagination, searching and sorting
router.post("/get-products",verifyToken, allProducts);

//Store user details into db
router.post("/signupdetails", SignUpUserDetails)

//Get all product variants api
router.post("/get-variants", verifyToken,getVariants)

router.get("/googleuser/:token", googleUserFound );

// create duplicate product
router.post("/createDuplicateProduct",verifyToken, createDuplicateProduct);

//create test case api
router.post("/createTestCase",verifyToken, createTestCaseApi)

router.get("/getTestCase",verifyToken, getTestCase)

router.post("/create-profile", createProfile)

router.get("/getSingleProfile/:token",verifyToken, getSingleProfile)

router.put("/update-profile/:token",verifyToken, getSingleProfileandUpdateById)

router.put("/updatealltests",verifyToken, updateTestStatus)

router.put("/updateoneteststatus/:testid",verifyToken, updateSingleTestStatus)

router.delete("/deleteTestCase/:id",verifyToken, deleteTestCaseData)

router.post("/deleteoneTestCase/:id",verifyToken, deleteOneTestCase)

router.get("/get-single-testcase/:id", verifyToken,getSingleTestCase)

router.get('/signin', manualSignIn);

router.get("/enable-disable", enableDisableApp);
router.get("/checktest/:id", checkTest);



router.post("/updateduplicateproduct",verifyToken, updateDuplicateProduct);



module.exports = router;
