import {configureStore} from '@reduxjs/toolkit';
import {userReducer, taskReducer} from './Store';

const store = configureStore({
    reducer: {
        user: userReducer,
        tasks:taskReducer
    }
})


export default store;

