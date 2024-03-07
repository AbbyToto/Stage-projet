//External imports
import { useState } from "react";
import {
    Box,
    IconButton,
    InputBase,
    Typography,
    Select,
    MenuItem,
    FormControl,
    useTheme,
    useMediaQuery,
} from "@mui/material";
import {
    Search,
    Message,
    Notifications,
    Help,
    Menu,
    Close,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

//Internal imports
import Container from "./Container";
import { setLogout } from "../controllers/state";

const Navbar = () => {
    const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);
    const isNonMobileScreens = useMediaQuery("(min-width: 960px)");

    const theme = useTheme();
    const neutralLight = theme.palette.neutral.light;
    const background = theme.palette.background.default;
    const dark = theme.palette.background.dark;
    const alt = theme.palette.background.alt;

    const fullName = user ? `${user.firstName} ${user.lastName}` : 'Guest';


    return (
        <>
            <Container padding="1rem 6%" backgroundColor={dark}>
                <Container gap="1.75rem">
                    <Typography
                        fontWeight="bold"
                        fontSize="clamp(1.5rem, 2.5rem, 3.25rem)"
                        color="white"
                        onClick={() => navigate("/home")}

                        sx={{
                            "&:hover": {
                                color: alt,
                                cursor: "pointer",
                            },
                        }}
                    >
                        UApp
                    </Typography>
                    {isNonMobileScreens && (
                        <Container
                            backgroundColor={background}
                            borderRadius="9px"
                            gap="3rem"
                            padding="0.1rem 1.5rem"
                        >

                            <InputBase
                                placeholder="Entrez le domaine...."
                            />

                            <IconButton>
                                <Search />
                            </IconButton>


                        </Container>
                    )}
                </Container>

                {/* Desktop */}
                {isNonMobileScreens ? (
                    <Container gap="2rem">

                        <Message sx={{ fontSize: "28px", color: "white" }} />
                        <Notifications sx={{ fontSize: "28px", color: "white" }} />
                        <Help sx={{ fontSize: "28px", color: "white" }} />
                        <FormControl variant="standard" value={fullName}>
                            <Select
                                value={fullName}
                                sx={{
                                    backgroundColor: alt,
                                    width: "200px",
                                    borderRadius: "0.25rem",
                                    p: "0.25rem 1rem",
                                    "& .MuiSvgIcon-root": {
                                        pr: "0.25rem",
                                        width: "3rem",
                                    },
                                    "& .MuiSelect-select:focus": {
                                        backgroundColor: neutralLight,
                                    },
                                }}
                                input={<InputBase />}
                            >
                                <MenuItem value={fullName}>
                                    <Typography>{fullName}</Typography>
                                </MenuItem>
                                <MenuItem onClick={() => dispatch(setLogout())}>Log Out</MenuItem>
                            </Select>
                        </FormControl>
                    </Container>
                ) : (
                    <IconButton
                        onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
                    >
                        <Menu />
                    </IconButton>
                )}

                {!isNonMobileScreens && isMobileMenuToggled && (
                    <Box
                        position="fixed"
                        right="0"
                        bottom="0"
                        height="100%"
                        zIndex="10"
                        maxWidth="500px"
                        minWidth="300px"
                        backgroundColor={background}
                    >
                        {/* close icon */}
                        <Box display="flex" justifyContent="flex-end" p="1rem">
                            <IconButton
                                onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
                            >
                                <Close />
                            </IconButton>
                        </Box>

                        {/* Menu */}
                        <Container
                            display="flex"
                            flexDirection="column"
                            justifyContent="center"
                            alignItems="center"
                            gap="3rem"
                        >

                            <Message sx={{ fontSize: "28px" }} />
                            <Notifications sx={{ fontSize: "28px" }} />
                            <Help sx={{ fontSize: "28px" }} />
                            <FormControl sx={{ fontSize: "28px" }} variant="standard" value={fullName}>
                                <Select
                                    value={fullName}
                                    sx={{
                                        backgroundColor: dark,
                                        width: "150px",
                                        borderRadius: "0.25rem",
                                        p: "0.25rem 1rem",
                                        "& .MuiSvgIcon-root": {
                                            pr: "0.25rem",
                                            width: "3rem",
                                        },
                                        "& .MuiSelect-select:focus": {
                                            backgroundColor: alt,
                                        },
                                    }}
                                    input={<InputBase />}
                                >
                                    <MenuItem value={fullName}>
                                        <Typography>{fullName}</Typography>
                                    </MenuItem>
                                    <MenuItem onClick={() => dispatch(setLogout())}>
                                        Log Out
                                    </MenuItem>
                                </Select>
                            </FormControl>
                        </Container>
                    </Box>
                )}
            </Container>

        </>
    );
};

export default Navbar;