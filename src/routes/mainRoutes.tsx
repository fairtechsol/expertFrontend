import { lazy } from "react";
import { Navigate } from "react-router-dom";
import Loadable from "../utils/loadable";

const MainLayout = Loadable(lazy(() => import("../layout/main")));
const MatchList = Loadable(lazy(() => import("../pages/matchList")));
const AddMatch = Loadable(lazy(() => import("../pages/addMatch")));
const AddSession = Loadable(lazy(() => import("../pages/addSession")));
const MatchDetails = Loadable(lazy(() => import("../pages/matchDetails")));
const ChangePassword = Loadable(lazy(() => import("../pages/changePassword")));
const UpdateBookmaker = Loadable(
  lazy(() => import("../pages/updateBookmaker"))
);

const MainRoutes = {
  path: "/expert",
  element: <MainLayout />,
  children: [
    {
      path: "match",
      element: <MatchList />,
    },
    {
      path: "add_match",
      element: <AddMatch />,
    },
    {
      path: "edit_match",
      element: <AddMatch />,
    },
    {
      path: "live",
      element: <AddSession />,
    },
    {
      path: "add_book_maker",
      element: <UpdateBookmaker />,
    },
    {
      path: "betOdds",
      element: <MatchDetails />,
    },
    {
      path: "change_password",
      element: <ChangePassword />,
    },
    {
      path: "*",
      element: <Navigate to={"/expert/match"} replace />,
    },
  ],
};
export default MainRoutes;
