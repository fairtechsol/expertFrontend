import { Box, useMediaQuery, useTheme } from "@mui/material";
import { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Loader from "../../components/Loader";
import BetList from "../../components/matchDetails/BetList";
import MatchOdds from "../../components/matchDetails/MatchOdds";
import {
  expertSocketService,
  socket,
  socketService,
} from "../../socketManager";
import {
  handleBetResultStatus,
  // removeSessionProLoss,
  updateMatchRates,
  updateMatchRatesOnMarketUndeclare,
  updateRates,
  // updateSessionProLoss,
} from "../../store/actions/addMatch/addMatchAction";
// import {
//   setCurrentOdd,
//   updateApiSessionById,
// } from "../../store/actions/addSession";
import {
  getPlacedBetsMatch,
  getSessionProfitLossMatchDetailReset,
  updateDeletedBetReasonOnEdit,
  updateMatchBetsPlace,
  updateMatchBetsReason,
  // updateMaxLoss,
  updateResultBoxStatus,
  updateResultStatusOfMatch,
  // updateResultStatusOfSession,
  // updateSessionBetsPlace,
  updateTeamRates,
} from "../../store/actions/match/matchAction";
import { AppDispatch, RootState } from "../../store/store";
import TiedMatchMarket from "../../components/matchDetails/TiedMatchMarket";
import CompleteMatchMarket from "../../components/matchDetails/CompleteMatchMarket";
import { matchSocketService } from "../../socketManager/matchSocket";
import ManualMarket from "../manualMarket";
import UnderOverMarket from "../../components/otherMatchDetails/UnderOverMarket";
import SetWinner from "../../components/matchDetails/SetWinner";
import HalfTime from "../../components/matchDetails/HalfTime";
import { getOtherGamesMatchDetail } from "../../store/actions/otherGamesAction/matchDetailActions";
import { convertString, customSortOnName } from "../../helpers";
import TournamentMarket from "../../components/matchDetails/TournamentMarkets";
import BookMarket from "../../components/matchDetails/Bookmarket";
import OtherMatchMarket from "../../components/matchDetails/OtherMatchMarket";
import { marketArray } from "../../utils/Constants";
import HTFTMarket from "../../components/matchDetails/TournamentMarkets/HTFTMarket";
import Masonry from "@mui/lab/Masonry";

const OtherMatchDetails = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  const matchesMobile = useMediaQuery(theme.breakpoints.down("md"));
  const dispatch: AppDispatch = useDispatch();
  const [socketConnected, setSocketConnected] = useState(true);
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
  const resultUnDeclared = (event: any) => {
    try {
      if (event?.matchId === state?.id) {
        if (event?.betType === "quickbookmaker1") {
          dispatch(getOtherGamesMatchDetail(state?.id));
          dispatch(getPlacedBetsMatch(state?.id));
        } else {
          dispatch(getPlacedBetsMatch(state?.id));
          dispatch(handleBetResultStatus(event));
          dispatch(updateMatchRatesOnMarketUndeclare(event));
        }
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

  // const updateSessionResultDeclared = (event: any) => {
  //   try {
  //     if (state?.id === event?.matchId) {
  //       dispatch(updateApiSessionById(event));
  //       dispatch(getPlacedBetsMatch(state?.id));
  //       if (event?.activeStatus === "result") {
  //         dispatch(
  //           removeSessionProLoss({
  //             id: event?.betId,
  //           })
  //         );
  //       } else {
  //         dispatch(
  //           updateSessionProLoss({
  //             id: event?.betId,
  //             betPlaced: event?.profitLossObj
  //               ? event?.profitLossObj?.betPlaced
  //               : [],
  //           })
  //         );
  //       }
  //       dispatch(
  //         updateMaxLoss({
  //           id: event?.betId,
  //           maxLoss: event?.profitLossObj
  //             ? event?.profitLossObj?.maxLoss
  //             : event?.profitLoss,
  //           totalBet: event?.profitLossObj ? event?.profitLossObj?.totalBet : 0,
  //         })
  //       );
  //     }
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

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

  // const updateSessionBetPlaced = (event: any) => {
  //   try {
  //     if (event?.jobData?.placedBet?.matchId === state?.id) {
  //       dispatch(updateSessionBetsPlace(event));
  //       dispatch(
  //         updateSessionProLoss({
  //           id: event?.jobData?.placedBet?.betId,
  //           betPlaced: event?.redisData?.betPlaced,
  //         })
  //       );
  //       dispatch(
  //         updateMaxLoss({
  //           id: event?.jobData?.placedBet?.betId,
  //           maxLoss: event?.redisData?.maxLoss,
  //           totalBet: event?.redisData?.totalBet,
  //         })
  //       );
  //       dispatch(
  //         setCurrentOdd({
  //           matchId: event?.jobData?.placedBet?.matchId,
  //           betId: event?.jobData?.placedBet?.betId,
  //           odds: event?.jobData?.placedBet?.odds,
  //         })
  //       );
  //     }
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

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

  const handleSocketConnection = () => {
    setSocketConnected(true);
  };
  const handleSocketError = () => {
    setSocketConnected(false);
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
        dispatch(getOtherGamesMatchDetail(state?.id));
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
        socketService.user.userMatchBetPlacedOff();
        socketService.user.updateInResultDeclareOff();
        socketService.user.updateDeleteReasonOff();
        socketService.user.matchResultDeclareAllUserOff();
        socketService.user.matchResultUnDeclareAllUserOff();
        expertSocketService.match.joinMatchRoom(state?.id, "expert");
        expertSocketService.match.getMatchRates(state?.id, (event: any) => {
          updateMatchDetailToRedux(event);
        });
        socketService.user.matchResultDeclared(resultDeclared);
        socketService.user.matchResultDeclareAllUser(resultDeclared);
        socketService.user.matchResultUnDeclared(resultUnDeclared);
        socketService.user.matchResultUnDeclareAllUser(resultUnDeclared);
        socketService.user.matchDeleteBet(matchDeleteBet);
        socketService.user.userMatchBetPlaced(updateMatchBetPlaced);
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
          socketService.user.userMatchBetPlacedOff();
          socketService.user.updateInResultDeclareOff();
          socketService.user.updateDeleteReasonOff();
          expertSocketService.match.connectErrorOff();
          expertSocketService.match.onConnectOff();
          socketService.user.matchResultDeclareAllUserOff();
          socketService.user.matchResultUnDeclareAllUserOff();
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
            dispatch(getOtherGamesMatchDetail(state?.id));
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
    <>
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
          // padding: 1,
          // gap: 1,
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
                // marginTop: { xs: "10px", lg: "0" },
                gap: 1,
              }}
            >
              <Masonry columns={matchesMobile ? 1 : 2} spacing={1}>
                {matchDetail?.matchOdd &&
                  (matchDetail?.matchOdd?.isActive === false
                    ? false
                    : true) && (
                    <MatchOdds
                      showHeader={true}
                      currentMatch={matchDetail}
                      matchOddsLive={matchDetail?.matchOdd}
                      id={
                        matchDetail?.quickBookmaker[
                          matchDetail?.quickBookmaker?.findIndex(
                            (item: any) => item.type === "quickbookmaker1"
                          )
                        ]?.id
                      }
                      showResultBox={firstKnownKey === "matchOdd"}
                    />
                  )}
                {matchDetail?.bookmaker &&
                  (matchDetail?.bookmaker?.isActive === false
                    ? false
                    : true) && (
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
                  matchDetail?.other?.map((market: any) => (
                    <OtherMatchMarket
                      key={market?.id}
                      currentMatch={matchDetail}
                      liveData={{
                        ...market,
                        type: "other",
                        marketId: market?.mid ? market?.mid?.toString() : "",
                      }}
                      title={market?.name}
                      firstKnownKey={firstKnownKey}
                    />
                  ))}
                {matchDetail?.tournament &&
                  matchDetail?.tournament
                    ?.filter((item: any) => item?.name !== "HT/FT")
                    ?.map((market: any) => (
                      <TournamentMarket
                        key={market?.id}
                        liveData={market}
                        currentMatch={matchDetail}
                        title={market?.name}
                        firstKnownKey={firstKnownKey}
                      />
                    ))}

                {matchDetail?.halfTime &&
                  (matchDetail?.halfTime?.isActive === false
                    ? false
                    : true) && (
                    <HalfTime
                      showHeader={true}
                      currentMatch={matchDetail}
                      matchOddsLive={matchDetail?.halfTime}
                    />
                  )}
                {matchDetail?.firstHalfGoal &&
                  matchDetail?.firstHalfGoal
                    ?.filter((item: any) => item?.isActive)
                    ?.slice()
                    ?.sort(customSortOnName)
                    ?.map((market: any) => (
                      <UnderOverMarket
                        key={market?.id}
                        currentMatch={matchDetail}
                        liveData={market}
                        title={convertString(market?.name)}
                      />
                    ))}
                {matchDetail?.overUnder &&
                  matchDetail?.overUnder
                    ?.filter((item: any) => item?.isActive)
                    ?.slice()
                    ?.sort(customSortOnName)
                    ?.map((market: any) => (
                      <UnderOverMarket
                        key={market?.id}
                        currentMatch={matchDetail}
                        liveData={market}
                        title={convertString(market?.name)}
                      />
                    ))}
                {matchDetail?.setWinner &&
                  matchDetail?.setWinner?.length > 0 &&
                  matchDetail?.setWinner
                    ?.filter((item: any) => item?.isActive)
                    ?.slice()
                    ?.sort(customSortOnName)
                    ?.map((market: any) => (
                      <SetWinner
                        key={market?.id}
                        currentMatch={matchDetail}
                        liveData={market}
                        title={convertString(market?.name)}
                      />
                    ))}

                {matchDetail?.apiTideMatch &&
                  (matchDetail?.apiTideMatch?.isActive === false
                    ? false
                    : true) && (
                    <TiedMatchMarket
                      currentMatch={matchDetail}
                      liveData={matchDetail?.apiTideMatch}
                      showResultBox={firstKnownKey === "apiTideMatch"}
                    />
                  )}
                {matchDetail?.manualTideMatch &&
                  (matchDetail?.manualTideMatch?.isActive === false
                    ? false
                    : true) && (
                    <ManualMarket
                      currentMatch={matchDetail}
                      liveData={matchDetail?.manualTideMatch}
                      type="manualTiedMatch"
                      showResultBox={firstKnownKey === "manualTideMatch"}
                    />
                  )}
                {matchDetail?.marketCompleteMatch &&
                  (matchDetail?.manualTideMatch?.isActive === false
                    ? false
                    : true) && (
                    <CompleteMatchMarket
                      currentMatch={matchDetail}
                      liveData={matchDetail?.marketCompleteMatch}
                      showResultBox={firstKnownKey === "marketCompleteMatch"}
                    />
                  )}
              </Masonry>
            </Box>
            {matchesMobile && (
              <Box
                sx={{
                  width: { lg: "60%", xs: "100%", md: "60%" },
                  // flexDirection: "column",
                  // display: "flex",
                  // flexWrap: "wrap",
                  // paddingLeft: "5px",
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
            <Box
              sx={{
                width: { lg: "40%", xs: "100%", md: "40%" },
                flexDirection: "column",
                display: "flex",
                // paddingLeft: "5px",
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
      {!matchesMobile && (
        <Box
          sx={{
            width: { lg: "60%", xs: "100%", md: "60%" },
            // flexDirection: "column",
            // display: "flex",
            // flexWrap: "wrap",
            // paddingLeft: "5px",
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
