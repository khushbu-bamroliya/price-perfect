const { default: mongoose } = require('mongoose');
const { DeleteApiRest, PostApiGraphql } = require('../controllers/shopify_api');
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
        const shop = req.headers.shop;
        var access_token;

        const shopData = await Shop.findOne({ shop }).select(["access_token"]);

        if (shopData && shopData.access_token) {
            access_token = shopData.access_token;
        }
        const getSingleTest = await createTestModal.findById(req.params.id)

        console.log("getSingleTest", getSingleTest);

        if (!getSingleTest) {
            return res.json("filed to single test case error...!");
        }


        let query = `query product {
                product(id: "${getSingleTest?.productId}") {
                  id
                  title
                  handle
                  featuredImage {
        
                    src
        
                  }
                  variants(first: 100) {
                    edges {
                      node {
                        id
                        title
                        price
                        compareAtPrice
                      
                      }
                    }
                  }
                }
              }
            `;

        let ans1 = await PostApiGraphql(shop, access_token, query);
        var products = [];
        console.log("ans1", ans1);
        if (ans1.data && ans1.data.product && ans1.data.product.variants.edges) {
            for (let resProduct of ans1.data.product.variants.edges) {
                const info = resProduct.node;

                console.log("ans1.data.product.handle", ans1.data.product.handle);
                products.push({
                    id: info.id,
                    variantTitle: info.title,
                    variantPrice: info.price,
                    variantComparePrice: info.compareAtPrice,
                    featuredImage: ans1.data.product.featuredImage
                        ? ans1.data.product.featuredImage.src
                        : "",
                    productTitle: ans1.data.product.title,
                });
            }

            console.log("New Array", products);

            // res.status(200).json({
            //   data: products,
            //   success: true,
            //   status: 200,
            // });
        }
        // if (ans1.data && ans1.data.product && ans1.data.product.variants.edges) {
        //     for (let resProduct of ans1.data.product.variants.edges) {
        //       const info = resProduct.node;

        //       console.log("ans1.data.product.handle", ans1.data.product.handle);
        //       products.push({
        //         id: info.id,
        //         variantTitle: info.title,
        //         variantPrice: info.price,
        //         variantComparePrice: info.compareAtPrice,
        //         featuredImage: ans1.data.product.featuredImage
        //           ? ans1.data.product.featuredImage.src
        //           : "",
        //         productTitle: ans1.data.product.title,
        //       });
        //     }

        //     console.log("New Array", products);

        //     // res.status(200).json({
        //     //   data: products,
        //     //   success: true,
        //     //   status: 200,
        //     // });
        //   }
        // console.log("Origianl product", ans1)

        res.status(200).json({
            data: getSingleTest,
            controlVariants: products,
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
    
        getCase=JSON.parse(JSON.stringify(getCase))
        getCase.map((e)=>{
            
            let cnt=0;
            e.testCases.map((it)=>{
                if(it.status === 'active'){
                   cnt++;
                }   
            })
            e.activeTests = cnt; 
            return

        })
        if (!getCase) {
            return res.json("Fetch get test case filed...!")
        }
        console.log('getCases', getCase)
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
        var cost = 1000;
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
                    if (cost - 1000 < 0) {
                        console.log("got in cost");
                        await delay(Math.ceil((1000 - cost) / 50) * 1000);
                    }

                    responseShopData = await DeleteApiRest(
                        `https://${shop}/admin/api/${process.env.SHOPIFY_API_VERSION}/products/${Number(getSingleDuplicateProductIds)}.json`,
                        access_token
                    );

                    console.log("responseShopData", responseShopData)
                    cost = responseShopData.extensions.cost.throttleStatus.currentlyAvailable &&
                        responseShopData.extensions.cost.throttleStatus.currentlyAvailable;


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

const checkTest = async (req, res) => {
    const { id } = req.params;

    try {

        const productFound = await createTestModal.findOne({ productId: `gid://shopify/Product/${id}` });
        console.log("Product found", productFound);
        if (productFound) {
            res.status(200).json({ success: false, message: "This product already has testcases." })
        } else {
            res.status(200).json({ success: true, message: "No testcases found." })
        }
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error." })
        console.log("error", error);
    }
}

module.exports = {
    createTestCaseApi,
    getSingleTestCase,
    getTestCase,
    deleteTestCaseData,
    updateTestStatus,
    updateSingleTestStatus,
    checkTest
}