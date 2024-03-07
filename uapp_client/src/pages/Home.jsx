//External imports
import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";

//Internal imports
import Navbar from "../components/Navbar";
import User from "../pages/User";
import MyPost from "../pages/MyPost";
import Posts from "../pages/Posts";
import Advert from "../pages/Advert";
import Friends from "../pages/Friends";

const Home = () => {
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
    const { _id, imgChemin } = useSelector((state) => state.user);

    return (
        <Box>
            <Navbar />

            <Box
                width="100%"
                padding="2rem 6%"
                display={isNonMobileScreens ? "flex" : "block"}
                gap="0.5rem"
                justifyContent="space-between"
            >
                <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
                    <User userId={_id} imgChemin={imgChemin} />
                </Box>
                <Box
                    flexBasis={isNonMobileScreens ? "42%" : undefined}
                    mt={isNonMobileScreens ? undefined : "2rem"}
                >
                    <MyPost imgChemin={imgChemin} />
                    <Posts userId={_id} />
                </Box>

                {isNonMobileScreens && (
                    <Box flexBasis="26%">
                        <Advert />
                        <Box m="2rem 0" />
                        <Friends userId={_id} />
                    </Box>
                )}

            </Box>
        </Box>
    );
};


export default Home;