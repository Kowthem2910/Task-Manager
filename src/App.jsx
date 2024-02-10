import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home, SignUp, Login } from "./pages/Index";
import AuthRoutes from "./Routes/AuthRoutes";
import store from './Redux/reducer';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
        <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/home"
            element={
              <AuthRoutes>
                <Home />
              </AuthRoutes>
            }
          />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
