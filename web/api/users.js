const { encodeJWT } = require("../controllers/utils");
const User = require("../models/User");


const manualSignIn = async (req, res) => {
    const { email, password } = req.query;
    console.log(" req.query", req.query);
    try {
        
        const user = await User.findOne({ email });
        
        if (user) {
            if (user.password === password) {
    
                console.log("user", user);
                const token = await encodeJWT(user.email);
                console.log("token", token);
                  res.cookie("token", token);
                // res.redirect('/homeDashboard')
                res.status(200).json({ success: true, message: "User exists", user })
            } else {
                res.status(403).json({ success: false, message: "wrong password" })
            }
        } else {
    
            res.status(403).json({ success: false, message: "user does not exist" })
        }
    } catch (error) {
        res.status(500).json({ success: false, error})
        console.log("error", error);
    }
}
const SignUpUserDetails = async (req, res) => {
    try {
        console.log("req, res1", req.body)
        let { firstName, lastName, email, password, confirmPassword, googleId, country, picture, status, createdAt, updatedAt } = req.body;

        let UserData = await User.create({ firstName, lastName, email, password, confirmPassword, googleId, country, picture, status, createdAt, updatedAt })

        if (!UserData) {
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

module.exports = { SignUpUserDetails, manualSignIn }