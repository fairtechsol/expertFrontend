import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { Fragment, memo, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import CasinoMarket from "../../components/matchDetails/CasinoMarket";
import CasinoMarketLive from "../../components/matchDetails/CasinoMarketLive";
import RunsBox from "../../components/matchDetails/RunsBox";
import SessionMarket from "../../components/matchDetails/SessionMarket";
import SessionMarketLive from "../../components/matchDetails/SessionMarketLive";
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
  updateMultiSessionMinMax,
  updateRates,
  updateSessionAdded,
  updateSessionProLoss,
} from "../../store/actions/addMatch/addMatchAction";
import {
  addsuccessReset,
  setCurrentOdd,
  updateApiSessionById,
} from "../../store/actions/addSession";
import {
  getSessionProfitLossMatchDetailReset,
  updateDeletedBetReasonOnEdit,
  updateMatchBetsReason,
  updateMaxLoss,
  updateResultStatusOfMatch,
  updateResultStatusOfSession,
  updateSessionBetsPlace,
} from "../../store/actions/match/matchAction";
import { AppDispatch, RootState } from "../../store/store";

const OptimizedCasinoMarketLive = memo(CasinoMarketLive);
const OptimizedSessionMarketLive = memo(SessionMarketLive);
const OptimizedSessionMarket = memo(SessionMarket);
const OptimizedCasinoMarket = memo(CasinoMarket);

const SessionMarketDetail = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const state: any = useParams();

  const { matchDetail, success } = useSelector(
    (state: RootState) => state.addMatch.addMatch
  );

  const { sessionProLoss } = useSelector((state: RootState) => state.match);
  const { currentOdd, addSuccess } = useSelector(
    (state: RootState) => state.addSession
  );

  useEffect(() => {
    const observerLCP = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        console.log("LCP entry:", entry);
      }
    });
    observerLCP.observe({ type: "largest-contentful-paint", buffered: true });

    const observerFID = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        console.log("FID entry:", entry);
      }
    });
    observerFID.observe({ type: "first-input", buffered: true });

    const observerCLS = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        console.log("CLS entry:", entry);
      }
    });
    observerCLS.observe({ type: "layout-shift", buffered: true });

    return () => {
      observerLCP.disconnect();
      observerFID.disconnect();
      observerCLS.disconnect();
    };
  }, []);

  useEffect(() => {
    if (state?.mId) {
      matchService.connect([state?.id]);
    }
    return () => {
      matchService.disconnect();
    };
  }, [state]);

  const updateMatchDetailToRedux = (event: any) => {
    try {
      if (state?.id === event?.id) {
        dispatch(updateMatchRates(event));
      }
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
        dispatch(getMatchDetail(`${state?.id}?isMarketAllowed=false`));
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
      expertSocketService.match.joinMatchRoom(state?.id);
    }
  };

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
        dispatch(getMatchDetail(`${state?.id}?isMarketAllowed=false`));
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
        expertSocketService.match.joinMatchRoom(state?.id);
        expertSocketService.match.getMatchRates(state?.id, (event: any) => {
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
        socketService.user.multiSessionUpdated(handleMultiSessionMaxMin);
        expertSocketService.match.onConnect(handleSocketConnection);
      }
    } catch (e) {
      console.log(e);
    }
  }, [success, socket, matchSocket]);

  useEffect(() => {
    try {
      if (state?.id) {
        return () => {
          matchSocketService.leaveAllRooms();
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
            expertSocketService.match.joinMatchRoom(state?.id);
            expertSocketService.match.getMatchRates(state?.id, (event: any) => {
              updateMatchDetailToRedux(event);
            });
          }
        } else if (document.visibilityState === "hidden") {
          if (state?.id) {
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

  useEffect(() => {
    try {
      if (addSuccess) {
        dispatch(addsuccessReset());
      }
    } catch (e) {
      console.log(e);
    }
  }, [addSuccess]);

  // Memoized render sections
  const renderLiveSessionMarkets = useMemo(() => {
    if (!matchDetail?.apiSession) return null;

    return Object.entries(matchDetail?.apiSession)
      .filter(([name]) => name === "session" || name === "oddEven")
      .sort(customSortBySessionMarketName)
      .map(([name, item]: any) => {
        const hasValidSections = item?.section?.some(
          (section: any) =>
            !section?.activeStatus || section?.activeStatus === "unSave"
        );

        return (
          hasValidSections && (
            <OptimizedSessionMarketLive
              key={name}
              title={item?.mname || name}
              sessionData={item}
              type={name}
              currentMatch={matchDetail}
            />
          )
        );
      });
  }, [matchDetail?.apiSession]);

  const renderOtherMarkets = useMemo(() => {
    if (!matchDetail?.apiSession) return null;

    return Object.entries(matchDetail?.apiSession)
      ?.filter(([name]) => !["session", "oddEven"].includes(name))
      ?.sort(customSortBySessionMarketName)
      ?.map(([name, item]: any) => {
        const filteredSections =
          item?.section?.filter(
            (i: any) => !i?.activeStatus || i?.activeStatus === "unSave"
          ) || [];

        if (!filteredSections.length) return null;
        <SessionMarketLive
          key={name}
          title={item?.mname || name}
          sessionData={item}
          type={name}
          currentMatch={matchDetail}
        />;
        return name === "cricketCasino" ? (
          <Fragment key={name}>
            {filteredSections.map((items: any) => (
              <OptimizedCasinoMarketLive
                key={items?.SelectionId}
                title={items?.RunnerName || items?.name}
                sessionData={items}
                currentMatch={matchDetail}
                gtype={items?.gtype}
                type={name}
              />
            ))}
          </Fragment>
        ) : (
          <OptimizedSessionMarketLive
            key={name}
            title={item?.mname || name}
            sessionData={item}
            type={name}
            currentMatch={matchDetail}
          />
        );
      });
  }, [matchDetail?.apiSession]);

  const renderCompletedNonCasinoMarkets = useMemo(() => {
    if (!matchDetail?.updatedSesssionBettings) return null;

    return Object.entries(matchDetail.updatedSesssionBettings)
      .filter(([name]) => name !== "cricketCasino")
      .sort(customSortBySessionMarketName)
      .map(([name, item]: any) => {
        const hasCompletedSections = item?.section?.some(
          (section: any) =>
            section?.isComplete &&
            section?.activeStatus !== "unSave" &&
            ((section?.resultData && section?.resultData === null) ||
              section?.result === null)
        );

        return (
          hasCompletedSections && (
            <OptimizedSessionMarket
              key={`completed-${name}`}
              title={`${name} Completed`}
              hideTotalBet={false}
              stopAllHide={true}
              profitLossData={matchDetail?.sessionProfitLoss}
              sessionData={item}
              hideResult={false}
              currentMatch={matchDetail}
              hideEditMaxButton={true}
              cstmStyle={{ maxHeight: { sm: "40vh" } }}
              section="completed"
            />
          )
        );
      });
  }, [matchDetail?.updatedSesssionBettings, matchDetail?.sessionProfitLoss]);

  const renderCompletedCasinoMarkets = useMemo(() => {
    if (!matchDetail?.updatedSesssionBettings) return null;

    return Object.entries(matchDetail?.updatedSesssionBettings)
      .filter(([name]) => name === "cricketCasino")
      .sort(customSortBySessionMarketName)
      .flatMap(([_, item]: any) =>
        item?.section
          ?.filter(
            (i: any) =>
              i?.activeStatus !== "unSave" &&
              (i?.isComplete || i?.activeStatus === "save") &&
              i?.activeStatus !== "result"
          )
          ?.map((items: any) => (
            <OptimizedCasinoMarket
              key={`completed-casino-${items?.SelectionId}`}
              title={items?.RunnerName || items?.name}
              sessionData={items}
              profitLossData={matchDetail?.sessionProfitLoss}
              section=" COMPLETED"
            />
          ))
      );
  }, [matchDetail?.updatedSesssionBettings, matchDetail?.sessionProfitLoss]);

  const renderActiveNonCasinoMarkets = useMemo(() => {
    if (!matchDetail?.updatedSesssionBettings) return null;

    return Object.entries(matchDetail?.updatedSesssionBettings)
      .filter(([name]) => name !== "cricketCasino")
      .sort(customSortBySessionMarketName)
      .map(([name, item]: any) => {
        const hasActiveMarket = item?.section?.some(
          (s: any) =>
            !s?.isComplete &&
            s?.activeStatus !== "unSave" &&
            ((s?.resultData && s?.resultData === null) || s?.result === null)
        );

        return (
          hasActiveMarket && (
            <OptimizedSessionMarket
              key={`active-${name}`}
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
          )
        );
      });
  }, [matchDetail?.updatedSesssionBettings, matchDetail?.sessionProfitLoss]);

  const renderActiveCasinoMarkets = useMemo(() => {
    if (!matchDetail?.updatedSesssionBettings) return null;

    return Object.entries(matchDetail.updatedSesssionBettings)
      .filter(([name]) => name === "cricketCasino")
      .sort(customSortBySessionMarketName)
      .flatMap(([_, item]: any) =>
        item?.section
          ?.filter((i: any) => i?.activeStatus !== "unSave" && !i?.isComplete)
          ?.map((items: any) => (
            <OptimizedCasinoMarket
              key={`active-casino-${items?.SelectionId}`}
              title={items?.RunnerName || items?.name}
              sessionData={items}
              profitLossData={matchDetail?.sessionProfitLoss}
              section=""
            />
          ))
      );
  }, [matchDetail?.updatedSesssionBettings, matchDetail?.sessionProfitLoss]);

  const renderDeclaredNonCasinoMarkets = useMemo(() => {
    if (!matchDetail?.updatedSesssionBettings) return null;

    return Object.entries(matchDetail.updatedSesssionBettings)
      .filter(([name]) => name !== "cricketCasino")
      .sort(customSortBySessionMarketName)
      .map(([name, item]: any) => {
        const hasDeclaredSections = item?.section?.some(
          (s: any) =>
            (s?.resultData && s?.resultData !== null) || s?.result !== null
        );

        return (
          hasDeclaredSections && (
            <OptimizedSessionMarket
              key={`declared-${name}`}
              title={`${name} Declared`}
              hideTotalBet={false}
              stopAllHide={true}
              profitLossData={matchDetail?.sessionProfitLoss}
              sessionData={item}
              hideResult={false}
              currentMatch={matchDetail}
              hideEditMaxButton={true}
              cstmStyle={{ maxHeight: { sm: "40vh" } }}
              section="declared"
            />
          )
        );
      });
  }, [matchDetail?.updatedSesssionBettings, matchDetail?.sessionProfitLoss]);

  const renderDeclaredCasinoMarkets = useMemo(() => {
    if (!matchDetail?.updatedSesssionBettings) return null;

    return Object.entries(matchDetail.updatedSesssionBettings)
      .filter(([name]) => name === "cricketCasino")
      .sort(customSortBySessionMarketName)
      .flatMap(([_, item]: any) =>
        item?.section
          ?.filter(
            (i: any) =>
              i?.activeStatus !== "unSave" &&
              i?.isComplete &&
              i?.activeStatus === "result"
          )
          ?.map((items: any) => (
            <OptimizedCasinoMarket
              key={`declared-casino-${items?.SelectionId}`}
              title={items?.RunnerName || items?.name}
              sessionData={items}
              profitLossData={matchDetail?.sessionProfitLoss}
              section=" DECLARED"
            />
          ))
      );
  }, [matchDetail?.updatedSesssionBettings, matchDetail?.sessionProfitLoss]);

  return (
    <>
      <Stack
        spacing={{ lg: 2, xs: 0.5 }}
        direction={{ lg: "row", xs: "column" }}
        sx={{ marginTop: { lg: 0, xs: "5px" } }}
      >
        <Box sx={{ width: { lg: "70%" } }}>{renderLiveSessionMarkets}</Box>
        <Box sx={{ width: { lg: "70%" } }}>{renderOtherMarkets}</Box>
        <Box sx={{ width: { lg: "100%" } }}>
          {renderCompletedNonCasinoMarkets}
          {renderCompletedCasinoMarkets}
          {renderActiveNonCasinoMarkets}
          {renderActiveCasinoMarkets}
          {renderDeclaredNonCasinoMarkets}
          {renderDeclaredCasinoMarkets}
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

export default memo(SessionMarketDetail);
