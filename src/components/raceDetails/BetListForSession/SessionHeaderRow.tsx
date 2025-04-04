import { Box, Typography } from "@mui/material";

const SessionHeaderRow = ({ tag }: any) => {
  return (
    <>
      <Box sx={{ width: "auto", display: "flex" }}>
        <Box
          sx={{
            width: { lg: "4%", xs: "6%" },
            border: "1px solid white",
            background: "rgba(0,0,0)",
            height: "20px",
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
          }}
        >
          <Typography
            sx={{ fontSize: "10px", fontWeight: "500", color: "white" }}
          >
            No
          </Typography>
        </Box>
        <Box sx={{ width: "100%", display: "flex" }}>
          <Box
            sx={{
              width: { lg: "17%", xs: "30%" },
              border: "1px solid white",
              background: "rgba(0,0,0)",
              height: "20px",
              justifyContent: tag ? "flex-start" : "center",
              paddingLeft: tag ? "5px" : 0,
              alignItems: "center",
              display: "flex",
            }}
          >
            <Typography
              sx={{ fontSize: "10px", fontWeight: "500", color: "white" }}
            >
              Username
            </Typography>
          </Box>
          <Box
            sx={{
              width: { lg: "33%", xs: "47%" },
              border: "1px solid white",
              background: "rgba(0,0,0)",
              height: "20px",
              justifyContent: tag ? "flex-start" : "center",
              paddingLeft: tag ? "5px" : 0,
              alignItems: "center",
              display: "flex",
            }}
          >
            <Typography
              sx={{ fontSize: "10px", fontWeight: "500", color: "white" }}
            >
              Market
            </Typography>
          </Box>
          <Box
            sx={{
              width: { lg: "7%", xs: "33%" },
              border: "1px solid white",
              background: "rgba(0,0,0)",
              height: "20px",
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
            }}
          >
            <Typography
              sx={{ fontSize: "10px", fontWeight: "500", color: "white" }}
            >
              Odds
            </Typography>
          </Box>
          <Box
            sx={{
              width: { lg: "7%", xs: "33%" },
              border: "1px solid white",
              background: "rgba(0,0,0)",
              height: "20px",
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
            }}
          >
            <Typography
              sx={{ fontSize: "10px", fontWeight: "500", color: "white" }}
            >
              Type
            </Typography>
          </Box>
          <Box
            sx={{
              width: { lg: "12%", xs: "33%" },
              border: "1px solid white",
              background: "rgba(0,0,0)",
              height: "20px",
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
            }}
          >
            <Typography
              sx={{ fontSize: "10px", fontWeight: "500", color: "white" }}
            >
              Stake
            </Typography>
          </Box>
          <Box
            sx={{
              width: { lg: "12%", xs: "33%" },
              border: "1px solid white",
              background: "rgba(0,0,0)",
              height: "20px",
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
            }}
          >
            <Typography
              sx={{
                fontSize: "10px",
                fontWeight: "500",
                color: "white",
                lineHeight: "0.9",
              }}
            >
              My Stake
            </Typography>
          </Box>
          <Box
            sx={{
              width: { lg: "13%", xs: "33%" },
              border: "1px solid white",
              borderRight: "0",
              background: "rgba(0,0,0)",
              height: "20px",
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
            }}
          >
            <Typography
              sx={{ fontSize: "10px", fontWeight: "500", color: "white" }}
            >
              Time
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default SessionHeaderRow;
