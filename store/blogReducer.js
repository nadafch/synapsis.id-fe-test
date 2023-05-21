import { createSlice } from "@reduxjs/toolkit";
import { getArticle } from "./api";

const blog = createSlice({
  name: "blog",
  initialState: {
    isLoading: false,
    isError: null,
    data: [],
  },
  extraReducers: {
    [getArticle.pending]: (state) => {
      state.isLoading = true;
      state.isError = null;
    },
    [getArticle.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    },
    [getArticle.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = action.isError;
    },
  },
});

export default blog.reducer;
