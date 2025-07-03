import { Box, Typography } from "@mui/material";
import moment from "moment";
import { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import Loader from "../../components/Loader";
import BetList from "../../components/raceDetails/BetList";
import MatchOdds from "../../components/raceDetails/MatchOdds";
import { getTimeLeft } from "../../helpers";
import {
  expertSocketService,
  matchService,
  socket,
  socketService,
} from "../../socketManager";
import {
  updateRaceRates,
  updateSessionProLoss,
} from "../../store/actions/addMatch/addMatchAction";
import {
  getPlacedBetsMatch,
  getRaceMatch,
  getSessionProfitLossMatchDetailReset,
  updateDeletedBetReasonOnEdit,
  updateMatchBetsPlace,
  updateMatchBetsReason,
  updateResultStatusOfrace,
  updateTeamRatesForHorseRacing,
  updateTeamRatesForHorseRacingOnDelete,
} from "../../store/actions/match/matchAction";
import { AppDispatch, RootState } from "../../store/store";

const RaceDetails = () => {
  const { id }: any = useParams();
  const [searchParams] = useSearchParams();
  const mid = searchParams.get("mid");

  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const [timeLeft, setTimeLeft] = useState<any>({
    days: 0,
    hours: 0,
    minutes: 0,
  });
  const { loading } = useSelector(
    (state: RootState) => state.addMatch.addMatch
  );
  const { placedBetsMatch } = useSelector(
    (state: RootState) => state.matchList
  );
  const { raceDetail, success } = useSelector(
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
        dispatch(updateRaceRates(event));
      } else return;
    } catch (e) {
      console.log(e);
    }
  };

  const resultDeclared = (event: any) => {
    try {
      if (event?.matchId === id) {
        navigate(
          `/expert/race/${
            raceDetail?.matchType
              ? raceDetail?.matchType === "greyhoundRacing"
                ? "greyHound"
                : raceDetail?.matchType
              : "horseRacing"
          }`
        );
      }
    } catch (e) {
      console.log(e);
    }
  };
  const resultUnDeclared = (event: any) => {
    try {
      if (event?.matchId === id) {
        dispatch(getRaceMatch(id));
        dispatch(getPlacedBetsMatch(id));
      }
    } catch (e) {
      console.log(e);
    }
  };

  const matchDeleteBet = (event: any) => {
    try {
      if (event?.matchId === id) {
        dispatch(updateTeamRatesForHorseRacingOnDelete(event));
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
  const updateMatchBetPlaced = (event: any) => {
    try {
      if (event?.jobData?.newBet?.matchId === id) {
        dispatch(updateTeamRatesForHorseRacing(event));
        dispatch(updateMatchBetsPlace(event));
      }
    } catch (e) {
      console.log(e);
    }
  };

  const updateSessionResultStatus = (event: any) => {
    try {
      if (event?.matchId === id) {
        dispatch(updateResultStatusOfrace(event));
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    try {
      if (id) {
        dispatch(getSessionProfitLossMatchDetailReset());
        dispatch(getRaceMatch(id));
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
        // socketService.user.matchBettingStatusChangeOff();
        socketService.user.matchResultDeclaredOff();
        socketService.user.matchResultUnDeclaredOff();
        socketService.user.matchDeleteBetOff();
        socketService.user.userMatchBetPlacedOff();
        socketService.user.updateInResultDeclareOff();
        socketService.user.updateDeleteReasonOff();
        expertSocketService.match.joinMatchRoom(id);
        expertSocketService.match.getMatchRates(id, (event: any) => {
          updateMatchDetailToRedux(event);
        });
        // socketService.user.matchBettingStatusChange(updateBettingStatus);
        socketService.user.matchResultDeclared(resultDeclared);
        socketService.user.matchResultUnDeclared(resultUnDeclared);
        socketService.user.matchDeleteBet(matchDeleteBet);
        socketService.user.userMatchBetPlaced(updateMatchBetPlaced);
        socketService.user.updateInResultDeclare(updateSessionResultStatus);
        socketService.user.updateDeleteReason(updateDeleteBetReason);
      }
    } catch (e) {
      console.log(e);
    }
  }, [success, socket]);

  useEffect(() => {
    try {
      return () => {
        expertSocketService.match.getMatchRatesOff(id);
        socketService.user.matchResultDeclaredOff();
        socketService.user.matchResultUnDeclaredOff();
        socketService.user.matchDeleteBetOff();
        socketService.user.userMatchBetPlacedOff();
        socketService.user.updateInResultDeclareOff();
        socketService.user.updateDeleteReasonOff();
      };
    } catch (error) {
      console.log(error);
    }
  }, [id]);

  useEffect(() => {
    try {
      const handleVisibilityChange = () => {
        if (document.visibilityState === "visible") {
          if (id) {
            dispatch(getRaceMatch(id));
            dispatch(getPlacedBetsMatch(id));
          }
        } else if (document.visibilityState === "hidden") {
          if (id) {
            // expertSocketService.match.leaveMatchRoom(id);
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
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      let timeLeft = getTimeLeft(raceDetail?.startAt);
      setTimeLeft(timeLeft);
    }, 1000);
    return () => clearInterval(timer);
  }, [id, raceDetail]);

  return (
    <Box
      sx={{
        display: { lg: "flex" },
        alignSelf: "center",
        borderRadius: "10px",
        flexDirection: { lg: "row", xs: "column", md: "column" },
        width: "100%",
        height: {
          xs: loading ? "80vh" : "100%",
          lg: loading ? "90vh" : "100%",
        },
        padding: 1,
        gap: 1,
      }}
    >
      {loading ? (
        <Loader />
      ) : (
        <>
          <Box
            sx={{
              width: { lg: "50%", xs: "100%", md: "100%" },
              paddingLeft: "5px",
              marginTop: { xs: "10px", lg: "0" },
            }}
          >
            <Typography
              sx={{
                fontSize: "16px",
                color: "white",
                fontWeight: "700",
                alignSelf: "start",
              }}
            >
              {`${raceDetail?.countryCode} > ${raceDetail?.venue}`}
            </Typography>
            <Typography
              sx={{
                fontSize: "12px",
                color: "white",
                fontWeight: "700",
                alignSelf: "start",
              }}
            >
              {`${moment(raceDetail?.startAt).format("YYYY-MM-DD HH:mm")} | ${
                raceDetail?.title
              }`}
              {timeLeft.hours !== 0 || timeLeft.minutes !== 0
                ? timeLeft?.hours > 0
                  ? `| ${timeLeft?.hours} hours ${timeLeft?.minutes} Minutes Remaining`
                  : timeLeft?.minutes > 0
                  ? `| ${timeLeft?.minutes} Minutes Remaining`
                  : ""
                : ""}
            </Typography>
            <MatchOdds
              currentMatch={raceDetail}
              matchOddsLive={raceDetail?.matchOdd}
            />
          </Box>
          <Box
            sx={{
              width: { lg: "50%", xs: "100%", md: "100%" },
              paddingLeft: "5px",
              marginTop: { xs: "10px", lg: "0" },
            }}
          >
            {raceDetail?.id && (
              <BetList allBetRates={placedBetsMatch} tag={true} />
            )}
          </Box>
        </>
      )}
    </Box>
  );
};

export default memo(RaceDetails);
