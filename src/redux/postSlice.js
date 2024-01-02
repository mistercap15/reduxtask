import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  try {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/posts"
    );
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const fetchPostById = createAsyncThunk(
  "posts/fetchPostById",
  async (postId) => {
    try {
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/posts/${postId}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState: { data: [], status: "idle", error: null, selectedPost: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchPostById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPostById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.selectedPost = action.payload;
      })
      .addCase(fetchPostById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const selectPosts = (state) => state.posts.data;
export const selectStatus = (state) => state.posts.status;
export const selectError = (state) => state.posts.error;
export const selectSelectedPost = (state) => state.posts.selectedPost;

export default postsSlice.reducer;
