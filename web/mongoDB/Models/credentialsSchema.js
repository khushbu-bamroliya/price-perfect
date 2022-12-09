/**
 * This module contains model for shop */

// ---------------------------------------------------------------------------

/**
 * import modules
 */

// this is the driver for mongodb

import mongoose from "mongoose";

/**
 * Schema
 */

const credentialsSchema = new mongoose.Schema({

    name:{
        type: String,
    },
    email:{
        type: String,
    },
    domain:{
        type: String,
    },
    shop:{
        type: String,
    },
    accessToken:{
        type: String,
    },
    phone:{
        type: Number,
    },
    country_code:{
        type: String,
    },
    country_name:{
        type: String,
    },
    timestamp:{
        type: String,
    },

    money_format:{
        type: String,
    },
    currency:{
        type: String,
    },
    timezone:{
        type: String,
    },
    appStatus:{
        type: String,
        required: true,
    },
    zip:{
        type: String,
    },
    city:{
        type: String,
    },
    shop_owner:{
        type: String,
    },
    isAppEnable:{
        type: String,
    },

})

// create shop model

export default mongoose.model("credentials", credentialsSchema);