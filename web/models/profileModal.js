const mongoose = require("mongoose");

const profileSchema = mongoose.Schema({

    firstName: {
        type: String,
        trim: true,
    },
    lastName: {
        type: String,
        trim: true,
    },
    email: {
        type: String,
        trim: true,
    },
    Country:{
        type: String,
        trim: true,
    },
    image:{
        type: String,
        trim: true
    }
});

const CreateProfile = mongoose.model("profile", profileSchema);

module.exports = CreateProfile;