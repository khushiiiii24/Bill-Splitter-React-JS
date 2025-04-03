import React from 'react'
import { createContext, useState, useEffect } from 'react'
import Instance from '../AxiosConfig';
import {useNavigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';

const AuthContext = createContext()

function ProtectedRoute({children}) {
    const navigate=useNavigate();
    const {setIsAuthenticated, isAuthenticated} = useAuth();
    // const [isAuthenticated, setIsAuthenticated] = useState(false);
    useEffect(() => {
        checkAuth()
    }, []);
    const checkAuth = async () => {
        try {
            const response = await Instance.get("/auth/checkToken")
            if (response.status === 200) {
                setIsAuthenticated(true)

            }
        } catch (error) {
            console.log("error found");
            setIsAuthenticated(false);
        }
    }

    return (
        isAuthenticated ? children : <navigate to="/" />
    )
}

export default ProtectedRoute;
