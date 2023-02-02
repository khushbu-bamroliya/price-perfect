const { default: mongoose } = require("mongoose");
const { decodeJWT } = require("../controllers/utils");
const User = require("../models/User");

const verifyToken = async (req, res, next) => {
    console.log("Hello middle");
    try {
        const bearerToken = req.headers.authorization
        console.log("decodedBearerToken222", bearerToken);
        const decodedBearerToken = await decodeJWT(bearerToken.replace("Bearer ", ""));
        console.log("decodedBearerToken", decodedBearerToken);
        const user = await User.findOne({_id:mongoose.Types.ObjectId(decodedBearerToken)})
        if (user) {
            res.status(200)
            next();
        }else{
            res.status(404).json({message:"Invalid user"})
        }
        console.log("user found", user);
    } catch (error) {
        console.log("Error from middle", error);
        res.status(404).json({message:"Invalid user", error})
    }

    // next();
}
module.exports = verifyToken;