import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/authcontext';

const ProtectedRoute = () => {
  const { isAuthenticated, setUserRole } = useAuth();
  let token_value = isAuthenticated()
  let role=setUserRole()
  console.log("role:",token_value)
  if (!token_value) {
    return <Navigate to="/login" />;
  }

  // if (role === "admin") {
  //   return <Navigate to="/admin" />;
  // } else if (role === "user" || role === "") {
  //   return <Navigate to="/home" />;
  // }

  return <Outlet />; 

};
export default ProtectedRoute;
