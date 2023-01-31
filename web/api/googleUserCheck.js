const { default: mongoose } = require('mongoose');
const { decodeJWT } = require('../controllers/utils');
const User = require('../models/User');

const googleUserFound = async (req, res) => {
    try {
        const token = req.params.token;
        const decoded = await decodeJWT(token)
        console.log("Decoded token: " + decoded);
        const user = await User.findOne({googleId: `${decoded}` });
        console.log("User is", user);
    
        res.send(user)
    } catch (error) {
        res.redirect('/');
        console.log("Error", error);
    }
}

module.exports = googleUserFound