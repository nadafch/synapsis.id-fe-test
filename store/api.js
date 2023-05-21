import { createAsyncThunk } from "@reduxjs/toolkit";
const apiKey = `Bearer 22f82cecb8faa17d1060d4f16d5dbbaaa1e13d21076fbea9c7cf32b65db70db2`;

export const getArticle = createAsyncThunk(
  "/blog/getArticle",
  async (arg, {}) => {
    const data = await fetch("https://gorest.co.in/public/v2/posts");
    return await data.json();
  }
);

export const getUser = createAsyncThunk("user/getUser", async (arg, {}) => {
  const data = await fetch("https://gorest.co.in/public/v2/users", {
    headers: {
      Authorization: apiKey,
    },
  });
  return await data.json();
});

export const createUser = createAsyncThunk(
  "user/createUser",
  async (data, { rejectWithValue }) => {
    const res = await fetch("https://gorest.co.in/public/v2/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: apiKey,
      },
      body: JSON.stringify(data),
    });
    try {
      const result = await res.json();
      return result;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async (id, { rejectWithValue }) => {
    const res = await fetch(`https://gorest.co.in/public/v2/users/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: apiKey,
      },
    });
    try {
      const result = await res.json();
      console.log(result);
      return result;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const updateUser = createAsyncThunk(
  "user/editUser",
  async (data, { rejectWithValue }) => {
    const res = await fetch(`https://gorest.co.in/public/v2/users/${data.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: apiKey,
      },
      body: JSON.stringify(data),
    });
    try {
      return await res.json();
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);
