import { Box } from "@mui/material";
import { memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Loader from "../../components/Loader";
import BetList from "../../components/matchDetails/BetList";
import BookMarket from "../../components/matchDetails/Bookmarket";
import CompleteMatchMarket from "../../components/matchDetails/CompleteMatchMarket";
import MatchOdds from "../../components/matchDetails/MatchOdds";
import RunsBox from "../../components/matchDetails/RunsBox";
import SessionMarket from "../../components/matchDetails/SessionMarket";
import SessionMarketLive from "../../components/matchDetails/SessionMarketLive";
import TiedMatchMarket from "../../components/matchDetails/TiedMatchMarket";
import {
  expertSocketService,
  socket,
  socketService,
} from "../../socketManager";
import {
  getMatchDetail,
  updateMatchBettingStatus,
  updateMatchRates,
  updateRates,
  updateSessionAdded,
  updateSessionProLoss,
} from "../../store/actions/addMatch/addMatchAction";
import {
  setCurrentOdd,
  updateApiSessionById,
} from "../../store/actions/addSession";
import {
  getPlacedBetsMatch,
  getSessionProfitLossMatchDetailReset,
  updateMatchBetsPlace,
  updateMatchBetsReason,
  updateMaxLoss,
  updateSessionBetsPlace,
  updateTeamRates,
} from "../../store/actions/match/matchAction";
import { AppDispatch, RootState } from "../../store/store";

const MatchDetails = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const { matchDetail, loading, success } = useSelector(
    (state: RootState) => state.addMatch.addMatch
  );
  const { placedBetsMatch } = useSelector(
    (state: RootState) => state.matchList
  );
  const { sessionProLoss } = useSelector((state: RootState) => state.match);
  const { currentOdd } = useSelector((state: RootState) => state.addSession);

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
        dispatch(getPlacedBetsMatch(state?.id));
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

  const matchDeleteBet = (event: any) => {
    try {
      if (event?.matchId === state?.id) {
        dispatch(updateRates(event));
        dispatch(updateMatchBetsReason(event));
        dispatch(
          updateSessionProLoss({
            id: event?.betId,
            betPlaced: event?.profitLoss ? event?.profitLoss?.betPlaced : [],
          })
        );
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

  const updateSessionResultDeclared = (event: any) => {
    try {
      if (state?.id === event?.matchId) {
        dispatch(updateApiSessionById(event));
        dispatch(getPlacedBetsMatch(state?.id));
        dispatch(
          updateSessionProLoss({
            id: event?.betId,
            betPlaced: event?.profitLossObj
              ? event?.profitLossObj?.betPlaced
              : [],
          })
        );
        dispatch(
          updateMaxLoss({
            id: event?.betId,
            maxLoss: event?.profitLossObj
              ? event?.profitLossObj?.maxLoss
              : event?.profitLoss,
            totalBet: event?.profitLossObj ? event?.profitLossObj?.totalBet : 0,
          })
        );
      }
    } catch (e) {
      console.log(e);
    }
  };

  const updateMatchBetPlaced = (event: any) => {
    try {
      if (event?.jobData?.newBet?.matchId === state?.id) {
        dispatch(updateTeamRates(event));
        dispatch(updateMatchBetsPlace(event));
      }
    } catch (e) {
      console.log(e);
    }
  };

  const updateSessionBetPlaced = (event: any) => {
    try {
      if (event?.jobData?.placedBet?.matchId === state?.id) {
        dispatch(updateSessionBetsPlace(event));
        dispatch(
          updateSessionProLoss({
            id: event?.jobData?.placedBet?.betId,
            betPlaced: event?.redisData?.betPlaced,
          })
        );
        dispatch(
          updateMaxLoss({
            id: event?.jobData?.placedBet?.betId,
            maxLoss: event?.redisData?.maxLoss,
            totalBet: event?.redisData?.totalBet,
          })
        );
        dispatch(
          setCurrentOdd({
            matchId: event?.jobData?.placedBet?.matchId,
            betId: event?.jobData?.placedBet?.betId,
            odds: event?.jobData?.placedBet?.odds,
          })
        );
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    try {
      if (state?.id) {
        dispatch(getSessionProfitLossMatchDetailReset());
        dispatch(getMatchDetail(state?.id));
        dispatch(getPlacedBetsMatch(state?.id));
      }
    } catch (e) {
      console.log(e);
    }
  }, [state?.id]);

  useEffect(() => {
    try {
      if (socket?.connected && success) {
        expertSocketService.match.joinMatchRoom(state?.id, "expert");
        expertSocketService.match.getMatchRates(
          state?.id,
          updateMatchDetailToRedux
        );
        socketService.user.matchBettingStatusChange(updateBettingStatus);
        socketService.user.matchResultDeclared(resultDeclared);
        socketService.user.matchResultUnDeclared(resultUnDeclared);
        socketService.user.matchDeleteBet(matchDeleteBet);
        socketService.user.sessionDeleteBet(matchDeleteBet);
        socketService.user.sessionAdded(handleSessionAdded);
        socketService.user.userMatchBetPlaced(updateMatchBetPlaced);
        socketService.user.userSessionBetPlaced(updateSessionBetPlaced);
        socketService.user.sessionResultDeclared(updateSessionResultDeclared);
        return () => {
          expertSocketService.match.leaveMatchRoom(state?.id);
          expertSocketService.match.getMatchRatesOff(
            state?.id,
            updateMatchDetailToRedux
          );
          socketService.user.matchBettingStatusChangeOff(updateBettingStatus);
          socketService.user.matchResultDeclaredOff(resultDeclared);
          socketService.user.matchResultUnDeclaredOff(resultUnDeclared);
          socketService.user.matchDeleteBetOff(matchDeleteBet);
          socketService.user.sessionDeleteBetOff(matchDeleteBet);
          socketService.user.sessionAddedOff(handleSessionAdded);
          socketService.user.userMatchBetPlacedOff(updateMatchBetPlaced);
          socketService.user.userSessionBetPlacedOff(updateSessionBetPlaced);
          socketService.user.sessionResultDeclaredOff(
            updateSessionResultDeclared
          );
        };
      }
    } catch (e) {
      console.log(e);
    }
  }, [socket?.connected, success]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        if (state?.id) {
          dispatch(getMatchDetail(state?.id));
          dispatch(getPlacedBetsMatch(state?.id));
        }
      } else if (document.visibilityState === "hidden") {
        // expertSocketService.match.leaveMatchRoom(state?.id);
        expertSocketService.match.getMatchRatesOff(
          state?.id,
          updateMatchDetailToRedux
        );
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
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
                    profitLossData={matchDetail?.sessionProfitLoss}
                    sessionData={matchDetail?.sessionBettings}
                    hideResult={false}
                    currentMatch={matchDetail}
                  />
                </Box>
              </Box>
            )}

            {sessionProLoss?.length > 0 && (
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
                {sessionProLoss?.map((v: any) => {
                  return (
                    <RunsBox
                      key={v?.id}
                      item={v}
                      currentOdd={
                        currentOdd?.betId === v?.id ? currentOdd : null
                      }
                    />
                  );
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

            {matchDetail?.id && (
              <BetList allBetRates={placedBetsMatch} tag={true} />
            )}
          </Box>
        </>
      )}
    </Box>
  );
};

export default memo(MatchDetails);
