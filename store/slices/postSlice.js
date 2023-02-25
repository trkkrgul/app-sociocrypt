import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  post: {},
  feedPosts: [],
};

export const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    // Action to add comment
    setPosts: (state, action) => {
      state.feedPosts = action.payload;
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

export const { setPosts } = postSlice.actions;
export const selectComments = (state) => state.comments.value;
export default postSlice.reducer;
