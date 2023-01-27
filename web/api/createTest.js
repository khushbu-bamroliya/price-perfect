const { default: mongoose } = require('mongoose');
const { DeleteApiRest } = require('../controllers/shopify_api');
const createTestModal = require('../models/createTestModal');
const Shop = require("../models/Shop");

const createTestCaseApi = async (req, res) => {
    try {

        console.log("==>", req.body);

        let { trafficSplit, productId, testCases, status } = req.body;

        let createTestData = await createTestModal.create({ trafficSplit, testCases, productId, status })

        if (!createTestData) {
            return res.json("Create Test case error...!")
        }

        res.status(200).json({
            data: createTestData,
            success: true,
            status: 200
        })
    } catch (error) {
        console.log("Error Create Test Case", error);
    }
}

const getSingleTestCase = async (req, res) => {
    try {

        console.log("******* Get single test case")

        const getSingleTest = await createTestModal.findById(req.params.id)

        console.log("getSingleTest", getSingleTest);

        if (!getSingleTest) {
            return res.json("filed to single test case error...!");
        }

        res.status(200).json({
            data: getSingleTest,
            success: true,
            status: 200
        })

    } catch (error) {
        console.log("Error in get single test case: ", error);
    }
}

const getTestCase = async (req, res) => {
    try {
        const { search } = req.query;
        let getCase;
        console.log("***** get test case")
        if (search) {
            // getCase = await createTestModal.find({ "productTitle": `\"${search}\"` })
            getCase = await createTestModal.find({
                "productTitle": {
                    $regex: `${search}`,
                    $options: "gi"
                }
            })
        } else {

            getCase = await createTestModal.find()
        }

        if (!getCase) {
            return res.json("Fetch get test case filed...!")
        }

        res.status(200).json({
            data: getCase,
            status: 200,
            suucess: true
        })

    } catch (error) {
        console.log("Error: ", error);
    }
}

const deleteTestCaseData = async (req, res) => {
    try {

        console.log("******* delete test case")

        let responseShopData;

        // var shop = process.env.SHOP;
        var shop = req.headers.shop;



        let access_token;

        const shopData = await Shop.findOne({ shop }).select(["access_token"]);

        if (shopData && shopData.access_token) {
            access_token = shopData.access_token;
        }

        const getSingleTestCase = await createTestModal.findById(req.params.id)

        for (let singleObj of getSingleTestCase.testCases) {

            // console.log("singleObj", singleObj)

            let getSingleDuplicateProductIds = singleObj.variants[0].duplicateProductId.split("gid://shopify/Product/")[1];

            console.log('getSingleDuplicateProductIds', getSingleDuplicateProductIds);


            if (getSingleDuplicateProductIds) {

                try {
                    responseShopData = await DeleteApiRest(
                        `https://${shop}/admin/api/${process.env.SHOPIFY_API_VERSION}/products/${Number(getSingleDuplicateProductIds)}.json`,
                        access_token
                    );

                    console.log("responseShopData", responseShopData)


                } catch (error) {
                    console.log("Error", error);
                }
            } else {
                return res.send("Duplicate product id not available in shopify admin panel")
            }



        }

        let deleteRecordinDB = await createTestModal.findByIdAndDelete(req.params.id);

        console.log("deleteRecordinDB deleteRecordinDB", deleteRecordinDB)

        console.log("=====END END====")
        res.status(200).json({
            status: 200,
            suucess: true,
            data: { deleteRecordinDB }
        })

    } catch (error) {
        console.log("Error", error);
    }
}

const updateTestStatus = async (req, res) => {
    try {
        // const { status, id } = req.query;
        const { id } = req.query;
        console.log("******* update test case status *******")
        const checkStatus = await createTestModal.findOne({ _id: mongoose.Types.ObjectId(`${id}`) });
        console.log("checkStatus", checkStatus.status);
        if (checkStatus.status === 'pending') {
            const statusUpdated = await createTestModal.findOneAndUpdate({ _id: mongoose.Types.ObjectId(`${id}`) }, {
                status: "active"
            })
            res.status(200).json({ success: true, status: statusUpdated })
        } else {
            const statusUpdated = await createTestModal.findOneAndUpdate({ _id: mongoose.Types.ObjectId(`${id}`) }, {
                status: "pending"
            })
            res.status(200).json({ success: true, status: statusUpdated })
        }
        console.log("req.query", req.query);
        // const statusUpdated = await createTestModal.findOneAndUpdate({ _id: mongoose.Types.ObjectId(`${id}`) }, {
        //     status
        // })

        // res.status(200).json({ success: true, status: statusUpdated })
        console.log("=====END END====")
    } catch (error) {
        console.log("Error", error);
    }
}

module.exports = {
    createTestCaseApi,
    getSingleTestCase,
    getTestCase,
    deleteTestCaseData,
    updateTestStatus
}