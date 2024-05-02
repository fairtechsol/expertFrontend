import { Navigate } from "react-router-dom";
import AuthLayout from "../layout/auth";
// import Loadable from "../utils/loadable";
import { Constants } from "../utils/Constants";
import Login from "../pages/auth/login";
import ChangePassword from "../pages/changePassword";

// const Login = Loadable(() => import("../pages/auth/login"));
// const ChangePassword = Loadable(() => import("../pages/changePassword"));

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
