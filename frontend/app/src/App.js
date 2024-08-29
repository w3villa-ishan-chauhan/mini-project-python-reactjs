import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./components/Signup/page";
import Login from "./components/Login/page";
import Forget from "./components/ForgetPassword/page";
import OtpPage from "./components/OtpPage/page";
import HomePage from "./components/HomePage/page";
import AdminPanel from "./components/AdminPanel/page";
import ProtectedRoute from "./components/ProtectedRoute";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forget" element={<Forget />} />
        <Route path="/otp" element={<OtpPage />} />
        <Route path="/home" element={<ProtectedRoute />}>
          <Route index element={<HomePage />} />
        </Route>
        <Route path="/admin" element={<ProtectedRoute />}>
          <Route index element={<AdminPanel />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
