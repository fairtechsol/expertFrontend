import { Box, Button, Typography } from "@mui/material";
import Header from "./Header";
import Row from "./Row";
import { useEffect, useRef, useState } from "react";

const BetsList = (props: any) => {
  const { sessionEvent, betData } = props;
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [showButton, setShowButton] = useState(false);

  const scrollToTop = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollTop } = scrollRef.current;
      setShowButton(scrollTop > 0);
    }
  };

  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (scrollElement) {
      scrollElement.addEventListener("scroll", handleScroll);
      return () => {
        scrollElement.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);
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
        <Box>   
        {showButton && (
        <Button
          variant="contained"
          onClick={scrollToTop}
          sx={{
            position: "fixed", 
            width: "100px",
            fontSize: "9px",
            bottom: 20,
            right: 20,
            backgroundColor: "#F8C851",
            color: "#000",
            "&:hover": {
              backgroundColor: "#F8C851",
            },
            zIndex: 1000,
          }}
        >
          Scroll to Top
        </Button>
      )}</Box>
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
          ref={scrollRef}
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
