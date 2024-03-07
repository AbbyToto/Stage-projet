//External Imports
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: [true, 'Please enter your first name'],
            min: 2,
            max: 100,
        },
        lastName: {
            type: String,
            required: [true, 'Please enter your last name'],
            min: 2,
            max: 100,
        },
        email: {
            type: String,
            required: [true, 'Please enter a email'],
            max: 100,
            unique: [true, 'Email adress is already taken by another user.'],
        },
        password: {
            type: String,
            required: [true, 'Please enter a password'],
            min: 8,
        },
        imgChemin: {
            type: String,
            default: "",
        },
        friends: {
            type: Array,
            default: [],
        },
        position: {
            type: String,
        },
        domaine: {
            type: String,
        },
        viewedProfile: Number,
        impressions: Number,
    },
    { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
export default User;