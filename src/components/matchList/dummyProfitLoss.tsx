import { Box, Typography } from "@mui/material";

const DummyMatchListProfitLoss = ({ updateMatchStatusLabel }: any) => {
  return (
    <>
      <Box
        sx={{
          height: { xs: "35px", lg: "35px" },
          // minWidth: { xs: "10%", md: "18%", lg: "12%" },
          marginLeft: { xs: "2px" },
          marginBottom: { xs: "2px" },
          borderRadius: "5px",
          //   border: "1px solid #0B4F26",
          background: "#FFE094",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: { xs: "100%", md: "130px", lg: "160px" },
          marginTop: "0",
        }}
      >
        <Typography
          sx={{
            margin: "0",
            fontFamily: "Poppins, sans-serif",
            fontWeight: "700",
            fontSize: { lg: "12px", md: "10px", xs: "9px" },
            lineHeight: "1.2",
            cursor:"default",
            marginLeft: "1vw",
            // overflow: "hidden",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            lineClamp: "2px",
            color: "#FFE094",
          }}
        >
          {updateMatchStatusLabel}
        </Typography>
        <Typography
          sx={{
            marginRight: "10px",
            fontWeight: "700",
            fontSize: "11px",
            marginLeft: "0.3vw",
            lineHeight: "14px",
            color: "#FFE094",
          }}
        >
          {/* <span style={{ fontSize: "0.8em", fontWeight: "normal" }}>""</span> */}
        </Typography>
      </Box>
    </>
  );
};

export default DummyMatchListProfitLoss;
