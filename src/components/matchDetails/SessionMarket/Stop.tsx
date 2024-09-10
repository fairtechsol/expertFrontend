import { Box, Typography } from "@mui/material";
import { BroadCast_ } from "../../../assets";

const Stop = ({ color, onClick, height }: any) => {
  return (
    <>
      <Box
        onClick={onClick}
        sx={{
          width: { lg: "4vw", xs: "11vw" },
          display: "flex",
          marginRight: "10px",
          justifyContent: "space-between",
          paddingX: 1,
          alignItems: "center",
          height: height ? height : "30px",
          background: "#FF4D4D",
          borderRadius: "3px",
          cursor: "pointer",
        }}
      >
        <Typography
          sx={{
            fontSize: { lg: "10px", xs: "9px" },
            fontWeight: "600",
            color: color ? "white" : "white",
          }}
        >
          Stop
        </Typography>
        <img
          src={BroadCast_}
          style={{ height: "10px", width: "15px", backgroundSize: "contains" }}
        />
      </Box>
    </>
  );
};
export default Stop;
