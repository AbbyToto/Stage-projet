// External imports
import React, { useEffect, useState } from "react";
import { ManageAccountsOutlined, EditOutlined, LocationCityOutlined, SchoolOutlined } from "@mui/icons-material";
import { Box, Typography, Divider, useTheme } from "@mui/material";
import axios from 'axios';

//Internal imports
import Image from "../components/Image";
import Container from "../components/Container";
import Wrap from "../components/Wrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const User = ({ userId, imgChemin }) => {
    const [user, setUser] = useState(null);
    const { palette } = useTheme();
    const navigate = useNavigate();
    const token = useSelector((state) => state.token);
    const dark = palette.neutral.dark;
    const medium = palette.neutral.medium;
    const main = palette.neutral.main;

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

    if (!user) {
        return null;
    }
    const {
        firstName,
        lastName,
        position,
        domaine,
        viewedProfile,
        impressions,
        friends,
    } = user;

    return (
        <div>
            <Wrap>
                {/* line 1  */}
                <Container
                    gap="0.5rem"
                    pb="1.1rem"
                    onClick={() => navigate(`/profile/${userId}`)}
                >
                    <Container gap="1rem">
                        <Image image={imgChemin} />
                        <Box>
                            <Typography
                                variant="h4"
                                color={dark}
                                fontWeight="500"
                                sx={{
                                    "&:hover": {
                                        color: palette.primary.medium,
                                        cursor: "pointer",
                                    },
                                }}
                            >
                                {firstName} {lastName}
                            </Typography>
                            <Typography color={medium}>{friends.length} friends</Typography>
                        </Box>
                    </Container>
                    <ManageAccountsOutlined />
                </Container>

                <Divider />

                {/* ligne 2 */}
                <Box p="1rem 0">
                    <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
                        <LocationCityOutlined fontSize="large" sx={{ color: dark }} />
                        <Typography color={dark}>{position}</Typography>
                    </Box>
                    <Box display="flex" alignItems="center" gap="1rem">
                        <SchoolOutlined fontSize="large" sx={{ color: dark }} />
                        <Typography color={dark}>{domaine}</Typography>
                    </Box>
                </Box>

                <Divider />

                {/* ligne 3 */}
                <Box p="1rem 0">
                    <Container mb="0.5rem">
                        <Typography color={main}>Qui a consulté votre profil</Typography>
                        <Typography color={main} fontWeight="500">
                            {viewedProfile}
                        </Typography>
                    </Container>
                    <Container>
                        <Typography color={main}>Impressions de votre poste</Typography>
                        <Typography color={main} fontWeight="500">
                            {impressions}
                        </Typography>
                    </Container>
                </Box>

                <Divider />

                {/* ligne */}
                <Box p="1rem 0">
                    <Typography fontSize="1.25rem" color={main} fontWeight="500" mb="1rem">
                        Profiles de sociaux
                    </Typography>

                    <Container gap="1rem" mb="0.5rem">
                        <Container gap="1rem">
                            <img src="../image/facebook.jpg" alt="Facebook" />
                            <Box>
                                <Typography color={dark} fontWeight="500">
                                    Facebook
                                </Typography>
                                <Typography color={main}>Réseaux social</Typography>
                            </Box>
                        </Container>
                        <EditOutlined sx={{ color: dark }} />
                    </Container>

                    <Container gap="1rem">
                        <Container gap="1rem">
                            <img src="../image/ins.jpg" alt="Instergram" />
                            <Box>
                                <Typography color={dark} fontWeight="500">
                                    Instergram
                                </Typography>
                                <Typography color={main}>Platform réseaux</Typography>
                            </Box>
                        </Container>
                        <EditOutlined sx={{ color: dark }} />
                    </Container>
                </Box>
            </Wrap>

            <Wrap>
                <Box>
                    <Container gap="1rem">
                        <Container gap="1rem">
                            <img src="../image/weather.jpg" alt="weather" />
                            <Box>
                                <a href="https://www.msn.com/en-ca/weather/forecast/in-Montreal,Quebec?loc=eyJsIjoiTW9udHJlYWwiLCJyIjoiUXVlYmVjIiwicjIiOiJNb250cmVhbCIsImMiOiJDYW5hZGEiLCJpIjoiQ0EiLCJ0IjoxMDIsImciOiJlbi1jYSIsIngiOiItNzMuNTUzNCIsInkiOiI0NS41MDkxIn0%3D&weadegreetype=C&ocid=msedgntp&cvid=d71c79d81b7947a6ace6750bb4d49906" target="_blank" rel="noopener noreferrer">
                                    <Typography color={main}>Montréal </Typography>
                                </a>
                            </Box>
                        </Container>
                        <a href="https://ca.indeed.com/" target="_blank" rel="noopener noreferrer">
                            {<img src="../image/indeed.jpg" alt="indeed" />}
                        </a>

                    </Container>
                </Box>

            </Wrap>

        </div>
    );
};

export default User;
