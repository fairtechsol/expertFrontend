import { Box, Typography } from "@mui/material";

const MatchListTableHeader = () => {
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          height: { lg: "35px", xs: "25px" },
          background: "#262626",
          alignItems: "center",
          // borderTop: "2px solid white",
          // borderBottom: "2px solid white",
        }}
      >
        <Box
          sx={{
            width: { xs: "60px", sm: "100px", md: "100px", lg: "100px" },
            display: "flex",
            paddingLeft: "10px",
            alignItems: "center",
            height: { lg: "35px", xs: "25px" },
            borderRight: "2px solid white",
          }}
        >
          <Typography sx={{ color: "white", fontSize: "12px" }}>
            Sr No.
          </Typography>
        </Box>
        <Box
          sx={{
            flex: 1,
            display: "flex",
            paddingLeft: "10px",
            alignItems: "center",
            height: "35px",
          }}
        >
          <Typography sx={{ color: "white", fontSize: "12px" }}>
            Title
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default MatchListTableHeader;
