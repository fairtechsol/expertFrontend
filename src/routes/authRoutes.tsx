import { lazy } from "react";
import { Navigate } from "react-router-dom";
import AuthLayout from "../layout/auth";
import Loadable from "../utils/loadable";
import ChangePassword from "../pages/changePassword";

const Login = Loadable(lazy(() => import("../pages/auth/login")));

const AuthRoutes = {
  path: "/",
  element: <AuthLayout />,
  children: [
    { index: true, element: <Navigate to="/login" replace /> },
    {
      path: "login",
      element: <Login />,
    },
    {
      path: "change_password",
      element: <ChangePassword />,
    },
  ],
};
export default AuthRoutes;
