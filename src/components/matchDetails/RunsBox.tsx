import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useEffect, useRef } from "react";
import StyledImage from "../Common/StyledImages";
import { CANCEL } from "../../assets";
import { AppDispatch } from "../../store/store";
import { useDispatch } from "react-redux";
import { getSessionProfitLossMatchDetailFilter } from "../../store/actions/match/matchAction";

const RunsBox = ({ item, currentOdd }: any) => {
  const dispatch: AppDispatch = useDispatch();
  const theme = useTheme();
  const matchesMobile = useMediaQuery(theme.breakpoints.down("lg"));
  const containerRef = useRef(null);

  const scrollToElement = (id: any) => {
    const element = document.getElementById(id);
    const container: any = containerRef.current;

    if (element && container) {
      const containerRect = container.getBoundingClientRect();
      const targetRect = element.getBoundingClientRect();
      const scrollY =
        targetRect.top -
        containerRect.top -
        (containerRect.height - targetRect.height) / 2;
      container.scrollTo({
        top: container.scrollTop + scrollY,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    if (currentOdd && currentOdd?.betId === item?.id) {
      setTimeout(() => {
        scrollToElement(`${item?.id}_${currentOdd?.odds}`);
      }, 500);
    }
  }, [currentOdd, item?.id]);

  return (
    <Box
      sx={{
        height: "354px",
        flexDirection: "column",
        borderRadius: "10px",
        backgroundColor: "white",
        display: "flex",
        width: "23.5%",
        marginX: "1px",
        border: "3px solid #0B4F26",
      }}
    >
      <Box
        sx={{
          display: "flex",
          paddingX: "2px",
          height: "36px",
          background: "#0B4F26",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{
            fontSize: matchesMobile ? "8px" : "12px",
            color: "white",
            fontWeight: "600",
            lineHeight: "1",
          }}
        >
          {item?.name}
        </Typography>
        <img
          onClick={() => {
            dispatch(getSessionProfitLossMatchDetailFilter(item?.id));
          }}
          src={CANCEL}
          alt="close"
          style={{ width: "18px", height: "18px", cursor: "pointer" }}
        />
      </Box>
      <Box sx={{ display: "flex", height: "25px" }}>
        <Box
          sx={{
            width: "30%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              color: "#306A47",
              fontWeight: "bold",
              fontSize: matchesMobile ? "8px" : "12px",
            }}
          >
            Runs
          </Typography>
        </Box>
        <Box
          sx={{
            width: "80%",
            display: "flex",
            borderLeft: "1px solid #306A47",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              color: "#306A47",
              fontWeight: "bold",
              fontSize: matchesMobile ? "8px" : "12px",
            }}
          >
            Amount
          </Typography>
        </Box>
      </Box>
      <Box ref={containerRef} sx={{ height: "350px", overflowY: "scroll" }}>
        {item?.proLoss?.betPlaced?.length > 0 ? (
          item?.proLoss?.betPlaced?.map((v: any) => {
            const getColor = (value: any) => {
              if (value >= 1) {
                return "#10DC61";
              } else if (value === v?.profitLoss && value > 1) {
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
              } else if (value === v?.profitLoss && value > 1) {
                return "https://fontawesomeicons.com/images/svg/trending-up-sharp.svg";
              } else if (value === 0) {
                return "https://fontawesomeicons.com/images/svg/trending-up-sharp.svg";
              } else {
                return "https://fontawesomeicons.com/images/svg/trending-down-sharp.svg";
              }
            };
            return (
              <Box
                id={`${item?.id}_${v?.odds}`}
                key={v?.odds}
                sx={{
                  display: "flex",
                  height: "25px",
                  borderTop: "1px solid #306A47",
                }}
              >
                <Box
                  sx={{
                    width: "30%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    sx={{
                      color: "#306A47",
                      fontWeight: "bold",
                      fontSize: matchesMobile ? "8px" : "12px",
                    }}
                  >
                    {v?.odds}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    width: "80%",
                    display: "flex",
                    borderLeft: "1px solid #306A47",
                    background: getColor(v?.profitLoss),

                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    sx={{
                      fontWeight: "500",
                      fontSize: matchesMobile ? "8px" : "12px",
                      color: "white",
                      width: "40px",
                    }}
                  >
                    {Number(v?.profitLoss) >= 0 ? (
                      <>
                        <span style={{ visibility: "hidden" }}>-</span>
                        {v?.profitLoss}
                      </>
                    ) : (
                      v?.profitLoss
                    )}
                  </Typography>
                  <StyledImage
                    src={getSVG(v?.profitLoss)}
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
        ) : (
          <>
            {" "}
            <Box
              sx={{
                display: "flex",
                height: "25px",
                borderTop: "1px solid #306A47",
              }}
            ></Box>
          </>
        )}
      </Box>
    </Box>
  );
};
export default RunsBox;
