import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { DashBoard, SignUp, Login, Boards, Settings, MyTasks } from "./pages/Index";
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
            <div className=" h-screen w-screen flex flex-row ">
                <Sidebar />
                <Routes>
                  <Route path="/" element={<Login/>} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<SignUp />} />
                  <Route path="/dashboard" element={<AuthRoutes><DashBoard /></AuthRoutes>} />
                  <Route path="/boards" element={<AuthRoutes><Boards /></AuthRoutes>} />
                  <Route path="/settings" element={<AuthRoutes><Settings /></AuthRoutes>} />
                  <Route path="/my-tasks" element={<AuthRoutes><MyTasks /></AuthRoutes>} />
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
