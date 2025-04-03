/* eslint-disable no-unused-vars */
import React from "react";
import { createContext, useState, useEffect, useContext } from "react";
import Instance from "../AxiosConfig";

const AuthContext = createContext(null);

function AuthProvider({children}) {
const [isAuthenticated, setIsAuthenticated] = useState(false);
useEffect(() => {
checkAuth();
}, []);

const checkAuth = async () => {
try {
const response = await Instance.get("/auth/checkToken", {
withCredentials: true,
});
console.log(response);
if (response.status === 200) {
setIsAuthenticated(true);
console.log(isAuthenticated);
}
} catch (error) {
console.log("error found", error.message);
setIsAuthenticated(false);
}
};
return (
<AuthContext.Provider value={{ checkAuth, isAuthenticated, setIsAuthenticated }}>
{children}
</AuthContext.Provider>
);
}
export function useAuth() {
return useContext(AuthContext);
}

export default AuthProvider;