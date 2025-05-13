import { Box, Typography } from "@mui/material";

const MatchListTableHeader = () => {
  return (
    <Box
      sx={{
        display: "flex",
        height: { lg: 35, xs: 25 },
        backgroundColor: "#262626",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          width: { xs: 60, sm: 100 },
          display: "flex",
          alignItems: "center",
          pl: 1.25,
          height: "100%",
          borderRight: "2px solid white",
        }}
      >
        <Typography sx={{ color: "white", fontSize: 12 }}>Sr No.</Typography>
      </Box>
      <Box
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          pl: 1.25,
          height: "100%",
        }}
      >
        <Typography sx={{ color: "white", fontSize: 12 }}>Title</Typography>
      </Box>
    </Box>
  );
};

export default MatchListTableHeader;
