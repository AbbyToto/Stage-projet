
// External imports
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Internal imports
import User from "../models/User.js";

// DESC     POST: Route d'inscription d'un nouvel utilisateur
// ROUTE    POST /auth/register
// ACCESS   Public
export const register = async (req, res) => {
    try {
        const { firstName, lastName, email, password, imgChemin, friends, position, domaine } = req.body;

        // Check if the email is already in use
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            return res.status(409).json({ success: false, msg: 'Email address is already taken by another user.' });
        }

        // Hash the password
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        // Create a new user
        const newUser = new User({
            firstName,
            lastName,
            email,
            password: passwordHash,
            imgChemin,
            friends,
            position,
            domaine,
            viewedProfile: Math.floor(Math.random() * 10000),
            impressions: Math.floor(Math.random() * 10000),
        });

        const savedUser = await newUser.save();

        res.status(201).json({ success: true, msg: 'User has been successfully created!', user: savedUser });
    } catch (error) {

        res.status(500).json({ success: false, msg: error.message });
    }
};

// DESC     POST: Route de connexion d'un utilisateur
// ROUTE    POST /auth/login
// ACCESS   Public
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email });

        if (!user) return res.status(400).json({ success: false, msg: "User does not exist. " });

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ success: false, msg: "Invalid information." });
        }

        const token = jwt.sign({ id: user._id }, "applicationForUniversity");

        delete user.password;

        res.status(200).json({ success: true, msg: 'Login successful!', token, user });
    } catch (error) {
        res.status(500).json({ error: err.message });
    }
};


