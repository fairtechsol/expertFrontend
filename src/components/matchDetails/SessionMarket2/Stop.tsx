import { Box, Typography } from "@mui/material";
import { memo } from "react";
import { BroadCast_ } from "../../../assets";
const Stop = ({ color, onClick }: any) => {
  return (
    <Box
      onClick={onClick}
      sx={{
        width: { lg: "90px", xs: "17vw" },
        display: "flex",
        marginRight: "10px",
        justifyContent: "space-between",
        paddingX: 1,
        alignItems: "center",
        height: "30px",
        background: "#FF4D4D",
        borderRadius: "3px",
        cursor: "pointer",
      }}
    >
      <Typography
        sx={{
          fontSize: { lg: "11px", xs: "10px" },
          fontWeight: "600",
          color: color ? "white" : "white",
        }}
      >
        Stop
      </Typography>
      <img
        src={BroadCast_}
        alt="stop"
        style={{ height: "15px", width: "20px", backgroundSize: "contains" }}
      />
    </Box>
  );
};
export default memo(Stop);
