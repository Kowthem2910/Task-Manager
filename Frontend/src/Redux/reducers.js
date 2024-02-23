// reducers.js

import { combineReducers } from 'redux';
import { LOGIN_USER, LOGOUT_USER, GET_USERS, ADD_TASK, GET_TASKS } from './Actions';

const initialUserState = {
  userInfo: null,
  isLoggedIn: false,
};

const userReducer = (state = initialUserState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        isLoggedIn: true,
        userInfo: action.payload,
      };
    case LOGOUT_USER:
      return {
        ...state,
        isLoggedIn: false,
        userInfo: null,
      };
    default:
      return state;
  }
};

const initialUsersState = {
  list: [],
};

const usersReducer = (state = initialUsersState, action) => {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        list: action.payload,
      };
    default:
      return state;
  }
};

const initialTasksState = {
  list: [],
};

const tasksReducer = (state = initialTasksState, action) => {
  switch (action.type) {
    case ADD_TASK:
      return {
        ...state,
        list: [...state.list, action.payload],
      };
    case GET_TASKS:
      return {
        ...state,
        list: action.payload,
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  user: userReducer,
  users: usersReducer,
  tasks: tasksReducer,
});

export default rootReducer;
