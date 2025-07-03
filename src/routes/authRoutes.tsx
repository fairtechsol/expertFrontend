import { Navigate } from "react-router-dom";
import AuthLayout from "../layout/auth";
import Login from "../pages/auth/login";
import ChangePassword from "../pages/changePassword";
import { Constants } from "../utils/Constants";

const AuthRoutes = {
  path: Constants.AuthPaths.root,
  element: <AuthLayout />,
  children: [
    {
      index: true,
      element: <Navigate to={Constants.AuthPaths.login} replace />,
    },
    {
      path: Constants.AuthPaths.login,
      element: <Login />,
    },
    {
      path: Constants.AuthPaths.changePassword,
      element: <ChangePassword />,
    },
    {
      path: "*",
      element: <Navigate to={`/${Constants.AuthPaths.login}`} replace />,
    },
  ],
};
export default AuthRoutes;
