import { Box, Tooltip, useMediaQuery, useTheme } from "@mui/material";
import { memo } from "react";
import { BroadCast_ } from "../../../assets";

interface StopProps {
  onClick: () => void;
  height: string;
  title?: string;
  isCommissionActive?: boolean;
}

const Stop = ({ onClick, height, title, isCommissionActive }: StopProps) => {
  const theme = useTheme();
  const matchesMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const matchesMiddle = useMediaQuery(theme.breakpoints.down("md"));
  const matchesLarge = useMediaQuery(theme.breakpoints.down("lg"));
  const limitToThreeWords = (text: any) => {
    return (
      text?.split(/[ _]/).slice(0, 3).join(" ") +
      (text?.split(/[ _]/).length > 3 ? "..." : "")
    );
  };

  const displayTitle =
    limitToThreeWords(title).length >=
    (matchesMobile ? 35 : matchesMiddle ? 13 : matchesLarge ? 20 : 25)
      ? `${limitToThreeWords(title).slice(
          0,
          matchesMobile ? 35 : matchesMiddle ? 13 : matchesLarge ? 20 : 25
        )}...`
      : title;

  return (
    <Box
      onClick={onClick}
      sx={{
        maxWidth: "100%",
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
        <Box
          sx={{
            fontSize: { lg: "8px", xs: "8px" },
            fontWeight: "600",
            color: "white",
            lineHeight: 1,
            display: "flex",
            alignItems: "center",
            fontFamily: "Poppins, sans-serif",
          }}
        >
          {isCommissionActive && (
            <Box
              sx={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                backgroundColor: "#74ee15",
                margin: "2px",
              }}
            />
          )}
          {title && displayTitle}
        </Box>
      </Tooltip>
      <img
        src={BroadCast_}
        alt="stop"
        style={{ height: "10px", width: "15px", backgroundSize: "contains" }}
      />
    </Box>
  );
};
export default memo(Stop);
