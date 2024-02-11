import {auth} from "../firebaseConfig";
import { signInWithEmailAndPassword } from 'firebase/auth';


const signIn = async(email,password) => {
    try{
        const user = await signInWithEmailAndPassword(auth, email,password);
        const userData = {
            uid:user.user.uid,
            email:user.user.email,
            displayName: user.user.displayName,
            authToken:user.user.accessToken,
            photoUrl:user.user.photoURL,
            phone:user.user.phoneNumber,
            isLoggedin:true
          }
        return {data: userData, status:'ok'};
    }catch(error){
        console.log(error.message)
        return {data:error.message, status:'error'};
    }
}

const signUp = async(email,password) => {
    try{
        const {user} = await auth.createUserWithEmailAndPassword(email,password);
        return user;
    }catch(error){
        console.log(error)
        return error.message;
    }
}

export {signIn};