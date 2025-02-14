import { Box, useMediaQuery, useTheme } from "@mui/material";
import { Fragment, memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { handleMarketSorting } from "../../components/helper";
import Loader from "../../components/Loader";
import BetList from "../../components/matchDetails/BetList";
import BookMarket from "../../components/matchDetails/Bookmarket";
import CompleteMatchMarket from "../../components/matchDetails/CompleteMatchMarket";
import MatchOdds from "../../components/matchDetails/MatchOdds";
import OtherMatchMarket from "../../components/matchDetails/OtherMatchMarket";
import TiedMatchMarket from "../../components/matchDetails/TiedMatchMarket";
import TournamentMarket from "../../components/matchDetails/TournamentMarkets";
import HTFTMarket from "../../components/matchDetails/TournamentMarkets/HTFTMarket";
import {
  expertSocketService,
  matchSocket,
  socket,
  socketService,
  matchService,
} from "../../socketManager";
import { matchSocketService } from "../../socketManager/matchSocket";
import {
  updateMatchRates,
  updateRates
} from "../../store/actions/addMatch/addMatchAction";
import { resetPlacedBetsMatch } from "../../store/actions/addSession";
import {
  getPlacedBetsMatch,
  getSessionProfitLossMatchDetailReset,
  // updateBetVerify,
  updateDeletedBetReasonOnEdit,
  updateMatchBetsPlace,
  updateMatchBetsReason,
  updateResultBoxStatus,
  updateResultStatusOfMatch,
  updateTeamRates,
} from "../../store/actions/match/matchAction";
import { getOtherGamesMatchDetail } from "../../store/actions/otherGamesAction/matchDetailActions";
import { AppDispatch, RootState } from "../../store/store";
import { marketArray } from "../../utils/Constants";
import ManualMarket from "../manualMarket";

const OtherMatchDetails = () => {
  // const intervalRef = useRef<NodeJS.Timeout | null>(null);
    // const [rateInterval, setRateInterval] = useState<any>({ intervalData: [] });
  
  const { state } = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  const matchesMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const dispatch: AppDispatch = useDispatch();
  const { matchDetail, loading, success } = useSelector(
    (state: RootState) => state.addMatch.addMatch
  );
  const { placedBetsMatch } = useSelector(
    (state: RootState) => state.matchList
  );

  useEffect(() => {
    if (state?.marketId) {
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
      } else {
        dispatch(getPlacedBetsMatch(state?.id));
        dispatch(updateResultStatusOfMatch(event));
        dispatch(
          updateResultBoxStatus({ visible: false, betId: event?.betId })
        );
      }
    } catch (e) {
      console.log(e);
    }
  };

  // const updateVerifyBet = (event: any) => {
  //       try {
  //         if (event?.matchId === state?.id) {
  //           dispatch(updateBetVerify(event));
  //         }
  //       } catch (e) {
  //         console.log(e);
  //       }
  //     };

  const resultUnDeclared = (event: any) => {
    try {
      if (event?.matchId === state?.id) {
        // if (event?.betType === "quickbookmaker1") {
          dispatch(getOtherGamesMatchDetail(state?.id));
          dispatch(getPlacedBetsMatch(state?.id));
        // } else {
          // dispatch(getPlacedBetsMatch(state?.id));
          // dispatch(handleBetResultStatus(event));
          // dispatch(updateMatchRatesOnMarketUndeclare(event));
        // }
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
        // dispatch(
        //   updateSessionProLoss({
        //     id: event?.betId,
        //     betPlaced: event?.profitLoss ? event?.profitLoss?.betPlaced : [],
        //   })
        // );
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

  const updateSessionResultStatus = (event: any) => {
    try {
      if (event?.matchId === state?.id) {
        dispatch(updateResultStatusOfMatch(event));
        dispatch(updateResultBoxStatus({ visible: false }));
      }
    } catch (error) {
      console.error(error);
    }
  };

  // const handleSocketConnection = () => {
  //   if (state?.id) {
  //     expertSocketService.match.joinMatchRoom(state?.id, "expert");
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
    try {
      if (state?.id) {
        dispatch(getSessionProfitLossMatchDetailReset());
        dispatch(getOtherGamesMatchDetail(state?.id));
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
        // socketService.user.betVerifyOff();
        socketService.user.matchResultDeclaredOff();
        socketService.user.matchResultUnDeclaredOff();
        socketService.user.matchDeleteBetOff();
        socketService.user.sessionDeleteBetOff();
        socketService.user.userMatchBetPlacedOff();
        socketService.user.updateInResultDeclareOff();
        socketService.user.updateDeleteReasonOff();
        socketService.user.matchResultDeclareAllUserOff();
        socketService.user.matchResultUnDeclareAllUserOff();
        // expertSocketService.match.joinMatchRoom(state?.id, "expert");
        expertSocketService.match.getMatchRates(state?.id, (event: any) => {
          updateMatchDetailToRedux(event);
        });
        // socketService.user.betVerify(updateVerifyBet);
        socketService.user.matchResultDeclared(resultDeclared);
        socketService.user.matchResultDeclareAllUser(resultDeclared);
        socketService.user.matchResultUnDeclared(resultUnDeclared);
        socketService.user.matchResultUnDeclareAllUser(resultUnDeclared);
        socketService.user.matchDeleteBet(matchDeleteBet);
        socketService.user.userMatchBetPlaced(updateMatchBetPlaced);
        socketService.user.updateInResultDeclare(updateSessionResultStatus);
        socketService.user.updateDeleteReason(updateDeleteBetReason);
        // expertSocketService.match.connectError(handleSocketError);
        // expertSocketService.match.onConnect(handleSocketConnection);
      }
    } catch (e) {
      console.log(e);
    }
  }, [success, socket, state?.id, matchSocket]);

  useEffect(() => {
    try {
      if (state?.id) {
        return () => {
          matchSocketService.leaveAllRooms();
          // expertSocketService.match.leaveMatchRoom(state?.id);
          expertSocketService.match.getMatchRatesOff(state?.id);
          socketService.user.matchResultDeclaredOff();
          socketService.user.matchResultUnDeclaredOff();
          socketService.user.matchDeleteBetOff();
          socketService.user.userMatchBetPlacedOff();
          socketService.user.updateInResultDeclareOff();
          socketService.user.updateDeleteReasonOff();
          // expertSocketService.match.connectErrorOff();
          // socketService.user.betVerifyOff();
          expertSocketService.match.onConnectOff();
          socketService.user.matchResultDeclareAllUserOff();
          socketService.user.matchResultUnDeclareAllUserOff();
          dispatch(resetPlacedBetsMatch());
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

  useEffect(() => {
    try {
      const handleVisibilityChange = () => {
        if (document.visibilityState === "visible") {
          // if (!socket.connected || !matchSocket.connected) {
          //   socketService.connect();
          // }
          if (state?.id) {
            // dispatch(getOtherGamesMatchDetail(state?.id));
            dispatch(getPlacedBetsMatch(state?.id));
            // expertSocketService.match.joinMatchRoom(state?.id, "expert");
            expertSocketService.match.getMatchRates(state?.id, (event: any) => {
              updateMatchDetailToRedux(event);
            });
          }
        } else if (document.visibilityState === "hidden") {
          if (state?.id) {
            // expertSocketService.match.leaveMatchRoom(state?.id);
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

  // useEffect(() => {
  //   try {
  //     if (matchDetail?.id && matchSocket) {
  //       let currRateInt = setInterval(() => {
  //         expertSocketService.match.joinMatchRoom(matchDetail?.id, "expert");
  //       }, 60000);
  //       return () => {
  //         clearInterval(currRateInt);
  //       };
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }, [matchDetail?.id, matchSocket]);

  
  //   useEffect(() => {
  //     try {
  //       if (state?.id) {
  //         const currRateInt = handleRateInterval();
  
  //         return () => {
  //           if (currRateInt) {
  //             clearInterval(currRateInt);
  //             setRateInterval((prev: any) => ({ ...prev, intervalData: [] }));
  //           }
  //         };
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }, [state?.id]);
  
  //   const handleRateInterval = useCallback(() => {
  //     if (rateInterval?.intervalData?.length) {
  //       for(let items of rateInterval?.intervalData){
  //         clearInterval(items);
  //       }
  //       setRateInterval((prev: any) => ({ ...prev, intervalData: [] }));
  //     }
  //     let rateIntervalData = setInterval(() => {
  //       dispatch(getMatchRates(state?.id));
  //     }, 500);
  
  //     setRateInterval((prev: any) => ({
  //       ...prev,
  //       intervalData: [...prev.intervalData, rateIntervalData],
  //     }));
  
  //     return rateInterval;
  //   }, [rateInterval?.intervalData, state?.id]);
  
  //   const handleVisibilityChange = useCallback(() => {
  //     if (document.visibilityState === "visible") {
  //       if (!socket.connected || !matchSocket.connected) {
  //         socketService.connect();
  //       }
  //       if (state?.id) {
  //         // dispatch(getOtherGamesMatchDetail(state?.id));
  //         dispatch(getPlacedBetsMatch(state?.id));
  //         expertSocketService.match.joinMatchRoom(state?.id, "expert");
  //         // expertSocketService.match.getMatchRates(state?.id, (event: any) => {
  //         //   updateMatchDetailToRedux(event);
  //         // });
  //         handleRateInterval();
  //       }
        
  //     } else if (document.visibilityState === "hidden") {
  //       expertSocketService.match.leaveMatchRoom(state?.id);
  //       if (rateInterval?.intervalData?.length) {
  //         for(let items of rateInterval?.intervalData){
  //           clearInterval(items);
  //         }
  //         setRateInterval((prev: any) => ({ ...prev, intervalData: [] }));
  //       }
  //     }
  //   }, [
  //     state?.id,
  //     state.userId,
  //     dispatch,
  //     rateInterval,
  //     setRateInterval,
  //     socketService,
  //   ]);
  
  //   useEffect(() => {
  //     document.addEventListener("visibilitychange", handleVisibilityChange);
  
  //     return () => {
  //       document.removeEventListener("visibilitychange", handleVisibilityChange);
  //       if (rateInterval?.intervalData?.length) {
  //         for(let items of rateInterval?.intervalData){
  //           clearInterval(items);
  //         }
  //         setRateInterval((prev: any) => ({ ...prev, intervalData: [] }));
  //       }
  //     };
  //   }, [handleVisibilityChange, rateInterval, setRateInterval]);

  return (
    <>
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
            <Box
              sx={{
                width: { lg: "22.5%", xs: "100%", md: "45%" },
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
                width: { lg: "22.5%", xs: "100%", md: "45%" },
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
            {matchesMobile && (
              <Box
                sx={{
                  width: { lg: "50%", xs: "100%", md: "50%", sm: "50%" },
                }}
              >
                {matchDetail?.tournament &&
                  matchDetail?.tournament
                    ?.filter((item: any) => item?.name === "HT/FT")
                    ?.map((market: any) => (
                      <HTFTMarket
                        key={market?.mid}
                        liveData={market}
                        currentMatch={matchDetail}
                        title={market?.name}
                        firstKnownKey={firstKnownKey}
                      />
                    ))}
              </Box>
            )}
            <Box
              sx={{
                width: { lg: "50%", xs: "100%", md: "50%", sm: "50%" },
                flexDirection: "column",
                display: "flex",
                marginTop: { xs: "10px", lg: "0" },
              }}
            >
              {matchDetail?.id && (
                <BetList allBetRates={ Array.from(new Set(placedBetsMatch))} tag={true} isMatchDeclare={true}/>
              )}
            </Box>
          </>
        )}
      </Box>
      {!matchesMobile && (
        <Box
          sx={{
            width: { lg: "50%", xs: "100%", md: "50%", sm: "50%" },
            marginTop: { xs: "10px", lg: "0" },
            gap: 1,
          }}
        >
          {matchDetail?.tournament &&
            matchDetail?.tournament
              ?.filter((item: any) => item?.name === "HT/FT")
              ?.map((market: any) => (
                <HTFTMarket
                  key={market?.mid}
                  liveData={market}
                  currentMatch={matchDetail}
                  title={market?.name}
                  firstKnownKey={firstKnownKey}
                />
              ))}
        </Box>
      )}
    </>
  );
};

export default memo(OtherMatchDetails);
