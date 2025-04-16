import { Box, Typography } from "@mui/material";
import { memo } from "react";

const BookButton = ({ rate }: any) => {
  return (
    <Box
      sx={{
        width: { lg: "40%", xs: "50px", md: "40%" },
        marginRight: "5px",
        flexDirection: "column",
        paddingX: "5px",
        display: "flex",
        left: { xs: "53%", lg: "49vw", md: "53%" },
        justifyContent: "center",
        alignItems: "center",
        height: "30px",
        background: "white",
        borderRadius: "3px",
        border: "2px solid transparent",
      }}
    >
      <Typography
        sx={{
          fontSize: "14px",
          fontWeight: "bold",
          color: rate < 0 ? `#FF4D4D` : `#319E5B`,
        }}
      >
        {rate}
      </Typography>
    </Box>
  );
};

export default memo(BookButton);
