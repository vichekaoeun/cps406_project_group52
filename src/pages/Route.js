import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import ChangePassword from "./ChangePassword";
import ChangeUsername from "./ChangeUsername";

function Route() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Login />
        },
        {
            path: "/register",
            element: <Register />
        },
        {
            path: "/change-password",
            element: <ChangePassword />
        },
        {
            path: "/change-username",
            element: <ChangeUsername />
        }
    ]);
    return <RouterProvider router={router} />;
}

export default Route;