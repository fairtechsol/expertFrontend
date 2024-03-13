import { Box, Typography } from "@mui/material";

const Result = ({ invert, onClick }: any) => {
  return (
    <Box onClick={onClick}>
      <Box
        sx={{
          width: { lg: "75px", xs: "100%" },
          display: "flex",
          marginRight: "10px",
          justifyContent: "center",
          paddingX: 1,
          alignItems: "center",
          height: "35px",
          background: invert ? "white" : "#0B4F26",
          borderRadius: "3px",
          cursor: "pointer",
        }}
      >
        <Typography
          sx={{
            fontSize: { lg: "11px", xs: "10px" },
            fontWeight: "600",
            color: invert ? "0B4F26" : "white",
          }}
        >
          {"Result"}
        </Typography>
      </Box>
    </Box>
  );
};

export default Result;
