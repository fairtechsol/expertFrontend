import { Box } from "@mui/material";
import { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Loader from "../../components/Loader";
import BetList from "../../components/matchDetails/BetList";
import BookMarket from "../../components/matchDetails/Bookmarket";
import MatchOdds from "../../components/matchDetails/MatchOdds";
import {
  expertSocketService,
  socket,
  socketService,
} from "../../socketManager";
import {
  getMatchDetail,
  removeSessionProLoss,
  updateMatchRates,
  updateRates,
  updateSessionProLoss,
} from "../../store/actions/addMatch/addMatchAction";
import {
  setCurrentOdd,
  updateApiSessionById,
} from "../../store/actions/addSession";
import {
  getPlacedBetsMatch,
  getSessionProfitLossMatchDetailReset,
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
import TiedMatchMarket from "../../components/matchDetails/TiedMatchMarket";
import CompleteMatchMarket from "../../components/matchDetails/CompleteMatchMarket";
import { matchSocketService } from "../../socketManager/matchSocket";
import ManualMarket from "../manualMarket";
import Scoreboard from "../../components/matchDetails/Scoreboard";
import service from "../../service";
import OtherMatchMarket from "../../components/matchDetails/OtherMatchMarket";
import TournamentMarket from "../../components/matchDetails/TournamentMarkets";
import { marketArray } from "../../utils/Constants";

const MatchMarketDetail = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const [socketConnected, setSocketConnected] = useState(true);
  const [liveScoreBoardData, setLiveScoreBoardData] = useState(null);
  const [errorCount, setErrorCount] = useState<number>(0);
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
      if (event?.matchId === state?.id && event?.isMatchDeclare) {
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
  const updateDeleteBetReason = (event: any) => {
    try {
      if (event?.matchId === state?.id) {
        dispatch(updateDeletedBetReasonOnEdit(event));
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
    setSocketConnected(true);
  };

  const handleSocketError = () => {
    setSocketConnected(false);
  };

  const getScoreBoard = async (marketId: string) => {
    try {
      const response: any = await service.get(
        `https://devscore.fairgame.club/score/getMatchScore/${marketId}`
        // `https://fairscore7.com/score/getMatchScore/${marketId}`
      );
      if (response) {
        setLiveScoreBoardData(response);
        setErrorCount(0);
      }
    } catch (e: any) {
      console.log("Error:", e?.message);
      setErrorCount((prevCount: number) => prevCount + 1);
    }
  };

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
        dispatch(getMatchDetail(state?.id));
        dispatch(getPlacedBetsMatch(state?.id));
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
        socketService.user.matchDeleteBetOff();
        socketService.user.sessionDeleteBetOff();
        socketService.user.sessionAddedOff();
        socketService.user.userMatchBetPlacedOff();
        socketService.user.userSessionBetPlacedOff();
        socketService.user.sessionResultDeclaredOff();
        socketService.user.updateInResultDeclareOff();
        socketService.user.updateDeleteReasonOff();
        expertSocketService.match.joinMatchRoom(state?.id, "expert");
        expertSocketService.match.getMatchRates(state?.id, (event: any) => {
          updateMatchDetailToRedux(event);
        });
        socketService.user.matchResultDeclared(resultDeclared);
        socketService.user.matchResultUnDeclared(resultUnDeclared);
        socketService.user.matchDeleteBet(matchDeleteBet);
        socketService.user.sessionDeleteBet(matchDeleteBet);
        socketService.user.userMatchBetPlaced(updateMatchBetPlaced);
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
          expertSocketService.match.connectErrorOff();
          expertSocketService.match.onConnectOff();
        };
      }
    } catch (error) {
      console.log(error);
    }
  }, [state?.id]);

  useEffect(() => {
    if (matchDetail?.marketId) {
      let intervalTime = 500;
      if (errorCount >= 5 && errorCount < 10) {
        intervalTime = 60000;
      } else if (errorCount >= 10) {
        intervalTime = 600000;
      }
      const interval = setInterval(() => {
        getScoreBoard(matchDetail?.marketId);
      }, intervalTime);

      return () => clearInterval(interval);
    }
  }, [matchDetail?.marketId, errorCount]);

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

  return (
    <Box
      sx={{
        display: { lg: "flex", md: "flex" },
        alignSelf: "center",
        borderRadius: "10px",
        flexDirection: "row",
        width: "100%",
        height: {
          xs: loading ? "80vh" : "100%",
          lg: loading ? "90vh" : "100%",
        },
        // minHeight: "92vh",
        // background: !loading ? "white" : "",
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
              width: { lg: "60%", xs: "100%", md: "60%" },
              // flexDirection: "column",
              display: "flex",
              flexWrap: "wrap",
              // paddingLeft: "5px",
              gap: 1,
              marginTop: { xs: "10px", lg: "0" },
            }}
          >
            {liveScoreBoardData && (
              <Scoreboard liveScoreData={liveScoreBoardData} />
            )}
            {matchDetail?.matchOdd &&
              (matchDetail?.matchOdd?.isActive === false ? false : true) && (
                <MatchOdds
                  showHeader={true}
                  currentMatch={matchDetail}
                  matchOddsLive={matchDetail?.matchOdd}
                  showResultBox={firstKnownKey === "matchOdd"}
                />
              )}
            {matchDetail?.bookmaker &&
              (matchDetail?.bookmaker?.isActive === false ? false : true) && (
                <BookMarket
                  currentMatch={matchDetail}
                  liveData={matchDetail?.bookmaker}
                  title={matchDetail?.bookmaker?.name}
                  showResultBox={firstKnownKey === "bookmaker"}
                />
              )}
            {matchDetail?.marketBookmaker2 &&
              (matchDetail?.marketBookmaker2?.isActive === false
                ? false
                : true) && (
                <BookMarket
                  currentMatch={matchDetail}
                  liveData={matchDetail?.marketBookmaker2}
                  title={matchDetail?.marketBookmaker2?.name}
                  showResultBox={firstKnownKey === "marketBookmaker2"}
                />
              )}
            {matchDetail?.quickBookmaker
              ?.filter((item: any) => item?.isActive)
              ?.map((bookmaker: any) => (
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
              ))}
            {matchDetail?.other &&
              matchDetail?.other
                ?.filter((item: any) => item?.isActive)
                ?.map((market: any) => (
                  <OtherMatchMarket
                    key={market?.id}
                    currentMatch={matchDetail}
                    liveData={{
                      ...market,
                      type: "other",
                      marketId: market?.mid ? market?.mid?.toString() : "",
                    }}
                    title={market?.name}
                  />
                ))}
            {matchDetail?.tournament &&
              (matchDetail?.tournament?.isActive === false ? false : true) &&
              matchDetail?.tournament?.map((market: any) => (
                <TournamentMarket
                  key={market?.mid}
                  liveData={market}
                  currentMatch={matchDetail}
                  title={market?.name}
                />
              ))}
            {matchDetail?.apiTideMatch &&
              (matchDetail?.apiTideMatch?.isActive === false
                ? false
                : true) && (
                <TiedMatchMarket
                  currentMatch={matchDetail}
                  liveData={matchDetail?.apiTideMatch}
                  title={matchDetail?.apiTideMatch?.name}
                  showResultBox={firstKnownKey === "apiTideMatch"}
                />
              )}
            {matchDetail?.apiTideMatch2 &&
              (matchDetail?.apiTideMatch2?.isActive === false
                ? false
                : true) && (
                <TiedMatchMarket
                  currentMatch={matchDetail}
                  liveData={matchDetail?.apiTideMatch2}
                  title={matchDetail?.apiTideMatch2?.name}
                  showResultBox={firstKnownKey === "apiTiedMatch2"}
                />
              )}
            {matchDetail?.manualTiedMatch &&
              (matchDetail?.manualTiedMatch?.isActive === false
                ? false
                : true) && (
                <ManualMarket
                  currentMatch={matchDetail}
                  liveData={matchDetail?.manualTiedMatch}
                  type="manualTiedMatch"
                  showResultBox={firstKnownKey === "manualTiedMatch"}
                />
              )}
            {matchDetail?.marketCompleteMatch &&
              (matchDetail?.marketCompleteMatch?.isActive === false
                ? false
                : true) && (
                <CompleteMatchMarket
                  currentMatch={matchDetail}
                  liveData={matchDetail?.marketCompleteMatch}
                  title={matchDetail?.marketCompleteMatch?.name}
                  showResultBox={firstKnownKey === "marketCompleteMatch"}
                />
              )}
            {matchDetail?.marketCompleteMatch1 &&
              (matchDetail?.marketCompleteMatch?.isActive === false
                ? false
                : true) && (
                <CompleteMatchMarket
                  currentMatch={matchDetail}
                  liveData={matchDetail?.marketCompleteMatch1}
                  title={matchDetail?.marketCompleteMatch1?.name}
                  showResultBox={firstKnownKey === "marketCompleteMatch"}
                />
              )}{" "}
            {matchDetail?.manualCompleteMatch &&
              (matchDetail?.manualCompleteMatch?.isActive === false
                ? false
                : true) && (
                <ManualMarket
                  currentMatch={matchDetail}
                  liveData={matchDetail?.manualCompleteMatch}
                  type="manualTiedMatch"
                  showResultBox={firstKnownKey === "manualCompleteMatch"}
                />
              )}
          </Box>
          <Box
            sx={{
              width: { lg: "40%", xs: "100%", md: "40%" },
              flexDirection: "column",
              display: "flex",
              paddingLeft: "5px",
              marginTop: { xs: "10px", lg: "0" },
            }}
          >
            {matchDetail?.id && (
              <BetList allBetRates={placedBetsMatch} tag={true} />
            )}
          </Box>
        </>
      )}
    </Box>
  );
};

export default memo(MatchMarketDetail);
