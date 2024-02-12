import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { DashBoard, SignUp, Login } from "./pages/Index";
import AuthRoutes from "./Routes/AuthRoutes";
import store, { persistor } from "./Redux/reducer";
import { Toaster } from "./components/ui/toaster";
import { PersistGate } from "redux-persist/integration/react";
import { ThemeProvider } from "./Utils/ThemeProvider";
import Sidebar from "./Utils/components/Sidebar";

const App = () => {
  return (
    <ThemeProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Router>
            <div className=" h-screen w-screen flex flex-row gap-2">
                <Sidebar />
                <Routes>
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<SignUp />} />
                  <Route path="/dashboard" element={<AuthRoutes><DashBoard /></AuthRoutes>} />
                </Routes>
            </div>
          </Router>
          <Toaster />
        </PersistGate>
      </Provider>
    </ThemeProvider>
  );
};

export default App;
