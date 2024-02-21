import { auth, db } from "../firebaseConfig";
import {
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import {
  doc,
  getDoc,
  setDoc,
  getDocs,
  collection,
  deleteDoc,
  updateDoc,
  collectionGroup,
} from "firebase/firestore";
import { v4 as uuid4 } from "uuid";

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
    const user = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(user.user, {
      displayName: userName,
      photoURL: `https://source.boringavatars.com/beam/80/${userName}/`,
    });
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
    return { data: userData, status: "ok" };
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

const getUsers = async () => {
  const resData = await getDocs(collection(db, "Users"));
  const users = [];
  resData.forEach((doc) => {
    console.log("doc is",doc.data());
    let userData = {
      uid: doc.data().uid,
      userName: doc.data().displayName,
      email: doc.data().email,
    };
    users.push(userData);
  });
  console.log("user is:",users);
  return users;
};

const AddTaskToStore = async (task, id) => {
  const taskId = uuid4();
  try {
    await setDoc(doc(db, "Tasks", id, "assignedTasks", taskId), {
      taskId: taskId,
      ...task,
    });
    return {
      code: 200,
      status: "ok",
      message: "Task Added Successfully",
    };
  } catch (error) {
    return { code: 500, status: "error", message: error.message };
  }
};

const getTaskFromStore = async () => {
  try {
    const tasks = [];
    const querySnapshot = await getDocs(collectionGroup(db, "assignedTasks"));
    console.log("The task is:"+querySnapshot);
    tasks.push(
      ...querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        parentId: doc.data().assignedToUid,
      }))
    )
    // await Promise.all( 
    //   querySnapshot.docs.map(async (taskDoc) => {
    //     console.log(taskDoc);
    //     const subCollectionSnapshot = await getDocs(
    //       collection(taskDoc.ref, "assignedTasks")
    //     );
    //     tasks.push(
    //       ...subCollectionSnapshot.docs.map((doc) => ({
    //         id: doc.id,
    //         ...doc.data(),
    //         parentId: taskDoc.id,
    //       }))
    //     );
    //   })
    // );
    console.log(tasks);
    return tasks;
  } catch (error) {
    console.log(error);
    throw error; 
  }
};


const deleteTask = async (parentTaskId, taskId) => {
  try {
    console.log(parentTaskId+" "+taskId);
    const parentTaskRef = doc(db, "Tasks", parentTaskId);
    const subcollectionRef = collection(parentTaskRef, "assignedTasks");
    console.log("Delete:"+subcollectionRef+" "+taskId);
    const taskRef = doc(subcollectionRef, taskId);
    console.log(taskRef);
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

const getUserTasks = async (id) => {
  try {
    const tasks = [];
    // Fetch the specific task document directly
    const taskDocRef = doc(db, "Tasks", id);
    const taskDoc = await getDoc(taskDocRef);

    if (taskDoc.exists) {
      // If the document exists, fetch its subcollection
      const subCollectionSnapshot = await getDocs(
        collection(taskDocRef, "assignedTasks")
      );
      tasks.push(
        ...subCollectionSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          parentId: id,
        }))
      );
    } else {
      console.log(`Task document with ID ${id} not found.`);
    }
    return tasks;
  } catch (error) {
    console.log(error);
  }
};

const updateTaskStatus = async (parentTaskId, taskId, newStatus) => {
  try {
    const parentTaskRef = doc(db, "Tasks", parentTaskId);
    const subcollectionRef = collection(parentTaskRef, "assignedTasks");
    const taskRef = doc(subcollectionRef, taskId);

    await updateDoc(taskRef, { status: newStatus });
    return {
      code: 200,
      status: "ok",
      message: "Status Updated Successfully",
    };
  } catch (error) {
    return { code: 500, status: "error", message: error.message };
  }
};

export {
  signIn,
  signUp,
  logOut,
  getUsers,
  AddTaskToStore,
  getTaskFromStore,
  deleteTask,
  getUserTasks,
  updateTaskStatus,
};
