import { Box, Typography } from "@mui/material";
import StyledImage from "../Common/StyledImages";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { resetMatchListSessionProLoss } from "../../store/actions/match/matchAction";

const SessionResultComponent = (props: any) => {
  const { setShowPopup, sessionResults } = props;
  const dispatch: AppDispatch = useDispatch();

  return (
    <>
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
                  sx={{ color: "white", fontWeight: "600", fontSize: "12px" }}
                >
                  RESULT
                </Typography>
              </Box>
              {/* <Box
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
                  sx={{ color: "white", fontWeight: "600", fontSize: "12px" }}
                >
                  COMMISSION
                </Typography>
              </Box> */}
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
                  sx={{ color: "white", fontWeight: "600", fontSize: "12px" }}
                >
                  PROFIT/LOSS
                </Typography>
              </Box>
            </Box>
            {sessionResults?.length > 0 &&
              sessionResults?.map((item: any) => {
                let profitLoss = parseInt(item.profitLoss);
                return (
                  <Box
                    key={item?.betId?.id}
                    display={"flex"}
                    sx={{
                      borderTop: "2px solid white",
                      background: "#FFFFFF",
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
                    {/* <Box
                      sx={{
                        background: "#ECECEC",
                        width: "20%",
                        display: "flex",
                        height: "30px",
                        borderLeft: "2px solid white",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Typography sx={{ fontWeight: "600", fontSize: "14px" }}>
                        {item?.commission ?? "NaN"}
                      </Typography>
                    </Box> */}
                    {profitLoss > 0 ? (
                      <Box
                        sx={{
                          background: "#10DC61",
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
                          {profitLoss?.toFixed(2)}
                          <StyledImage
                            src="https://fontawesomeicons.com/images/svg/trending-up-sharp.svg"
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
                    ) : (
                      <Box
                        sx={{
                          background: "#FF4D4D",
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
                          {profitLoss}
                          <StyledImage
                            src="https://fontawesomeicons.com/images/svg/trending-down-sharp.svg"
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
                    )}
                  </Box>
                );
              })}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default SessionResultComponent;
