import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import blog from "./blogReducer";
import user from "./userReducer";

export default configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  reducer: {
    blog: blog,
    user: user,
  },
});
