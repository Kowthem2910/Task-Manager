import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";


const Index = ({children}) =>{
    const isLoggedIn = useSelector(state => state.user.isLoggedIn);
    if(!isLoggedIn){
        return <Navigate to="/login" replace/>
    }else{
        return children
    }
}



export default Index;