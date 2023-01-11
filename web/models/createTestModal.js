const mongoose = require("mongoose");

const createTestSchema = mongoose.Schema({

    trafficSplit: {
        type: Number,
        trim: true,
    },
    productId: {
        type: String,
        trim: true,
    },
    testCases: {
        type: Array,
        trim: true,
    },
    duplicateProductId: {
        type: String,
        trim: true
    },
    duplicateVariants: {
        type: Array,
        trim: true,
    }
});

const CreateTest = mongoose.model("createTestCase", createTestSchema);

module.exports = CreateTest;