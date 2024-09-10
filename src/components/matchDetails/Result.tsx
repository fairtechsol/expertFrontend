import { Box, Typography } from "@mui/material";

const Result = ({ invert, onClick }: any) => {
  return (
    <Box onClick={onClick}>
      <Box
        sx={{
          width: { lg: "38px", xs: "80%" },
          display: "flex",
          marginRight: {lg:"5px", xs: "0"},
          justifyContent: "center",
          paddingX: 1,
          alignItems: "center",
          height: "20px",
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
