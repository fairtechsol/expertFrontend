import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { BroadCast_ } from "../../../assets";

const Stop = ({ color, onClick, height }: any) => {
  const theme = useTheme();
  const matchesMobile = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <>
      <Box
        onClick={onClick}
        sx={{
          width: { lg: "4vw", xs: "4vw" },
          display: "flex",
          marginRight: "10px",
          justifyContent: !matchesMobile ? "space-between" : "center",
          paddingX: !matchesMobile ? 1 : 0,
          alignItems: "center",
          height: height ? height : "30px",
          background: "#FF4D4D",
          borderRadius: "3px",
          cursor: "pointer",
        }}
      >
        {!matchesMobile && (
          <Typography
            sx={{
              fontSize: { lg: "10px", xs: "8px" },
              fontWeight: "600",
              color: color ? "white" : "white",
            }}
          >
            Stop
          </Typography>
        )}
        <img
          src={BroadCast_}
          style={{ height: "10px", width: "15px", backgroundSize: "contains" }}
        />
      </Box>
    </>
  );
};
export default Stop;
