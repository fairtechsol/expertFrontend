import { Box, Typography } from "@mui/material";

const Result = ({ invert, onClick, height }: any) => {
  return (
    <Box onClick={onClick}>
      <Box
        sx={{
          width: { lg: "38px", xs: "25px" },
          display: "flex",
          marginRight: "4px",
          marginLeft: "4px",
          // marginRight: { lg: "5px", xs: "0" },
          justifyContent: "center",
          // paddingX: 0.5,
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
          {"Result"}
        </Typography>
      </Box>
    </Box>
  );
};

export default Result;
