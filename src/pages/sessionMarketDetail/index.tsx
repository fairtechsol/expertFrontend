import { Box, Stack } from "@mui/material";
import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import CasinoMarket from "../../components/matchDetails/CasinoMarket";
import CasinoMarketLive from "../../components/matchDetails/CasinoMarketLive";
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
  updateMultiSessionMinMax,
  updateRates,
  updateSessionAdded,
  updateSessionProLoss,
} from "../../store/actions/addMatch/addMatchAction";
import {
  setCurrentOdd,
  updateApiSessionById,
} from "../../store/actions/addSession";
import {
  // getPlacedBetsForSessionDetail,
  getSessionProfitLossMatchDetailReset,
  updateDeletedBetReasonOnEdit,
  updateMatchBetsReason,
  updateMaxLoss,
  updateResultStatusOfMatch,
  updateResultStatusOfSession,
  updateSessionBetsPlace,
} from "../../store/actions/match/matchAction";
import { AppDispatch, RootState } from "../../store/store";
import RunsBox from "../../components/matchDetails/RunsBox";
import { customSortBySessionMarketName } from "../../helpers";

const SessionMarketDetail = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const { state } = useLocation();

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
      if (event?.matchId === state?.id && event?.isMatchDeclare) {
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
        // dispatch(getPlacedBetsForSessionDetail(state?.id));
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
        dispatch(
          updateMaxLoss({
            id: event?.betId,
            maxLoss: event?.profitLoss?.maxLoss,
            totalBet: event?.profitLoss?.totalBet,
            profitLoss: event?.profitLoss?.betPlaced,
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
        // dispatch(getPlacedBetsForSessionDetail(state?.id));
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
            profitLoss:
              event?.redisData?.betPlaced ?? event?.profitLossObj?.betPlaced,
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
            profitLoss: event?.redisData?.betPlaced,
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
        dispatch(
          updateResultStatusOfSession({
            ...event,
            loggedUserId: sessionStorage.getItem("pId"),
          })
        );
        dispatch(updateResultStatusOfMatch(event));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSocketConnection = () => {
    if (state?.id) {
      expertSocketService.match.joinMatchRoom(state?.id, "expert");
    }
  };
  // const handleSocketError = () => {
  //   setSocketConnected(false);
  // };

  const handleMultiSessionMaxMin = (event: any) => {
    try {
      if (state?.id === event?.matchId) {
        dispatch(updateMultiSessionMinMax(event));
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    try {
      if (state?.id) {
        dispatch(getSessionProfitLossMatchDetailReset());
        dispatch(getMatchDetail(state?.id));
      }
    } catch (e) {
      console.log(e);
    }
  }, [state?.id]);

  useEffect(() => {
    try {
      if (success && socket) {
        expertSocketService.match.getMatchRatesOff(state?.id);
        socketService.user.matchResultDeclaredOff();
        socketService.user.matchResultUnDeclaredOff();
        socketService.user.sessionDeleteBetOff();
        socketService.user.sessionAddedOff();
        socketService.user.userSessionBetPlacedOff();
        socketService.user.sessionResultDeclaredOff();
        socketService.user.updateInResultDeclareOff();
        socketService.user.updateDeleteReasonOff();
        socketService.user.multiSessionUpdatedOff();
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
        socketService.user.multiSessionUpdated(handleMultiSessionMaxMin);
        // expertSocketService.match.connectError(handleSocketError);
        expertSocketService.match.onConnect(handleSocketConnection);
      }
    } catch (e) {
      console.log(e);
    }
  }, [success, socket]);

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
          socketService.user.multiSessionUpdatedOff();
          // expertSocketService.match.connectErrorOff();
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
            // dispatch(getMatchDetail(state?.id));
            expertSocketService.match.joinMatchRoom(state?.id, "expert");
            expertSocketService.match.getMatchRates(state?.id, (event: any) => {
              updateMatchDetailToRedux(event);
            });
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
  }, [state?.id]);

  return (
    <>
      <Stack
        spacing={{ lg: 2, xs: 0.5 }}
        direction={{ lg: "row", xs: "column" }}
        sx={{ marginTop: { lg: 0, xs: "5px" } }}
      >
        <Box sx={{ width: { lg: "70%" } }}>
          {matchDetail?.apiSession &&
            Object.entries(matchDetail?.apiSession)
              ?.sort(customSortBySessionMarketName)
              ?.filter(
                ([name]: any) => name === "session" || name === "oddEven"
              )
              ?.map(([name, item]: any) => {
                return (
                  <>
                    {item?.section
                      ?.filter((i: any) => !i?.isManual)
                      ?.filter(
                        (items: any) =>
                          !items?.activeStatus ||
                          items?.activeStatus === "unSave"
                      )?.length > 0 && (
                      <SessionMarketLive
                        key={name}
                        title={item?.mname || name}
                        sessionData={item}
                        type={name}
                        currentMatch={matchDetail}
                      />
                    )}
                  </>
                );
              })}
        </Box>
        <Box sx={{ width: { lg: "70%" } }}>
          {matchDetail?.apiSession &&
            Object.entries(matchDetail?.apiSession)
              ?.sort(customSortBySessionMarketName)
              ?.map(([name, item]: any) => {
                if (name === "session" || name === "oddEven") {
                  return null;
                } else if (name === "cricketCasino") {
                  return (
                    <React.Fragment key={name}>
                      {item?.section
                        ?.filter(
                          (i: any) =>
                            !i?.activeStatus || i?.activeStatus === "unSave"
                        )
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
                    <Fragment key={name}>
                      {item?.section
                        ?.filter((i: any) => !i?.isManual)
                        ?.filter(
                          (items: any) =>
                            !items?.activeStatus ||
                            items?.activeStatus === "unSave"
                        )?.length > 0 && (
                        <SessionMarketLive
                          key={name}
                          title={item?.mname || name}
                          sessionData={item}
                          type={name}
                          currentMatch={matchDetail}
                        />
                      )}
                    </Fragment>
                  );
              })}
        </Box>
        <Box sx={{ width: { lg: "100%" } }}>
          {matchDetail?.updatedSesssionBettings &&
            Object.entries(matchDetail?.updatedSesssionBettings)
              ?.sort(customSortBySessionMarketName)
              ?.filter(([name]: any) => name !== "cricketCasino")
              ?.map(([name, item]: any) => {
                return (
                  <Fragment key={name}>
                    {item?.section
                      ?.filter((i: any) => !i?.isManual)
                      ?.filter(
                        (items: any) =>
                          items?.isComplete &&
                          items?.activeStatus !== "unSave" &&
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
                  </Fragment>
                );
              })}
          {matchDetail?.updatedSesssionBettings &&
            Object.entries(matchDetail?.updatedSesssionBettings)
              ?.sort(customSortBySessionMarketName)
              ?.filter(([name]: any) => name === "cricketCasino")
              ?.map(([name, item]: any) => {
                return (
                  <>
                    {item?.section
                      ?.filter(
                        (i: any) =>
                          i?.activeStatus !== "unSave" &&
                          (i?.isComplete || i?.activeStatus === "save") &&
                          i?.activeStatus !== "result"
                      )
                      // ?.sort(sortByActiveStatusOfCricketCasino)
                      ?.map((items: any) => (
                        <CasinoMarket
                          key={items?.SelectionId}
                          title={items?.RunnerName || items?.name}
                          sessionData={items}
                          gtype={items?.gtype}
                          type={name}
                          profitLossData={matchDetail?.sessionProfitLoss}
                          section=" COMPLETED"
                        />
                      ))}
                  </>
                );
              })}
          {matchDetail?.updatedSesssionBettings &&
            Object.entries(matchDetail?.updatedSesssionBettings)
              ?.sort(customSortBySessionMarketName)
              ?.filter(([name]: any) => name !== "cricketCasino")
              ?.map(([name, item]: any) => {
                return (
                  <Fragment key={name}>
                    {item?.section
                      ?.filter((i: any) => !i?.isManual)
                      ?.filter(
                        (items: any) =>
                          !items?.isComplete &&
                          items?.activeStatus !== "unSave" &&
                          ((items?.resultData && items?.resultData === null) ||
                            items?.result === null)
                      )?.length > 0 && (
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
                        name={name}
                      />
                    )}
                  </Fragment>
                );
              })}
          {matchDetail?.updatedSesssionBettings &&
            Object.entries(matchDetail?.updatedSesssionBettings)
              ?.sort(customSortBySessionMarketName)
              ?.filter(([name]: any) => name === "cricketCasino")
              ?.map(([name, item]: any) => {
                return (
                  <Fragment key={name}>
                    {item?.section
                      ?.filter(
                        (i: any) =>
                          i?.activeStatus !== "unSave" && !i?.isComplete
                      )
                      // ?.sort(sortByActiveStatusOfCricketCasino)
                      ?.map((items: any) => (
                        <CasinoMarket
                          key={items?.SelectionId}
                          title={items?.RunnerName || items?.name}
                          sessionData={items}
                          gtype={items?.gtype}
                          type={name}
                          profitLossData={matchDetail?.sessionProfitLoss}
                          section=""
                        />
                      ))}
                  </Fragment>
                );
              })}
          {matchDetail?.updatedSesssionBettings &&
            Object.entries(matchDetail?.updatedSesssionBettings)
              ?.sort(customSortBySessionMarketName)
              ?.filter(([name]: any) => name !== "cricketCasino")
              ?.map(([name, item]: any) => {
                return (
                  <Fragment key={name}>
                    {item?.section
                      ?.filter((i: any) => !i?.isManual)
                      ?.filter(
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
                  </Fragment>
                );
              })}
          {matchDetail?.updatedSesssionBettings &&
            Object.entries(matchDetail?.updatedSesssionBettings)
              ?.sort(customSortBySessionMarketName)
              ?.filter(([name]: any) => name === "cricketCasino")
              ?.map(([name, item]: any) => {
                return (
                  <>
                    {item?.section
                      ?.filter(
                        (i: any) =>
                          i?.activeStatus !== "unSave" &&
                          i?.isComplete &&
                          i?.activeStatus === "result"
                      )
                      // ?.sort(sortByActiveStatusOfCricketCasino)
                      ?.map((items: any) => (
                        <CasinoMarket
                          key={items?.SelectionId}
                          title={items?.RunnerName || items?.name}
                          sessionData={items}
                          gtype={items?.gtype}
                          type={name}
                          profitLossData={matchDetail?.sessionProfitLoss}
                          section=" DECLARED"
                        />
                      ))}
                  </>
                );
              })}
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
            "::-webkit-scrollbar": {
              display: "none",
            },
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
