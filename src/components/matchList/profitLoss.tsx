import { Box, Typography } from "@mui/material";

const MatchListProfitLoss = (Props: any) => {
  const {
    title,
    id,
    containerStyle,
    titleStyle,
    updateMatchStatus,
    updateMatchStatusLabel,
    place,
    notSwitch,
    onClick,
  } = Props;
  const value = updateMatchStatus[place]?.val;
  return (
    <>
      <Box
        sx={{
          background: "#ECECEC",
          width: "14%",
          display: "flex",
          height: "30px",
          borderLeft: "2px solid white",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{
            marginRight: "10px",
            color: "#000000",
            //   color: notSwitch
            //     ? Number(updateMatchStatus) > 0
            //       ? "#46E080"
            //       : "#FF4D4D"
            //     : "white",
            fontWeight: notSwitch ? "700" : "500",
            fontSize: "13px",
            marginLeft: "0.3vw",
            lineHeight: "14px",
          }}
        >
          {updateMatchStatusLabel}
        </Typography>
        <Typography
          sx={{
            marginRight: "10px",
            color: Number(updateMatchStatus) > 0 ? "#FF4D4D" : "#46E080",
            //   color: notSwitch
            //     ? Number(updateMatchStatus) > 0
            //       ? "#46E080"
            //       : "#FF4D4D"
            //     : "white",
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
