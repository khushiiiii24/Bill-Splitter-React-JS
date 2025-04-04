import React, { createContext, useState, useEffect, useContext } from "react";
import Instance from "../AxiosConfig";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const checkAuth = async () => {
    try {
      const response = await Instance.get("/auth/checkToken", {
        withCredentials: true,
      });
      if (response.status === 200) {
        setIsAuthenticated(true);
      } 
    } catch (error) 
    {
      console.log("Error found:", error.message);
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []); 

  return (
    <AuthContext.Provider
      value={{ checkAuth, isAuthenticated, setIsAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

export default AuthProvider;
