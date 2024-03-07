//External imports
import express from "express";

//Internal imports
import {
    getAllUsers,
    getUser,
    getUserFriends,
    addDeleteFriend,
    serchByDomaine
} from "../controllers/users.js";
import { protect } from "../middlewares/auth.js";

//Variables
const router = express.Router();

//Routage
router
    .route('/')
    .get(protect, getAllUsers);

router
    .route('/:id')
    .get(protect, getUser);

router
    .route('/:id/friends')
    .get(protect, getUserFriends);

router
    .route('/:id/:friendId')
    .patch(protect, addDeleteFriend);

router
    .route('/search')
    .get(protect, serchByDomaine);



export default router;