import { Navigate } from "react-router-dom";
import Loadable from "../utils/loadable";
import { Constants } from "../utils/Constants";

import MainLayout from "../layout/main";

const MatchList = Loadable(() => import("../pages/matchList"));
const AddMatch = Loadable(() => import("../pages/addMatch"));
const AddSession = Loadable(() => import("../pages/addSession"));
const MatchDetails = Loadable(() => import("../pages/matchDetails"));
const ChangePassword = Loadable(() => import("../pages/changePassword"));
const UpdateBookmaker = Loadable(() => import("../pages/updateBookmaker"));

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
      path: Constants.MainPaths.live_update,
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
