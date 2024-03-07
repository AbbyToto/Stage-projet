// Exernal imports
import express from "express";

// Internal imports
import { login } from "../controllers/auth.js";

// Variables
const router = express.Router();

router.route('/login')
    .post(login);
export default router;




