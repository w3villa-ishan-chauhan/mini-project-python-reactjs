import React, { createContext, useContext, useState, useEffect } from "react";
import { get_user_details } from "../api/api";

const AuthContext = createContext();
// AuthProvider component to provide auth state and actions
export function AuthProvider({ children }) {
  const [token, setToken] = useState(
    localStorage.getItem("access_token") || null
  );
  const [contactNumber, setContactNumber] = useState("");
  const [email, setUserEmail] = useState("");
  const [address, setUserAddress] = useState("");
  const [role,setRole]=useState("")

  const [authState, setauthState] = useState({ user: "" });
  console.log('Token state after setting:',token);

  useEffect(() => {
    console.log(token);
  }, [token]);

  const setUserRole=(role)=>{
    setRole(role);
  }

  const setContact = (contactNumber) => {
    setContactNumber(contactNumber);
  };

  const setUser=(userDetails)=>{
    setauthState(userDetails)
  }

  const setEmail = (email) => {
    setUserEmail(email);

  };
  const setAddress=(address)=>{
    setUserAddress(address)
    console.log("context_address",address)
  }

  // Login function to set token
  const login = async (newToken) => {
    setToken(newToken);

    //const userData = await get_user_details(email);
    //setauthState({ user: userData });
    // console.log(userData);
  };

  // Logout function to clear token
  const logout = () => {
    setToken(null);
    setContactNumber("");
  };

  const isAuthenticated = () => {
    if (token != null) {
      return true;
    }
    return false;
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        login,
        logout,
        isAuthenticated,
        contactNumber,
        setContact,
        setEmail,
        email,
        setUser,
        authState,
        setAddress,
        address,
        setUserRole,
        role
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use auth context
export function useAuth() {
  return useContext(AuthContext);
}
