//External import
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    token: null,
    posts: [],
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {

        setLogin: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        setLogout: (state) => {
            state.user = null;
            state.token = null;
        },
        setFriends: (state, action) => {
            if (state.user) {
                state.user.friends = action.payload.friends;
            } else {
                console.error("les amis d'utilisateru n'existent pas");
            }
        },
        setPosts: (state, action) => {
            state.posts = action.payload.posts;
        },
        setPost: (state, action) => {
            const updatedPosts = state.posts.map((post) => {
                if (post._id === action.payload.post._id) return action.payload.post;
                return post;
            });
            state.posts = updatedPosts;
        },
        removePost: (state, action) => {
            const postIdToRemove = action.payload.postId;

            const updatedPosts = state.posts.filter(post => post._id !== postIdToRemove);

            state.posts = updatedPosts;
        },
    },
});

export const { setLogin, setLogout, setFriends, setPosts, setPost, removePost } =
    authSlice.actions;
export default authSlice.reducer;



