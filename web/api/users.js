const jwt = require("jsonwebtoken");
const { encodeJWT } = require("../controllers/utils");
const User = require("../models/User");


const manualSignIn = async (req, res) => {
    const { email, password, rememberMe } = req.query;
    console.log(" req.query", req.query);
    try {

        const user = await User.findOne({ email });

        if (user) {
            const decodedPassword = jwt.verify(user.password,  process.env.JWT_SECRET)
            
            if (decodedPassword === password) {

                console.log("user", user);
                const token = await encodeJWT(user._id);

                if (rememberMe === true) {
                    res.cookie("token", token, {
                        maxAge: 86400000 * 30, secure: true,  sameSite: 'Strict'
                    });
                } else {
                    res.cookie("token", token, {
                        maxAge: 86400000 * 10, secure: true,  sameSite: 'Strict'
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
            res.status(403).json({ success: false, message: "Invalid user" })
        }
    } catch (error) {
        res.status(500).json({ success: false, error })
        console.log("error", error);
    }
}
const SignUpUserDetails = async (req, res) => {
    try {
        console.log("req, res1", req.body)
        let { first_name, last_name, email, password, confirmPassword, googleId, country, picture, status, createdAt, updatedAt } = req.body;
        if (password !== confirmPassword) {
            res.status(500).json({message:"Password doesn't match"});
        }
        // if (!firstName || !lastName || !email || !password) {
        //     console.log("33333");
        //     res.status(500).json("Fill all fields")
        // } else {
            if (password.length < 8) {
                res.status(500).json({message: "Password must be at least 8 characters"});
            }else{

                var encodedPassword = jwt.sign(password, process.env.JWT_SECRET);
                console.log("encodedPassword", encodedPassword);
                const userExists = await User.findOne({ email: email})
                
                if (userExists) {
                    res.status(500).json({message:"User already exists"})
                }
                if(!userExists) {
                    let UserData = await User.create({ firstName:first_name, lastName:last_name, email, password: encodedPassword, googleId, country, picture, status, createdAt, updatedAt })
        
                    if (!UserData) {
                        return res.status(500).json({message:"User create failed..!"})
                    }
        
                    res.status(200).json({
                        data: UserData,
                        success: true,
                        status: 200,
                        message: "Account created successfully"
                    })
                }
            }
        // }

    } catch (error) {
        console.log("Error", error);
    }
}

module.exports = { SignUpUserDetails, manualSignIn }