//External imports
import { Typography, useTheme } from "@mui/material";

//Internal imports
import Container from "../components/Container";
import Wrap from "../components/Wrap";

const Advert = () => {
    const { palette } = useTheme();
    const dark = palette.neutral.dark;
    const main = palette.neutral.main;
    const medium = palette.neutral.medium;

    return (
        <Wrap>
            <Container>
                <Typography color={dark} variant="h5" fontWeight="500">
                    Sponsored
                </Typography>
                <Typography color={medium}>Create Ad</Typography>
            </Container>

            <Container>
                <a href="https://www.remax.ca/" target="_blank" rel="noopener noreferrer">
                    <Typography color={main}>Visit RE/MAX Website</Typography>
                    {<img
                        width="100%"
                        height="auto"
                        alt="advert"
                        src="http://localhost:5000/image/remax.jpg"
                        style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
                    />}
                </a>
            </Container>
            <Typography color={medium} m="0.5rem 0">
                The expert advice that comes with having a RE/MAX Agent on your side,
                is the advantage you need to make your real estate goals your reality.
            </Typography>
        </Wrap>
    );
};

export default Advert;