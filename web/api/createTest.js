const createTestModal = require('../models/createTestModal');

const createTestCaseApi = async (req, res) => {
    try {

        console.log("==>", req.body);

        let { trafficSplit, productId,testCases, status } = req.body;

        let createTestData = await createTestModal.create({trafficSplit, testCases, productId, status})

        if (!createTestData){
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

const getSingleTestCase = async(req, res) => {
    try {

        console.log("******* Get single test case")

        const getSingleTest = await createTestModal.findById(req.params.id)

        console.log("getSingleTest", getSingleTest);

        if(!getSingleTest){
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

        console.log("***** get test case")

        let getCase = await createTestModal.find({})

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

const deleteTestCaseData = async(req, res) => {
    try {

        console.log("******* delete test case")
        
    } catch (error) {
        console.log("Error", error);
    }
}

module.exports = {
    createTestCaseApi,
    getSingleTestCase,
    getTestCase,
    deleteTestCaseData
}