//External imports
import express from "express";

//Internal imports
import { getAllPosts, getUserPosts, likePost, deletePost } from "../controllers/posts.js";
import { protect } from "../middlewares/auth.js";

//Variables
const router = express.Router();

//Routage
router
    .route('/')
    .get(protect, getAllPosts);
router
    .route('/:userId/posts')
    .get(protect, getUserPosts);

router
    .route('/:id/like')
    .patch(protect, likePost);

router
    .route('/:userId/:id')
    .delete(protect, deletePost);

export default router;