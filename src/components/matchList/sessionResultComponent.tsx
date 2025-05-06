import { Box, Typography } from "@mui/material";
import { memo } from "react";
import { useDispatch } from "react-redux";
import {
  getSessionProfitLossAfterDeclare,
  resetMatchListSessionProLoss,
} from "../../store/actions/match/matchAction";
import { AppDispatch } from "../../store/store";
import StyledImage from "../Common/StyledImages";
import { formatToINR } from "../helper";

const SessionResultComponent = ({
  setShowPopup,
  sessionResults,
  setShowSessionPopup,
  setBetId,
}: any) => {
  const dispatch: AppDispatch = useDispatch();

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          alignSelf: "center",
          width: { xs: "90%", lg: "50%" },
        }}
      >
        <Box
          display={"flex"}
          sx={{
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            px: "10px",
            py: "6px",
            backgroundColor: "#F8C851",
          }}
        >
          <Box
            display={"flex"}
            alignItems="center"
            sx={{ alignItems: "center" }}
          >
            <Typography
              sx={{
                fontSize: {
                  xs: "14px",
                  lg: "18px",
                  md: "18px",
                },
                color: "#000",
                marginRight: {
                  xs: "10px",
                  lg: "20px",
                  md: "20px",
                },
              }}
            >
              Session Results
            </Typography>
          </Box>
          <Typography
            sx={{
              color: "#000",
              fontSize: "30px",
              cursor: "pointer",
            }}
            onClick={(e) => {
              e.stopPropagation();
              dispatch(resetMatchListSessionProLoss());
              setShowPopup((prev: boolean) => !prev);
            }}
          >
            &times;
          </Typography>
        </Box>
        <Box
          sx={{
            border: "2px solid #FFFFFF",
            overflowY: "auto",
            maxHeight: "30rem",
          }}
        >
          <Box sx={{ display: "flex" }}>
            <Box sx={{ background: "#319E5B", width: "60%", px: "5px" }}>
              <Typography
                sx={{ color: "white", fontWeight: "600", fontSize: "12px" }}
              >
                Overs
              </Typography>
            </Box>
            <Box
              sx={{
                background: "#303030",
                width: "20%",
                borderLeft: "2px solid white",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography
                sx={{
                  color: "white",
                  fontWeight: "600",
                  fontSize: { xs: "9px", lg: "12px" },
                }}
              >
                RESULT
              </Typography>
            </Box>
            <Box
              sx={{
                background: "#303030",
                width: "20%",
                borderLeft: "2px solid white",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography
                sx={{
                  color: "white",
                  fontWeight: "600",
                  fontSize: { xs: "9px", lg: "12px" },
                }}
              >
                PROFIT/LOSS
              </Typography>
            </Box>
          </Box>
          {sessionResults?.length > 0 &&
            sessionResults?.map((item: any) => {
              let profitLoss = parseFloat(item.profitLoss).toFixed(2);
              return (
                <Box
                  key={item?.betId?.id}
                  display={"flex"}
                  sx={{
                    borderTop: "2px solid white",
                    background: "#FFFFFF",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    setBetId(item?.betId?.id);
                    dispatch(
                      getSessionProfitLossAfterDeclare({ id: item?.betId?.id })
                    );
                    setShowSessionPopup(true);
                  }}
                >
                  <Box
                    sx={{
                      background: "#FFFFFF",
                      width: "60%",
                    }}
                  >
                    <Typography
                      sx={{
                        fontWeight: "600",
                        fontSize: "14px",
                        px: "5px",
                      }}
                    >
                      {item?.betId?.name}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      background: "#ECECEC",
                      width: "20%",
                      display: "flex",
                      height: "30px",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Typography sx={{ fontWeight: "600", fontSize: "14px" }}>
                      {item?.result}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      background: +profitLoss > 0 ? "#10DC61" : "#FF4D4D",
                      width: "20%",
                      borderLeft: "2px solid white",
                      display: "flex",
                      height: "30px",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      sx={{
                        fontWeight: "600",
                        fontSize: "14px",
                        color: "white",
                      }}
                    >
                      {formatToINR(profitLoss)}
                      <StyledImage
                        src={
                          +profitLoss > 0
                            ? "https://fontawesomeicons.com/images/svg/trending-up-sharp.svg"
                            : "https://fontawesomeicons.com/images/svg/trending-down-sharp.svg"
                        }
                        alt="updown icon"
                        sx={{
                          height: "15px",
                          marginLeft: "5px",
                          filter:
                            "invert(.9) sepia(1) saturate(5) hue-rotate(175deg);",
                          width: "15px",
                        }}
                      />
                    </Typography>
                  </Box>
                </Box>
              );
            })}
        </Box>
      </Box>
    </Box>
  );
};

export default memo(SessionResultComponent);
