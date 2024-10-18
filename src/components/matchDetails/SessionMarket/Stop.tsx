import {
  Box,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { BroadCast_ } from "../../../assets";

const Stop = ({ color, onClick, height, title }: any) => {
  const theme = useTheme();
  const matchesMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const limitToThreeWords = (text: any) => {
    return (
      text.split(" ").slice(0, 2).join(" ") +
      (text.split(" ").length > 3 ? "..." : "")
    );
  };
  return (
    <>
      <Box
        onClick={onClick}
        sx={{
          maxWidth: { lg: "100%", xs: "100%" },
          display: "flex",
          paddingLeft: "2px",
          paddingRight: "2px",
          alignItems: "center",
          height: height ? height : "30px",
          background: "#FF4D4D",
          borderRadius: "3px",
          cursor: "pointer",
        }}
      >
        <Tooltip title={title} arrow>
          <Typography
            sx={{
              fontSize: { lg: "10px", xs: "8px" },
              fontWeight: "600",
              color: color ? "white" : "white",
              lineHeight: 1,
            }}
          >
            {matchesMobile ? title : limitToThreeWords(title)}
          </Typography>
        </Tooltip>
        <img
          src={BroadCast_}
          style={{ height: "10px", width: "15px", backgroundSize: "contains" }}
        />
      </Box>
    </>
  );
};
export default Stop;
