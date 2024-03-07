//External imports
import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

//Internal imports
import { setFriends } from "../controllers/state";
import Container from "../components/Container";
import Image from "../components/Image";

const Friend = ({
    friendId,
    name,
    subtitle,
    userImgChemin }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { _id } = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const friends = useSelector((state) => state.user.friends);

    const { palette } = useTheme();
    const light = palette.primary.light;
    const dark = palette.primary.dark;
    const main = palette.neutral.main;

    const isFriend = friends.find((friend) => friend._id === friendId);

    const patchFriend = async () => {
        const response = await fetch(
            `http://localhost:5000/users/${_id}/${friendId}`,
            {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                }
            }
        );
        const data = await response.json();
        dispatch(setFriends({ friends: data }));
    };

    return (
        <Container>
            <Container gap="1rem">
                <Image image={userImgChemin} size="55px" />
                <Box
                    onClick={() => {
                        navigate(`/profile/${friendId}`);
                        navigate(0);
                    }}
                >
                    <Typography
                        color={main}
                        variant="h5"
                        fontWeight="500"
                        sx={{
                            "&:hover": {
                                color: palette.primary.light,
                                cursor: "pointer",
                            },
                        }}
                    >
                        {name}
                    </Typography>
                    <Typography color={main} fontSize="0.75rem">
                        {subtitle}
                    </Typography>
                </Box>
            </Container>
            <IconButton
                onClick={() => patchFriend()}
                sx={{ backgroundColor: light, p: "0.6rem" }}
            >
                {isFriend ? (
                    <PersonRemoveOutlined sx={{ color: dark }} />
                ) : (
                    <PersonAddOutlined sx={{ color: dark }} />
                )}
            </IconButton>
        </Container>
    );
};

export default Friend;