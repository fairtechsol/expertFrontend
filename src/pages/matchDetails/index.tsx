import { Box } from "@mui/material";
import { useEffect } from "react";
import Loader from "../../components/Loader";
import SessionMarketLive from "../../components/matchDetails/SessionMarketLive";
import SessionMarket from "../../components/matchDetails/SessionMarket";
import RunsBox from "../../components/matchDetails/RunsBox";
import MatchOdds from "../../components/matchDetails/MatchOdds";
import BookMarket from "../../components/matchDetails/Bookmarket";
import BetList from "../../components/matchDetails/BetList";
import { useLocation, useNavigate } from "react-router-dom";
import {
  getMatchDetail,
  updateMatchBettingStatus,
  updateMatchRates,
  updateSessionAdded,
} from "../../store/actions/addMatch/addMatchAction";
import { AppDispatch, RootState } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import TiedMatchMarket from "../../components/matchDetails/TiedMatchMarket";
import CompleteMatchMarket from "../../components/matchDetails/CompleteMatchMarket";
import { expertSocketService, socketService } from "../../socketManager";
import { getPlacedBetsMatch } from "../../store/actions/match/matchAction";
import { updateApiSessionById } from "../../store/actions/addSession";

const MatchDetails = () => {
  const data: any = [];
  const { state } = useLocation();
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const { matchDetail, loading } = useSelector(
    (state: RootState) => state.addMatch.addMatch
  );
  const { placedBetsMatch } = useSelector(
    (state: RootState) => state.matchList
  );

  const updateMatchDetailToRedux = (event: any) => {
    try {
      if (state?.id === event?.id) {
        dispatch(updateMatchRates(event));
      } else return;
    } catch (e) {
      console.log(e);
    }
  };

  const resultDeclared = (event: any) => {
    try {
      if (event?.matchId === state?.id) {
        navigate("/expert/match");
      }
    } catch (e) {
      console.log(e);
    }
  };
  const resultUnDeclared = (event: any) => {
    try {
      if (event?.matchId === state?.id) {
        dispatch(getMatchDetail(state?.id));
      }
    } catch (e) {
      console.log(e);
    }
  };

  const updateBettingStatus = (event: any) => {
    try {
      if (state?.id === event?.matchId) {
        dispatch(updateMatchBettingStatus(event));
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    try {
      if (state?.id) {
        dispatch(getMatchDetail(state?.id));
        dispatch(getPlacedBetsMatch(state?.id));
      }
    } catch (e) {
      console.log(e);
    }
  }, [state?.id]);

  const matchDeleteBet = (event: any) => {
    try {
      if (event?.matchId === state?.id) {
        dispatch(getPlacedBetsMatch(state?.id));
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleSessionAdded = (event: any) => {
    try {
      if (event?.matchId === state?.id) {
        dispatch(updateSessionAdded(event));
      }
    } catch (e) {
      console.log(e);
    }
  };

  const updateResultDeclared = (event: any) => {
    try {
      if (state?.id === event?.matchId) {
        dispatch(updateApiSessionById(event));
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    try {
      if (state?.id) {
        expertSocketService.match.joinMatchRoom(state?.id, "expert");
        socketService.user.matchBettingStatusChange(updateBettingStatus);
        socketService.user.matchResultDeclared(resultDeclared);
        socketService.user.matchResultUnDeclared(resultUnDeclared);
        socketService.user.matchDeleteBet(matchDeleteBet);
        socketService.user.sessionDeleteBet(matchDeleteBet);
        socketService.user.sessionAdded(handleSessionAdded);
        socketService.user.sessionResultDeclared(updateResultDeclared);
        expertSocketService.match.getMatchRates(
          state?.id,
          updateMatchDetailToRedux
        );
      }
    } catch (e) {
      console.log(e);
    }
    return () => {
      // expertSocketService.match.leaveAllRooms();
      expertSocketService.match.leaveMatchRoom(state?.id);
    };
  }, []);

  return (
    <Box
      sx={{
        display: { lg: "flex" },
        alignSelf: "center",
        borderRadius: "10px",
        flexDirection: "row",
        width: "100%",
        height: {
          xs: loading ? "80vh" : "100%",
          lg: loading ? "90vh" : "100%",
        },
        minHeight: "92vh",
        background: !loading ? "white" : "",
        padding: 1,
        gap: 1,
      }}
    >
      {loading ? (
        <Loader text="" />
      ) : (
        <>
          <Box
            sx={{
              width: { lg: "50%", xs: "100%", md: "100%" },
            }}
          >
            {(matchDetail?.apiSessionActive ||
              matchDetail?.manualSessionActive) && (
              <Box
                sx={{
                  width: { lg: "100%", xs: "100%", md: "100%" },
                  display: "flex",
                  gap: 0.1,
                  flexDirection: "column",
                }}
              >
                <Box
                  sx={{
                    width: { lg: "100%", xs: "100%", md: "100%" },
                    flexDirection: "column",
                    display: "flex",
                  }}
                >
                  <SessionMarketLive
                    title={"Session API Market"}
                    hideTotalBet={true}
                    liveOnly={true}
                    stopAllHide={true}
                    hideResult={true}
                    sessionData={matchDetail?.apiSession}
                    currentMatch={matchDetail}
                  />
                </Box>
                <Box
                  sx={{
                    width: { lg: "100%", xs: "100%", md: "100%" },
                    flexDirection: "column",
                    display: "flex",
                  }}
                >
                  <SessionMarket
                    setIObtes={() => {}}
                    title={"Session Market"}
                    liveOnly={false}
                    hideTotalBet={false}
                    stopAllHide={false}
                    sessionData={matchDetail?.sessionBettings}
                    hideResult={false}
                    currentMatch={matchDetail}
                  />
                </Box>
              </Box>
            )}

            {data?.length > 0 && (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap",
                  gap: "1px",
                  rowGap: "5px",
                  height: "524px",
                  overflow: "scroll",
                  marginTop: "1.25vw",
                }}
              >
                {data?.map((v: any) => {
                  return <RunsBox key={v?.id} item={v} />;
                })}
              </Box>
            )}
          </Box>
          <Box
            sx={{
              width: { lg: "50%", xs: "100%", md: "100%" },
              flexDirection: "column",
              display: "flex",
              paddingLeft: "5px",
            }}
          >
            {matchDetail?.matchOdd?.isActive && (
              <MatchOdds
                showHeader={true}
                currentMatch={matchDetail}
                matchOddsLive={matchDetail?.matchOdd}
              />
            )}
            {matchDetail?.bookmaker?.isActive && (
              <BookMarket
                currentMatch={matchDetail}
                liveData={matchDetail?.bookmaker}
              />
            )}
            {matchDetail?.apiTideMatch?.isActive && (
              <TiedMatchMarket
                currentMatch={matchDetail}
                liveData={matchDetail?.apiTideMatch}
              />
            )}
            {matchDetail?.marketCompleteMatch?.isActive && (
              <CompleteMatchMarket
                currentMatch={matchDetail}
                liveData={matchDetail?.marketCompleteMatch}
              />
            )}

            {matchDetail?.id && <BetList allBetRates={placedBetsMatch} />}
          </Box>
        </>
      )}
    </Box>
  );
};

export default MatchDetails;
