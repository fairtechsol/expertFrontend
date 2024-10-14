import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { BroadCast_ } from "../../../assets";

const Stop = ({ color, onClick, height, title }: any) => {
  const theme = useTheme();
  const matchesMobile = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <>
      <Box
        onClick={onClick}
        sx={{
          maxWidth: { lg: "100%", xs: "100%" },
          display: "flex",
          marginRight: "5px",
          marginLeft: "2px",
          // justifyContent: !matchesMobile ? "space-between" : "center",
          paddingX: !matchesMobile ? 1 : 0,
          alignItems: "center",
          height: height ? height : "30px",
          background: "#FF4D4D",
          borderRadius: "3px",
          cursor: "pointer",
        }}
      >
        <Typography
          sx={{
            fontSize: { lg: "10px", xs: "8px" },
            fontWeight: "600",
            color: color ? "white" : "white",
            lineHeight: 1,
          }}
        >
          {title}
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
