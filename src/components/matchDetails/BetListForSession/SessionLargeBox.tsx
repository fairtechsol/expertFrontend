import { Box, Typography } from "@mui/material";

const SessionLargeBox = ({ item, k }: any) => {
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
        width: item?.width ? item?.width : "150px",
      }}
    >
      <Typography
        sx={{
          fontSize: { lg: "9px", xs: "9px", md: "10px" },
          fontWeight: "600",
          color: item?.color,
          wordWrap: item?.overflowWrap ? item?.overflowWrap : "break-word",
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
      {item?.domain && (
        <Typography
          sx={{
            fontSize: { lg: "7px", xs: "0.3rem", md: "9px" },
            fontWeight: "600",
            color: item?.color,
            overflowWrap: "anywhere",
            padding: "2px",
            overflow: "hidden",
          }}
        >
          {item?.domain}
        </Typography>
      )}
      {item?.time && (
        <Typography
          sx={{
            fontSize: { lg: "8px", xs: "8px" },
            fontWeight: "600",
            color: item?.color,
          }}
        >
          {item?.date}
        </Typography>
      )}
    </Box>
  );
};

export default SessionLargeBox;
