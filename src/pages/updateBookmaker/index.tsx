import { Box, Grid, Paper } from "@mui/material";
import BetsList from "../../components/updateBookmaker/BetsList";
import { useLocation } from "react-router-dom";
import BookmakerEditSection from "../../components/updateBookmaker/BookmakerEdit";

const UpdateBookmaker = () => {
  const { state }: any = useLocation();
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
            <BetsList />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default UpdateBookmaker;
