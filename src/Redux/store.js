
const initalUserState = {
    userInfo:null,
    isLoggedIn:false,
}

const initalUsersCollection = {
    data:[]
}

const usersReducer = (state = initalUsersCollection, action) => {
    switch(action.type){
        case "GET_USERS":
            return {
                ...state, data:action.payload
            }
        default:
            return state
    }
}

const userReducer = (state = initalUserState, action) => {
    switch(action.type){
        case "LOGIN":
            return {
                ...state,
                isLoggedIn:true,
                userInfo:action.payload
            }
        case "LOGOUT":
            return{
                ...state,
                isLoggedIn:false,
                userInfo:null
            }
        default:
            return state
    }
}



export {userReducer, usersReducer};
