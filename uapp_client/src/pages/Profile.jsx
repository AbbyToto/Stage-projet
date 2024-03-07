//External imports
import { Box, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import axios from 'axios';

//Internal imports
import Navbar from "../components/Navbar";
import Friends from "../pages/Friends";
import MyPost from "../pages/MyPost";
import Posts from "../pages/Posts";
import User from "../pages/User";

const Profile = () => {
    const [user, setUser] = useState(null);
    const { userId } = useParams();
    const token = useSelector((state) => state.token);
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

    const getUser = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/users/${userId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            const data = response.data;
            setUser(data);
        } catch (error) {

            console.error('Error fetching user:', error);
        }
    };

    useEffect(() => {
        getUser();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    if (!user) return null;

    return (
        <Box>
            <Navbar />
            <Box
                width="100%"
                padding="2rem 6%"
                display={isNonMobileScreens ? "flex" : "block"}
                gap="2rem"
                justifyContent="center"
            >
                <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
                    <User userId={userId} imgChemin={user.imgChemin} />
                    <Box m="2rem 0" />
                    <Friends userId={userId} />
                </Box>
                <Box
                    flexBasis={isNonMobileScreens ? "42%" : undefined}
                    mt={isNonMobileScreens ? undefined : "2rem"}
                >
                    <MyPost imgChemin={user.imgChemin} />
                    <Box m="2rem 0" />
                    <Posts userId={userId} isProfile />
                </Box>
            </Box>
        </Box>
    );
};

export default Profile;