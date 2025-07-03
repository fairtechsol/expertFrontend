import { Box, Typography } from "@mui/material";

const Header = () => {
  const columns = [
    { label: "No.", width: "6%" },
    { label: "User", width: { lg: "20%", xs: "23%" } },
    { label: "Team", width: "20%" },
    { label: "Odds", width: "10%" },
    { label: "Time", width: { lg: "14%", xs: "14%" } },
    {
      label: "Back/Lay",
      width: { lg: "15%", xs: "14%" },
      fontSize: { lg: "12px", xs: "8px" },
      overflowWrap: "anywhere",
    },
    { label: "Stake", width: { lg: "20%", xs: "16%" } },
    { label: "My Stake", width: { lg: "20%", xs: "16%" } },
  ];

  const columnBoxStyles = {
    background: "#262626",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderLeft: "2px solid white",
    "&:first-of-type": {
      borderLeft: "none",
      px: "5px",
    },
  };

  const typographyStyles = {
    color: "white",
    fontWeight: "600",
    fontSize: "12px",
  };

  return (
    <Box sx={{ display: "flex", height: "35px" }}>
      {columns.map((column) => (
        <Box
          key={column.label}
          sx={{
            ...columnBoxStyles,
            width: column.width,
            ...(column.overflowWrap && { overflowWrap: column.overflowWrap }),
          }}
        >
          <Typography
            sx={{
              ...typographyStyles,
              ...(column.fontSize && { fontSize: column.fontSize }),
            }}
          >
            {column.label}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default Header;
