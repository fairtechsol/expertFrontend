import { Box, Typography } from "@mui/material";

const SmallBox2 = ({ valueA, valueB }: any) => {
  return (
    <Box
      sx={{
        display: "flex",
        width: "45%",
        gap: "3px",
        margin: "0px",
        justifyContent: "flex-end",
        lineHeight: 1,
      }}
    >
      <Box
        sx={{
          width: { lg: "70px", xs: "10vw" },
          // position: "absolute",
          flexDirection: "column",
          // paddingX: "5px",
          display: "flex",
          left: { xs: "53%", lg: "49vw", md: "53%" },
          justifyContent: "center",
          alignItems: "center",
          height: "18px",
          background: "white",
          borderRadius: "2px",
          lineHeight: 1,
          zIndex: "2",
        }}
      >
        <Typography
          sx={{
            color: "#FF4D4D",
            fontSize: "7px",
            fontWeight: "bold",
          }}
        >
          Book
        </Typography>
        <Typography
          sx={{
            fontSize: "9px",
            fontWeight: "bold",
            color: valueA < 0 ? `#FF4D4D` : `#319E5B`,
            lineHeight: 1,
          }}
        >
          {valueA < 0 ? ` ${valueA}` : `${valueA}`}
        </Typography>
      </Box>
      <Box
        sx={{
          width: { lg: "70px", xs: "10vw" },
          // position: "absolute",
          // paddingX: "5px",
          display: "flex",
          flexDirection: "column",
          left: { xs: "65%", lg: "55vw", md: "65%" },
          justifyContent: "center",
          alignItems: "center",
          height: "18px",
          background: "white",
          borderRadius: "2px",
          zIndex: "2",
        }}
      >
        <Typography
          sx={{
            color: "#FF4D4D",
            fontSize: "7px",
            fontWeight: "bold",
          }}
        >
          Book
        </Typography>

        <Typography
          sx={{
            fontSize: "9px",
            fontWeight: "bold",
            color: valueB < 0 ? `#FF4D4D` : `#319E5B`,
            lineHeight: 1,
          }}
        >
          {valueB < 0 ? ` ${valueB}` : `${valueB}`}
        </Typography>
      </Box>
    </Box>
  );
};

export default SmallBox2;
