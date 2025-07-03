import { Box, useMediaQuery } from "@mui/material";
import { Fragment, memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { handleMarketSorting } from "../../components/helper";
import Loader from "../../components/Loader";
import BetList from "../../components/matchDetails/BetList";
import TournamentMarket from "../../components/matchDetails/TournamentMarkets";
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
  updateSessionProLoss,
} from "../../store/actions/addMatch/addMatchAction";
import {
  resetPlacedBetsMatch,
  setCurrentOdd,
  updateApiSessionById,
} from "../../store/actions/addSession";
import {
  addStatusBetByBetId,
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
  updateTeamRatesOnUndeclare,
} from "../../store/actions/match/matchAction";
import { AppDispatch, RootState } from "../../store/store";
import theme from "../../theme";
import { marketArray } from "../../utils/Constants";

const MatchMarketDetail = () => {
  const { id }: any = useParams();
  const [searchParams] = useSearchParams();
  const mid = searchParams.get("mid");

  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const desktop = useMediaQuery(theme.breakpoints.up("sm"));

  useEffect(() => {
    if (mid) {
      matchService.connect([id]);
    }
    return () => {
      matchService.disconnect();
    };
  }, [id, mid]);

  const { matchDetail, loading, success } = useSelector(
    (state: RootState) => state.addMatch.addMatch
  );
  const { placedBetsMatch } = useSelector(
    (state: RootState) => state.matchList
  );

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
      if (event?.matchId !== id) return;

      if (event?.isMatchDeclare) {
        navigate("/expert/match");
      } else {
        dispatch(updateResultStatusOfMatch(event));
        dispatch(getPlacedBetsMatch(id));
      }
    } catch (e) {
      console.log(e);
    }
  };
  const resultUnDeclared = (event: any) => {
    try {
      if (event?.matchId === id) {
        if (event?.betType) {
          dispatch(updateResultStatusOfMatch(event));
          dispatch(updateTeamRatesOnUndeclare(event));
        } else {
          dispatch(getMatchDetail(`${id}?isSessionAllowed=false`));
        }
        dispatch(getPlacedBetsMatch(id));
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
  const updateDeleteBetReason = (event: any) => {
    try {
      if (event?.matchId === id) {
        dispatch(updateDeletedBetReasonOnEdit(event));
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

  const updateMatchBetPlaced = (event: any) => {
    try {
      if (event?.jobData?.newBet?.matchId === id) {
        dispatch(updateTeamRates(event));
        dispatch(updateMatchBetsPlace(event));
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
      if (id) {
        dispatch(getSessionProfitLossMatchDetailReset());
        dispatch(getMatchDetail(`${id}?isSessionAllowed=false`));
        dispatch(getPlacedBetsMatch(id));
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
        socketService.user.matchDeleteBetOff();
        socketService.user.sessionDeleteBetOff();
        socketService.user.sessionAddedOff();
        socketService.user.userMatchBetPlacedOff();
        socketService.user.userSessionBetPlacedOff();
        socketService.user.sessionResultDeclaredOff();
        socketService.user.updateInResultDeclareOff();
        socketService.user.updateDeleteReasonOff();
        socketService.user.matchResultDeclareAllUserOff();
        expertSocketService.match.joinMatchRoom(id);
        expertSocketService.match.getMatchRates(id, (event: any) => {
          updateMatchDetailToRedux(event);
        });
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
          expertSocketService.match.getMatchRatesOff(id);
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
            dispatch(getPlacedBetsMatch(id));
            expertSocketService.match.joinMatchRoom(id);
            expertSocketService.match.getMatchRates(id, (event: any) => {
              updateMatchDetailToRedux(event);
            });
          }
        } else if (document.visibilityState === "hidden") {
          if (id) {
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

  const component =
    matchDetail?.tournament
      ?.filter((item: any) => item?.name !== "HT/FT")
      ?.map((market: any, index: number) => ({
        component:
          market?.activeStatus !== "close" ? (
            <TournamentMarket
              key={index}
              liveData={market}
              currentMatch={matchDetail}
              title={market?.name}
              firstKnownKey={firstKnownKey}
            />
          ) : null,
        result: matchDetail?.otherBettings?.[market?.id]
          ? market?.activeStatus === "result"
            ? "declared"
            : "pending"
          : "",
      })) || [];

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
        <Loader />
      ) : (
        <>
          {!desktop ? (
            <Box
              sx={{
                width: "100%",
                marginTop: { xs: "10px", lg: "0" },
                display: "flex",
                flexDirection: "column",
                gap: "5px",
              }}
            >
              {component
                ?.sort(handleMarketSorting)
                ?.map((item: any, index: number) => {
                  return <Fragment key={index}>{item?.component}</Fragment>;
                })}
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
                {component
                  ?.filter((_: any, index: any) => index % 2 == 0)
                  ?.sort(handleMarketSorting)
                  ?.map((item: any, index: number) => {
                    return <Fragment key={index}>{item?.component}</Fragment>;
                  })}
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
                {component
                  ?.filter((_: any, index: any) => index % 2 != 0)
                  ?.sort(handleMarketSorting)
                  ?.map((item: any, index: number) => {
                    return <Fragment key={index}>{item?.component}</Fragment>;
                  })}
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
              <BetList
                allBetRates={Array.from(new Set(placedBetsMatch))}
                tag={true}
                isMatchDeclare={true}
              />
            )}
          </Box>
        </>
      )}
    </Box>
  );
};

export default memo(MatchMarketDetail);
