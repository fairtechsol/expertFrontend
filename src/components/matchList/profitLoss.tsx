import { Box, Typography } from "@mui/material";

const MatchListProfitLoss = (Props: any) => {
  const { updateMatchStatus, updateMatchStatusLabel, onClick, showUserModal } = Props;
  return (
    <>
      <Box
        onClick={onClick}
        sx={{
          cursor: "pointer",
          height: "35px",
          minWidth: { xs: "100%", sm: "200px" },
          marginLeft: { xs: "0", sm: "10px" },
          borderRadius: "5px",
          border: "1px solid #0B4F26",
          background: "#FFF",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          // width: "18%",
          marginTop: showUserModal ? { xs: "1%", sm: "5%", lg: "0%" } : "0", 
        }}
      >
        <Typography
          sx={{
            margin: "0",
            fontFamily: "Poppins, sans-serif",
            fontWeight: "700",
            fontSize: "13px",
            lineHeight: "1.5",
            color: "#575757",
            marginLeft: "1vw",
            overflow: "hidden",
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
            fontSize: "13px",
            marginLeft: "0.3vw",
            lineHeight: "14px",
          }}
        >
          {updateMatchStatus}
        </Typography>
      </Box>
    </>
  );
};

export default MatchListProfitLoss;
