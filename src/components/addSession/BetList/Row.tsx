import { Box, Typography } from "@mui/material";

const Row = (props: any) => {
  const { index, values } = props;

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
            background: "#F8C851",
            width: "6%",
            px: "5px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{ color: "black", fontWeight: "600", fontSize: "14px" }}
          >
            {index}.
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
            sx={{ color: "white", fontWeight: "600", fontSize: "14px" }}
          >
            {values?.user?.userName || values?.userName}
          </Typography>
        </Box>
        <Box
          sx={{
            background: values.bet_type == "yes" ? "#B3E0FF" : "#FFB5B5",
            width: "10%",
            borderLeft: "2px solid white",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
            flexDirection: "column",
          }}
        >
          <Typography
            sx={{
              fontWeight: "600",
              fontSize: "14px",
              color: "black",
              lineHeight: 1.1,
              marginRight: "2px",
            }}
          >
            {" "}
            {values.odds}{" "}
          </Typography>
          <Typography
            sx={{
              fontSize: "10px",
              marginTop: -0.4,
              color: "black",
              textAlign: "center",
              fontWeight: "bold",
              marginRight: "2px",
            }}
          >
            {values?.bet_type == "no"
              ? values?.rate?.split("-")[0]
              : values?.rate?.split("-")[1]}
          </Typography>
        </Box>
        <Box
          sx={{
            background: values.bet_type == "yes" ? "#B3E0FF" : "#FFB5B5",
            width: "14%",
            borderLeft: "2px solid white",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              fontWeight: "600",
              fontSize: { xs: "10px", lg: "13px" },
              color: "black",
              position: "static",
              top: 0,
              right: 5,
            }}
          >
            {getTime(values.createAt)}
          </Typography>
        </Box>
        <Box
          sx={{
            background: values.bet_type == "yes" ? "#B3E0FF" : "#FFB5B5",
            width: "10%",
            borderLeft: "2px solid white",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{ fontWeight: "600", fontSize: "14px", color: "black" }}
          >
            {values.bet_type == "yes" ? "Yes" : "No"}
          </Typography>
        </Box>
        <Box
          sx={{
            background: values.bet_type == "yes" ? "#B3E0FF" : "#FFB5B5",
            width: "20%",
            borderLeft: "2px solid white",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{ fontWeight: "600", fontSize: "14px", color: "black" }}
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
            sx={{ fontWeight: "600", fontSize: "14px", color: "white" }}
          >
            {values.myStack}
          </Typography>
        </Box>
      </Box>
      {values?.deleted_reason && (
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
