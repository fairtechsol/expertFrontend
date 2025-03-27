import { Box, Grid, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import SessionInputFields from "../../components/addSession/AddSession/SessionAddComponent";
import BetsList from "../../components/addSession/BetList";
import SessionResult from "../../components/addSession/SessionResult/SessionResult";
import DailogModal from "../../components/helper/DailogModal";
import { socket, socketService } from "../../socketManager";
import { getMatchDetail } from "../../store/actions/addMatch/addMatchAction";
import {
  getPlacedBets,
  getSessionById,
  getSessionProfitLoss,
  sessionSuccessReset,
} from "../../store/actions/addSession";
import { getMatchListSessionProfitLoss } from "../../store/actions/match/matchAction";
import { AppDispatch, RootState } from "../../store/store";

const AddSession = () => {
  const { state } = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();
  const [mode, setMode] = useState("0");
  const { sessionById, getSessionSuccess } = useSelector(
    (state: RootState) => state.addSession
  );
  const dispatch: AppDispatch = useDispatch();
  const { placedBets } = useSelector((state: RootState) => state.addSession);
  const { sessionProLoss } = useSelector((state: RootState) => state.matchList);
  const { matchDetail } = useSelector(
    (state: RootState) => state.addMatch.addMatch
  );

  const resultDeclared = (event: any) => {
    try {
      if (event?.matchId === state?.match?.id) {
        navigate("/expert/match");
      }
    } catch (e) {
      console.log(e);
    }
  };

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
    try {
      if (matchDetail) {
        if (matchDetail?.stopAt) {
          navigate("/expert/match");
        }
      }
    } catch (error) {
      console.error(error);
    }
  }, [matchDetail]);

  useEffect(() => {
    try {
      if (state?.createSession) {
        if (state?.match?.id) {
          dispatch(getMatchDetail(state?.match?.id));
        }
      }
      if (getSessionSuccess) {
        if (!sessionById?.result) {
          dispatch(getSessionProfitLoss(id));
          dispatch(getPlacedBets({ betId: id }));
        }
        dispatch(sessionSuccessReset());
      }
    } catch (error) {
      console.error(error);
    }
  }, [getSessionSuccess, id]);

  useEffect(() => {
    if (state?.createSession) {
      setMode("0");
    }
  }, [state?.createSession]);

  useEffect(() => {
    try {
      if (socket) {
        socketService.user.matchResultDeclared(resultDeclared);
        return () => {
          socketService.user.matchResultDeclaredOff();
        };
      }
    } catch (error) {
      console.error(error);
    }
  }, [socket]);

  useEffect(() => {
    try {
      const handleVisibilityChange = () => {
        if (document.visibilityState === "visible") {
          if (state?.match?.id) {
            dispatch(getMatchDetail(state?.match?.id));
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

  return (
    <Box>
      <Grid container>
        <Grid item xs={12} sm={6} md={6} lg={6}>
          <Paper style={{ margin: "4px" }}>
            <SessionInputFields
              createSession={state?.createSession}
              match={state?.match}
              setMode={setMode}
            />
          </Paper>
          <Paper style={{ margin: "4px" }}>
            <SessionResult
              setMode={setMode}
              mode={mode}
              sessionProLoss={sessionProLoss}
              matchId={state?.match}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={6}>
          <Paper style={{ margin: "4px" }}>
            <BetsList
              sessionEvent={sessionById && sessionById}
              betData={placedBets && placedBets.length > 0 ? placedBets : []}
            />
          </Paper>
        </Grid>
      </Grid>
      <DailogModal />
    </Box>
  );
};

export default AddSession;
