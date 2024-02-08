import { Box, Grid, Paper } from "@mui/material";
import BetsList from "../../components/updateBookmaker/BetsList";
import { useLocation, useNavigate } from "react-router-dom";
import BookmakerEditSection from "../../components/updateBookmaker/BookmakerEdit";
import { useEffect } from "react";
import {
  getBookmakerById,
  getPlacedBets,
} from "../../store/actions/addSession";
import { AppDispatch, RootState } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { socketService } from "../../socketManager";

const UpdateBookmaker = () => {
  const { state }: any = useLocation();
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const { placedBets } = useSelector((state: RootState) => state.addSession);

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
    if (state?.id) {
      dispatch(
        getBookmakerById({
          matchId: state?.match?.id,
          id: state?.id,
          type: state?.type,
        })
      );
      dispatch(getPlacedBets(state?.id));
      socketService.user.matchResultDeclared(resultDeclared);
    }
  }, [state?.id]);

  return (
    <Box display="flex">
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Paper style={{ margin: "10px" }}>
            <BookmakerEditSection
              add={true}
              match={state?.match}
              bookmakerId={state?.id}
              type={state?.type}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper style={{ margin: "10px" }}>
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
