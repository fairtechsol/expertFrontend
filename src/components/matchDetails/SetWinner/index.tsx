import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ARROWUP } from "../../../assets";
import {
  betLiveStatus,
  updateResultBoxStatus,
} from "../../../store/actions/match/matchAction";
import { AppDispatch, RootState } from "../../../store/store";
import { profitLossDataForMatchConstants } from "../../../utils/Constants";
import Divider from "../../Common/Divider";
import { formatToINR } from "../../helper";
import BoxComponent from "../MatchOdds/BoxComponent";
import Stop from "../SessionMarket/Stop";
import SmallBox from "../SmallBox";
import Result from "../Result";
import ResultComponent from "../../updateBookmaker/BookmakerEdit/ResultComponent";

const SetWinner = ({ currentMatch, liveData, title }: any) => {
  const dispatch: AppDispatch = useDispatch();
  const [visibleImg, setVisibleImg] = useState<boolean>(true);
  const [visible, setVisible] = useState(false);
  const [live, setLive] = useState<boolean>(
    liveData?.activeStatus === "live" ? true : false
  );

  const { resultBox } = useSelector(
    (state: RootState) => state.addMatch.addMatch
  );

  useEffect(() => {
    setLive(liveData?.activeStatus === "live" ? true : false);
  }, [liveData?.activeStatus]);

  useEffect(() => {
    if (!resultBox?.visible && resultBox?.betId === liveData?.id) {
      setVisible(false);
    }
  }, [resultBox]);

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
              fontSize: { lg: "9px", md: "9px", xs: "10px", sm: "8px" },
              fontWeight: "bold",
              marginLeft: "7px",
            }}
          >
            {title}
          </Typography>
          {/* <img src={LOCKED} style={{ width: '14px', height: '20px' }} /> */}
          {currentMatch?.resultStatus &&
            !currentMatch?.resultStatus[liveData?.id]?.status && (
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
          {!currentMatch?.stopAt && (
            <>
              <Result
                width={"80px"}
                onClick={() => {
                  setVisible(true);
                  dispatch(
                    updateResultBoxStatus({
                      visible: true,
                      betId: liveData?.id,
                    })
                  );
                }}
                invert={true}
              />
              {currentMatch?.resultStatus &&
                !currentMatch?.resultStatus[liveData?.id]?.status && (
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
                    width={{ xs: "30px", lg: "80px", md: "50px" }}
                    title={live ? "Live" : "Go Live"}
                    color={live ? "#46e080" : "#FF4D4D"}
                    customStyle={{
                      justifyContent: "center",
                      textAlign: "center"
                    }}
                  />
                )}
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
          position: "relative",
          zIndex: 999,
          // top: "36%",
          // right: "10%",
          left: { lg: "46%", xs: "30%", md: "60%" },
          width: { lg: "30vw", xs: "30vh" },
        }}
      >
        {visible && (
          <ResultComponent
            currentMatch={currentMatch}
            teamA={currentMatch?.teamA}
            stopAt={liveData?.stopAt || liveData?.activeStatus === "result"}
            teamB={currentMatch?.teamB}
            // tie={currentMatch?.matchType === "cricket" ? "Tie" : ""}
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
                MIN: {formatToINR(liveData?.minBet)} MAX:{" "}
                {formatToINR(liveData?.maxBet)}
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

          <Box sx={{ position: "relative" }}>
            <BoxComponent
              teamRates={
                !liveData?.stopAt || liveData?.activeStatus !== "result"
                  ? currentMatch?.teamRates
                    ? currentMatch?.teamRates[
                        profitLossDataForMatchConstants[liveData?.type]?.A
                      ]
                      ? currentMatch?.teamRates[
                          profitLossDataForMatchConstants[liveData?.type]?.A
                        ]
                      : 0
                    : 0
                  : 0
              }
              // teamImage={currentMatch?.bookmaker?.teamA_Image}
              livestatus={liveData?.status === "live" ? true : false}
              data={liveData?.runners?.length > 0 ? liveData?.runners[0] : []}
              lock={liveData?.runners?.length > 0 ? false : true}
              name={currentMatch?.teamA}
            />

            <Divider />
            <BoxComponent
              livestatus={liveData?.status === "live" ? true : false}
              teamRates={
                !liveData?.stopAt || liveData?.activeStatus !== "result"
                  ? currentMatch?.teamRates
                    ? currentMatch?.teamRates[
                        profitLossDataForMatchConstants[liveData?.type]?.B
                      ]
                      ? currentMatch?.teamRates[
                          profitLossDataForMatchConstants[liveData?.type]?.B
                        ]
                      : 0
                    : 0
                  : 0
              }
              teamImage={currentMatch?.bookmaker?.teamB_Image}
              lock={liveData?.runners?.length > 0 ? false : true}
              name={currentMatch?.teamB}
              data={liveData?.runners?.length > 0 ? liveData?.runners[1] : []}
              align="end"
            />
            {currentMatch?.teamC && (
              <>
                <Divider />
                <BoxComponent
                  color={"#FF4D4D"}
                  livestatus={liveData?.status === "live" ? true : false}
                  teamRates={
                    !liveData?.stopAt || liveData?.activeStatus !== "result"
                      ? currentMatch?.teamRates
                        ? currentMatch?.teamRates[
                            profitLossDataForMatchConstants[liveData?.type]?.C
                          ]
                          ? currentMatch?.teamRates[
                              profitLossDataForMatchConstants[liveData?.type]?.C
                            ]
                          : 0
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
                  <Typography sx={{ color: "#fff", textAlign: "center" }}>
                    RESULT{" "}
                    {liveData?.stopAt || liveData?.activeStatus === "result"
                      ? "DECLARED"
                      : currentMatch?.resultStatus[liveData?.id]?.status}
                  </Typography>
                </Box>
              )}
          </Box>
        </>
      )}
    </Box>
  );
};

export default SetWinner;
