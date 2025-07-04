import { Box, Typography } from "@mui/material";
import { memo } from "react";
import { formatToINR } from "../helper";

interface MatchListProfitLossProps {
  updateMatchStatus: any;
  updateMatchStatusLabel: string;
  onClick?: () => void;
  showUserModal?: boolean;
  cursor?: string;
}

const MatchListProfitLoss = ({
  updateMatchStatus,
  updateMatchStatusLabel,
  onClick,
  showUserModal,
  cursor,
}: MatchListProfitLossProps) => {
  const [integerPart, decimalPart] = parseFloat(updateMatchStatus || 0.0)
    .toFixed(2)
    .split(".");

  return (
    <Box
      onClick={onClick}
      sx={{
        cursor: cursor,
        height: { xs: "35px", lg: "35px" },
        marginLeft: { xs: "2px" },
        marginBottom: { xs: "2px" },
        borderRadius: "5px",
        border: "1px solid #0B4F26",
        background: "#FFF",
        display: "flex",
        justifyContent: {
          xs: "center",
          sm: "space-between",
          lg: "space-between",
        },
        alignItems: "center",
        width: { md: "130px", lg: "160px" },
        marginTop: showUserModal ? { xs: "1%", sm: "5%", lg: "0%" } : "0",
        flexDirection: { xs: "column", sm: "row", lg: "row" },
      }}
    >
      <Typography
        sx={{
          margin: "0",
          fontFamily: "Poppins, sans-serif",
          fontWeight: "700",
          fontSize: { lg: "12px", md: "10px", xs: "9px" },
          marginRight: { xs: "2px" },
          lineHeight: "1.2",
          color: "#575757",
          marginLeft: "1vw",
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
  );
};

export default memo(MatchListProfitLoss);
