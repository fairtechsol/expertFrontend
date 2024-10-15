import { Box, Typography } from "@mui/material";

const LargeBox = ({ item, k }: any) => {
  const handleDomain=(url:any)=>{
    url = url?.replace(/^(?:https?:\/\/)/, "");

    const parts = url?.split(".");
  
    url = parts?.[parts.length-2]
    
    return url || "";
  }
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
        // paddingTop: "5px"
      }}
    >
      <Typography
        sx={{
          fontSize: { lg: "10px", xs: "0.5rem", md: "9px" },
          fontWeight: "600",
          color: item?.color,
          wordWrap: item?.overflowWrap ? item?.overflowWrap : "break-word",
          textTransform: "capitalize",
          textAlign: item?.textAlign ? item?.textAlign : "left",
          lineHeight: 1,
          // px: "2px",
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
            // padding: "2px",
            overflow: "hidden",
            lineHeight: 1
          }}
        >
          {handleDomain(item?.domain)}
        </Typography>
      )}
      {item?.time && (
        <Typography
          sx={{
            fontSize: { lg: "8px", xs: "0.4rem", md: "8px" },
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

export default LargeBox;
