import { Box, Typography } from "@mui/material";

const columns = [
  { label: "No.", width: "6%" },
  { label: "User", width: "20%" },
  { label: "Odds", width: "10%" },
  { label: "Time", width: "14%" },
  { label: "Yes/No", width: "10%" },
  { label: "Stake", width: "20%" },
  { label: "My Stake", width: "20%" },
];

const sharedBoxStyles = {
  background: "#262626",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const sharedTypographyStyles = {
  color: "white",
  fontWeight: 600,
  fontSize: {
    lg: "12px",
    md: "12px",
    sm: "10px",
    xs: "9px",
  },
};

const Header = () => {
  return (
    <Box sx={{ display: "flex", height: "35px" }}>
      {columns.map((col, index) => (
        <Box
          key={col.label}
          sx={{
            ...sharedBoxStyles,
            width: col.width,
            px: index === 0 ? "5px" : 0,
            borderLeft: index !== 0 ? "2px solid white" : "none",
          }}
        >
          <Typography sx={sharedTypographyStyles}>{col.label}</Typography>
        </Box>
      ))}
    </Box>
  );
};

export default Header;
