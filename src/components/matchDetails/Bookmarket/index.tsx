import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ARROWUP } from "../../../assets";
import { betLiveStatus } from "../../../store/actions/match/matchAction";
import { AppDispatch } from "../../../store/store";
import { profitLossDataForMatchConstants } from "../../../utils/Constants";
import Divider from "../../Common/Divider";
import { formatToINR } from "../../helper";
import BoxComponent from "../MatchOdds/BoxComponent";
import MaxBetAdd from "../MaxBetAdd";
import Stop from "../SessionMarket/Stop";
import SmallBox from "../SmallBox";
import MaxLimitEditButton from "../../Common/MaxLimitEditButton";
import AddMarketButton from "../../Common/AddMarketButton";
import Result from "../Result";
import ResultComponent from "../../updateBookmaker/BookmakerEdit/ResultComponent";

const BookMarket = ({ currentMatch, liveData, title, showResultBox }: any) => {
  const dispatch: AppDispatch = useDispatch();
  const [visibleImg, setVisibleImg] = useState<boolean>(true);
  const [live, setLive] = useState<boolean>(
    liveData?.activeStatus === "live" ? true : false
  );
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setLive(liveData?.activeStatus === "live" ? true : false);
  }, [liveData?.activeStatus]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (data: any) => {
    setOpen(data);
  };
  return (
    <Box
      sx={{
        boxShadow: "0px 5px 10px #0000001A",
        display: "flex",
        backgroundColor: "white",
        flexDirection: "column",
        width: { lg: "49%", md: "49%", xs: "100%" },
        marginTop: ".3vh",
        marginX: "0",
        alignSelf: {
          xs: "center",
          md: "flex-start",
          lg: "flex-start",
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
            justifyContent: "space-between",
          }}
        >
          <Typography
            sx={{
              fontSize: { lg: "9px", md: "9px", xs: "10px" },
              fontWeight: "bold",
              marginLeft: "7px",
            }}
          >
            {title}
          </Typography>
          {/* <img src={LOCKED} style={{ width: '14px', height: '20px' }} /> */}
          {liveData?.id && liveData?.activeStatus !== "result" && (
            <Stop
              onClick={() => {
                dispatch(
                  betLiveStatus({
                    isStop: true,
                    betId: liveData?.id,
                    isManual: false,
                  })
                );
                setLive(false);
              }}
              height="18px"
            />
          )}
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
          }}
        >
          {showResultBox && (
            <Result
              width={"80px"}
              onClick={() => {
                setVisible(true);
              }}
              invert={true}
            />
          )}
          {liveData?.id ? (
            liveData?.activeStatus !== "result" && (
              <>
                <SmallBox
                  onClick={() => {
                    dispatch(
                      betLiveStatus({
                        isStop: live,
                        betId: liveData?.id,
                        isManual: false,
                      })
                    );
                    setLive(!live);
                  }}
                  width={{ lg: "60px", xs: "20%" }}
                  title={live ? "Live" : "Go Live"}
                  color={live ? "#46e080" : "#FF4D4D"}
                  customStyle={{
                    justifyContent: "center",
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
              width: "12px",
              height: "12px",
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
          right: "1%",
          width: { lg: "30vh", xs: "30vh" },
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
            liveData={liveData}
          />
        )}
      </Box>
      <Divider />
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
                width: "50%",
                alignItems: "center",
              }}
            >
              <Typography
                sx={{
                  color: "white",
                  fontSize: "9px",
                  marginLeft: "7px",
                }}
              >
                MIN:{" "}
                {formatToINR(
                  liveData?.id
                    ? liveData?.minBet
                    : currentMatch?.betFairSessionMinBet
                )}{" "}
                MAX: {formatToINR(liveData?.maxBet)}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                background: "#319E5B",
                height: "15px",
                width: { lg: "65%", xs: "50%" },
                justifyContent: { lg: "flex-end", xs: "flex-end" },
              }}
            >
              <Box
                sx={{
                  background: "#00C0F9",
                  width: { lg: "19%", xs: "34.6%" },
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
                  width: { lg: "19%", xs: "34.6%" },
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

          <Box sx={{ position: "relative" }}>
            <BoxComponent
              teamRates={
                currentMatch?.teamRates
                  ? currentMatch?.teamRates[
                      profitLossDataForMatchConstants[liveData?.type]?.A +
                        "_" +
                        currentMatch?.id
                    ]
                    ? currentMatch?.teamRates[
                        profitLossDataForMatchConstants[liveData?.type]?.A +
                          "_" +
                          currentMatch?.id
                      ]
                    : 0
                  : 0
              }
              // teamImage={currentMatch?.bookmaker?.teamA_Image}
              livestatus={
                liveData?.runners?.length > 0 &&
                liveData?.runners[0]?.status === "SUSPENDED"
                  ? true
                  : false
              }
              data={liveData?.runners?.length > 0 ? liveData?.runners[0] : []}
              lock={liveData?.runners?.length > 0 ? false : true}
              name={currentMatch?.teamA}
              liveData={liveData}
            />
            <Divider />
            <BoxComponent
              livestatus={
                liveData?.runners?.length > 0 &&
                liveData?.runners[1]?.status === "SUSPENDED"
                  ? true
                  : false
              }
              teamRates={
                currentMatch?.teamRates
                  ? currentMatch?.teamRates[
                      profitLossDataForMatchConstants[liveData?.type]?.B +
                        "_" +
                        currentMatch?.id
                    ]
                    ? currentMatch?.teamRates[
                        profitLossDataForMatchConstants[liveData?.type]?.B +
                          "_" +
                          currentMatch?.id
                      ]
                    : 0
                  : 0
              }
              teamImage={currentMatch?.bookmaker?.teamB_Image}
              lock={liveData?.runners?.length > 0 ? false : true}
              name={currentMatch?.teamB}
              data={liveData?.runners?.length > 0 ? liveData?.runners[1] : []}
              align="end"
              liveData={liveData}
            />
            {currentMatch?.teamC && (
              <>
                <Divider />
                <BoxComponent
                  color={"#FF4D4D"}
                  livestatus={
                    liveData?.runners?.length > 0 &&
                    liveData?.runners[2]?.status === "SUSPENDED"
                      ? true
                      : false
                  }
                  teamRates={
                    currentMatch?.teamRates
                      ? currentMatch?.teamRates[
                          profitLossDataForMatchConstants[liveData?.type]?.C +
                            "_" +
                            currentMatch?.id
                        ]
                        ? currentMatch?.teamRates[
                            profitLossDataForMatchConstants[liveData?.type]?.C +
                              "_" +
                              currentMatch?.id
                          ]
                        : 0
                      : 0
                  }
                  teamImage={null}
                  lock={liveData?.runners?.length > 0 ? false : true}
                  name={currentMatch?.teamC}
                  data={
                    liveData?.runners?.length > 0 ? liveData?.runners[2] : []
                  }
                  align="end"
                  liveData={liveData}
                />
              </>
            )}

            <Divider />
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
            {currentMatch?.resultStatus &&
              currentMatch?.resultStatus[liveData?.id]?.status && (
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
                    RESULT {currentMatch?.resultStatus[liveData?.id]?.status}
                  </Typography>
                </Box>
              )}
          </Box>
        </>
      )}
      <MaxBetAdd
        open={open}
        handleClose={handleClose}
        matchOddsLive={liveData}
        currentMatch={currentMatch}
        title={"API Bookmaker Max Bet"}
      />
    </Box>
  );
};

export default BookMarket;
