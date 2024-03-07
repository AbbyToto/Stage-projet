//External imports
import {
    EditOutlined,
    DeleteOutlined,
    AttachFileOutlined,
    GifBoxOutlined,
    ImageOutlined,
    MicOutlined,
    MoreHorizOutlined,
} from "@mui/icons-material";
import {
    Box,
    Divider,
    Typography,
    InputBase,
    useTheme,
    Button,
    IconButton,
    useMediaQuery,
} from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

//Internal imports
import Dropzone from "react-dropzone";
import Container from "../components/Container";
import Image from "../components/Image";
import Wrap from "../components/Wrap";
import { setPosts } from "../controllers/state";

const MyPost = ({ imgChemin }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isImage, setIsImage] = useState(false);
    const [image, setImage] = useState(null);
    const [post, setPost] = useState("");
    const { palette } = useTheme();
    const { _id } = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
    const main = palette.neutral.main;
    const medium = palette.neutral.medium;

    const handleOnPost = async () => {
        try {
            const formData = new FormData();
            formData.append("userId", _id);
            formData.append("description", post);

            if (image) {
                formData.append("image", image);
                formData.append("imgChemin", image.name);
            }

            const response = await axios.post('http://localhost:5000/posts', formData, {
                headers: { Authorization: `Bearer ${token}` },
            });

            dispatch(setPosts({ posts: response.data }));
            setImage(null);
            setPost("");
            navigate(0);
        } catch (error) {
            console.error('Error posting data:', error);
        }
    };

    return (
        <Wrap>
            <Container gap="1.5rem">
                <Image image={imgChemin} />
                <InputBase
                    placeholder="Qu'est-ce qui préoccupe votre esprit..."
                    onChange={(e) => setPost(e.target.value)}
                    value={post}
                    sx={{
                        width: "100%",
                        backgroundColor: palette.background.default,
                        color: palette.neutral.dark,
                        borderRadius: "2rem",
                        padding: "1rem 2rem",
                    }}
                />
            </Container>
            {isImage && (
                <Box
                    border={`1px solid ${medium}`}
                    borderRadius="5px"
                    mt="1rem"
                    p="1rem"
                >
                    <Dropzone
                        acceptedFiles=".jpg,.jpeg,.png"
                        multiple={false}
                        onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
                    >
                        {({ getRootProps, getInputProps }) => (
                            <Container>
                                <Box
                                    {...getRootProps()}
                                    border={`2px dashed ${palette.primary.main}`}
                                    p="1rem"
                                    width="100%"
                                    sx={{ "&:hover": { cursor: "pointer" } }}
                                >
                                    <input {...getInputProps()} />
                                    {!image ? (
                                        <p>Ajoutez Image Ici</p>
                                    ) : (
                                        <Container>
                                            <Typography>{image.name}</Typography>
                                            <EditOutlined />
                                        </Container>
                                    )}
                                </Box>
                                {image && (
                                    <IconButton
                                        onClick={() => setImage(null)}
                                        sx={{ width: "15%" }}
                                    >
                                        <DeleteOutlined />
                                    </IconButton>
                                )}
                            </Container>
                        )}
                    </Dropzone>
                </Box>
            )}

            <Divider sx={{ margin: "1.25rem 0" }} />

            <Container>
                <Container gap="0.25rem" onClick={() => setIsImage(!isImage)}>
                    <ImageOutlined sx={{ color: main }} />
                    <Typography
                        color={main}
                        sx={{ "&:hover": { cursor: "pointer", color: medium } }}
                    >
                        Image
                    </Typography>
                </Container>

                {isNonMobileScreens ? (
                    <>
                        <Container gap="0.25rem">
                            <GifBoxOutlined sx={{ color: main }} />
                            <Typography color={main}>Clip</Typography>
                        </Container>

                        <Container gap="0.25rem">
                            <AttachFileOutlined sx={{ color: main }} />
                            <Typography color={main}>Attachment</Typography>
                        </Container>

                        <Container gap="0.25rem">
                            <MicOutlined sx={{ color: main }} />
                            <Typography color={main}>Audio</Typography>
                        </Container>
                    </>
                ) : (
                    <Container gap="0.25rem">
                        <MoreHorizOutlined sx={{ color: main }} />
                    </Container>
                )}

                <Button
                    disabled={!post}
                    onClick={handleOnPost}
                    sx={{
                        color: palette.background.alt,
                        backgroundColor: palette.primary.dark,
                        borderRadius: "3rem",
                    }}
                >
                    POST
                </Button>
            </Container>
        </Wrap>
    );
};

export default MyPost;