//External imports
import { useState } from "react";
import {
    Box,
    Button,
    TextField,
    useMediaQuery,
    Typography,
    useTheme,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Formik } from "formik";
import * as yup from "yup";
import Dropzone from "react-dropzone";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from 'axios';

//Internal imports
import Container from "./Container";
import { setLogin } from "../controllers/state";

const registerSchema = yup.object().shape({
    firstName: yup.string().required("required"),
    lastName: yup.string().required("required"),
    email: yup.string().email("invalid email").required("required"),
    password: yup.string().required("required"),
    position: yup.string().required("required"),
    domaine: yup.string().required("required"),
    image: yup.string().required("required"),
});

const loginSchema = yup.object().shape({
    email: yup.string().email("invalid email").required("required"),
    password: yup.string().required("required"),
});

const initialValuesRegister = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    position: "",
    domaine: "",
    image: "",
};

const initialValuesLogin = {
    email: "",
    password: "",
};

const Form = () => {

    const [formType, setFormType] = useState("login");
    const { palette } = useTheme();
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const isRegister = formType === "register";
    const isLogin = formType === "login";


    const register = async (values, onSubmitProps) => {
        try {
            const formData = new FormData();
            for (let value in values) {
                formData.append(value, values[value]);
            }
            formData.append('imgChemin', values.image.name);

            const savedUserResponse = await axios.post('http://localhost:5000/auth/register', formData);

            const savedUser = savedUserResponse.data;
            onSubmitProps.resetForm();

            if (savedUser) {
                setFormType('login');
            }
        } catch (error) {
            console.error('Error during registration:', error);
        }
    };

    const login = async (values, onSubmitProps) => {
        try {
            const loggedInResponse = await axios.post('http://localhost:5000/auth/login', values, {
                headers: { 'Content-Type': 'application/json' },
            });

            const loggedIn = loggedInResponse.data;
            onSubmitProps.resetForm();

            if (loggedIn) {
                dispatch(
                    setLogin({
                        user: loggedIn.user,
                        token: loggedIn.token,
                    })
                );
                navigate('/home');
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
    };

    const handleFormSubmit = async (values, onSubmitProps) => {
        if (isLogin) await login(values, onSubmitProps);
        if (isRegister) await register(values, onSubmitProps);
    };
    return (
        <Formik
            onSubmit={handleFormSubmit}
            initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
            validationSchema={isLogin ? loginSchema : registerSchema}
        >
            {({
                values,
                errors,
                touched,
                handleBlur,
                handleChange,
                handleSubmit,
                setFieldValue,
                resetForm,
            }) => (
                <form onSubmit={handleSubmit}>
                    <Box
                        backgroundColor="white"
                        display="grid"
                        gap="30px"
                        gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                        sx={{
                            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                        }}
                    >
                        {!isLogin && (
                            <>
                                <TextField
                                    label="Prénom"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.firstName}
                                    name="firstName"
                                    error={
                                        Boolean(touched.firstName) && Boolean(errors.firstName)
                                    }
                                    helperText={touched.firstName && errors.firstName}
                                    sx={{ gridColumn: "span 2" }}
                                />
                                <TextField
                                    label="Nom de famille"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.lastName}
                                    name="lastName"
                                    error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                                    helperText={touched.lastName && errors.lastName}
                                    sx={{ gridColumn: "span 2" }}
                                />
                                <TextField
                                    label="Position : Nom d'université"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.position}
                                    name="position"
                                    error={Boolean(touched.position) && Boolean(errors.position)}
                                    helperText={touched.position && errors.position}
                                    sx={{ gridColumn: "span 4" }}
                                />
                                <TextField
                                    label="domaine"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.domaine}
                                    name="domaine"
                                    error={
                                        Boolean(touched.domaine) && Boolean(errors.domaine)
                                    }
                                    helperText={touched.domaine && errors.domaine}
                                    sx={{ gridColumn: "span 4" }}
                                />
                                <Box
                                    gridColumn="span 4"
                                    border={`1px solid ${palette.neutral.medium}`}
                                    borderRadius="5px"
                                    p="1rem"
                                >
                                    <Dropzone
                                        acceptedFiles=".jpg,.jpeg,.png"
                                        multiple={false}
                                        onDrop={(acceptedFiles) =>
                                            setFieldValue("image", acceptedFiles[0])
                                        }
                                    >
                                        {({ getRootProps, getInputProps }) => (
                                            <Box
                                                {...getRootProps()}
                                                border={`2px dashed ${palette.primary.main}`}
                                                p="1rem"
                                                sx={{ "&:hover": { cursor: "pointer" } }}
                                            >
                                                <input {...getInputProps()} />
                                                {!values.image ? (
                                                    <p>Ajouter une photo ici</p>
                                                ) : (
                                                    <Container>
                                                        <Typography>{values.image.name}</Typography>
                                                        <EditOutlinedIcon />
                                                    </Container>
                                                )}
                                            </Box>
                                        )}
                                    </Dropzone>
                                </Box>
                            </>
                        )}

                        <TextField
                            label="Email"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.email}
                            name="email"
                            error={Boolean(touched.email) && Boolean(errors.email)}
                            helperText={touched.email && errors.email}
                            sx={{ gridColumn: "span 4" }}
                        />
                        <TextField
                            label="Password"
                            type="password"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.password}
                            name="password"
                            error={Boolean(touched.password) && Boolean(errors.password)}
                            helperText={touched.password && errors.password}
                            sx={{ gridColumn: "span 4" }}
                        />
                    </Box>


                    <Box>
                        <Button
                            fullWidth
                            type="submit"
                            sx={{
                                m: "2rem 0",
                                p: "1rem",
                                backgroundColor: palette.primary.main,
                                color: palette.background.alt,
                                "&:hover": { color: palette.primary.main },
                            }}
                        >
                            {isLogin ? "LOGIN" : "REGISTER"}
                        </Button>
                        <Typography
                            onClick={() => {
                                setFormType(isLogin ? "register" : "login");
                                resetForm();
                            }}
                            sx={{
                                textDecoration: "underline",
                                color: palette.background.alt,
                                "&:hover": {
                                    cursor: "pointer",
                                    color: palette.primary.light,
                                },
                            }}
                        >
                            {isLogin
                                ? "Vous n'avez pas de compte ? Inscrivez-vous ici."
                                : "Vous avez déjà un compte ? Connectez-vous ici."}
                        </Typography>
                    </Box>
                </form>
            )}
        </Formik>
    );
};

export default Form;
