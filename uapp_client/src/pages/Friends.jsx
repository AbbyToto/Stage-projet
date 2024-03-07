//External imports
import { Box, Typography, useTheme } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

//Internal imports
import { setFriends } from "../controllers/state";
import Friend from "../components/Friend";
import Wrap from "../components/Wrap";

const Friends = ({ userId }) => {
    const dispatch = useDispatch();
    const { palette } = useTheme();
    const token = useSelector((state) => state.token);
    const friends = useSelector((state) => state.user.friends);

    const getFriends = async () => {
        try {
            const response = await axios.get(
                `http://localhost:5000/users/${userId}/friends`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            const data = response.data;
            dispatch(setFriends({ friends: data }));
        } catch (error) {

            console.error("Error occurred:", error);
        }
    };
    useEffect(() => {
        getFriends();
    }, []);// eslint-disable-line react-hooks/exhaustive-deps

    return (
        <Wrap>
            <Typography
                color={palette.neutral.dark}
                variant="h5"
                fontWeight="500"
                sx={{ mb: "1.5rem" }}
            >
                Liste d'aims
            </Typography>
            <Box display="flex" flexDirection="column" gap="1.5rem">
                {friends.map((friend) => (
                    <Friend
                        key={friend._id}
                        friendId={friend._id}
                        name={`${friend.firstName} ${friend.lastName}`}
                        subtitle={friend.position}
                        userImgChemin={friend.imgChemin}
                    />
                ))}
            </Box>
        </Wrap>
    );
};

export default Friends;