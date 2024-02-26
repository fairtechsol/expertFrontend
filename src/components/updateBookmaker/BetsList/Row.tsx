import { Box, Typography } from "@mui/material";

const Row = ({ index, values }: any) => {
  const getTime = (date: any) => {
    const now = new Date(date);
    const timeString = now.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
    return timeString;
  };
  return (
    <div style={{ display: "flex", position: "relative" }}>
      <Box
        sx={{
          display: "flex",
          height: "40px",
          borderTop: "2px solid white",
          width: "100%",
        }}
      >
        <Box
          sx={{
            background: "black",
            width: "6%",
            px: "5px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{ color: "white", fontWeight: "600", fontSize: "12px" }}
          >
            {index < 100 ? "0" + index : +index}
          </Typography>
        </Box>
        <Box
          sx={{
            background: "#0B4F26",
            width: "20%",
            borderLeft: "2px solid white",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{ fontWeight: "600", fontSize: "12px", color: "white" }}
          >
            {values?.user?.userName || values?.userName}
          </Typography>
        </Box>
        <Box
          sx={{
            background: "#F8C851",
            width: "20%",
            borderLeft: "2px solid white",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            overflow: "hidden",
            whiteSpace: "nowrap",
            position: "relative",
          }}
        >
          <Typography
            sx={{
              color: "black",
              fontWeight: "600",
              fontSize: "10px",
              lineHeight: 1,
              textAlign: "center",
              overflowWrap: "anywhere"
            }}
          >
              {values.marketType}
          </Typography>
        </Box>
        <Box
          sx={{
            background: "#F8C851",
            width: "20%",
            borderLeft: "2px solid white",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              color: "black",
              fontWeight: "600",
              fontSize: "12px",
              lineHeight: 1,
              textAlign: "center",
            }}
          >
            {values.teamName}
          </Typography>
        </Box>
        <Box
          sx={{
            background: values.betType === "BACK" ? "#B3E0FF" : "#FFB5B5",
            width: "10%",
            borderLeft: "2px solid white",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            position: "relative",
          }}
        >
          <Typography
            sx={{ fontWeight: "600", fontSize: "12px", color: "black" }}
          >
            {values.odds}
          </Typography>
        </Box>
        <Box
          sx={{
            background: values.betType === "BACK" ? "#B3E0FF" : "#FFB5B5",
            width: "14%",
            borderLeft: "2px solid white",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            position: "relative",
          }}
        >
          <Typography
            sx={{
              fontWeight: "600",
              fontSize: { xs: "6px", lg: "12px" },
              color: "black",
              position: "inhert",
              top: 5,
              right: 5,
            }}
          >
            {getTime(values.createdAt)}
          </Typography>
        </Box>
        <Box
          sx={{
            background: values.betType === "BACK" ? "#B3E0FF" : "#FFB5B5",
            width: "15%",
            borderLeft: "2px solid white",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{ fontWeight: "600", fontSize: "12px", color: "black" }}
          >
            {values.betType == "BACK" ? "Back" : "Lay"}
          </Typography>
        </Box>
        <Box
          sx={{
            background: values.betType === "BACK" ? "#B3E0FF" : "#FFB5B5",
            width: "20%",
            borderLeft: "2px solid white",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{ fontWeight: "600", fontSize: "12px", color: "black" }}
          >
            {values.amount || values.stake}
          </Typography>
        </Box>
        <Box
          sx={{
            background: "#0B4F26",
            width: "20%",
            borderLeft: "2px solid white",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{ fontWeight: "600", fontSize: "12px", color: "white" }}
          >
            {values?.myStake 
              ? values?.myStake
              : (
                  (+values?.amount * (+values?.user?.fwPartnership || 0)) /
                  100
                ).toFixed()}
          </Typography>
        </Box>
      </Box>
      {values?.deletedReason && (
        <Box
          sx={{
            background: "rgba(0,0,0,0.5)",
            width: "100%",
            height: "40px",
            position: "absolute",
            display: "flex",
          }}
        >
          <Box sx={{ flex: 1, display: "flex" }}>
            <Box sx={{ width: "34%", height: "30px" }}></Box>
            <Box
              sx={{
                width: "66%",
                height: "30px",
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-end",
              }}
            >
              {
                <Typography
                  sx={{
                    fontSize: "10px",
                    fontWeight: "700",
                    color: "white",
                    textTransform: "uppercase",
                  }}
                >
                  Bet <span style={{ color: "#e41b23" }}>deleted</span> due to{" "}
                  {values?.deleted_reason}
                </Typography>
              }
            </Box>
          </Box>
        </Box>
      )}
    </div>
  );
};

export default Row;
