import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./store";

const store = configureStore({
  reducer: {
    user: userReducer
  }
});

export default store;
