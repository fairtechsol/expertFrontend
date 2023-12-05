import { Box, Grid, Paper } from "@mui/material";
import BetsList from "../../components/updateBookmaker/BetsList";
import { useLocation } from "react-router-dom";
import BookmakerEditSection from "../../components/updateBookmaker/BookmakerEditSection";

const UpdateBookmaker = () => {
  const location: any = useLocation();
  return (
    <Box display="flex">
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Paper style={{ margin: "10px" }}>
            <BookmakerEditSection
              add={true}
              match={location?.state?.match}
              Bid={location?.state?.id}
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
