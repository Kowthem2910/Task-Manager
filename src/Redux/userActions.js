export const login = (userInfo) => ({
    type: 'LOGIN',
    payload: userInfo,
  });
  
export const logout = () => ({
    type: 'LOGOUT',
  });


export const getUsersList = (users) => ({
  type:"GET_USERS", 
  payload:users
})
