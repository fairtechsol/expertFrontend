import { Navigate } from "react-router-dom";
import OtherMatchDetails from "../pages/otherMatchDetails";
import { Constants } from "../utils/Constants";

import MainLayout from "../layout/main";
import AddManualMarket from "../pages/addManualBetting";
import AddMatch from "../pages/addMatch";
import AddRace from "../pages/addRace";
import AddSession from "../pages/addSession";
import BetDetail from "../pages/betDetail";
import ChangePassword from "../pages/changePassword";
import MatchList from "../pages/matchList";
import MatchMarketDetail from "../pages/matchMarketDetail";
import RaceDetails from "../pages/raceDetails";
import RaceList from "../pages/raceList";
import SessionBetlistDetail from "../pages/sessionBetlistDetail";
import SessionMarketDetail from "../pages/sessionMarketDetail";
import TabList from "../pages/tabList";
import UpdateBookmaker from "../pages/updateBookmaker";

const MainRoutes = {
  path: Constants.MainPaths.root,
  element: <MainLayout />,
  children: [
    {
      path: Constants.MainPaths.match,
      element: <MatchList />,
    },
    {
      path: Constants.MainPaths.tab,
      element: <TabList />,
    },
    {
      path: Constants.MainPaths.race,
      element: <RaceList />,
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
      path: Constants.MainPaths.addRace,
      element: <AddRace />,
    },
    {
      path: Constants.MainPaths.editrace,
      element: <AddRace />,
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
      path: Constants.MainPaths.addManualMarket,
      element: <AddManualMarket />,
    },
    {
      path: Constants.MainPaths.betOddsOtherGames,
      element: <OtherMatchDetails />,
    },
    {
      path: Constants.MainPaths.betOddsRace,
      element: <RaceDetails />,
    },
    {
      path: Constants.MainPaths.session,
      element: <SessionMarketDetail />,
    },
    {
      path: Constants.MainPaths.sessionBetList,
      element: <SessionBetlistDetail />,
    },
    {
      path: Constants.MainPaths.market,
      element: <MatchMarketDetail />,
    },
    {
      path: Constants.MainPaths.betDetail,
      element: <BetDetail />,
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
