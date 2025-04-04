import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./Login"
import SignUp from "./SignUp";
import Bill from "./Bill"
import "./Bill.css";
import AuthProvider from "./Context/AuthProvider";
import ProtectedRoute from "./Context/ProtectedRoute";

const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/signUp",
      element: <SignUp />,
    },
    {
      path: "/Bill",
      element: (
        <ProtectedRoute>
          <Bill />
        </ProtectedRoute>
      ),
    },
  ]);

function App() {
return (
<>
    <AuthProvider>
<RouterProvider router={router}></RouterProvider>
    </AuthProvider>
</>
);
}

export default App;
