const { encodeJWT } = require("../controllers/utils");
const User = require("../models/User");


const manualSignIn = async (req, res) => {
    const { email, password, rememberMe } = req.query;
    console.log(" req.query", req.query);
    try {

        const user = await User.findOne({ email });

        if (user) {
            if (user.password === password) {

                console.log("user", user);
                const token = await encodeJWT(user._id);

                if (rememberMe === true) {
                    res.cookie("token", token, {
                        maxAge: 86400000 * 30
                    });
                } else {
                    res.cookie("token", token, {
                        maxAge: 86400000 * 10
                    });
                    console.log("token", token);
                }
                // res.redirect('/homeDashboard')
                res.status(200).json({ success: true, message: "Logged in", user })
            } else {
                res.status(403).json({ success: false, message: "Incorrect password" })
            }
        } else {
            console.log("user", user);
            res.status(403).json({ success: false, message: "User does not exist" })
        }
    } catch (error) {
        res.status(500).json({ success: false, error })
        console.log("error", error);
    }
}
const SignUpUserDetails = async (req, res) => {
    try {
        console.log("req, res1", req.body)
        let { firstName, lastName, email, password, confirmPassword, googleId, country, picture, status, createdAt, updatedAt } = req.body;
        if (password !== confirmPassword) {
            res.status(500).json("Password doesn't match");
        }
        // if (!firstName || !lastName || !email || !password) {
        //     console.log("33333");
        //     res.status(500).json("Fill all fields")
        // } else {

            const userExists = await User.findOne({ email: email})
            if (userExists) {
                res.status(500).json("User already exists")
            }else{

                let UserData = await User.create({ firstName, lastName, email, password, confirmPassword, googleId, country, picture, status, createdAt, updatedAt })
    
                if (!UserData) {
                    return res.status(500).json("User create failed..!")
                }
    
                res.status(200).json({
                    data: UserData,
                    success: true,
                    status: 200
                })
            }
        // }

    } catch (error) {
        console.log("Error", error);
    }
}

module.exports = { SignUpUserDetails, manualSignIn }