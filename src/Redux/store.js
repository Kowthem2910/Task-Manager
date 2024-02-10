
const initalState = {
    userInfo:null,
    isLoggedIn:false,
}

const userReducer = (state = initalState, action) => {
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



export default userReducer;
