import { Box, Typography } from "@mui/material";
import { formatToINR } from "../../helper";

const Row = ({ index, values }: any) => {
  const getTime = (date: any) => {
    const now = new Date(date);
    const timeString = now.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
      timeZone: "Asia/Kolkata",
    });
    return timeString;
  };
  return (
    <div style={{ display: "flex", position: "relative" }}>
      {values?.deleteReason && (
        <Box
          sx={{
            background: "rgba(0,0,0,0.5)",
            width: "100%",
            height: "100%",
            position: "absolute",
            display: "flex",
            zIndex: 2,
          }}
        >
          <Box sx={{ flex: 1, display: "flex" }}>
            <Box sx={{ width: "34%", height: "100%" }}></Box>
            <Box
              sx={{
                width: "66%",
                height: "100%",
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
                  {values?.deleteReason}
                </Typography>
              }
            </Box>
          </Box>
        </Box>
      )}
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
            sx={{ color: "white", fontWeight: "600", fontSize: { xs: "8px", lg: "12px" } }}
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
            sx={{ fontWeight: "600", fontSize: { xs: "10px",md: "10px", lg: "12px" }, color: "white" }}
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
              fontSize: { xs: "10px",md: "10px", lg: "10px" },
              lineHeight: 1,
              textAlign: "center",
              overflowWrap: "anywhere",
            }}
          >
            {values?.bettingName ?? values.marketType}
          </Typography>
        </Box>
        <Box
          sx={{
            background: "#F8C851",
            width: {lg:"20%", xs:"14%"},
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
              fontSize: { xs: "8px",md: "10px", lg: "12px" },
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
            width:{ lg:"10%", xs: "12%"},
            borderLeft: "2px solid white",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            position: "relative",
          }}
        >
          <Typography
            sx={{ fontWeight: "600", fontSize: { xs: "10px",md: "10px", lg: "12px" }, color: "black" }}
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
              fontSize: { xs: "8px",md: "10px", lg: "10px" },
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
            width: { lg:"15%", xs: "10%"},
            borderLeft: "2px solid white",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{ fontWeight: "600", fontSize: { xs: "8px",md: "10px", lg: "12px" }, color: "black" }}
          >
            {values.betType == "BACK" ? "Back" : "Lay"}
          </Typography>
        </Box>
        <Box
          sx={{
            background: values.betType === "BACK" ? "#B3E0FF" : "#FFB5B5",
            width:{ lg:"20%", xs: "16%"},
            borderLeft: "2px solid white",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{ fontWeight: "600", fontSize: { xs: "10px",md: "10px", lg: "12px" }, color: "black" }}
          >
            {formatToINR(values.amount || values.stake)}
          </Typography>
        </Box>
        <Box
          sx={{
            background: "#0B4F26",
            width: { lg:"20%", xs: "16%"},
            borderLeft: "2px solid white",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{ fontWeight: "600", fontSize: { xs: "10px",md: "10px", lg: "12px" }, color: "white" }}
          >
            {formatToINR(values?.myStake
              ? values?.myStake
              : (
                  (+values?.amount * (+values?.user?.fwPartnership || 0)) /
                  100
                ).toFixed())}
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
