
//External Imports
import mongoose from "mongoose";

const PostSchema = mongoose.Schema(
    {
        userId: {
            type: String,
            required: [true],
        },
        firstName: {
            type: String,
            required: [true, 'Please enter your first name'],
        },
        lastName: {
            type: String,
            required: [true, 'Please enter your last name'],
        },
        position: {
            type: String,
        },
        description: {
            type: String,
        },
        imgChemin: {
            type: String,
        },
        userImgChemin: {
            type: String,
        },
        likes: {
            type: Map,
            of: Boolean,
        },
        comments: {
            type: Array,
            default: [],
        },
    },
    { timestamps: true }
);

const Post = mongoose.model("Post", PostSchema);

export default Post;