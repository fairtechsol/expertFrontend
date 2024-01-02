import { Box, Typography } from "@mui/material";
import EditBookmaker from "./EditBookmaker";
import { getBookmakerById } from "../../../store/actions/addSession";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store/store";
import { useEffect } from "react";

interface Props {
  add: boolean;
  match: any;
  bookmakerId: string;
  type: string;
}

const BookmakerEditSection = ({ add, match, bookmakerId, type }: Props) => {
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    if (bookmakerId) {
      dispatch(
        getBookmakerById({
          matchId: match?.id,
          id: bookmakerId,
          type: type,
        })
      );
    }
  }, [bookmakerId]);

  return (
    <Box
      sx={{
        flex: 1,
        background: "#0B4F26",
        borderRadius: "5px",
        position: "relative",
        minHeight: "300px",
        py: "20px",
        px: "10px",
        pt: "5px",
      }}
    >
      {!add && (
        <Box
          sx={{
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.5)",
            position: "absolute",
            left: "0px",
            top: 0,
            zIndex: 1,
          }}
        ></Box>
      )}
      <Typography
        sx={{
          color: "white",
          fontSize: "20px",
          fontWeight: "600",
          zIndex: 2,
          position: "relative",
        }}
      >
        {match?.title}
      </Typography>
      <Box sx={{ display: "flex", marginTop: "2px", flexDirection: "column" }}>
        <Box
          sx={{
            flex: 1,
            justifyContent: "space-between",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <EditBookmaker add={add} match={match} bookmakerId={bookmakerId} />
        </Box>
      </Box>
    </Box>
  );
};

export default BookmakerEditSection;
