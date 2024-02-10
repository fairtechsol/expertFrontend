import { Box, Grid, Paper } from "@mui/material";
import SessionResult from "../../components/addSession/SessionResult/SessionResult";
import SessionInputFields from "../../components/addSession/AddSession/SessionAddComponent";
import DailogModal from "../../components/helper/DailogModal";
import BetsList from "../../components/addSession/BetList";
import { useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import {
  getPlacedBets,
  getSessionById,
  getSessionProfitLoss,
} from "../../store/actions/addSession";
import { getMatchListSessionProfitLoss } from "../../store/actions/match/matchAction";

const AddSession = () => {
  const { state } = useLocation();
  const childRef = useRef<any>(null);
  const { selectedSessionId } = useSelector(
    (state: RootState) => state.addSession
  );
  const dispatch: AppDispatch = useDispatch();
  const [betId, setBetId] = useState("");
  const { placedBets } = useSelector((state: RootState) => state.addSession);
  const { sessionProLoss } = useSelector((state: RootState) => state.matchList);
  // const [betId, setBetId] = useState("");

  const handleSession = (item: any) => {
    // setBetId(item?.betId?.id);
    if (childRef.current) {
      childRef.current.childFunction(item);
    }
  };

  useEffect(() => {
    try {
      if (!state?.createSession) {
        dispatch(
          getSessionById({
            matchId: state?.match?.id,
            id: state?.betId || selectedSessionId,
          })
        );
        dispatch(getSessionProfitLoss(state?.betId || selectedSessionId));
        dispatch(getPlacedBets(state?.betId));
        setBetId(state?.betId || selectedSessionId);
      } else if (state?.createSession) {
        setBetId("");
      }
      if (state?.match?.id) {
        dispatch(getMatchListSessionProfitLoss(state?.match?.id));
      }
    } catch (e) {
      console.log(e);
    }
  }, [state]);

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
              sessionEvent={state?.sessionEvent}
              sessionProLoss={sessionProLoss}
              handleSession={handleSession}
              matchId={state?.match?.id}
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
