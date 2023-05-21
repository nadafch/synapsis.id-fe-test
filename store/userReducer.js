import { createSlice } from "@reduxjs/toolkit";
import { getUser, createUser, deleteUser, updateUser } from "./api";

const user = createSlice({
  name: "user",
  initialState: {
    isLoading: false,
    isError: null,
    user: [],
  },
  extraReducers: {
    [getUser.pending]: (state) => {
      state.isLoading = true;
    },
    [getUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
    },
    [getUser.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = action.payload;
    },
    [createUser.pending]: (state) => {
      state.isLoading = true;
    },
    [createUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.user.push(action.payload);
    },
    [createUser.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = action.payload.message;
    },
    [deleteUser.pending]: (state) => {
      state.isLoading = true;
    },
    [deleteUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      const { id } = action.payload;
      if (id) {
        state.user = state.user.filter((item) => item.id !== id);
      }
    },
    [deleteUser.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = action.payload;
    },
    [updateUser.pending]: (state) => {
      state.isLoading = true;
    },
    [updateUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.user.push(action.payload);
    },
    [updateUser.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = action.payload.message;
    },
  },
});

export default user.reducer;
