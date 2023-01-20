const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            trim: true,
        },
        lastName: {
            type: String,
            trim: true,
        },
        email: {
            type: String,
            unique: false,
            trim: true,
        },
        googleId: {
            type: String,
            trim: true,
        },
        country: {
            type: String,
            trim: true,
        },
        picture: {
            type: String,
            trim: true,
        },
        password: {
            type: String,
            trim: true,
        },
        confirmPassword: {
            type: String,
            trim: true,
        },
        status: {
            type: String,
            trim: true,
        },
        createdAt: {
            type: Number,
            trim: true,
        },
        updatedAt: {
            type: Number,
            trim: true,
        },
    },
    { timestamps: { currentTime: () => new Date().getTime() } }
);

const User = mongoose.model("User", userSchema);
module.exports = User;