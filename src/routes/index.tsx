import { createBrowserRouter } from "react-router-dom";
// routes
import config from "../config";
import AuthRoutes from "./authRoutes";
import MainRoutes from "./mainRoutes";

export default function routes() {
  return createBrowserRouter([AuthRoutes, MainRoutes], {
    basename: config.BASE_NAME,
  });
}
