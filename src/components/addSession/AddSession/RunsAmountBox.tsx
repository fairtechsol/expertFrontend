import { useRef, useEffect } from "react";
import StyledImage from "../../Common/StyledImages";
import { Box, Typography } from "@mui/material";

const RunsAmountBox = ({ currentOdds, betId, proLoss }: any) => {
  const containerRef = useRef(null);

  const scrollToElement = (id: any) => {
    const element = document.getElementById(id);
    const container: any = containerRef.current;

    if (element && container) {
      const containerRect = container.getBoundingClientRect();
      const targetRect = element.getBoundingClientRect();
      const scrollTo =
        targetRect.top -
        containerRect.top -
        (containerRect.height - targetRect.height) / 2;
      container.scrollTo({
        top: container.scrollTop + scrollTo,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    if (currentOdds && currentOdds?.betId === betId) {
      setTimeout(() => {
        scrollToElement(`${betId}_${currentOdds?.odds}`);
      }, 500);
    }
  }, [currentOdds, betId]);

  return (
    <Box
      sx={{
        borderRadius: "5px",
        border: "1px solid #306A47",
        overflow: "hidden",
        width: "100%",
      }}
    >
      <Box
        sx={{
          minHeight: "120px",
          width: "100%",
          flexDirection: "column",
          backgroundColor: "white",
          display: "flex",
        }}
      >
        <Box sx={{ display: "flex", height: "30px", width: "100%" }}>
          <Box
            sx={{
              width: "35%",
              padding: "5px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{ color: "#306A47", fontWeight: "bold", fontSize: "14px" }}
            >
              Runs
            </Typography>
          </Box>
          <Box
            sx={{
              width: "65%",
              padding: "5px",
              display: "flex",
              borderLeft: "1px solid #306A47",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{ color: "#306A47", fontWeight: "bold", fontSize: "14px" }}
            >
              Amount
            </Typography>
          </Box>
        </Box>
        <Box ref={containerRef} sx={{ maxHeight: "42vh", overflowY: "auto" }}>
          {proLoss?.betPlaced?.length > 0
            ? proLoss?.betPlaced?.map((v: any) => {
                const getColor = (value: any) => {
                  if (value >= 1) {
                    return "#10DC61";
                  } else if (value === parseFloat(v?.profitLoss) && value > 1) {
                    return "#F8C851";
                  } else if (value === 0) {
                    return "#F8C851";
                  } else {
                    return "#DC3545";
                  }
                };
                const getSVG = (value: any) => {
                  if (value > 1) {
                    return "https://fontawesomeicons.com/images/svg/trending-up-sharp.svg";
                  } else if (value === parseFloat(v?.profitLoss) && value > 1) {
                    return "https://fontawesomeicons.com/images/svg/trending-up-sharp.svg";
                  } else if (value === 0) {
                    return "https://fontawesomeicons.com/images/svg/trending-up-sharp.svg";
                  } else {
                    return "https://fontawesomeicons.com/images/svg/trending-down-sharp.svg";
                  }
                };
                return (
                  <Box
                    id={`${betId}_${v?.odds}`}
                    key={v?.odds}
                    sx={{
                      display: "flex",
                      width: "100%",
                      height: "25px",
                      borderTop: "1px solid #306A47",
                    }}
                  >
                    <Box
                      sx={{
                        width: "35%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Typography
                        sx={{
                          color: "#306A47",
                          fontWeight: "bold",
                          fontSize: "12px",
                        }}
                      >
                        {v?.odds}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        width: "65%",
                        display: "flex",
                        borderLeft: `1px solid #306A47`,
                        background: getColor(parseFloat(v?.profitLoss)),
                        justifyContent: "space-between",
                        alignItems: "center",
                        paddingRight: "7px",
                      }}
                    >
                      <Typography
                        sx={{
                          fontWeight: "500",
                          fontSize: "16px",
                          color: "white",
                          width: "40px",
                        }}
                      >
                        {Number(parseFloat(v?.profitLoss)) >= 0 ? (
                          <>
                            <span style={{ visibility: "hidden" }}>-</span>
                            {(parseFloat(v?.profitLoss))?.toFixed(2)}
                          </>
                        ) : (
                          parseFloat(v?.profitLoss).toFixed(2)
                        )}
                      </Typography>
                      <StyledImage
                        src={getSVG(parseFloat(v?.profitLoss))}
                        sx={{
                          height: "15px",
                          marginLeft: "5px",
                          filter:
                            "invert(.9) sepia(1) saturate(5) hue-rotate(175deg);",
                          width: "15px",
                        }}
                      />
                    </Box>
                  </Box>
                );
              })
            : null}
        </Box>
      </Box>
    </Box>
  );
};

export default RunsAmountBox;
