import { Box, Typography } from "@mui/material";
import Header from "./Header";
import Row from "./Row";

const BetsList = (props: any) => {
  const { sessionEvent, betData } = props;
  return (
    <Box
      sx={{
        flex: 1,
        background: "white",
        borderRadius: "5px",
        minHeight: "87.5vh",
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
            py: "5px",
          },
          () => ({
            background: "#F8C851",
          }),
        ]}
      >
        <Typography sx={{ color: "#000", fontSize: {lg:"20px", xs:"16px", md: "18px"}, fontWeight: "600" }}>
          {sessionEvent?.name}
        </Typography>
        <Box
          sx={{
            height: "32px",
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
            sx={{ color: "red", fontWeight: "700", fontSize: "12px" }}
          >
            All Bet
          </Typography>
          <Typography
            sx={{ color: "#0B4F26", fontWeight: "700", marginTop: "-5px" }}
          >
            {betData.length}
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
            maxHeight: "82vh",
            overflow: "hidden",
            overflowY: "auto",
            "::-webkit-scrollbar": {
              display: "none",
            },
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
