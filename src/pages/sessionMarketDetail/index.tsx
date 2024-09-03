import { Box, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import CasinoMarket from "../../components/matchDetails/CasinoMarket";
import CasinoMarketLive from "../../components/matchDetails/CasinoMarketLive";
import RunsBox from "../../components/matchDetails/RunsBox";
import SessionMarket from "../../components/matchDetails/SessionMarket";
import SessionMarketLive from "../../components/matchDetails/SessionMarketLive";
import {
  expertSocketService,
  socket,
  socketService,
} from "../../socketManager";
import { matchSocketService } from "../../socketManager/matchSocket";
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
  getPlacedBetsForSessionDetail,
  getSessionProfitLossMatchDetailReset,
  updateDeletedBetReasonOnEdit,
  updateMatchBetsReason,
  updateMaxLoss,
  updateResultStatusOfMatch,
  updateResultStatusOfSession,
  updateSessionBetsPlace,
} from "../../store/actions/match/matchAction";
import { AppDispatch, RootState } from "../../store/store";

const SessionMarketDetail = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const { state } = useLocation();
  const [socketConnected, setSocketConnected] = useState(true);
  const { matchDetail, success } = useSelector(
    (state: RootState) => state.addMatch.addMatch
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
        dispatch(getPlacedBetsForSessionDetail(state?.id));
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

  const updateSessionResultDeclared = (event: any) => {
    try {
      if (state?.id === event?.matchId) {
        dispatch(updateApiSessionById(event));
        dispatch(getPlacedBetsForSessionDetail(state?.id));
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

  const updateDeleteBetReason = (event: any) => {
    try {
      if (event?.matchId === state?.id) {
        dispatch(updateDeletedBetReasonOnEdit(event));
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

  const handleSocketConnection = () => {
    setSocketConnected(true);
  };
  const handleSocketError = () => {
    setSocketConnected(false);
  };

  useEffect(() => {
    try {
      if (state?.id) {
        dispatch(getSessionProfitLossMatchDetailReset());
        dispatch(getMatchDetail(state?.id));
        dispatch(getPlacedBetsForSessionDetail(state?.id));
      }
    } catch (e) {
      console.log(e);
    }
  }, [state?.id]);

  useEffect(() => {
    try {
      if (success && socket && socketConnected) {
        expertSocketService.match.getMatchRatesOff(state?.id);
        socketService.user.matchResultDeclaredOff();
        socketService.user.matchResultUnDeclaredOff();
        socketService.user.sessionDeleteBetOff();
        socketService.user.sessionAddedOff();
        socketService.user.userSessionBetPlacedOff();
        socketService.user.sessionResultDeclaredOff();
        socketService.user.updateInResultDeclareOff();
        socketService.user.updateDeleteReasonOff();
        expertSocketService.match.joinMatchRoom(state?.id, "expert");
        expertSocketService.match.getMatchRates(state?.id, (event: any) => {
          updateMatchDetailToRedux(event);
        });
        // socketService.user.matchBettingStatusChange(updateBettingStatus);
        socketService.user.matchResultDeclared(resultDeclared);
        socketService.user.matchResultUnDeclared(resultUnDeclared);
        socketService.user.sessionDeleteBet(matchDeleteBet);
        socketService.user.sessionAdded(handleSessionAdded);
        socketService.user.userSessionBetPlaced(updateSessionBetPlaced);
        socketService.user.sessionResultDeclared(updateSessionResultDeclared);
        socketService.user.updateInResultDeclare(updateSessionResultStatus);
        socketService.user.updateDeleteReason(updateDeleteBetReason);
        expertSocketService.match.connectError(handleSocketError);
        expertSocketService.match.onConnect(handleSocketConnection);
      }
    } catch (e) {
      console.log(e);
    }
  }, [success, socket, socketConnected]);

  useEffect(() => {
    try {
      if (state?.id) {
        return () => {
          matchSocketService.leaveAllRooms();
          expertSocketService.match.leaveMatchRoom(state?.id);
          expertSocketService.match.getMatchRatesOff(state?.id);
          // socketService.user.matchBettingStatusChangeOff();
          socketService.user.matchResultDeclaredOff();
          socketService.user.matchResultUnDeclaredOff();
          socketService.user.sessionDeleteBetOff();
          socketService.user.sessionAddedOff();
          socketService.user.userSessionBetPlacedOff();
          socketService.user.sessionResultDeclaredOff();
          socketService.user.updateInResultDeclareOff();
          socketService.user.updateDeleteReasonOff();
          expertSocketService.match.connectErrorOff();
          expertSocketService.match.onConnectOff();
        };
      }
    } catch (error) {
      console.log(error);
    }
  }, [state?.id]);

  useEffect(() => {
    try {
      const handleVisibilityChange = () => {
        if (document.visibilityState === "visible") {
          if (state?.id) {
            dispatch(getMatchDetail(state?.id));
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

  // let completedSessions = matchDetail?.sessionBettings?.filter(
  //   (item: any) =>
  //     JSON.parse(item)?.isComplete &&
  //     JSON.parse(item)?.showSessions &&
  //     ((JSON.parse(item)?.resultData &&
  //       JSON.parse(item)?.resultData === null) ||
  //       JSON.parse(item)?.result === null)
  // );
  // let declaredSessions = matchDetail?.sessionBettings?.filter(
  //   (item: any) =>
  //     JSON.parse(item)?.isComplete &&
  //     JSON.parse(item)?.showSessions &&
  //     ((JSON.parse(item)?.resultData &&
  //       JSON.parse(item)?.resultData !== null) ||
  //       JSON.parse(item)?.result !== null)
  // );

  // let marketSessions = matchDetail?.sessionBettings?.filter(
  //   (item: any) =>
  //     !JSON.parse(item)?.isComplete && JSON.parse(item)?.showSessions
  // );

  console.log(matchDetail?.updatedSesssionBettings, "abc");
  return (
    <>
      <Stack spacing={2} direction={{ lg: "row", xs: "column" }}>
        <Box sx={{ width: { lg: "100%" } }}>
          {matchDetail?.apiSession &&
            Object.entries(matchDetail?.apiSession)?.map(
              ([name, item]: any) => {
                if (name === "session" || name === "fancy1") {
                  return (
                    <SessionMarketLive
                      key={name}
                      title={item?.mname}
                      sessionData={item}
                      type={name}
                      currentMatch={matchDetail}
                    />
                  );
                }
              }
            )}
        </Box>
        <Box sx={{ width: { lg: "100%" } }}>
          {matchDetail?.apiSession &&
            Object.entries(matchDetail?.apiSession)?.map(
              ([name, item]: any) => {
                if (name === "session" || name === "fancy1") {
                  return null;
                } else if (name === "cricketCasino") {
                  return (
                    <React.Fragment key={name}>
                      {item?.section
                        ?.filter((items: any) => !items?.activeStatus)
                        ?.map((items: any) => (
                          <CasinoMarketLive
                            key={items?.SelectionId}
                            title={items?.RunnerName || items?.name}
                            sessionData={items}
                            currentMatch={matchDetail}
                            gtype={items?.gtype}
                            type={name}
                          />
                        ))}
                    </React.Fragment>
                  );
                } else
                  return (
                    <SessionMarketLive
                      key={name}
                      title={item?.mname}
                      sessionData={item}
                      type={name}
                      currentMatch={matchDetail}
                    />
                  );
              }
            )}
        </Box>
        <Box sx={{ width: { lg: "100%" } }}>
          {matchDetail?.updatedSesssionBettings &&
            Object.entries(matchDetail?.updatedSesssionBettings)?.map(
              ([name, item]: any) => {
                if (name !== "cricketCasino") {
                  return (
                    <div key={name}>
                      {item?.section?.filter(
                        (items: any) =>
                          items?.isComplete &&
                          ((items?.resultData && items?.resultData === null) ||
                            items?.result === null)
                      )?.length > 0 && (
                        <SessionMarket
                          title={`${name} Completed`}
                          hideTotalBet={false}
                          stopAllHide={true}
                          profitLossData={matchDetail?.sessionProfitLoss}
                          sessionData={item}
                          hideResult={false}
                          currentMatch={matchDetail}
                          hideEditMaxButton={true}
                          cstmStyle={{
                            maxHeight: { sm: "40vh" },
                          }}
                          section="completed"
                        />
                      )}
                      {item?.section?.filter((items: any) => !items?.isComplete)
                        ?.length > 0 && (
                        <SessionMarket
                          title={`${name} Market`}
                          hideTotalBet={false}
                          stopAllHide={false}
                          profitLossData={matchDetail?.sessionProfitLoss}
                          sessionData={item}
                          hideResult={true}
                          currentMatch={matchDetail}
                          hideEditMaxButton={false}
                          section="market"
                        />
                      )}
                      {item?.section?.filter(
                        (items: any) =>
                          (items?.resultData && items?.resultData !== null) ||
                          items?.result !== null
                      )?.length > 0 && (
                        <SessionMarket
                          title={`${name} Declared`}
                          hideTotalBet={false}
                          stopAllHide={true}
                          profitLossData={matchDetail?.sessionProfitLoss}
                          sessionData={item}
                          hideResult={false}
                          currentMatch={matchDetail}
                          hideEditMaxButton={true}
                          cstmStyle={{
                            maxHeight: { sm: "40vh" },
                          }}
                          section="declared"
                        />
                      )}
                    </div>
                  );
                } else {
                  return (
                    <>
                      {item?.section?.map((items: any) => (
                        <CasinoMarket
                          key={items?.SelectionId}
                          title={items?.RunnerName || items?.name}
                          sessionData={items}
                          currentMatch={matchDetail}
                          gtype={items?.gtype}
                          type={name}
                        />
                      ))}
                    </>
                  );
                }
              }
            )}
        </Box>
      </Stack>
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
                currentOdd={currentOdd?.betId === v?.id ? currentOdd : null}
              />
            );
          })}
        </Box>
      )}
    </>
  );
};

export default SessionMarketDetail;
