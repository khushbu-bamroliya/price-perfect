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

module.exports = {
    createTestCaseApi
}