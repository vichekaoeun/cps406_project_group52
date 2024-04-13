import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import ChangePassword from "./ChangePassword";
import ChangeUsername from "./ChangeUsername";
import Report from "./Report";
import Library from "./Library";
import Help from "./Help";
import Home from "./Home";

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
        },
        {
            path: "/report",
            element: <Report />
        },
        {
            path: "/library",
            element: <Library />
        },
        {
            path: "/help",
            element: <Help />
        },
        {
            path: "/home",
            element: <Home />
        }
    ]);
    return <RouterProvider router={router} />;
}

export default Route;