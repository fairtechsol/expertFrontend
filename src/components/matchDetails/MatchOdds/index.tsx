import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ARROWUP } from "../../../assets";
import { betLiveStatus } from "../../../store/actions/match/matchAction";
import { AppDispatch, RootState } from "../../../store/store";
import { profitLossDataForMatchConstants } from "../../../utils/Constants";
import Divider from "../../Common/Divider";
import { formatToINR } from "../../helper";
import ResultComponent from "../../updateBookmaker/BookmakerEdit/ResultComponent";
import MaxBetAdd from "../MaxBetAdd";
import Result from "../Result";
import Stop from "../SessionMarket/Stop";
import SmallBox from "../SmallBox";
import BoxComponent from "./BoxComponent";
import SmallBox2 from "./SmallBox2";
import MaxLimitEditButton from "../../Common/MaxLimitEditButton";
import AddMarketButton from "../../Common/AddMarketButton";
import { declareMatchStatusReset } from "../../../store/actions/match/matchDeclareActions";

const MatchOdds = ({ currentMatch, matchOddsLive, id, showResultBox }: any) => {
  const dispatch: AppDispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [visibleImg, setVisibleImg] = useState(true);
  const [live, setLive] = useState(
    matchOddsLive?.activeStatus === "live" ? true : false
  );
  const [open, setOpen] = useState(false);
  const { success } = useSelector((state: RootState) => state.match);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (data: any) => {
    setOpen(data);
  };

  const valueA =
    +currentMatch?.teamRates?.[
      profitLossDataForMatchConstants[matchOddsLive?.type]?.A +
        "_" +
        currentMatch?.id
    ] || 0;

  const valueB =
    +currentMatch?.teamRates?.[
      profitLossDataForMatchConstants[matchOddsLive?.type]?.B +
        "_" +
        currentMatch?.id
    ] || 0;

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

  useEffect(() => {
    if (success) {
      dispatch(declareMatchStatusReset());
      setVisible(false);
    }
  }, [success]);

  return (
    <>
      <Box
        key="odds"
        sx={{
          display: "flex",
          backgroundColor: "white",
          flexDirection: "column",
          width: { lg: "49%", md: "49%", xs: "100%" },
          marginTop: ".5vh",
          alignSelf: {
            xs: "center",
            md: "flex-start",
            lg: "flex-start",
            boxShadow: "0px 5px 10px #0000001A",
            position: "relative",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            height: 20,
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
              width: "55%",
              justifyContent: "space-between",
            }}
          >
            {!matchOddsLive?.id && (
              <Typography
                sx={{
                  fontSize: { lg: "9px", md: "9px", xs: "10px" },
                  fontWeight: "bold",
                  marginLeft: "2px",
                  lineHeight: 1,
                }}
              >
                Match Odds
              </Typography>
            )}
            {matchOddsLive?.id && matchOddsLive?.activeStatus !== "result" && (
              <Stop
                onClick={() => {
                  dispatch(
                    betLiveStatus({
                      isStop: true,
                      betId: matchOddsLive?.id,
                      isManual: false,
                    })
                  );
                  setLive(false);
                }}
                height="18px"
                title={"Match Odds"}
              />
            )}

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
              width: "45%",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              marginLeft: "0px",
              // marginRight: "2px",
            }}
          >
            {showResultBox && (
              <Result
                width={"60px"}
                onClick={() => {
                  setVisible(true);
                }}
                invert={true}
              />
            )}
            {matchOddsLive?.id ? (
              (!currentMatch?.stopAt ||
                matchOddsLive?.activeStatus !== "result") &&
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
                    width={{ lg: "25px", xs: "20px" }}
                    title={live ? "Live" : "Go Live"}
                    color={live ? "#46e080" : "#FF4D4D"}
                    customStyle={{
                      justifyContent: "center",
                      textAlign: "center",
                    }}
                    height="18px"
                  />
                  <MaxLimitEditButton handleClickOpen={handleClickOpen} />
                </>
              )
            ) : (
              <AddMarketButton handleClickOpen={handleClickOpen} />
            )}
            <img
              onClick={() => {
                setVisibleImg(!visibleImg);
              }}
              src={ARROWUP}
              style={{
                transform: visibleImg ? "rotate(180deg)" : "rotate(0deg)",
                width: "10px",
                height: "10px",
                marginRight: "1px",
                marginLeft: "1px",
                cursor: "pointer",
              }}
            />
          </Box>
        </Box>

        {/* <Box
          sx={{
            position: "absolute",
            zIndex: 999,
            top: "26%",
            right: "1%",
            width: { lg: "20vw", xs: "40vw", md: "20vw" },
          }}
        > */}
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
        {/* </Box> */}

        {/* <Box
          sx={{
            flex: 1,
            background: "#262626",
            // '#262626' ,
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        > */}
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
        {/* </Box> */}

        {visibleImg && (
          <>
            <Box
              sx={{
                display: "flex",
                background: "#319E5B",
                height: "15px",
                width: "100%",
                alignSelf: "center",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  background: "'#319E5B'",
                  height: "15px",
                  width: { lg: "70%", xs: "50%", md: "60%", sm: "83%" },
                  alignItems: "center",
                }}
              >
                <Typography
                  sx={{
                    color: "white",
                    fontSize: { lg: "10px", xs: "8px" },
                    marginLeft: "7px",
                    lineHeight: 1,
                  }}
                >
                  MIN:{" "}
                  {formatToINR(
                    matchOddsLive?.id
                      ? matchOddsLive?.minBet
                      : currentMatch?.betFairSessionMinBet
                  )}{" "}
                  MAX:
                  {formatToINR(matchOddsLive?.maxBet)}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  background: "#319E5B",
                  height: "15px",
                  width: { lg: "30%", xs: "50%", md: "40%", sm: "43%" },
                  justifyContent: { lg: "flex-end", xs: "flex-end" },
                }}
              >
                <Box
                  sx={{
                    background: "#00C0F9",
                    width: { lg: "36%", xs: "34.6%", md: "43%", sm: "100%" },
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    sx={{ fontSize: "10px", color: "black", fontWeight: "600" }}
                  >
                    Back
                  </Typography>
                </Box>
                <Box sx={{ width: ".35%", display: "flex" }}></Box>

                <Box
                  sx={{
                    background: "#FF9292",
                    width: { lg: "36%", xs: "34.6%", md: "43%", sm: "100%" },
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    sx={{ fontSize: "10px", color: "black", fontWeight: "600" }}
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
                        profitLossDataForMatchConstants[matchOddsLive?.type]
                          ?.A +
                          "_" +
                          currentMatch?.id
                      ]
                      ? currentMatch?.teamRates[
                          profitLossDataForMatchConstants[matchOddsLive?.type]
                            ?.A +
                            "_" +
                            currentMatch?.id
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
                        profitLossDataForMatchConstants[matchOddsLive?.type]
                          ?.B +
                          "_" +
                          currentMatch?.id
                      ]
                      ? currentMatch?.teamRates[
                          profitLossDataForMatchConstants[matchOddsLive?.type]
                            ?.B +
                            "_" +
                            currentMatch?.id
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
                              ?.C +
                              "_" +
                              currentMatch?.id
                          ]
                          ? currentMatch?.teamRates[
                              profitLossDataForMatchConstants[
                                matchOddsLive?.type
                              ]?.C +
                                "_" +
                                currentMatch?.id
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
              {typeof currentMatch?.resultStatus === "string" &&
              matchOddsLive?.id &&
              showResultBox
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
      <MaxBetAdd
        open={open}
        handleClose={handleClose}
        matchOddsLive={matchOddsLive}
        currentMatch={currentMatch}
        title={"API Match Odds Max Bet"}
      />
    </>
  );
};

export default MatchOdds;
