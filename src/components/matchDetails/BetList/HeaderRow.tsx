import { Box, Typography } from "@mui/material";

const HeaderRow = ({ tag }: any) => {
  return (
    <>
      <Box sx={{ width: "100%", display: "flex" }}>
        <Box
          sx={{
            width: "4%",
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
              width: "12%",
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
              width: "20%",
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
              width: "13%",
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
              Favourite
            </Typography>
          </Box>
          <Box
            sx={{
              width: "7%",
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
              width: "7%",
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
              width: "17%",
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
              width: "14%",
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
              My Stake
            </Typography>
          </Box>
          <Box
            sx={{
              width: "10%",
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

export default HeaderRow;
