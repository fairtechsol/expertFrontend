import { Box, Typography } from "@mui/material";
import { formatToINR } from "../helper";

const MatchListProfitLoss = (Props: any) => {
  const {
    updateMatchStatus,
    updateMatchStatusLabel,
    onClick,
    showUserModal,
    cursor,
  } = Props;

  const [integerPart, decimalPart] = parseFloat(updateMatchStatus || 0.0)
    .toFixed(2)
    .split(".");

  return (
    <>
      <Box
        onClick={onClick}
        sx={{
          cursor: cursor,
          height: { xs: "35px", lg: "35px" },
          // minWidth: { xs: "10%", md: "18%", lg: "12%" },
          marginLeft: { xs: "2px" },
          marginBottom: { xs: "2px" },
          borderRadius: "5px",
          border: "1px solid #0B4F26",
          background: "#FFF",
          display: "flex",
          justifyContent: { xs: "center", sm: "space-between", lg: "space-between" }, // mobile ui
          alignItems: "center",
          width: { md: "130px", lg: "160px" }, // mobile ui remove xs: "100%",
          marginTop: showUserModal ? { xs: "1%", sm: "5%", lg: "0%" } : "0",
          flexDirection: { xs: "column", sm: "row", lg: "row"},// mobile ui
        }}
      >
        <Typography
          sx={{
            margin: "0",
            fontFamily: "Poppins, sans-serif",
            fontWeight: "700",
            fontSize: { lg: "12px", md: "10px", xs: "9px" },
            marginRight: { xs: "2px" }, // mobile ui
            lineHeight: "1.2",
            color: "#575757",
            marginLeft: "1vw",
            // overflow: "hidden",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            lineClamp: "2px",
          }}
        >
          {updateMatchStatusLabel}
        </Typography>
        <Typography
          sx={{
            marginRight: "10px",
            color: Number(updateMatchStatus) < 0 ? "#FF4D4D" : "#46E080",
            fontWeight: "700",
            fontSize: "11px",
            marginLeft: "0.3vw",
            lineHeight: "14px",
          }}
        >
          <span>{formatToINR(integerPart)}</span>.
          <span style={{ fontSize: "0.8em", fontWeight: "normal" }}>
            {decimalPart}
          </span>
        </Typography>
      </Box>
    </>
  );
};

export default MatchListProfitLoss;
