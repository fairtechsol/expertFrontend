import { createBrowserRouter } from "react-router-dom";
import config from "../config";
import AuthRoutes from "./authRoutes";
import MainRoutes from "./mainRoutes";

export default function routes() {
  return createBrowserRouter([AuthRoutes, MainRoutes], {
    basename: config.BASE_NAME,
    future: { v7_relativeSplatPath: true },
  });
}
