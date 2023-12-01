import { lazy } from "react";
import { Navigate } from "react-router-dom";
import Loadable from "../utils/loadable";

const MainLayout = Loadable(lazy(() => import("../layout/main")));
const MatchList = Loadable(lazy(() => import("../pages/matchList")));
// const ChangePassword = Loadable(lazy(() => import("../pages/changePassword")));
// const MyAccount = Loadable(lazy(() => import("../pages/myAccount")));
// const Inplay = Loadable(lazy(() => import("../pages/inplay")));
// const AddAccount = Loadable(lazy(() => import("../pages/addAccount")));
// const Analysis = Loadable(lazy(() => import("../pages/analysis")));
// const Reports = Loadable(lazy(() => import("../pages/reports")));

const MainRoutes = {
  path: "/expert",
  element: <MainLayout />,
  children: [
    {
      path: "match_list",
      element: <MatchList />,
    },
    // {
    //   path: "live_market",
    //   element: <Inplay />,
    // },
    // {
    //   path: "add_account",
    //   element: <AddAccount />,
    // },
    // {
    //   path: "edit_account",
    //   element: <AddAccount />,
    // },
    // {
    //   path: "market_analysis",
    //   element: <Analysis />,
    // },
    // {
    //   path: "reports",
    //   element: <Reports />,
    // },
    // {
    //   path: "my-account",
    //   element: <MyAccount />,
    // },
    // {
    //   path: "change_password",
    //   element: <ChangePassword />,
    // },
    {
      path: "*",
      element: <Navigate to={"/wallet"} replace />,
    },
  ],
};
export default MainRoutes;
