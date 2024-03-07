//Internal imports
import Post from "../models/Post.js";
import User from "../models/User.js";

export const createPost = async (req, res) => {
    try {
        const { userId, description, imgChemin } = req.body;
        const user = await User.findById(userId);

        //create a post
        const newPost = new Post({
            userId,
            firstName: user.firstName,
            lastName: user.lastName,
            position: user.position,
            description,
            userImgChemin: user.imgChemin,
            imgChemin,
            likes: {},
            comments: [],
        });
        await newPost.save();

        const post = await Post.find();
        res.status(201).send({ 'msg': 'Post enregistrée.', post });
    } catch (error) {
        res.status(409).send({ message: error.message });
    }
};


export const getAllPosts = async (req, res) => {
    try {
        const post = await Post.find();
        res.status(200).send(post);
    } catch (error) {
        res.status(404).send({ message: error.message });
    }
};

export const getUserPosts = async (req, res) => {
    try {
        const { userId } = req.params;
        const post = await Post.find({ userId });
        res.status(200).send(post);
    } catch (error) {
        res.status(404).send({ message: error.message });
    }
};


export const likePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId } = req.body;
        const post = await Post.findById(id);
        const isLiked = post.likes.get(userId);

        if (isLiked) {
            post.likes.delete(userId);
        } else {
            post.likes.set(userId, true);
        }

        const updatedPost = await Post.findByIdAndUpdate(
            id,
            { likes: post.likes },
            { new: true }
        );

        res.status(200).send(updatedPost);
    } catch (error) {
        res.status(404).send({ message: error.message });
    }
};

export const deletePost = async (req, res) => {
    try {
        const { id, userId } = req.params;

        const post = await Post.findById(id);

        if (!post) {
            return res.status(404).send({ message: 'Post not found' });
        }

        if (post.userId !== userId) {
            return res.status(403).send({ message: 'Unauthorized - You are not the owner of this post' });
        }

        await Post.findByIdAndDelete(id);

        res.status(200).send({ message: 'Post deleted successfully', postId: id });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

