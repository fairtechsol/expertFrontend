import { Box, Grid, Paper } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import BetsList from "../../components/updateBookmaker/BetsList";
import BookmakerEditSection from "../../components/updateBookmaker/BookmakerEdit";
import { socket, socketService } from "../../socketManager";
import {
  geTournamentBetting,
  updateTeamRatesOnManualTournamentMarket,
} from "../../store/actions/addMatch/addMatchAction";
import {
  getPlacedBets,
  updateDeleteReason,
  updateDeleteReasonOnEdit,
  updateMarketMinMaxLimitOnQuickMaker,
  updateMatchBetsPlaced,
  updateRatesBook,
} from "../../store/actions/addSession";
import { AppDispatch, RootState } from "../../store/store";

const UpdateBookmaker = () => {
  const { state }: any = useLocation();
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const { placedBets } = useSelector((state: RootState) => state.addSession);
  const { tournament } = useSelector(
    (states: RootState) => states.addMatch.addMatch
  );
  const { maxLimitSuccess } = useSelector(
    (states: RootState) => states.addMatch.addMatch
  );
  const updateBetList = (event: any) => {
    try {
      if (state?.matchId === event?.jobData?.newBet?.matchId) {
        dispatch(updateTeamRatesOnManualTournamentMarket(event));
        if (state?.betId === event?.jobData?.newBet?.betId ||
          state?.betId == event?.jobData?.newBet?.childBetId) {
          dispatch(updateMatchBetsPlaced(event));
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const resultDeclared = (event: any) => {
    try {
      if (event?.matchId === state?.matchId) {
        navigate("/expert/match");
      }
    } catch (e) {
      console.log(e);
    }
  };
  const matchDeleteBet = (event: any) => {
    try {
      if (event?.matchId === state?.matchId) {
        dispatch(updateRatesBook(event));
        if (
          event?.betId === state?.betId ||
          event?.betId == tournament?.matchBetting?.parentBetId
        ) {
          dispatch(updateDeleteReason(event));
        }
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
      if (event?.matchId === state?.matchId) {
        dispatch(updateDeleteReasonOnEdit(event));
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleMinMaxLimitChange = (event: any) => {
    if (event?.matchId === state?.matchId) {
      dispatch(updateMarketMinMaxLimitOnQuickMaker(event));
    }
    try {
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    try {
      if (state?.betId) {
        dispatch(
          geTournamentBetting({ matchId: state?.matchId, betId: state?.betId })
        );
        dispatch(getPlacedBets({ parentBetId: state?.betId }));
      } else {
        navigate("/expert/match");
      }
    } catch (error) {
      console.error(error);
    }
  }, [state?.betId]);

  useEffect(() => {
    if (socket) {
      socketService.user.userMatchBetPlacedOff();
      socketService.user.matchResultDeclaredOff();
      socketService.user.matchDeleteBetOff();
      socketService.user.updateDeleteReasonOff();
      socketService.user.matchBettingMinMaxChangeOff();
      socketService.user.userMatchBetPlaced(updateBetList);
      socketService.user.matchResultDeclared(resultDeclared);
      socketService.user.matchDeleteBet(matchDeleteBet);
      socketService.user.updateDeleteReason(updateDeleteBetReason);
      socketService.user.matchBettingMinMaxChange(handleMinMaxLimitChange);
      return () => {
        socketService.user.userMatchBetPlacedOff();
        socketService.user.matchResultDeclaredOff();
        socketService.user.matchDeleteBetOff();
        socketService.user.updateDeleteReasonOff();
        socketService.user.matchBettingMinMaxChangeOff();
      };
    }
  }, [socket, state?.betId]);

  useEffect(() => {
    try {
      if (maxLimitSuccess) {
        dispatch(
          geTournamentBetting({ matchId: state?.matchId, betId: state?.betId })
        );
      }
    } catch (error) {
      console.error(error);
    }
  }, [maxLimitSuccess]);

  return (
    <Box display="flex">
      <Grid container>
        <Grid item xs={12} md={12} lg={6}>
          <Paper style={{ margin: "2px" }}>
            <BookmakerEditSection
              add={true}
              match={tournament?.match}
              bookmakerId={state?.betId}
              runners={tournament?.runners}
              matchBetting={tournament?.matchBetting}
              teamRates={tournament?.teamRates}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} md={12} lg={6}>
          <Paper style={{ margin: "2px" }}>
            <BetsList
              betData={placedBets && placedBets.length > 0 ? placedBets : []}
              name={tournament?.matchBetting?.name}
            />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default UpdateBookmaker;
