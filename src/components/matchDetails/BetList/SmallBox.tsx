import { Box, Typography } from "@mui/material";

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
          fontSize:{lg:"11px", xs:"12px"},
          fontWeight: "600",
          color: item?.color,
          textTransform: "capitalize",
          lineHeight: item?.lHeight ? item?.lHeight : 1.5,
        }}
      >
        {item?.name}
      </Typography>
      <Typography
        sx={{ fontSize: "9px", fontWeight: "600", color: item?.color }}
      >
        {item?.rate && item?.rate}
      </Typography>
    </Box>
  );
};

export default SmallBox;
