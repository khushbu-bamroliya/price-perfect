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
        res.status(500).json({
            error,
            success: false

        })
    }
}

const getTestCase = async (req, res) => {
    try {
        const { search } = req.query;
        const shop = req.headers.shop
        let getCase;
        console.log("***** get test case")
        if (search) {
            getCase = await createTestModal.find({
                "productTitle": {
                    $regex: `${search}`,
                    $options: "gi"
                }
            })
        } else {

            getCase = await createTestModal.find({ shop: shop })
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
        res.status(500).json({
            error,
            success: false

        })
    }
}

const deleteTestCaseData = async (req, res) => {
    try {

        let responseShopData;
        var shop = req.headers.shop;
        let access_token;
        const shopData = await Shop.findOne({ shop }).select(["access_token"]);
        if (shopData && shopData.access_token) {
            access_token = shopData.access_token;
        }
        const getSingleTestCase = await createTestModal.findById(req.params.id)

        for (let singleObj of getSingleTestCase.testCases) {

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
        res.status(500).json({
            error,
            success: false

        })
    }
}


const updateSingleTestStatus = async (req, res) => {
    const { id } = req.query;
    const { testid } = req.params;
    console.log("req.params", req.params);
    console.log("req.query", req.query);
    try {
        const dbData = await createTestModal.findOne({ _id: mongoose.Types.ObjectId(`${id}`) })
        console.log("testCases", JSON.stringify(dbData && dbData?.testCases))
        console.log("testCases2222", dbData.testCases)

        const found = dbData && dbData?.testCases.find(i => Number(i.testId) === Number(testid));
        console.log("found", found);

        if (found.status === "active") {
            // createTestModal.findOneAndUpdate(
            //     {_id: mongoose.Types.ObjectId(`${id}`)},
            //     { status:"active", $set: {"testCases.$[el].status": "active" } },
            //     { 
            //       arrayFilters: [{ "el.status": "pending" }],
            //       new: true,
            //       multi: true
            //     }
            //   )
            console.log("testid", id, testid);

            const statusUpdated = await createTestModal.updateOne(
                { _id: mongoose.Types.ObjectId(id), "testCases.testId": Number(testid) },
                { $set: { "testCases.$.status": "pending" } }
            )
            // const statusUpdated = await createTestModal.updateOne(
            //     {_id: mongoose.Types.ObjectId(`${id}`),  'testCases.$.testId': testid},
            //     { $set: {"testCases.$.status": "pending" } }
            //   )
            console.log("statusUpdated", statusUpdated);
            res.status(200).json({ success: true, status: statusUpdated })
        } else {

            const statusUpdated = await createTestModal.updateOne(
                { _id: mongoose.Types.ObjectId(id), "testCases.testId": Number(testid) },
                { $set: { "testCases.$.status": "active" } }
            )

            console.log("statusUpdated", statusUpdated);
            res.status(200).json({ success: true, status: statusUpdated })
        }

        // const statusUpdated = await createTestModal.findOneAndUpdate(
        //     {_id: mongoose.Types.ObjectId(`${id}`), testCases:{ $elemMatch:{status:'pending'} }},
        //     { $set: {"testCases.$.status": "active" } },
        //   )
        //   console.log("statusUpdated", statusUpdated);
        //   res.status(200).json({ success: true, status: statusUpdated })
    } catch (error) {
        console.log("errror", error);
        res.status(500).json({ success: false, error: error })
    }



}

const updateTestStatus = async (req, res) => {
    try {
        // const { testCases } = req.body;
        const { id } = req.query;
        // console.log("testCases updateTestStatus", testCases);
        // patients.findOneAndUpdate(
        //     {_id: "5cb939a3ba1d7d693846136c"},
        //     {$set: {"testCases.$[el].status": "pending" } },
        //     { 
        //       arrayFilters: [{ "el.status": "active" }],
        //       new: true,
        //     }
        //   )
        console.log("******* update test case status *******")
        const checkStatus = await createTestModal.findOne({ _id: mongoose.Types.ObjectId(`${id}`) });
        console.log("checkStatus", checkStatus.status);
        if (checkStatus.status === 'pending') {
            const statusUpdated = await createTestModal.findOneAndUpdate(
                { _id: mongoose.Types.ObjectId(`${id}`) },
                { status: "active", $set: { "testCases.$[el].status": "active" } },
                {
                    arrayFilters: [{ "el.status": "pending" }],
                    new: true,
                    multi: true
                }
            )
            console.log("statusUpdated", statusUpdated);
            res.status(200).json({ success: true, status: statusUpdated })
        } else {
            const statusUpdated = await createTestModal.findOneAndUpdate(
                { _id: mongoose.Types.ObjectId(`${id}`) },
                { status: "pending", $set: { "testCases.$[el].status": "pending" } },
                {
                    arrayFilters: [{ "el.status": "active" }],
                    new: true,
                    multi: true
                }
            )
            res.status(200).json({ success: true, status: statusUpdated })
        }
        console.log("=====END END====")
    } catch (error) {
        console.log("Error", error);
        res.status(500).json({
            error,
            success: false

        })
    }
}

module.exports = {
    createTestCaseApi,
    getSingleTestCase,
    getTestCase,
    deleteTestCaseData,
    updateTestStatus,
    updateSingleTestStatus
}