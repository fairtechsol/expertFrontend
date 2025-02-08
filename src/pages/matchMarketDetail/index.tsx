import { Box, useMediaQuery } from "@mui/material";
import { Fragment, memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Loader from "../../components/Loader";
import BetList from "../../components/matchDetails/BetList";
import BookMarket from "../../components/matchDetails/Bookmarket";
import CompleteMatchMarket from "../../components/matchDetails/CompleteMatchMarket";
import MatchOdds from "../../components/matchDetails/MatchOdds";
import TiedMatchMarket from "../../components/matchDetails/TiedMatchMarket";
import {
  expertSocketService,
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
  updateSessionProLoss
} from "../../store/actions/addMatch/addMatchAction";
import {
  resetPlacedBetsMatch,
  setCurrentOdd,
  updateApiSessionById,
} from "../../store/actions/addSession";
import {
  getPlacedBetsMatch,
  getSessionProfitLossMatchDetailReset,
  addStatusBetByBetId,
  updateBetVerify,
  updateDeletedBetReasonOnEdit,
  updateMatchBetsPlace,
  updateMatchBetsReason,
  updateMaxLoss,
  updateResultStatusOfMatch,
  updateResultStatusOfSession,
  updateSessionBetsPlace,
  updateTeamRates,
} from "../../store/actions/match/matchAction";
import { AppDispatch, RootState } from "../../store/store";
import ManualMarket from "../manualMarket";
// import Scoreboard from "../../components/matchDetails/Scoreboard";
// import service from "../../service";
import { handleMarketSorting } from "../../components/helper";
import OtherMatchMarket from "../../components/matchDetails/OtherMatchMarket";
import TournamentMarket from "../../components/matchDetails/TournamentMarkets";
import theme from "../../theme";
import { marketArray } from "../../utils/Constants";

const MatchMarketDetail = () => {
  // const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const { state } = useLocation();
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  // const theme = useTheme();
  // const matchesMobile = useMediaQuery(theme.breakpoints.down("sm"));
  // const [socketConnected, setSocketConnected] = useState(true);
  // const [liveScoreBoardData, setLiveScoreBoardData] = useState(null);
  // const [errorCount, setErrorCount] = useState<number>(0);
  // const [rateInterval, setRateInterval] = useState<any>({ intervalData: [] });


  const { matchDetail, loading, success } = useSelector(
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
      if (
        (event?.matchId === state?.id && event?.isMatchDeclare) ||
        (event?.matchId === state?.id && event?.betType === "quickbookmaker1")
      ) {
        navigate("/expert/match");
      } else if (
        event?.matchId === state?.id &&
        (event?.betType === "other" || event?.betType === "tournament")
      ) {
        dispatch(updateResultStatusOfMatch(event));
        dispatch(getPlacedBetsMatch(state?.id));
      }
    } catch (e) {
      console.log(e);
    }
  };
  const resultUnDeclared = (event: any) => {
    try {
      if (event?.matchId === state?.id) {
        dispatch(getMatchDetail(`${state?.id}?isSessionAllowed=false`));
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
  const updateDeleteBetReason = (event: any) => {
    try {
      if (event?.matchId === state?.id) {
        dispatch(updateDeletedBetReasonOnEdit(event));
      }
    } catch (e) {
      console.log(e);
    }
  };

  const updateVerifyBet = (event: any) => {
    try {
      console.log("event :", event)
      if (event?.matchId === state?.id) {
        dispatch(updateBetVerify(event));
      }
    } catch (e) {
      console.log(e);
    }
  };

  const updateSessionResultDeclared = (event: any) => {
    try {
      if (state?.id === event?.matchId) {
        dispatch(updateApiSessionById(event));
        // dispatch(getPlacedBetsMatch(state?.id));
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

  const handleSocketConnection = () => {
    if (state?.id) {
      expertSocketService.match.joinMatchRoom(state?.id, "expert");
    }
    // setSocketConnected(true);
  };

  // const handleSocketError = () => {
  // setSocketConnected(false);
  // };

  // const getScoreBoard = async (marketId: string) => {
  //   try {
  //     const response: any = await service.get(
  //       `https://devscore.fairgame.club/score/getMatchScore/${marketId}`
  //       // `https://fairscore7.com/score/getMatchScore/${marketId}`
  //     );
  //     if (response) {
  //       setLiveScoreBoardData(response);
  //       setErrorCount(0);
  //     }
  //   } catch (e: any) {
  //     console.log("Error:", e?.message);
  //     setErrorCount((prevCount: number) => prevCount + 1);
  //   }
  // };

  const firstKnownKey = marketArray.find((key: any) => {
    const keyObject = (matchDetail ?? {})[key];

    if (!keyObject) return false;

    if (Array.isArray(keyObject)) {
      return keyObject.some(
        (item) => item.hasOwnProperty("isActive") && item.isActive === true
      );
    }

    return keyObject.hasOwnProperty("isActive") && keyObject.isActive === true;
  });

  useEffect(() => {
    // alert("match")
    try {
      if (state?.id) {
        dispatch(getSessionProfitLossMatchDetailReset());
        dispatch(getMatchDetail(`${state?.id}?isSessionAllowed=false`));
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
        socketService.user.betVerifyOff();
        socketService.user.matchResultDeclaredOff();
        socketService.user.matchResultUnDeclaredOff();
        socketService.user.matchDeleteBetOff();
        socketService.user.sessionDeleteBetOff();
        socketService.user.sessionAddedOff();
        socketService.user.userMatchBetPlacedOff();
        socketService.user.userSessionBetPlacedOff();
        socketService.user.sessionResultDeclaredOff();
        socketService.user.updateInResultDeclareOff();
        socketService.user.updateDeleteReasonOff();
        socketService.user.matchResultDeclareAllUserOff();
        expertSocketService.match.joinMatchRoom(state?.id, "expert");
        expertSocketService.match.getMatchRates(state?.id, (event: any) => {
          updateMatchDetailToRedux(event);
        });

        socketService.user.betVerify(updateVerifyBet);
        //  expertSocketService.match.betVerify((event: any) => {
        //   console.log("event :", event)
        //   // updateMatchDetailToRedux(event);
        // });
        
        socketService.user.matchResultDeclared(resultDeclared);
        socketService.user.matchResultDeclareAllUser(resultDeclared);
        socketService.user.matchResultUnDeclared(resultUnDeclared);
        socketService.user.matchDeleteBet(matchDeleteBet);
        socketService.user.sessionDeleteBet(matchDeleteBet);
        socketService.user.userMatchBetPlaced(updateMatchBetPlaced);
        socketService.user.userSessionBetPlaced(updateSessionBetPlaced);
        socketService.user.sessionResultDeclared(updateSessionResultDeclared);
        socketService.user.updateInResultDeclare(updateSessionResultStatus);
        socketService.user.updateDeleteReason(updateDeleteBetReason);
        // expertSocketService.match.connectError(handleSocketError);
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
          expertSocketService.match.leaveMatchRoom(state?.id);
          expertSocketService.match.getMatchRatesOff(state?.id);
          socketService.user.betVerifyOff();
          socketService.user.matchResultDeclaredOff();
          socketService.user.matchResultUnDeclaredOff();
          socketService.user.matchDeleteBetOff();
          socketService.user.sessionDeleteBetOff();
          socketService.user.sessionAddedOff();
          socketService.user.userMatchBetPlacedOff();
          socketService.user.userSessionBetPlacedOff();
          socketService.user.sessionResultDeclaredOff();
          socketService.user.updateInResultDeclareOff();
          socketService.user.updateDeleteReasonOff();
          socketService.user.matchResultDeclareAllUserOff();
          // expertSocketService.match.connectErrorOff();
          expertSocketService.match.onConnectOff();
          dispatch(resetPlacedBetsMatch());
        };
      }
    } catch (error) {
      console.log(error);
    }
  }, [state?.id]);


  // useEffect(() => {
  //   try {
  //     if (state?.id) {
  //       const currRateInt = handleRateInterval();

  //       return () => {
  //         if (currRateInt) {
  //           clearInterval(currRateInt);
  //           setRateInterval((prev: any) => ({ ...prev, intervalData: [] }));
  //         }
  //       };
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }, [state?.id]);

  // const handleRateInterval = useCallback(() => {
  //   if (rateInterval?.intervalData?.length) {
  //     for(let items of rateInterval?.intervalData){
  //       clearInterval(items);
  //     }
  //     setRateInterval((prev: any) => ({ ...prev, intervalData: [] }));
  //   }
  //   let rateIntervalData = setInterval(() => {
  //     dispatch(getMatchRates(state?.id));
  //   }, 500);

  //   setRateInterval((prev: any) => ({
  //     ...prev,
  //     intervalData: [...prev.intervalData, rateIntervalData],
  //   }));

  //   return rateInterval;
  // }, [rateInterval?.intervalData, state?.id]);

  // const handleVisibilityChange = useCallback(() => {
  //   if (document.visibilityState === "visible") {
  //       if (!socket.connected || !matchSocket.connected) {
  //         socketService.connect();
  //       }
  //       if (state?.id) {
  //         // dispatch(getMatchDetail(state?.id));
  //         dispatch(getPlacedBetsMatch(state?.id));
  //         expertSocketService.match.joinMatchRoom(state?.id, "expert");
  //         // expertSocketService.match.getMatchRates(state?.id, (event: any) => {
  //         //   updateMatchDetailToRedux(event);
  //         // });
  //       }
  //       handleRateInterval();
      
  //   } else if (document.visibilityState === "hidden") {
  //     expertSocketService.match.leaveMatchRoom(state?.id);
  //     if (rateInterval?.intervalData?.length) {
  //       for(let items of rateInterval?.intervalData){
  //         clearInterval(items);
  //       }
  //       setRateInterval((prev: any) => ({ ...prev, intervalData: [] }));
  //     }
  //   }
  // }, [
  //   state?.id,
  //   state.userId,
  //   dispatch,
  //   rateInterval,
  //   setRateInterval,
  //   socketService,
  // ]);

  // useEffect(() => {
  //   document.addEventListener("visibilitychange", handleVisibilityChange);

  //   return () => {
  //     document.removeEventListener("visibilitychange", handleVisibilityChange);
  //     if (rateInterval?.intervalData?.length) {
  //       for(let items of rateInterval?.intervalData){
  //         clearInterval(items);
  //       }
  //       setRateInterval((prev: any) => ({ ...prev, intervalData: [] }));
  //     }
  //   };
  // }, [handleVisibilityChange, rateInterval, setRateInterval]);


  // const fetchLiveData = useCallback(async () => {
  //   try {
  //     const response = await axios.get(`${baseUrls.matchSocket}/getExpertRateDetails/${state?.id}`, {
  //       headers: {
  //         Connection: "keep-alive",
  //         // Authorization: `Bearer ${sessionStorage.getItem("jwtExpert")}`,
  //       },
  //     });
  //     updateMatchDetailToRedux(response.data);
  //   } catch (error) {
  //     console.error("Error fetching live data:", error);
  //   }
  // }, [state?.id]);

  // const handleVisibilityChange = useCallback(() => {
  //   if (document.visibilityState === "visible") {
  //     if (!intervalRef.current) {
  //       fetchLiveData();
  //       intervalRef.current = setInterval(fetchLiveData, 500);
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

  // useEffect(() => {
  //   if (matchDetail?.marketId) {
  //     let intervalTime = 500;
  //     if (errorCount >= 5 && errorCount < 10) {
  //       intervalTime = 60000;
  //     } else if (errorCount >= 10) {
  //       intervalTime = 600000;
  //     }
  //     const interval = setInterval(() => {
  //       getScoreBoard(matchDetail?.marketId);
  //     }, intervalTime);

  //     return () => clearInterval(interval);
  //   }
  // }, [matchDetail?.marketId, errorCount]);

  useEffect(() => {
    try {
      const handleVisibilityChange = () => {
        if (document.visibilityState === "visible") {
          if (!socket.connected || !matchSocket.connected) {
            socketService.connect();
          }
          if (state?.id) {
            // dispatch(getMatchDetail(state?.id));
            dispatch(getPlacedBetsMatch(state?.id));
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

  const component = [
    {
      component: matchDetail?.matchOdd &&
        (matchDetail?.matchOdd?.isActive === false ? false : true) && (
          <MatchOdds
            showHeader={true}
            currentMatch={matchDetail}
            matchOddsLive={matchDetail?.matchOdd}
            showResultBox={firstKnownKey === "matchOdd"}
            exposureLimit={matchDetail?.quickBookmaker?.[0]?.exposureLimit}
          />
        ),
      result:
        matchDetail?.matchOdd && firstKnownKey === "matchOdd"
          ? matchDetail?.stopAt
            ? "declared"
            : matchDetail?.resultStatus
            ? "pending"
            : ""
          : "",
    },
    {
      component: matchDetail?.bookmaker &&
        (matchDetail?.bookmaker?.isActive === false ? false : true) && (
          <BookMarket
            currentMatch={matchDetail}
            liveData={matchDetail?.bookmaker}
            title={matchDetail?.bookmaker?.name}
            showResultBox={firstKnownKey === "bookmaker"}
          />
        ),
      result:
        matchDetail?.bookmaker && firstKnownKey === "bookmaker"
          ? matchDetail?.resultStatus
            ? "pending"
            : matchDetail?.stopAt
            ? "declared"
            : ""
          : "",
    },
    {
      component: matchDetail?.marketBookmaker2 &&
        (matchDetail?.marketBookmaker2?.isActive === false ? false : true) && (
          <BookMarket
            currentMatch={matchDetail}
            liveData={matchDetail?.marketBookmaker2}
            title={matchDetail?.marketBookmaker2?.name}
            showResultBox={firstKnownKey === "marketBookmaker2"}
          />
        ),
      result:
        matchDetail?.marketBookmaker2 && firstKnownKey === "marketBookmaker2"
          ? matchDetail?.resultStatus
            ? "pending"
            : matchDetail?.stopAt
            ? "declared"
            : ""
          : "",
    },
    ...(matchDetail?.quickBookmaker
      ?.filter((item: any) => item?.isActive)
      ?.map((bookmaker: any) => ({
        component: (
          <ManualMarket
            key={bookmaker?.id}
            currentMatch={matchDetail}
            liveData={bookmaker}
            showResultBox={
              firstKnownKey === "quickBookmaker" &&
              bookmaker?.type === "quickbookmaker1"
                ? true
                : false
            }
          />
        ),
        result:
          firstKnownKey === "quickBookmaker" &&
          bookmaker?.type === "quickbookmaker1"
            ? true
            : false
            ? matchDetail?.resultStatus
              ? "pending"
              : matchDetail?.stopAt
              ? "declared"
              : ""
            : "",
      })) || []),
    ...(matchDetail?.other?.map((market: any) => ({
      component: (
        <OtherMatchMarket
          key={market?.id}
          currentMatch={matchDetail}
          liveData={{
            ...market,
            type: "other",
            marketId: market?.mid ? market?.mid.toString() : "",
          }}
          title={market?.name}
          firstKnownKey={firstKnownKey}
        />
      ),
      result: matchDetail?.otherBettings?.[market?.id]
        ? market?.activeStatus === "result"
          ? "declared"
          : "pending"
        : "",
    })) || []),
    ...(matchDetail?.tournament
      ?.filter((item: any) => item?.name !== "HT/FT")
      ?.map((market: any, index: number) => ({
        component: (
          <TournamentMarket
            key={index}
            liveData={market}
            currentMatch={matchDetail}
            title={market?.name}
            firstKnownKey={firstKnownKey}
          />
        ),
        result: matchDetail?.otherBettings?.[market?.id]
          ? market?.activeStatus === "result"
            ? "declared"
            : "pending"
          : "",
      })) || []),
    {
      component: matchDetail?.apiTideMatch &&
        (matchDetail?.apiTideMatch?.isActive === false ? false : true) && (
          <TiedMatchMarket
            currentMatch={matchDetail}
            liveData={matchDetail?.apiTideMatch}
            title={matchDetail?.apiTideMatch?.name}
            showResultBox={firstKnownKey === "apiTideMatch"}
          />
        ),
      result:
        matchDetail?.apiTideMatch && firstKnownKey === "apiTideMatch"
          ? matchDetail?.resultStatus
            ? "pending"
            : matchDetail?.stopAt
            ? "declared"
            : ""
          : "",
    },
    {
      component: matchDetail?.apiTideMatch2 &&
        (matchDetail?.apiTideMatch2?.isActive === false ? false : true) && (
          <TiedMatchMarket
            currentMatch={matchDetail}
            liveData={matchDetail?.apiTideMatch2}
            title={matchDetail?.apiTideMatch2?.name}
            showResultBox={firstKnownKey === "apiTiedMatch2"}
          />
        ),
      result:
        matchDetail?.apiTideMatch2 && firstKnownKey === "apiTiedMatch2"
          ? matchDetail?.resultStatus
            ? "pending"
            : matchDetail?.stopAt
            ? "declared"
            : ""
          : "",
    },
    {
      component: matchDetail?.manualTiedMatch &&
        (matchDetail?.manualTiedMatch?.isActive === false ? false : true) && (
          <ManualMarket
            currentMatch={matchDetail}
            liveData={matchDetail?.manualTiedMatch}
            type="manualTiedMatch"
            showResultBox={firstKnownKey === "manualTiedMatch"}
          />
        ),
      result:
        matchDetail?.manualTiedMatch && firstKnownKey === "manualTiedMatch"
          ? matchDetail?.resultStatus
            ? "pending"
            : matchDetail?.stopAt
            ? "declared"
            : ""
          : "",
    },
    {
      component: matchDetail?.marketCompleteMatch &&
        (matchDetail?.marketCompleteMatch?.isActive === false
          ? false
          : true) && (
          <CompleteMatchMarket
            currentMatch={matchDetail}
            liveData={matchDetail?.marketCompleteMatch}
            title={matchDetail?.marketCompleteMatch?.name}
            showResultBox={firstKnownKey === "marketCompleteMatch"}
          />
        ),
      result:
        matchDetail?.marketCompleteMatch &&
        firstKnownKey === "marketCompleteMatch"
          ? matchDetail?.resultStatus
            ? "pending"
            : matchDetail?.stopAt
            ? "declared"
            : ""
          : "",
    },
    {
      component: matchDetail?.marketCompleteMatch1 &&
        (matchDetail?.marketCompleteMatch1?.isActive === false
          ? false
          : true) && (
          <CompleteMatchMarket
            currentMatch={matchDetail}
            liveData={matchDetail?.marketCompleteMatch1}
            title={matchDetail?.marketCompleteMatch1?.name}
            showResultBox={firstKnownKey === "marketCompleteMatch1"}
          />
        ),
      result:
        matchDetail?.marketCompleteMatch1 &&
        firstKnownKey === "marketCompleteMatch1"
          ? matchDetail?.resultStatus
            ? "pending"
            : matchDetail?.stopAt
            ? "declared"
            : ""
          : "",
    },
    {
      component: matchDetail?.manualCompleteMatch &&
        (matchDetail?.manualCompleteMatch?.isActive === false
          ? false
          : true) && (
          <ManualMarket
            currentMatch={matchDetail}
            liveData={matchDetail?.manualCompleteMatch}
            type="manualTiedMatch"
            showResultBox={firstKnownKey === "manualCompleteMatch"}
          />
        ),
      result:
        matchDetail?.manualCompleteMatch &&
        firstKnownKey === "manualCompleteMatch"
          ? matchDetail?.resultStatus
            ? "pending"
            : matchDetail?.stopAt
            ? "declared"
            : ""
          : "",
    },
  ];

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
  }, [matchDetail?.id, matchSocket]);

  const desktop = useMediaQuery(theme.breakpoints.up("sm"));
  return (
    <Box
      sx={{
        display: { lg: "flex", md: "flex", sm: "flex" },
        alignSelf: "center",
        borderRadius: "10px",
        flexDirection: "row",
        width: "100%",
        height: {
          xs: loading ? "80vh" : "100%",
          lg: loading ? "90vh" : "100%",
        },
        gap: "5px",
      }}
    >
      {loading ? (
        <Loader text="" />
      ) : (
        <>
          {!desktop ? (
            <Box
              sx={{
                width: { lg: "100%", xs: "100%", md: "100%" },
                marginTop: { xs: "10px", lg: "0" },
                display: "flex",
                flexDirection: "column",
                gap: "5px",
              }}
            >
              {/* <DelayedChild>
              <Masonry
                columns={matchesMobile ? 1 : 2}
                spacing={matchesMobile ? 0 : 1}
              > */}
              {component
                ?.sort(handleMarketSorting)
                ?.map((item: any, index: number) => {
                  return <Fragment key={index}>{item?.component}</Fragment>;
                })}
              {/* </Masonry>
            </DelayedChild> */}
            </Box>
          ) : (
            <>
              <Box
                sx={{
                  width: { lg: "22.5%", xs: "100%", md: "22.5%" },
                  marginTop: { xs: "10px", lg: "0" },
                  display: "flex",
                  flexDirection: "column",
                  gap: "5px",
                }}
              >
                {/* <DelayedChild>
              <Masonry
                columns={matchesMobile ? 1 : 2}
                spacing={matchesMobile ? 0 : 1}
              > */}
                {component
                  ?.sort(handleMarketSorting)
                  ?.filter((_: any, index: any) => index % 2 != 0)
                  ?.map((item: any, index: number) => {
                    return <Fragment key={index}>{item?.component}</Fragment>;
                  })}
                {/* </Masonry>
            </DelayedChild> */}
              </Box>
              <Box
                sx={{
                  width: { lg: "22.5%", xs: "100%", md: "22.5%" },
                  marginTop: { xs: "10px", lg: "0" },
                  display: "flex",
                  flexDirection: "column",
                  gap: "5px",
                }}
              >
                {/* <DelayedChild>
              <Masonry
                columns={matchesMobile ? 1 : 2}
                spacing={matchesMobile ? 0 : 1}
              > */}
                {component
                  ?.sort(handleMarketSorting)
                  ?.filter((_: any, index: any) => index % 2 == 0)
                  ?.map((item: any, index: number) => {
                    return <Fragment key={index}>{item?.component}</Fragment>;
                  })}
                {/* </Masonry>
            </DelayedChild> */}
              </Box>
            </>
          )}
          <Box
            sx={{
              width: { lg: "55%", xs: "100%", md: "55%" },
              flexDirection: "column",
              display: "flex",
              marginTop: { xs: "10px", lg: "0" },
            }}
          >
            {matchDetail?.id && (
              <BetList allBetRates={ Array.from(new Set(placedBetsMatch))} tag={true} />
            )}
          </Box>
        </>
      )}
    </Box>
  );
};

export default memo(MatchMarketDetail);
