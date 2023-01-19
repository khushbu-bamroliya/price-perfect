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
    status:{
        type: String,
        trim: true,
    },
    featuredImage:{
        type: String,
        trim: true,
    }, 
    productTitle:{
        type: String,
        trim: true,
    },
    productPrice:{
        type: String,
        trim: true,
    }
});

const CreateTest = mongoose.model("createTestCase", createTestSchema);

module.exports = CreateTest;