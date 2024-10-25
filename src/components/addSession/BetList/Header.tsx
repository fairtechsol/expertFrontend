import { Box, Typography } from "@mui/material";

const Header = () => {
  return (
    <Box sx={{ display: "flex", height: "35px" }}>
      <Box
        sx={{
          background: "#262626",
          width: "6%",
          px: "5px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{
            color: "white",
            fontWeight: "600",
            fontSize: { lg: "12px", xs: "9px", sm: "12px", md: "12px" },
          }}
        >
          No.
        </Typography>
      </Box>
      <Box
        sx={{
          background: "#262626",
          width: "20%",
          borderLeft: "2px solid white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{
            color: "white",
            fontWeight: "600",
            fontSize: { lg: "12px", xs: "9px", sm: "12px", md: "12px" },
          }}
        >
          User
        </Typography>
      </Box>
      <Box
        sx={{
          background: "#262626",
          width: "10%",
          borderLeft: "2px solid white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{
            fontWeight: "600",
            color: "white",
            fontSize: { lg: "12px", xs: "9px", sm: "12px", md: "12px" },
          }}
        >
          Odds
        </Typography>
      </Box>
      <Box
        sx={{
          background: "#262626",
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
            fontSize: { lg: "12px", xs: "9px", sm: "12px", md: "12px" },
            color: "white",
          }}
        >
          Time
        </Typography>
      </Box>
      <Box
        sx={{
          background: "#262626",
          width: "10%",
          borderLeft: "2px solid white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{
            fontWeight: "600",
            fontSize: { lg: "12px", xs: "9px", sm: "12px", md: "12px" },
            color: "white",
          }}
        >
          Yes/No
        </Typography>
      </Box>
      <Box
        sx={{
          background: "#262626",
          width: "20%",
          borderLeft: "2px solid white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{
            fontWeight: "600",
            fontSize: { lg: "12px", xs: "9px", sm: "12px", md: "12px" },
            color: "white",
          }}
        >
          Stake
        </Typography>
      </Box>
      <Box
        sx={{
          background: "#262626",
          width: "20%",
          borderLeft: "2px solid white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{
            fontWeight: "600",
            fontSize: { lg: "12px", xs: "9px", sm: "12px", md: "12px" },
            color: "white",
          }}
        >
          My Stake
        </Typography>
      </Box>
    </Box>
  );
};

export default Header;
