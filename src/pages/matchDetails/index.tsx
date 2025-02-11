import { Box, useMediaQuery, useTheme } from "@mui/material";
import { memo, useEffect, useState } from "react";
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
  matchSocket,
  socket,
  socketService,
} from "../../socketManager";
import {
  getMatchDetail,
  removeSessionProLoss,
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
  addStatusBetByBetId,
  // updateBetVerify,
  updateMatchBetsPlace,
  updateMatchBetsReason,
  updateMaxLoss,
  updateResultStatusOfMatch,
  updateResultStatusOfSession,
  updateSessionBetsPlace,
  updateTeamRates,
} from "../../store/actions/match/matchAction";
import { AppDispatch, RootState } from "../../store/store";

const MatchDetails = () => {
  // const intervalRef = useRef<number | null>(null);
  const { state } = useLocation();
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const [_] = useState(false);
  const { matchDetail, loading, success } = useSelector(
    (state: RootState) => state.addMatch.addMatch
  );
  const theme = useTheme();
  const matchesMobile = useMediaQuery(theme.breakpoints.down("lg"));
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

  // const updateBettingStatus = (event: any) => {
  //   try {
  //     if (state?.id === event?.matchId) {
  //       dispatch(updateMatchBettingStatus(event));
  //     }
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

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

  // const updateVerifyBet = (event: any) => {
  //     try {
  //       if (event?.matchId === state?.id) {
  //         dispatch(updateBetVerify(event));
  //       }
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   };

  const updateSessionResultDeclared = (event: any) => {
    try {
      if (state?.id === event?.matchId) {
        dispatch(updateApiSessionById(event));
        // dispatch(removeBetByBetId(event?.betId));
        dispatch(addStatusBetByBetId(event?.betId));
        if (event?.activeStatus === "result") {
          dispatch(
            removeSessionProLoss({
              id: event?.betId,
            })
          );
        } else {
          dispatch(
            updateSessionProLoss({
              id: event?.betId,
              betPlaced: event?.profitLossObj
                ? event?.profitLossObj?.betPlaced
                : [],
            })
          );
        }
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

  const updateSessionResultStatus = (event: any) => {
    try {
      if (event?.matchId === state?.id) {
        dispatch(updateResultStatusOfSession(event));
        dispatch(updateResultStatusOfMatch(event));
      }
    } catch (error) {
      console.error(error);
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
      if (success && socket) {
        expertSocketService.match.getMatchRatesOff(state?.id);
        // socketService.user.matchBettingStatusChangeOff();
        // socketService.user.betVerifyOff();
        socketService.user.matchResultDeclaredOff();
        socketService.user.matchResultUnDeclaredOff();
        socketService.user.matchDeleteBetOff();
        socketService.user.sessionDeleteBetOff();
        socketService.user.sessionAddedOff();
        socketService.user.userMatchBetPlacedOff();
        socketService.user.userSessionBetPlacedOff();
        socketService.user.sessionResultDeclaredOff();
        socketService.user.updateInResultDeclareOff();
        expertSocketService.match.joinMatchRoom(state?.id, "expert");
        expertSocketService.match.getMatchRates(state?.id, (event: any) => {
          updateMatchDetailToRedux(event);
        });
        // socketService.user.matchBettingStatusChange(updateBettingStatus);
        // socketService.user.betVerify(updateVerifyBet);
        socketService.user.matchResultDeclared(resultDeclared);
        socketService.user.matchResultUnDeclared(resultUnDeclared);
        socketService.user.matchDeleteBet(matchDeleteBet);
        socketService.user.sessionDeleteBet(matchDeleteBet);
        socketService.user.sessionAdded(handleSessionAdded);
        socketService.user.userMatchBetPlaced(updateMatchBetPlaced);
        socketService.user.userSessionBetPlaced(updateSessionBetPlaced);
        socketService.user.sessionResultDeclared(updateSessionResultDeclared);
        socketService.user.updateInResultDeclare(updateSessionResultStatus);
      }
    } catch (e) {
      console.log(e);
    }
  }, [success, socket]);

  useEffect(() => {
    try {
      if (state?.id) {
        return () => {
          expertSocketService.match.leaveMatchRoom(state?.id);
          expertSocketService.match.getMatchRatesOff(state?.id);
          // socketService.user.matchBettingStatusChangeOff();
          // socketService.user.betVerifyOff();
          socketService.user.matchResultDeclaredOff();
          socketService.user.matchResultUnDeclaredOff();
          socketService.user.matchDeleteBetOff();
          socketService.user.sessionDeleteBetOff();
          socketService.user.sessionAddedOff();
          socketService.user.userMatchBetPlacedOff();
          socketService.user.userSessionBetPlacedOff();
          socketService.user.sessionResultDeclaredOff();
          socketService.user.updateInResultDeclareOff();
        };
      }
    } catch (error) {
      console.log(error);
    }
  }, [state?.id]);

  // const fetchLiveData = useCallback(async () => {
  //   try {
  //     const response = await axios.get(`${baseUrls.matchSocket}/getExpertRateDetails/${state?.id}`, {
  //       // headers: {
  //       //   Authorization: `Bearer ${sessionStorage.getItem("jwtExpert")}`,
  //       // },
  //     });
  //     updateMatchDetailToRedux(response.data);
  //     // console.log("Live Data:", response.data);
  //   } catch (error) {
  //     console.error("Error fetching live data:", error);
  //   }
  // }, [state?.id]);

  // const handleVisibilityChange = useCallback(() => {
  //   if (document.visibilityState === "visible") {
  //     if (!intervalRef.current) {
  //       fetchLiveData();
  //       intervalRef.current = window.setInterval(fetchLiveData, 500) as unknown as number;
  //     }
  //   } else if (document.visibilityState === "hidden") {
  //     if (intervalRef.current) {
  //       clearInterval(intervalRef.current);
  //       intervalRef.current = null;
  //     }
  //   }
  // }, [intervalRef, fetchLiveData]);

  // useEffect(() => {
  //   document.addEventListener("visibilitychange", handleVisibilityChange);
  //   handleVisibilityChange();

  //   return () => {
  //     if (intervalRef.current) {
  //       clearInterval(intervalRef.current);
  //     }
  //     document.removeEventListener("visibilitychange", handleVisibilityChange);
  //   };
  // }, [handleVisibilityChange]);

  useEffect(() => {
    try {
      const handleVisibilityChange = () => {
        if (document.visibilityState === "visible") {
          if (state?.id) {
            dispatch(getMatchDetail(state?.id));
            dispatch(getPlacedBetsMatch(state?.id));
          }
        } else if (document.visibilityState === "hidden") {
          if (state?.id) {
            expertSocketService.match.leaveMatchRoom(state?.id);
            expertSocketService.match.getMatchRatesOff(state?.id);
          }
        }
      };

      document.addEventListener("visibilitychange", handleVisibilityChange);
      return () => {
        document.removeEventListener(
          "visibilitychange",
          handleVisibilityChange
        );
      };
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    try {
      if (matchDetail?.id && matchSocket) {
        let currRateInt = setInterval(() => {
          expertSocketService.match.joinMatchRoom(matchDetail?.id, "expert");
        }, 60000);
        return () => {
          clearInterval(currRateInt);
        };
      }
    } catch (error) {
      console.log(error);
    }
  }, [matchDetail?.id]);

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
          {matchesMobile && (
            <Box
              sx={{
                width: { lg: "100%", xs: "100%", md: "100%" },
              }}
            >
              {matchDetail?.apiSessionActive && (
                <Box
                  sx={{
                    width: { lg: "100%", xs: "100%", md: "100%" },
                    display: "flex",
                    gap: 1,
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
          )}
          {!matchesMobile && (
            <Box
              sx={{
                width: { lg: "50%", xs: "100%", md: "100%" },
              }}
            >
              {matchDetail?.apiSessionActive && (
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
                      flexDirection: "row",
                      display: "flex",
                      gap: 1,
                      height: "100vh",
                    }}
                  >
                    <SessionMarketLive
                      title={"Session API Market"}
                      sessionData={matchDetail?.apiSession}
                      currentMatch={matchDetail}
                    />
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
          )}
          <Box
            sx={{
              width: { lg: "50%", xs: "100%", md: "100%" },
              flexDirection: "column",
              display: "flex",
              paddingLeft: "5px",
              marginTop: { xs: "10px", lg: "0" },
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
                title={"Bookmaker Market"}
              />
            )}
            {matchDetail?.apiTideMatch?.isActive && (
              <TiedMatchMarket
                currentMatch={matchDetail}
                liveData={matchDetail?.apiTideMatch}
                title={"Tied Match Market"}
              />
            )}
            {matchDetail?.marketCompleteMatch?.isActive && (
              <CompleteMatchMarket
                currentMatch={matchDetail}
                liveData={matchDetail?.marketCompleteMatch}
                title={"Complete Match Market"}
              />
            )}

            {matchDetail?.id && (
              <BetList allBetRates={ Array.from(new Set(placedBetsMatch))} tag={true} />
            )}
          </Box>
        </>
      )}
    </Box>
  );
};

export default memo(MatchDetails);
