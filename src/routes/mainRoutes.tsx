import { lazy } from "react";
import { Navigate } from "react-router-dom";
import Loadable from "../utils/loadable";
import { Constants } from "../utils/Constants";

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
  path: Constants.MainPaths.root,
  element: <MainLayout />,
  children: [
    {
      path: Constants.MainPaths.match,
      element: <MatchList />,
    },
    {
      path: Constants.MainPaths.addMatch,
      element: <AddMatch />,
    },
    {
      path: Constants.MainPaths.editMatch,
      element: <AddMatch />,
    },
    {
      path: Constants.MainPaths.live,
      element: <AddSession />,
    },
    {
      path: Constants.MainPaths.addBookMaker,
      element: <UpdateBookmaker />,
    },
    {
      path: Constants.MainPaths.betOdds,
      element: <MatchDetails />,
    },
    {
      path: Constants.MainPaths.changePassword,
      element: <ChangePassword />,
    },
    {
      path: "*",
      element: <Navigate to={"/expert/match"} replace />,
    },
  ],
};
export default MainRoutes;
