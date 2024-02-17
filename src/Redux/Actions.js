// actions.js

export const LOGIN_USER = 'LOGIN_USER';
export const LOGOUT_USER = 'LOGOUT_USER';
export const GET_USERS = 'GET_USERS';
export const ADD_TASK = 'ADD_TASK';
export const GET_TASKS = 'GET_TASKS';

export const loginUser = (userInfo) => ({
  type: LOGIN_USER,
  payload: userInfo,
});

export const logoutUser = () => ({
  type: LOGOUT_USER,
});

export const getUsersList = (users) => ({
  type: GET_USERS,
  payload: users,
});

export const addTask = (task) => ({
  type: ADD_TASK,
  payload: task,
});

export const getTasks = (tasks) => ({
  type: GET_TASKS,
  payload: tasks,
});
