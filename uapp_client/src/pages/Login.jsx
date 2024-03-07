//External imports
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";

//Internal imports
import Form from "../components/Form";

const Login = () => {
    const theme = useTheme();
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
    return (
        <Box>
            <Box
                width="100%"
                backgroundColor={theme.palette.background.alt}
                p="1rem 6%"
                textAlign="center"
            >
                <Typography fontWeight="bold" fontSize="32px" color="primary">
                    UApp
                </Typography>
            </Box>

            <Box
                width={isNonMobileScreens ? "50%" : "100%"}
                p="2rem"
                m="2rem auto"
                borderRadius="1.5rem"
                backgroundColor={theme.palette.primary.dark}
            >
                <Typography textAlign="center" fontWeight="500" variant="h5" color="white" sx={{ mb: "1.5rem" }}>
                    Binvenue sur UApp, les réseaux sociaux pour les universities!
                </Typography>
                <Form />
            </Box>
        </Box>
    );
};

export default Login;
