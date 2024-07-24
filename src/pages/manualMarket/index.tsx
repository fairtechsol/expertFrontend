import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ARROWUP } from "../../assets";
import Divider from "../../components/Common/Divider";
import ManualBoxComponent from "../../components/manualMarket/manualBoxComponent";
import Stop from "../../components/matchDetails/SessionMarket/Stop";
import SmallBox from "../../components/matchDetails/SmallBox";
import { formatToINR } from "../../helpers";
import { betLiveStatus } from "../../store/actions/match/matchAction";
import { AppDispatch } from "../../store/store";
import { profitLossDataForMatchConstants } from "../../utils/Constants";
import ResultComponent from "../../components/updateBookmaker/BookmakerEdit/ResultComponent";
import Result from "../../components/matchDetails/Result";

const ManualMarket = ({ currentMatch, liveData, type }: any) => {
  const [visible, setVisible] = useState(false);
  const dispatch: AppDispatch = useDispatch();
  const [visibleImg, setVisibleImg] = useState<boolean>(true);
  const [live, setLive] = useState<boolean>(
    liveData?.activeStatus === "live" ? true : false
  );

  useEffect(() => {
    setLive(liveData?.activeStatus === "live" ? true : false);
  }, [liveData?.activeStatus]);

  return (
    <Box
      sx={{
        boxShadow: "0px 5px 10px #0000001A",
        display: "flex",
        backgroundColor: "white",
        flexDirection: "column",
        width: "100%",
        marginTop: ".3vh",
        marginX: "0",
        alignSelf: {
          xs: "center",
          md: "center",
          lg: "flex-start",
        },
        position: "relative",
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
            {liveData?.name}
          </Typography>
          <Stop
            onClick={() => {
              dispatch(
                betLiveStatus({
                  isStop: true,
                  betId: liveData?.id,
                  isManual: true,
                })
              );
              setLive(false);
            }}
          />
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
          {!currentMatch?.matchOdd && liveData?.type === "quickbookmaker1" && (
            <Result
              width={"80px"}
              onClick={() => {
                setVisible(true);
              }}
              invert={true}
            />
          )}
          {!currentMatch?.stopAt && (
            <SmallBox
              onClick={() => {
                dispatch(
                  betLiveStatus({
                    isStop: live,
                    betId: liveData?.id,
                    isManual: true,
                  })
                );
                setLive(!live);
              }}
              // width={"80px"}
              title={live ? "Live" : "Go Live"}
              color={live ? "#46e080" : "#FF4D4D"}
              customStyle={{
                justifyContent: "center",
              }}
            />
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
            <ManualBoxComponent
              teamRates={
                currentMatch?.teamRates
                  ? currentMatch?.teamRates[
                      profitLossDataForMatchConstants[liveData?.type]?.A
                    ]
                    ? currentMatch?.teamRates[
                        profitLossDataForMatchConstants[liveData?.type]?.A
                      ]
                    : 0
                  : 0
              }
              status={liveData?.statusTeamA}
              livestatus={liveData?.statusTeamA === "suspended" ? true : false}
              data={{ back: liveData?.backTeamA, lay: liveData?.layTeamA }}
              //   lock={liveData?.runners?.length > 0 ? false : true}
              ballStatus={liveData?.statusTeamA === "ball start" ? true : false}
              name={type === "manualTiedMatch" ? "Yes" : currentMatch?.teamA}
              isTeamC={currentMatch?.teamC}
            />

            <Divider />
            <ManualBoxComponent
              livestatus={liveData?.statusTeamB === "suspended" ? true : false}
              teamRates={
                currentMatch?.teamRates
                  ? currentMatch?.teamRates[
                      profitLossDataForMatchConstants[liveData?.type]?.B
                    ]
                    ? currentMatch?.teamRates[
                        profitLossDataForMatchConstants[liveData?.type]?.B
                      ]
                    : 0
                  : 0
              }
              //   lock={liveData?.runners?.length > 0 ? false : true}
              status={liveData?.statusTeamB}
              ballStatus={liveData?.statusTeamB === "ball start" ? true : false}
              name={type === "manualTiedMatch" ? "No" : currentMatch?.teamB}
              data={{ back: liveData?.backTeamB, lay: liveData?.layTeamB }}
              align="end"
              isTeamC={currentMatch?.teamC}
            />
            {currentMatch?.teamC && type !== "manualTiedMatch" && (
              <>
                <Divider />
                <ManualBoxComponent
                  color={"#FF4D4D"}
                  livestatus={
                    liveData?.statusTeamC === "suspended" ? true : false
                  }
                  teamRates={
                    currentMatch?.teamRates
                      ? currentMatch?.teamRates[
                          profitLossDataForMatchConstants[liveData?.type]?.C
                        ]
                        ? currentMatch?.teamRates[
                            profitLossDataForMatchConstants[liveData?.type]?.C
                          ]
                        : 0
                      : 0
                  }
                  name={currentMatch?.teamC}
                  status={liveData?.statusTeamC}
                  ballStatus={
                    liveData?.statusTeamC === "ball start" ? true : false
                  }
                  data={{ back: liveData?.backTeamC, lay: liveData?.layTeamC }}
                  align="end"
                  isTeamC={currentMatch?.teamC}
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
            {/* {currentMatch?.resultStatus &&
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
                    RESULT{" "}
                    {liveData?.stopAt || liveData?.activeStatus === "result"
                      ? "DECLARED"
                      : currentMatch?.resultStatus[liveData?.id]?.status}
                  </Typography>
                </Box>
              )} */}
          </Box>
        </>
      )}
    </Box>
  );
};

export default ManualMarket;
