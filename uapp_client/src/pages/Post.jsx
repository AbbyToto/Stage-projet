//External imports
import {
    ChatBubbleOutlineOutlined,
    FavoriteBorderOutlined,
    FavoriteOutlined,
    ShareOutlined,
    DeleteOutline
} from "@mui/icons-material";
import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

//Internal imports
import Wrap from "../components/Wrap";
import { setPost, removePost } from "../controllers/state";
import Container from "../components/Container";
import Friend from "../components/Friend";

const Post = ({
    postId,
    postUserId,
    name,
    description,
    position,
    imgChemin,
    userImgChemin,
    likes,
    comments,
}) => {
    const [isComments, setIsComments] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const dispatch = useDispatch();
    const token = useSelector((state) => state.token);
    const loggedInUserId = useSelector((state) => state.user._id);
    const isLiked = Boolean(likes[loggedInUserId]);
    const likeCount = Object.keys(likes).length;

    const { palette } = useTheme();
    const main = palette.neutral.main;
    const primary = palette.primary.main;

    const patchLike = async () => {

        const response = await fetch(`http://localhost:5000/posts/${postId}/like`, {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId: loggedInUserId }),
        });
        const updatedPost = await response.json();
        dispatch(setPost({ post: updatedPost }));

    };

    const deletePost = async () => {
        try {
            setIsDeleting(true);
            const response = await fetch(`http://localhost:5000/posts/${postUserId}/${postId}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            if (response.status === 200) {
                dispatch(removePost({ postId }));
            } else {
                return false;
            }
        } catch (error) {
            console.error("Error deleting post:", error);
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <Wrap m="2rem 0">
            <Friend
                friendId={postUserId}
                name={name}
                subtitle={position}
                userImgChemin={userImgChemin}
            />
            <Typography color={main} sx={{ mt: "1rem" }}>
                {description}
            </Typography>
            {imgChemin && (
                <img
                    width="100%"
                    height="auto"
                    alt="post"
                    style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
                    src={`http://localhost:5000/image/${imgChemin}`}
                />
            )}
            <Container mt="0.25rem">
                <Container gap="1rem">
                    <Container gap="0.3rem">
                        <IconButton onClick={patchLike}>
                            {isLiked ? (
                                <FavoriteOutlined sx={{ color: primary }} />
                            ) : (
                                <FavoriteBorderOutlined />
                            )}
                        </IconButton>
                        <Typography>{likeCount}</Typography>
                    </Container>

                    <Container gap="0.3rem">
                        <IconButton onClick={() => setIsComments(!isComments)}>
                            <ChatBubbleOutlineOutlined />
                        </IconButton>
                        <Typography>{comments.length}</Typography>
                    </Container>
                    <Container gap="0.3rem">
                        {loggedInUserId === postUserId && (
                            <IconButton onClick={deletePost} disabled={isDeleting}>
                                <DeleteOutline sx={{ color: 'red' }} />
                            </IconButton>
                        )}
                    </Container>
                </Container>

                <IconButton>
                    <ShareOutlined />
                </IconButton>
            </Container>
            {isComments && (
                <Box mt="0.5rem">
                    {comments.map((comment, i) => (
                        <Box key={`${name}-${i}`}>
                            <Divider />
                            <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
                                {comment}
                            </Typography>
                        </Box>
                    ))}
                    <Divider />
                </Box>
            )}
        </Wrap>
    );
};

export default Post;