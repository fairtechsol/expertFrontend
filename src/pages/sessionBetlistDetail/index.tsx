import { Box, Stack } from "@mui/material";
import { Fragment, memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import BetList from "../../components/matchDetails/BetList";
import CasinoMarket2 from "../../components/matchDetails/CasinoMarket2";
import RunsBox from "../../components/matchDetails/RunsBox";
import SessionMarket2 from "../../components/matchDetails/SessionMarket2";
import { customSortBySessionMarketName } from "../../helpers";
import {
  expertSocketService,
  matchService,
  matchSocket,
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
  resetPlacedBetsMatch,
  setCurrentOdd,
  updateApiSessionById,
} from "../../store/actions/addSession";
import {
  addStatusBetByBetId,
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

const SessionBetlistDetail = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const { id }: any = useParams();
  const [searchParams] = useSearchParams();
  const mid = searchParams.get("mid");

  const { matchDetail, success } = useSelector(
    (state: RootState) => state.addMatch.addMatch
  );
  const { sessionProLoss } = useSelector((state: RootState) => state.match);
  const { currentOdd } = useSelector((state: RootState) => state.addSession);
  const { placedBetsMatch } = useSelector(
    (state: RootState) => state.matchList
  );

  useEffect(() => {
    if (mid) {
      matchService.connect([id]);
    }
    return () => {
      matchService.disconnect();
    };
  }, [id, mid]);

  const updateMatchDetailToRedux = (event: any) => {
    try {
      if (id === event?.id) {
        dispatch(updateMatchRates(event));
      } else return;
    } catch (e) {
      console.log(e);
    }
  };
  const resultDeclared = (event: any) => {
    try {
      if (event?.matchId === id && event?.isMatchDeclare) {
        navigate("/expert/match");
      }
    } catch (e) {
      console.log(e);
    }
  };
  const resultUnDeclared = (event: any) => {
    try {
      if (event?.matchId === id) {
        dispatch(getMatchDetail(`${id}?isMarketAllowed=false`));
        dispatch(getPlacedBetsForSessionDetail(id));
      }
    } catch (e) {
      console.log(e);
    }
  };

  const matchDeleteBet = (event: any) => {
    try {
      if (event?.matchId === id) {
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
      if (event?.matchId === id) {
        dispatch(updateSessionAdded(event));
      }
    } catch (e) {
      console.log(e);
    }
  };

  const updateSessionResultDeclared = (event: any) => {
    try {
      if (id === event?.matchId) {
        dispatch(updateApiSessionById(event));
        dispatch(addStatusBetByBetId(event));
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
      if (event?.matchId === id) {
        dispatch(updateDeletedBetReasonOnEdit(event));
      }
    } catch (e) {
      console.log(e);
    }
  };

  const updateSessionBetPlaced = (event: any) => {
    try {
      if (event?.jobData?.placedBet?.matchId === id) {
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
      if (event?.matchId === id) {
        dispatch(updateResultStatusOfSession(event));
        dispatch(updateResultStatusOfMatch(event));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSocketConnection = () => {
    if (id) {
      expertSocketService.match.joinMatchRoom(id);
    }
  };

  useEffect(() => {
    try {
      if (id) {
        dispatch(getSessionProfitLossMatchDetailReset());
        dispatch(getMatchDetail(`${id}?isMarketAllowed=false`));
        dispatch(getPlacedBetsForSessionDetail(id));
      }
    } catch (e) {
      console.log(e);
    }
  }, [id]);

  useEffect(() => {
    try {
      if (success && socket) {
        expertSocketService.match.getMatchRatesOff(id);
        socketService.user.matchResultDeclaredOff();
        socketService.user.matchResultUnDeclaredOff();
        socketService.user.sessionDeleteBetOff();
        socketService.user.sessionAddedOff();
        socketService.user.userSessionBetPlacedOff();
        socketService.user.sessionResultDeclaredOff();
        socketService.user.updateInResultDeclareOff();
        socketService.user.updateDeleteReasonOff();
        expertSocketService.match.getMatchRates(id, (event: any) => {
          updateMatchDetailToRedux(event);
        });
        socketService.user.matchResultDeclared(resultDeclared);
        socketService.user.matchResultUnDeclared(resultUnDeclared);
        socketService.user.sessionDeleteBet(matchDeleteBet);
        socketService.user.sessionAdded(handleSessionAdded);
        socketService.user.userSessionBetPlaced(updateSessionBetPlaced);
        socketService.user.sessionResultDeclared(updateSessionResultDeclared);
        socketService.user.updateInResultDeclare(updateSessionResultStatus);
        socketService.user.updateDeleteReason(updateDeleteBetReason);
        expertSocketService.match.onConnect(handleSocketConnection);
      }
    } catch (e) {
      console.log(e);
    }
  }, [success, socket, matchSocket]);

  useEffect(() => {
    try {
      if (id) {
        return () => {
          matchSocketService.leaveAllRooms();
          expertSocketService.match.leaveMatchRoom(id);
          expertSocketService.match.getMatchRatesOff(id);
          socketService.user.matchResultDeclaredOff();
          socketService.user.matchResultUnDeclaredOff();
          socketService.user.sessionDeleteBetOff();
          socketService.user.sessionAddedOff();
          socketService.user.userSessionBetPlacedOff();
          socketService.user.sessionResultDeclaredOff();
          socketService.user.updateInResultDeclareOff();
          socketService.user.updateDeleteReasonOff();
          expertSocketService.match.onConnectOff();
          dispatch(resetPlacedBetsMatch());
        };
      }
    } catch (error) {
      console.log(error);
    }
  }, [id]);

  useEffect(() => {
    try {
      const handleVisibilityChange = () => {
        if (document.visibilityState === "visible") {
          if (id) {
            expertSocketService.match.joinMatchRoom(id);
            expertSocketService.match.getMatchRates(id, (event: any) => {
              updateMatchDetailToRedux(event);
            });
          }
        } else if (document.visibilityState === "hidden") {
          if (id) {
            expertSocketService.match.leaveMatchRoom(id);
            expertSocketService.match.getMatchRatesOff(id);
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
  }, [id]);

  return (
    <>
      <Stack
        spacing={1}
        direction={{ lg: "row", md: "row", xs: "column", sm: "row" }}
        sx={{ marginTop: { lg: 0, xs: "10px" } }}
      >
        <Box sx={{ width: "25%" }}>
          {matchDetail?.updatedSesssionBettings &&
            Object.entries(matchDetail?.updatedSesssionBettings)
              ?.filter(
                ([name]: any) =>
                  name !== "cricketCasino" &&
                  (name === "session" || name === "oddEven")
              )
              ?.sort(customSortBySessionMarketName)
              ?.map(([name, item]: any) => {
                return (
                  <Fragment key={name}>
                    {item?.section?.filter(
                      (items: any) =>
                        !items?.isComplete &&
                        items?.activeStatus !== "unSave" &&
                        ((items?.resultData && items?.resultData === null) ||
                          items?.result === null)
                    )?.length > 0 && (
                      <SessionMarket2
                        title={`${name} Market`}
                        sessionData={item}
                      />
                    )}
                  </Fragment>
                );
              })}
        </Box>
        <Box sx={{ width: "25%" }}>
          {matchDetail?.updatedSesssionBettings &&
            Object.entries(matchDetail?.updatedSesssionBettings)
              ?.filter(
                ([name]: any) =>
                  name !== "cricketCasino" &&
                  name !== "session" &&
                  name !== "oddEven"
              )
              ?.sort(customSortBySessionMarketName)
              ?.map(([name, item]: any) => (
                <Fragment key={name}>
                  {item?.section?.filter(
                    (items: any) =>
                      !items?.isComplete &&
                      items?.activeStatus !== "unSave" &&
                      ((items?.resultData && items?.resultData === null) ||
                        items?.result === null)
                  )?.length > 0 && (
                    <SessionMarket2
                      title={`${name} Market`}
                      sessionData={item}
                    />
                  )}
                </Fragment>
              ))}
          {matchDetail?.updatedSesssionBettings &&
            Object.entries(matchDetail?.updatedSesssionBettings)
              ?.filter(([name]: any) => name === "cricketCasino")
              ?.sort(customSortBySessionMarketName)
              ?.map(([name, item]: any) => {
                return (
                  <Fragment key={name}>
                    {item?.section
                      ?.filter(
                        (items: any) =>
                          !items?.isComplete &&
                          items?.activeStatus !== "unSave" &&
                          ((items?.resultData && items?.resultData === null) ||
                            items?.result === null)
                      )
                      ?.map((items: any) => (
                        <CasinoMarket2
                          key={items?.SelectionId}
                          title={items?.RunnerName || items?.name}
                          sessionData={items}
                        />
                      ))}
                  </Fragment>
                );
                // }
              })}
        </Box>

        <Box sx={{ width: { lg: "50%", md: "50%", xs: "100%", sm: "50%" } }}>
          <BetList
            allBetRates={Array.from(new Set(placedBetsMatch))}
            tag={true}
            title={matchDetail?.title}
          />
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

export default memo(SessionBetlistDetail);
