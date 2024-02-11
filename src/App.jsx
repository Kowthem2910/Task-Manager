import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home, SignUp, Login } from "./pages/Index";
import AuthRoutes from "./Routes/AuthRoutes";
import store, { persistor } from "./Redux/reducer";
import { Toaster } from "./components/ui/toaster";
import { PersistGate } from "redux-persist/integration/react";
import { ThemeProvider } from "./Utils/ThemeProvider";

const App = () => {
  return (
    <ThemeProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
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
          <Toaster />
        </PersistGate>
      </Provider>
    </ThemeProvider>
  );
};

export default App;
