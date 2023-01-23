const { decodeJWT } = require('../controllers/utils');
const ProfileModal = require('../models/profileModal');
const User = require("../models/User");

const createProfile = async (req, res) => {
    try {

        console.log("****** create profile");

        let { firstName, lastName, email, Country, image } = req.body;

        let createProfile = await ProfileModal.create({ firstName, lastName, email, Country, image });

        if (!createProfile) {
            return res.json("Create profile filed...!");
        }

        res.status(200).json({
            data: createProfile,
            status: 200,
            success: true
        })

    } catch (error) {
        console.log("Error create profile..: ", error);
    }
}

const getSingleProfile = async (req, res) => {
    try {
        console.log("getSingleProfile ==>");
        const {token} = req.params;
        const decodedProfile = await decodeJWT(token)

        console.log("**** get single profile");
console.log("decoded profile: ", decodedProfile);
        const fetchSingleData = await User.findOne({googleId:`${decodedProfile.data}`} ) || await User.findOne({email:`${decodedProfile.data}`} )


        if(!fetchSingleData){
            return res.json("filed fetch the single user profile...!");
        }

        res.status(200).json({
            data: fetchSingleData,
            success: true,
            status: 200
        })
        
    } catch (error) {
        console.log("Error get single profile: ", error)
    }
}

const getSingleProfileandUpdateById = async(req, res) => {
    try {
        console.log("**** Update Profile Data profile");
        const {token} = req.params;
        const decodedProfile = await decodeJWT(token)

        const UpdateProfileData = await User.findOneAndUpdate({googleId: `${decodedProfile.data}`}, req.body)


        if(!UpdateProfileData){
            return res.json("filed Update Profile Data profile...!");
        }

        res.status(200).json({
            data: UpdateProfileData,
            success: true,
            status: 200
        })
        
    } catch (error) {
        console.log("Error get single profile: ", error)
    }
}

module.exports = {
    createProfile,
    getSingleProfile,
    getSingleProfileandUpdateById
}