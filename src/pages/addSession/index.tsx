import { Box, Grid, Paper } from "@mui/material";
import SessionResult from "../../components/addSession/SessionResult/SessionResult";
import SessionInputFields from "../../components/addSession/AddSession/SessionAddComponent";
import DailogModal from "../../components/helper/DailogModal";
import BetsList from "../../components/addSession/BetList";
import { useLocation, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import {
  getPlacedBets,
  getSessionById,
  getSessionProfitLoss,
  sessionSuccessReset,
} from "../../store/actions/addSession";
import { getMatchListSessionProfitLoss } from "../../store/actions/match/matchAction";
import { socketService } from "../../socketManager";

const AddSession = () => {
  const { state } = useLocation();
  const { id } = useParams();
  const { sessionById, getSessionSuccess } = useSelector(
    (state: RootState) => state.addSession
  );
  const dispatch: AppDispatch = useDispatch();
  const { placedBets } = useSelector((state: RootState) => state.addSession);
  const { sessionProLoss } = useSelector((state: RootState) => state.matchList);

  useEffect(() => {
    try {
      if (id && state?.match?.id) {
        dispatch(
          getSessionById({
            matchId: state?.match?.id,
            id: id,
          })
        );
      }
      if (state?.match?.id) {
        dispatch(getMatchListSessionProfitLoss(state?.match?.id));
      }
    } catch (e) {
      console.log(e);
    }
  }, [id]);

  useEffect(() => {
    if (getSessionSuccess) {
      if (!sessionById?.result) {
        dispatch(getSessionProfitLoss(id));
        dispatch(getPlacedBets(id));
      }
      dispatch(sessionSuccessReset());
    }
  }, [getSessionSuccess, id]);

  const getSessionProLoss = (event: any) => {
    if (state?.match?.id === event?.matchId) {
      dispatch(getMatchListSessionProfitLoss(state?.match?.id));
    }
  };

  useEffect(() => {
    socketService.user.sessionResultDeclared(getSessionProLoss);
    return () => {
      socketService.user.sessionResultDeclaredOff(getSessionProLoss);
    };
  }, [state?.match?.id]);

  return (
    <Box>
      <Grid container >
        <Grid item xs={12} md={12} lg={6}>
          <Paper style={{ margin: "4px" }}>
            <SessionInputFields
              createSession={state?.createSession}
              sessionEvent={state?.sessionEvent}
              match={state?.match}
            />
          </Paper>
          <Paper style={{ margin: "4px" }}>
            <SessionResult
              sessionProLoss={sessionProLoss}
              matchId={state?.match}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} md={12} lg={6}>
          <Paper style={{ margin: "4px" }}>
            {true && (
              <BetsList
                sessionEvent={sessionById && sessionById}
                betData={placedBets && placedBets.length > 0 ? placedBets : []}
              />
            )}
          </Paper>
        </Grid>
      </Grid>
      <DailogModal />
    </Box>
  );
};

export default AddSession;
