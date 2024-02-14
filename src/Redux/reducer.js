import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from 'redux-persist/lib/storage';
import {userReducer, usersReducer } from "./store";


const persistConfig = {
  key:'root',
  storage
}


const persistedReducer = persistReducer(persistConfig, userReducer)

const store = configureStore({
  reducer: {
    user:persistedReducer,
    usersCollection:usersReducer
  },
});

export const persistor = persistStore(store); 
export default store;
