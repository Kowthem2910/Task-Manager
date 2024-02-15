import { auth, db } from "../firebaseConfig";
import { signInWithEmailAndPassword, signOut, updateProfile, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, setDoc, getDocs , collection, deleteDoc } from "firebase/firestore";


const signIn = async (email, password) => {
  try {
    const user = await signInWithEmailAndPassword(auth, email, password);
    const userData = {
      uid: user.user.uid,
      email: user.user.email,
      displayName: user.user.displayName,
      authToken: user.user.accessToken,
      photoUrl: user.user.photoURL,
      phone: user.user.phoneNumber,
      isLoggedin: true,
    };
    return { data: userData, status: "ok" };
  } catch (error) {
    return { data: error.message, status: "error" };
  }
};

const signUp = async (userName, email, password) => {
  userName = userName.replace(/ /g, "");
  try {
    const user  = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(user.user, {
      displayName: userName, photoURL: `https://source.boringavatars.com/beam/80/${userName}/`
    })
    const userData = {
      uid: user.user.uid,
      email: user.user.email,
      displayName: user.user.displayName,
      authToken: user.user.accessToken,
      photoUrl: user.user.photoURL,
      phone: user.user.phoneNumber,
      isLoggedin: true,
    };
    await setDoc(doc(db, "Users", user.user.uid), userData);
    return { data: userData, status: "ok" }
  } catch (error) {
    return { data: error.message, status: "error" };
  }
};

const logOut = async () => {
  try {
    await signOut(auth);
    return {
      code: 200,
      status: "ok",
      message: "Logged Out Successfully",
    };
  } catch (error) {
    return { code: 500, status: "error", message: error.message };
  }
};


const getUsers = async ()=>{
  const resData = await getDocs(collection(db, "Users"));
  const users = [];
  resData.forEach((doc) => {
    let userData ={
      uid:doc.data().uid,
      userName: doc.data().displayName,
      email: doc.data().email,
    }
    users.push(userData);
  })
  return users;
}


const AddTaskToStore = async (task, id) => {
  try {
    const res = await setDoc(doc(db, "Tasks", id), task);
    return {
      code: 200,
      status: "ok",
      message: "Task Added Successfully",
    };
  } catch (error) {
    return { code: 500, status: "error", message: error.message };
  }
}

const getTaskFromStore = async () => {
  try {
    const Tasks = [];
    const querySnapshot = await getDocs(collection(db, "Tasks"));
    querySnapshot.forEach((doc) => {
      Tasks.push(doc.data());
    });
    return Tasks;
  } catch {
    console.log("No UserId Found");
  }
};




export { signIn, signUp, logOut, getUsers, AddTaskToStore, getTaskFromStore };
