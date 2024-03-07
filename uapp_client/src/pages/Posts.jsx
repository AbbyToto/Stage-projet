//External imports
import axios from 'axios';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

//Internal imports
import { setPosts } from "../controllers/state";
import Post from "../pages/Post";

const Posts = ({ userId, isProfile = false }) => {
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.posts);
    const token = useSelector((state) => state.token);

    const getAllPosts = async () => {
        try {
            const response = await axios.get('http://localhost:5000/posts', {
                headers: { Authorization: `Bearer ${token}` },
            });

            dispatch(setPosts({ posts: response.data }));
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };

    const getUserPosts = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/posts/${userId}/posts`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            dispatch(setPosts({ posts: response.data }));
        } catch (error) {
            console.error('Error fetching user posts:', error);
        }
    };

    useEffect(() => {
        if (isProfile) {
            getUserPosts();
        } else {
            getAllPosts();
        }
    }, []);// eslint-disable-line react-hooks/exhaustive-deps

    return (
        <>
            {Array.isArray(posts) && posts.map(
                ({
                    _id,
                    userId,
                    firstName,
                    lastName,
                    description,
                    position,
                    imgChemin,
                    userImgChemin,
                    likes,
                    comments,
                }) => (
                    <Post
                        key={_id}
                        postId={_id}
                        postUserId={userId}
                        name={`${firstName} ${lastName}`}
                        description={description}
                        position={position}
                        imgChemin={imgChemin}
                        userImgChemin={userImgChemin}
                        likes={likes}
                        comments={comments}
                    />
                )
            )}
        </>
    );
};

export default Posts;