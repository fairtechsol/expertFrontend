import { Box, Typography } from "@mui/material";
import { memo } from "react";

interface HeaderRowProps {
  tag: boolean;
}

const HeaderRow = ({ tag }: HeaderRowProps) => {
  return (
    <Box sx={{ width: "auto", display: "flex" }}>
      <Box
        sx={{
          width: { lg: "6%", xs: "6%" },
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
            width: { lg: "16%", xs: "50%", md: "50%" },
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
            width: { lg: "17%", xs: "35%" },
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
            width: { lg: "20%", xs: "50%" },
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
            width: { lg: "7%", xs: "35%" },
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
            width: { lg: "7%", xs: "35%" },
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
            width: { lg: "10%", xs: "35%" },
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
            width: { lg: "12%", xs: "35%" },
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
            width: { lg: "11%", xs: "35%" },
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
  );
};

export default memo(HeaderRow);
