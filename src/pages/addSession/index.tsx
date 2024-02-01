import { Box, Grid, Paper } from "@mui/material";
import SessionResult from "../../components/addSession/SessionResult/SessionResult";
import SessionInputFields from "../../components/addSession/AddSession/SessionAddComponent";
import DailogModal from "../../components/helper/DailogModal";
import BetsList from "../../components/addSession/BetList";
import { useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { getPlacedBets } from "../../store/actions/addSession";
import { getMatchListSessionProfitLoss } from "../../store/actions/match/matchAction";

const AddSession = () => {
  const { state } = useLocation();
  const childRef = useRef<any>(null);
  const dispatch: AppDispatch = useDispatch();
  const { placedBets } = useSelector((state: RootState) => state.addSession);
  const { sessionProLoss } = useSelector((state: RootState) => state.matchList);

  const handleSession = (item: any) => {
    debugger;
    if (childRef.current) {
      childRef.current.childFunction(item);
    }
  };

  useEffect(() => {
    if (state?.betId) {
      dispatch(getPlacedBets(state?.betId));
    }
    if (state?.match?.id) {
      dispatch(getMatchListSessionProfitLoss(state?.match?.id));
    }
  }, [state?.betId, state?.match?.id]);

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Paper style={{ margin: "10px" }}>
            <SessionInputFields
              createSession={state?.createSession}
              sessionEvent={state?.sessionEvent}
              match={state?.match}
              betId={state?.betId}
              ref={childRef}
            />
          </Paper>
          <Paper style={{ margin: "10px" }}>
            <SessionResult
              matchId={state?.match?.id}
              betId={state?.betId}
              sessionProLoss={sessionProLoss}
              createSession={state?.createSession}
              handleSession={handleSession}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper style={{ margin: "10px" }}>
            {true && (
              <BetsList
                sessionEvent={state?.sessionEvent}
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
