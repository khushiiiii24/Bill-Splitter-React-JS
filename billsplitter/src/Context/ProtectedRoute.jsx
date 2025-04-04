import React, { createContext, useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import Instance from '../AxiosConfig';
import { useAuth } from './AuthProvider';

const AuthContext = createContext();

function ProtectedRoute({ children }) {
    const { isAuthenticated, setIsAuthenticated } = useAuth(); 

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await Instance.get("/auth/checkToken");
                if (response.status === 200) {
                    setIsAuthenticated(true);
                } else {
                    setIsAuthenticated(false);
                }
            } catch (error) {
                console.log("Error found:", error);
                setIsAuthenticated(false);
            }
        };

        checkAuth();
    }, [setIsAuthenticated]); 

    if (isAuthenticated === null) {
        return <div>Loading...</div>; 
    }

    return isAuthenticated ? children : <Navigate to="/" replace />;
}

export default ProtectedRoute;
