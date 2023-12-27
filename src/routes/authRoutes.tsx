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
    { index: true, element: <Navigate to="/expert/login" replace /> },
    {
      path: "expert/login",
      element: <Login />,
    },
    {
      path: "expert/change_password",
      element: <ChangePassword />,
    },
    {
      path: "expert/change_password",
      element: <ChangePassword />,
    },
    {
      path: "*",
      element: <Navigate to={"/expert/login"} replace />,
    },
  ],
};
export default AuthRoutes;
