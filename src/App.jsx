import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import {auth} from '../firebaseConfig';

const App = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [status, setStatus] = useState();
  const login = async() =>{
    try {
      const {user} = await signInWithEmailAndPassword(auth, email, password);
      const userId = await user.getIdToken();
      
      console.log(res);
      setStatus('success');
    } catch (error) {
      console.log(error);
      setStatus('error');
    }
  }
  return (
    <div>
      <h1>Welcome to the app!</h1>
      Email: <input type="text" name="" id="" onChange={(e) => setEmail(e.target.value)} />
      password: <input type="password" name="" id="" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={login}>Login</button>
      {status ==='success' && <p>Success!</p>}
    </div>
  )
}

export default App