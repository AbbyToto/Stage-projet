//External Imports
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";

//Internal imports
import routesAuth from "./routes/auth.js";
import routesUsers from "./routes/users.js";
import routesPosts from "./routes/posts.js";
import { register } from "./controllers/auth.js";
import { protect } from "./middlewares/auth.js";
import { createPost } from "./controllers/posts.js";
import User from "./models/User.js";
import Post from "./models/Post.js";
import { users, posts } from "./data/index.js";

// Variables
const app = express();
const PORT = 5000;

// Middlewares
app.use(express.json());
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/image", express.static(path.join(__dirname, "public/image")));

// setup files
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/image");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});
const fileUploader = multer({ storage });


//Routes for files
app.post("/auth/register", fileUploader.single("image"), register);
app.post("/posts", protect, fileUploader.single("image"), createPost);

// Routers
app.use("/auth", routesAuth);
app.use("/users", routesUsers);
app.use("/posts", routesPosts);


//Methode pour connecter au Database
const connectDb = async () => {
    try {
        const con = await mongoose.connect('mongodb+srv://meuser:meuser123@cluster0.691gstk.mongodb.net/');
        console.log(`connected to mongodB : ${con.connection.host}`);
    } catch (error) {
        console.log(`MongoDb : ${error}`);
    }
}
connectDb();

// Listener
app.listen(PORT, () => {
    console.log(`Server listen on port : ${PORT}`);
    //ajouter faux index 
    //User.insertMany(users);
    //Post.insertMany(posts);
});

