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
      if (id) {
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
  }, [getSessionSuccess]);

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Paper style={{ margin: "10px" }}>
            <SessionInputFields
              createSession={state?.createSession}
              sessionEvent={state?.sessionEvent}
              match={state?.match}
            />
          </Paper>
          <Paper style={{ margin: "10px" }}>
            <SessionResult
              sessionProLoss={sessionProLoss}
              matchId={state?.match}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper style={{ margin: "10px" }}>
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
