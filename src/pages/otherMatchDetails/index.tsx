import { Box, useMediaQuery, useTheme } from "@mui/material";
import { Fragment, memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { handleMarketSorting } from "../../components/helper";
import Loader from "../../components/Loader";
import BetList from "../../components/matchDetails/BetList";
import TournamentMarket from "../../components/matchDetails/TournamentMarkets";
import HTFTMarket from "../../components/matchDetails/TournamentMarkets/HTFTMarket";
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
  updateMatchRates,
  updateRates,
} from "../../store/actions/addMatch/addMatchAction";
import { resetPlacedBetsMatch } from "../../store/actions/addSession";
import {
  getPlacedBetsMatch,
  getSessionProfitLossMatchDetailReset,
  updateDeletedBetReasonOnEdit,
  updateMatchBetsPlace,
  updateMatchBetsReason,
  updateResultBoxStatus,
  updateResultStatusOfMatch,
  updateTeamRates,
} from "../../store/actions/match/matchAction";
import { AppDispatch, RootState } from "../../store/store";
import { marketArray } from "../../utils/Constants";

const OtherMatchDetails = () => {
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

  const matchDeleteBet = (event: any) => {
    try {
      if (event?.matchId === state?.id) {
        dispatch(updateRates(event));
        dispatch(updateMatchBetsReason(event));
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

  const handleSocketConnection = () => {
    if (state?.id) {
      expertSocketService.match.joinMatchRoom(state?.id);
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
        socketService.user.matchResultDeclaredOff();
        socketService.user.matchResultUnDeclaredOff();
        socketService.user.matchDeleteBetOff();
        socketService.user.sessionDeleteBetOff();
        socketService.user.userMatchBetPlacedOff();
        socketService.user.updateInResultDeclareOff();
        socketService.user.updateDeleteReasonOff();
        socketService.user.matchResultDeclareAllUserOff();
        socketService.user.matchResultUnDeclareAllUserOff();
        expertSocketService.match.joinMatchRoom(state?.id);
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
        expertSocketService.match.onConnect(handleSocketConnection);
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
          expertSocketService.match.getMatchRatesOff(state?.id);
          socketService.user.matchResultDeclaredOff();
          socketService.user.matchResultUnDeclaredOff();
          socketService.user.matchDeleteBetOff();
          socketService.user.userMatchBetPlacedOff();
          socketService.user.updateInResultDeclareOff();
          socketService.user.updateDeleteReasonOff();
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

  useEffect(() => {
    try {
      const handleVisibilityChange = () => {
        if (document.visibilityState === "visible") {
          if (state?.id) {
            dispatch(getPlacedBetsMatch(state?.id));
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

  const component =
    matchDetail?.tournament
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
      })) || [];

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
          <Loader />
        ) : (
          <>
            <Box
              sx={{
                width: { lg: "25%", xs: "100%", md: "30%", sm: "30%" },
                marginTop: { xs: "10px", lg: "0" },
                display: "flex",
                flexDirection: "column",
                gap: "5px",
              }}
            >
              {component
                ?.sort(handleMarketSorting)
                ?.filter((_: any, index: any) => index % 2 == 0)
                ?.map((item: any, index: number) => {
                  return <Fragment key={index}>{item?.component}</Fragment>;
                })}
            </Box>
            <Box
              sx={{
                width: { lg: "25%", xs: "100%", md: "30%", sm: "30%" },
                marginTop: { xs: "10px", lg: "0" },
                display: "flex",
                flexDirection: "column",
                gap: "5px",
              }}
            >
              {component
                ?.sort(handleMarketSorting)
                ?.filter((_: any, index: any) => index % 2 != 0)
                ?.map((item: any, index: number) => {
                  return <Fragment key={index}>{item?.component}</Fragment>;
                })}
            </Box>

            {matchesMobile && (
              <Box
                sx={{
                  width: { lg: "50%", xs: "100%", md: "60%", sm: "60%" },
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
                width: { lg: "50%", xs: "100%", md: "40%", sm: "40%" },
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
      {!matchesMobile && (
        <Box
          sx={{
            width: { lg: "50%", xs: "100%", md: "60%", sm: "60%" },
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
