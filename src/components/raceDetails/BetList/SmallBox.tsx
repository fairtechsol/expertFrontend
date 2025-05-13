import { Box, Typography } from "@mui/material";
import { memo } from "react";

const SmallBox = ({ item }: any) => {
  return (
    <Box
      sx={{
        border: "1px solid white",
        background: item?.background,
        height: "30px",
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        width: item?.width ? item?.width : "auto",
      }}
    >
      <Typography
        sx={{
          fontSize: { lg: "11px", xs: "10px" },
          fontWeight: "600",
          color: item?.color,
          textTransform: "capitalize",
          lineHeight: item?.lHeight ? item?.lHeight : 1.5,
        }}
      >
        {item?.name}
      </Typography>
      <Typography
        sx={{
          fontSize: { lg: "9px", xs: "6px" },
          fontWeight: "600",
          color: item?.color,
        }}
      >
        {item?.rate && item?.rate}
      </Typography>
    </Box>
  );
};

export default memo(SmallBox);
