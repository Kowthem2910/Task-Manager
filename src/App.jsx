import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import {Home, SignUp, Login } from './pages';
import AuthRoutes from './Routes/AuthRoutes';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/home" element={<AuthRoutes><Home/></AuthRoutes>} />
      </Routes>
    </Router>
  )
}

export default App;