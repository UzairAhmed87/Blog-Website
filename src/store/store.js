import { configureStore } from "@reduxjs/toolkit";
import { login, logOut } from "./authSlice";

const store = configureStore({
  reducer: {
    login,
    logOut,
  },
});

export default store;
