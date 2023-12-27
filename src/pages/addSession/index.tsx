import { Box, Grid, Paper } from "@mui/material";
import SessionResult from "../../components/addSession/SessionResult/SessionResult";
import SessionInputFields from "../../components/addSession/AddSession/SessionAddComponent";
import DailogModal from "../../components/helper/DailogModal";
import BetsList from "../../components/addSession/BetList";
import { useRef } from "react";
import { useLocation } from "react-router-dom";

const AddSession = () => {
  const childRef = useRef(null);
  const { state } = useLocation();
  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Paper style={{ margin: "10px" }}>
            <SessionInputFields
              createSession={state?.createSession}
              sessionEvent={state?.sessionEvent}
              match={state?.match}
              ref={childRef}
            />
          </Paper>
          <Paper style={{ margin: "10px" }}>
            <SessionResult />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper style={{ margin: "10px" }}>
            {true && <BetsList betData={[]} />}
          </Paper>
        </Grid>
      </Grid>
      <DailogModal />
    </Box>
  );
};

export default AddSession;
