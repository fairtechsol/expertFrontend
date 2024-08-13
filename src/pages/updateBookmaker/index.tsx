import { Box, Grid, Paper } from "@mui/material";
import BetsList from "../../components/updateBookmaker/BetsList";
import { useLocation, useNavigate } from "react-router-dom";
import BookmakerEditSection from "../../components/updateBookmaker/BookmakerEdit";
import { useEffect } from "react";
import {
  getBookmakerById,
  getPlacedBets,
  updateDeleteReason,
  updateMatchBetsPlaced,
  updateRatesBook,
  updateTeamRatesOnManualMarket,
} from "../../store/actions/addSession";
import { AppDispatch, RootState } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { socket, socketService } from "../../socketManager";
import { updateDeletedBetReasonOnEdit } from "../../store/actions/match/matchAction";

const UpdateBookmaker = () => {
  const { state }: any = useLocation();
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const { placedBets } = useSelector((state: RootState) => state.addSession);

  const updateBetList = (event: any) => {
    try {
      if (state?.match?.id === event?.jobData?.newBet?.matchId) {
        dispatch(updateTeamRatesOnManualMarket(event));
        if (state?.id === event?.jobData?.newBet?.betId) {
          dispatch(updateMatchBetsPlaced(event));
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const resultDeclared = (event: any) => {
    try {
      if (event?.matchId === state?.match?.id) {
        navigate("/expert/match");
      }
    } catch (e) {
      console.log(e);
    }
  };
  const matchDeleteBet = (event: any) => {
    try {
      if (event?.matchId === state?.match?.id) {
        dispatch(updateRatesBook(event));
        if (event?.betId === state?.id) {
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
      if (event?.matchId === state?.id) {
        dispatch(updateDeletedBetReasonOnEdit(event));
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    try {
      if (state?.id) {
        dispatch(
          getBookmakerById({
            matchId: state?.match?.id,
            id: state?.id,
            type: state?.type,
          })
        );
        dispatch(getPlacedBets(state?.id));
      }
    } catch (error) {
      console.error(error);
    }
  }, [state?.id]);

  useEffect(() => {
    if (socket) {
      socketService.user.userMatchBetPlaced(updateBetList);
      socketService.user.matchResultDeclared(resultDeclared);
      socketService.user.matchDeleteBet(matchDeleteBet);
      socketService.user.updateDeleteReason(updateDeleteBetReason);
      return () => {
        socketService.user.userMatchBetPlacedOff();
        socketService.user.matchResultDeclaredOff();
        socketService.user.matchDeleteBetOff();
        socketService.user.updateDeleteReasonOff();
      };
    }
  }, [socket, state?.id]);

  return (
    <Box display="flex">
      <Grid container>
        <Grid item xs={12} md={12} lg={6}>
          <Paper style={{ margin: "2px" }}>
            <BookmakerEditSection
              add={true}
              match={state?.match}
              bookmakerId={state?.id}
              type={state?.type}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} md={12} lg={6}>
          <Paper style={{ margin: "2px" }}>
            <BetsList
              betData={placedBets && placedBets.length > 0 ? placedBets : []}
            />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default UpdateBookmaker;
