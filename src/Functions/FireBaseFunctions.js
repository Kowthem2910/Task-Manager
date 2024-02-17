import { auth, db } from "../firebaseConfig";
import { signInWithEmailAndPassword, signOut, updateProfile, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, setDoc, getDocs , collection, deleteDoc } from "firebase/firestore";
import {v4 as uuid4} from 'uuid';


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
  const taskId = uuid4();
  try {
    const res = await setDoc(doc(db, "Tasks", id, 'assignedTasks', taskId), {taskId: taskId, ...task});
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
    const tasks = [];
    const querySnapshot = await getDocs(collection(db, "Tasks"));
    await Promise.all(
      querySnapshot.docs.map(async (taskDoc) => {
        const subCollectionSnapshot = await getDocs(collection(taskDoc.ref, "assignedTasks"));
        tasks.push(
          ...subCollectionSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data(), parentId: taskDoc.id }))
        );
      })
    );
    console.log(tasks[0])

    return tasks;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error; // Re-throw the error for proper handling
  }
};


const deleteTask = async (parentTaskId, taskId) => {
  try {
    const parentTaskRef = doc(db, "Tasks", parentTaskId);
    const subcollectionRef = collection(parentTaskRef, "assignedTasks");
    const taskRef = doc(subcollectionRef, taskId);

    await deleteDoc(taskRef);
    return {
      code: 200,
      status: "ok",
      message: "Task Deleted Successfully",
    };
  } catch (error) {
    return { code: 500, status: "error", message: error.message }; // Re-throw the error for proper handling
  }
};


export { signIn, signUp, logOut, getUsers, AddTaskToStore, getTaskFromStore, deleteTask };
