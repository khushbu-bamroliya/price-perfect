import mongoose from "mongoose";

const shopSchema = new mongoose.Schema({

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

});

// create shop model
const Shops = mongoose.model("shop", shopSchema);

export default Shops;
