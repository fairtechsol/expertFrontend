import { Box, Typography } from "@mui/material";

const Result = ({ invert, onClick, height }: any) => {
  return (
    <Box onClick={onClick} sx={{ zIndex: 2 }}>
      <Box
        sx={{
          display: "flex",
          marginRight: "2px",
          marginLeft: "2px",
          justifyContent: "center",
          alignItems: "center",
          height: height ? height : "18px",
          background: invert ? "white" : "#0B4F26",
          borderRadius: "2px",
          cursor: "pointer",
        }}
      >
        <Typography
          sx={{
            fontSize: { lg: "8px", xs: "6px" },
            fontWeight: "600",
            color: invert ? "0B4F26" : "white",
          }}
        >
          Result
        </Typography>
      </Box>
    </Box>
  );
};

export default Result;
