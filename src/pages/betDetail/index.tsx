import { Box } from "@mui/material";
import { memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../components/Loader";
import BetList from "../../components/matchDetails/BetList/ViewBet";
import {
  expertSocketService,
  matchSocket,
  socket,
  socketService,
} from "../../socketManager";
import { matchSocketService } from "../../socketManager/matchSocket";
import { resetPlacedBetsMatch } from "../../store/actions/addSession";
import {
  addStatusBetByBetId,
  getPlacedBetsMatch,
  getSessionProfitLossMatchDetailReset,
  updateDeletedBetReasonOnEdit,
  updateMatchBetsPlace,
  updateMatchBetsReason,
  updateSessionBetsPlace,
} from "../../store/actions/match/matchAction";
import { AppDispatch, RootState } from "../../store/store";

const MatchMarketDetail = () => {
  const state: any = useParams();
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const { placedBetsMatch, loading, success } = useSelector(
    (state: RootState) => state.matchList
  );

  const resultDeclared = (event: any) => {
    try {
      if (event?.matchId === state?.id && event?.isMatchDeclare) {
        navigate("/expert/match");
      } else if (event?.matchId === state?.id) {
        dispatch(getPlacedBetsMatch(state?.id));
      }
    } catch (e) {
      console.log(e);
    }
  };
  const resultUnDeclared = (event: any) => {
    try {
      if (event?.matchId === state?.id) {
        dispatch(getPlacedBetsMatch(state?.id));
      }
    } catch (e) {
      console.log(e);
    }
  };

  const matchDeleteBet = (event: any) => {
    try {
      if (event?.matchId === state?.id) {
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

  const updateSessionResultDeclared = (event: any) => {
    try {
      if (state?.id === event?.matchId) {
        dispatch(addStatusBetByBetId(event));
      }
    } catch (e) {
      console.log(e);
    }
  };

  const updateMatchBetPlaced = (event: any) => {
    try {
      if (event?.jobData?.newBet?.matchId === state?.id) {
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
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleSocketConnection = () => {
    if (state?.id) {
      expertSocketService.match.joinMatchRoom(state?.id);
    }
  };

  useEffect(() => {
    try {
      if (state?.id) {
        dispatch(getSessionProfitLossMatchDetailReset());
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
        socketService.user.sessionAddedOff();
        socketService.user.userMatchBetPlacedOff();
        socketService.user.userSessionBetPlacedOff();
        socketService.user.sessionResultDeclaredOff();
        socketService.user.updateDeleteReasonOff();
        socketService.user.matchResultDeclareAllUserOff();
        socketService.user.matchResultDeclared(resultDeclared);
        socketService.user.matchResultDeclareAllUser(resultDeclared);
        socketService.user.matchResultUnDeclared(resultUnDeclared);
        socketService.user.matchDeleteBet(matchDeleteBet);
        socketService.user.sessionDeleteBet(matchDeleteBet);
        socketService.user.userMatchBetPlaced(updateMatchBetPlaced);
        socketService.user.userSessionBetPlaced(updateSessionBetPlaced);
        socketService.user.sessionResultDeclared(updateSessionResultDeclared);
        socketService.user.updateDeleteReason(updateDeleteBetReason);
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
          socketService.user.matchResultDeclaredOff();
          socketService.user.matchResultUnDeclaredOff();
          socketService.user.matchDeleteBetOff();
          socketService.user.sessionDeleteBetOff();
          socketService.user.sessionAddedOff();
          socketService.user.userMatchBetPlacedOff();
          socketService.user.userSessionBetPlacedOff();
          socketService.user.sessionResultDeclaredOff();
          socketService.user.updateDeleteReasonOff();
          socketService.user.matchResultDeclareAllUserOff();
          expertSocketService.match.onConnectOff();
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
        <Box
          sx={{
            width: { lg: "100%", xs: "100%", md: "100%" },
            flexDirection: "column",
            display: "flex",
            marginTop: { xs: "10px", lg: "0" },
          }}
        >
          <BetList
            allBetRates={Array.from(new Set(placedBetsMatch))}
            tag={true}
            isMatchDeclare={true}
          />
        </Box>
      )}
    </Box>
  );
};

export default memo(MatchMarketDetail);
