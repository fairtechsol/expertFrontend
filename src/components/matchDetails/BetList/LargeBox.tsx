import { Box, Typography } from "@mui/material";

const LargeBox = ({ item, k }: any) => {
  return (
    <Box
      sx={{
        border: "1px solid white",
        background: item?.background,
        height: "30px",
        justifyContent: "center",
        alignItems: k == 1 || k == 0 ? "flex-start" : "center",
        paddingLeft: k == 1 || k == 0 ? "5px" : 0,
        display: "flex",
        flexDirection: "column",
        width: item?.width ? item?.width : "50px",
      }}
    >
      <Typography
        sx={{
          fontSize: item?.fSize ? item?.fSize : "11px",
          fontWeight: "600",
          color: item?.color,
          wordWrap: "break-word",
          textTransform: "capitalize",
          textAlign: "left",
          lineHeight: 1,
          px: "2px",
          overflow: "hidden",
          display: " -webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
        }}
      >
        {item?.name}
      </Typography>
      {item?.time && (
        <Typography
          sx={{ fontSize: "10px", fontWeight: "600", color: item?.color }}
        >
          {item?.date}
        </Typography>
      )}
    </Box>
  );
};

export default LargeBox;
