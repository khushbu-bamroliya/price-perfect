const User = require("../models/User");

const SignUpUserDetails = async(req, res) => {
    try {
        console.log("req, res1", req.body)
        let { first_name, last_name, email, password, confirmPassword } = req.body;

        let UserData = await User.create({first_name, last_name, email, password, confirmPassword})

        if(!UserData){
            return res.json("User create failed..!")
        }
        
        res.status(200).json({
            data: UserData,
            success: true,
            status: 200
        })
        
    } catch (error) {
        console.log("Error", error);
    }
}

module.exports = { SignUpUserDetails }