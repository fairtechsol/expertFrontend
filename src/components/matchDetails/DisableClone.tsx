import { Box, Typography } from "@mui/material";

const DisableClone = ({ invert, onClick, height }: any) => {
  return (
    <Box onClick={onClick} sx={{ zIndex: 2 }}>
      <Box
        sx={{
          // width: { lg: "38px", xs: "25px" },
          display: "flex",
          marginRight: "2px",
          marginLeft: "2px",
          // marginRight: { lg: "5px", xs: "0" },
          justifyContent: "center",
          // paddingX: 0.5,
          alignItems: "center",
          height: height ? height : "18px",
          background: invert ? "#e04646" : "#e04646",
          borderRadius: "2px",
          cursor: "pointer",
        }}
      >
        <Typography
          sx={{
            fontSize: { lg: "8px", xs: "6px" },
            fontWeight: "600",
            color: invert ? "#ffffff" : "#ffffff",
          }}
        >
          {"Disable"}
        </Typography>
      </Box>
    </Box>
  );
};

export default DisableClone;
