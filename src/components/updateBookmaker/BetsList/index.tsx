import { Box, Typography } from "@mui/material";
import Header from "./Header";
import Row from "./Row";

const BetsList = ({ betData }: any) => {
  return (
    <Box
      sx={{
        flex: 1,
        background: "white",
        borderRadius: "5px",
        minHeight: "75vh",
        border: "2px solid white",
      }}
    >
      <Box
        sx={[
          {
            height: "42px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "10px",
            backgroundColor: "#F8C851",
          },
        ]}
      >
        <Typography
          sx={{ color: "#000000", fontSize: "20px", fontWeight: "600" }}
        >
          Bookmaker Bets
        </Typography>
        <Box
          sx={{
            height: "35px",
            width: "100px",
            background: "white",
            borderRadius: "5px",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{ color: "red", fontWeight: "700", fontSize: "14px" }}
          >
            All Bets
          </Typography>
          <Typography
            sx={{ color: "#0B4F26", fontWeight: "700", marginTop: "-5px" }}
          >
            {betData?.length}
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          flex: 1,
          justifyContent: "space-between",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Header />
        <Box
          className="myScroll"
          sx={{
            maxHeight: "75vh",
            overflow: "hidden",
            overflowY: "auto",
          }}
        >
          {betData?.length > 0 &&
            betData?.map((i: any, k: any) => {
              const num = betData?.length - k;
              return <Row key={k} index={num} values={i} />;
            })}
        </Box>
      </Box>
    </Box>
  );
};

export default BetsList;
