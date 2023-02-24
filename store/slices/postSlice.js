import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  post: {
    title: "Hello World",
    body: "This is a post",
    id: 1,
    comments: [],
    likes: 0,
    dislikes: 0,
    wallet: "0x0000000000",
  },
  feedPosts: [
    {
      title: "Hello World",
      body: "This is a post",
      id: 1,
      comments: [],
      likes: 0,
      dislikes: 0,
      wallet: "0x0000000000",
    },
  ],
};

export const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    // Action to add comment
    addComment: (state, action) => {
      state.value = [...state.value, action.payload];
    },

    // Special reducer for hydrating the state
    extraReducers: {
      [HYDRATE]: (state, action) => {
        return {
          ...state,
          ...action.payload.comments,
        };
      },
    },
  },
});

export const { addComment } = postSlice.actions;
export const selectComments = (state) => state.comments.value;
export default postSlice.reducer;
