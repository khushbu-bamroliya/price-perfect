const { decodeJWT } = require('../controllers/utils');
const ProfileModal = require('../models/profileModal');

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

const getSingleProfile = async(req, res) => {
    try {
        console.log("getSingleProfile ==>");
        const {token} = req.params;
        console.log("decodedProfileid",token);
        const decodedProfile = await decodeJWT(token)
        console.log("decodedProfile",decodedProfile);

        console.log("**** get single profile");

        const fetchSingleData = await ProfileModal.find({googleId:decodedProfile.data} )

        console.log("fetchSingleData", fetchSingleData)

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

        const UpdateProfileData = await ProfileModal.findOneAndUpdate(req.params.id, req.body)

        console.log("UpdateProfileData", UpdateProfileData)

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