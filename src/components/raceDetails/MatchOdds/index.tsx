import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import Result from "../Result";
import SmallBox from "../SmallBox";
import { ARROWUP } from "../../../assets";
import ResultComponent from "../../updateBookmaker/BookmakerEdit/ResultComponent";
import Divider from "../../Common/Divider";
import BoxComponent from "./BoxComponent";
import SmallBox2 from "./SmallBox2";
import { betLiveStatus } from "../../../store/actions/match/matchAction";
import { AppDispatch } from "../../../store/store";
import { useDispatch } from "react-redux";
import { profitLossDataForMatchConstants } from "../../../utils/Constants";
import { formatToINR } from "../../helper";

const Runners = ({ currentMatch, matchOddsLive, id }: any) => {
  const [visible, setVisible] = useState(false);
  const [visibleImg, setVisibleImg] = useState(true);

  const [live, setLive] = useState(
    matchOddsLive?.activeStatus === "live" ? true : false
  );
  const dispatch: AppDispatch = useDispatch();

  const valueA = currentMatch?.teamRates?.teamARate;
  const valueB = currentMatch?.teamRates?.teamBRate;
  const bookRatioB = (() => {
    try {
      if (valueA === 0) {
        return 0;
      } else {
        const bookRatio = valueB != 0 ? valueA / valueB || 0 : 0;
        const formattedRatio = Math.abs(bookRatio).toFixed(2);
        return valueB < 0 ? `-${formattedRatio}` : formattedRatio;
      }
    } catch (e) {
      console.log(e);
    }
  })();

  const bookRatioA = (() => {
    try {
      if (valueA === 0) {
        return 0;
      } else {
        const bookRatio = valueA != 0 ? valueB / valueA || 0 : 0;
        // alert(teamARates)
        const formattedRatio = Math.abs(bookRatio).toFixed(2);
        // alert(typeof teamARates < 0 ? `-${formattedRatio}` : formattedRatio)

        return valueA < 0 ? `-${formattedRatio}` : formattedRatio;
      }
    } catch (e) {
      console.log(e);
    }
  })();

  useEffect(() => {
    setLive(matchOddsLive?.activeStatus === "live" ? true : false);
  }, [matchOddsLive?.activeStatus]);

  return (
    <>
      <Box
        key="odds"
        sx={{
          display: "flex",
          backgroundColor: "white",
          flexDirection: "column",
          width: "100%",
          marginTop: ".5vh",
          alignSelf: {
            xs: "center",
            md: "center",
            lg: "flex-start",
            boxShadow: "0px 5px 10px #0000001A",
            position: "relative",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            height: 38,
            flexDirection: "row",
            width: "100%",
            alignSelf: "center",
          }}
        >
          <Box
            sx={{
              flex: 1,
              background: "#f1c550",
              alignItems: "center",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography
              sx={{
                fontSize: { lg: "13px", md: "12px", xs: "12px" },
                fontWeight: "bold",
                marginLeft: "7px",
              }}
            >
              Runners
            </Typography>
          

            <SmallBox2 valueA={bookRatioA} valueB={bookRatioB} />
          </Box>

          <Box
            sx={{
              flex: 0.1,
              background: "#262626",
              // '#262626'
            }}
          >
            <div className="slanted"></div>
          </Box>

          <Box
            sx={{
              flex: 1,
              background: "#262626",
              // '#262626' ,
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              marginLeft: "0px",
            }}
          >
            <Result
              width={"80px"}
              onClick={() => {
                setVisible(true);
              }}
              invert={true}
            />
            {!currentMatch?.stopAt &&
              ((currentMatch?.resultStatus &&
                !currentMatch?.resultStatus[matchOddsLive?.id]?.status) ||
                !currentMatch?.resultStatus) && (
                <>
                  <SmallBox
                    onClick={() => {
                      dispatch(
                        betLiveStatus({
                          isStop: live,
                          betId: matchOddsLive?.id,
                          isManual: false,
                        })
                      );
                      setLive(!live);
                    }}
                    // width={{lg: "80px", xs: "40px"}}
                    title={live ? "Live" : "Go Live"}
                    color={live ? "#46e080" : "#FF4D4D"}
                    customStyle={{
                      justifyContent: "center",
                    }}
                  />
                </>
              )}
            <img
              onClick={() => {
                setVisibleImg(!visibleImg);
              }}
              src={ARROWUP}
              style={{
                transform: visibleImg ? "rotate(180deg)" : "rotate(0deg)",
                width: "15px",
                height: "15px",
                marginRight: "5px",
                marginLeft: "5px",
                cursor: "pointer",
              }}
            />
          </Box>
        </Box>

        <Box
          sx={{
            position: "absolute",
            zIndex: 999,
            top: "26%",
            right: "60px",
            width: { lg: "50vh", xs: "30vh" },
          }}
        >
          {visible && (
            <ResultComponent
              currentMatch={currentMatch}
              teamA={currentMatch?.teamA}
              stopAt={currentMatch?.stopAt}
              teamB={currentMatch?.teamB}
              tie={currentMatch?.matchType === "cricket" ? "Tie" : ""}
              draw={currentMatch?.teamC ? currentMatch?.teamC : null}
              onClick={() => {
                setVisible(false);
              }}
              liveData={matchOddsLive}
            />
          )}
        </Box>

        <Box
          sx={{
            flex: 1,
            background: "#262626",
            // '#262626' ,
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          {/* {!currentMatch?.bookMakerRateLive ? (
            <>
              <SmallBox
                onClick={() => {
                dispatch(betLiveStatus({
                isStop: live,
                betId: currentMatch?.matchOdd?.id
                }));
                setLive(!live)
              }}
                width={"80px"}
                title={live ? "Live" : "Go Live"}
                color={live ? "#46e080" : "#FF4D4D"}
                customStyle={{
                  justifyContent: "center",
                }}
              />
            </>
          ) : (
            <SmallBox
              onClick={() => {
              socket.emit("bookMakerRateLive", {
              matchId: currentMatch?.id,
              bookMakerLive: false,
              });
              // setLive(false);
              }}
              width={"80px"}
              title={"Live"}
              customStyle={{
                justifyContent: "center",
              }}
            />
          )} */}
        </Box>

        {visibleImg && (
          <>
            <Box
              sx={{
                display: "flex",
                background: "#319E5B",
                height: "25px",
                width: "100%",
                alignSelf: "center",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  background: "'#319E5B'",
                  height: "25px",
                  width: "35%",
                  alignItems: "center",
                }}
              >
                <Typography
                  sx={{
                    color: "white",
                    fontSize: { lg: "11px", xs: "9px" },
                    marginLeft: "7px",
                  }}
                >
                  MIN: {formatToINR(currentMatch?.matchOdd?.minBet)} MAX:
                  {formatToINR(currentMatch?.matchOdd?.maxBet)}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  background: "#319E5B",
                  height: "25px",
                  width: { lg: "65%", xs: "80%" },
                  justifyContent: { lg: "center", xs: "flex-end" },
                }}
              >
                <Box
                  sx={{
                    background: "#00C0F9",
                    width: { lg: "16.5%", xs: "25%" },
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    sx={{ fontSize: "12px", color: "black", fontWeight: "600" }}
                  >
                    Back
                  </Typography>
                </Box>
                <Box sx={{ width: ".35%", display: "flex" }}></Box>

                <Box
                  sx={{
                    background: "#FF9292",
                    width: { lg: "16.5%", xs: "24.7%" },
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    sx={{ fontSize: "12px", color: "black", fontWeight: "600" }}
                  >
                    Lay
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Box
              sx={{
                width: "100%",
                position: "relative",
              }}
            >
              <BoxComponent
                data={
                  matchOddsLive?.runners?.length > 0
                    ? matchOddsLive?.runners[0]
                    : []
                }
                lock={
                  matchOddsLive?.runners !== undefined &&
                  matchOddsLive?.runners?.length > 0
                    ? false
                    : true
                }
                name={currentMatch?.teamA}
                currentMatch={currentMatch}
                teamRates={
                  currentMatch?.teamRates
                    ? currentMatch?.teamRates[
                        profitLossDataForMatchConstants[matchOddsLive?.type]?.A
                      ]
                      ? currentMatch?.teamRates[
                          profitLossDataForMatchConstants[matchOddsLive?.type]
                            ?.A
                        ]
                      : 0
                    : 0
                }
              />
              <Divider />
              <BoxComponent
                teamRates={
                  currentMatch?.teamRates
                    ? currentMatch?.teamRates[
                        profitLossDataForMatchConstants[matchOddsLive?.type]?.B
                      ]
                      ? currentMatch?.teamRates[
                          profitLossDataForMatchConstants[matchOddsLive?.type]
                            ?.B
                        ]
                      : 0
                    : 0
                }
                lock={
                  matchOddsLive?.runners !== undefined &&
                  matchOddsLive?.runners?.length > 0
                    ? false
                    : true
                }
                data={
                  matchOddsLive?.runners?.length > 0
                    ? matchOddsLive?.runners[1]
                    : []
                }
                name={currentMatch?.teamB}
                currentMatch={currentMatch}
              />
              {currentMatch?.teamC && (
                <>
                  <Divider />
                  <BoxComponent
                    teamRates={
                      currentMatch?.teamRates
                        ? currentMatch?.teamRates[
                            profitLossDataForMatchConstants[matchOddsLive?.type]
                              ?.C
                          ]
                          ? currentMatch?.teamRates[
                              profitLossDataForMatchConstants[
                                matchOddsLive?.type
                              ]?.C
                            ]
                          : 0
                        : 0
                    }
                    lock={
                      matchOddsLive?.runners !== undefined &&
                      matchOddsLive?.runners?.length > 0
                        ? false
                        : true
                    }
                    color={"#FF4D4D"}
                    data={
                      matchOddsLive?.runners?.length > 0
                        ? matchOddsLive?.runners[2]
                        : []
                    }
                    name={currentMatch?.teamC}
                    currentMatch={currentMatch}
                  />
                </>
              )}
              {!live && (
                <Box
                  sx={{
                    width: "100%",
                    position: "absolute",
                    height: "100%",
                    bottom: 0,
                    background: "rgba(0,0,0,0.5)",
                  }}
                ></Box>
              )}
              {currentMatch?.matchType === "cricket"
                ? currentMatch?.resultStatus && (
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "100%",
                        position: "absolute",
                        height: "100%",
                        bottom: 0,
                        color: "#fff",
                        backgroundColor: "rgba(203 24 24 / 70%)",
                      }}
                    >
                      <Typography sx={{ color: "#fff" }}>
                        RESULT {currentMatch?.resultStatus}
                      </Typography>
                    </Box>
                  )
                : currentMatch?.resultStatus &&
                  currentMatch?.resultStatus[id]?.status && (
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "100%",
                        position: "absolute",
                        height: "100%",
                        bottom: 0,
                        color: "#fff",
                        backgroundColor: "rgba(203 24 24 / 70%)",
                      }}
                    >
                      <Typography sx={{ color: "#fff" }}>
                        RESULT {currentMatch?.resultStatus[id]?.status}
                      </Typography>
                    </Box>
                  )}
            </Box>
          </>
        )}
      </Box>
    </>
  );
};

export default Runners;
