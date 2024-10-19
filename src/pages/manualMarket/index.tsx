import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ARROWUP } from "../../assets";
import Divider from "../../components/Common/Divider";
import ManualBoxComponent from "../../components/manualMarket/manualBoxComponent";
import Stop from "../../components/matchDetails/SessionMarket/Stop";
import SmallBox from "../../components/matchDetails/SmallBox";
import { formatToINR } from "../../helpers";
import { betLiveStatus } from "../../store/actions/match/matchAction";
import { AppDispatch, RootState } from "../../store/store";
import { profitLossDataForMatchConstants } from "../../utils/Constants";
import ResultComponent from "../../components/updateBookmaker/BookmakerEdit/ResultComponent";
import Result from "../../components/matchDetails/Result";
import { declareMatchStatusReset } from "../../store/actions/match/matchDeclareActions";
import MaxLimitEditButton from "../../components/Common/MaxLimitEditButton";
import MaxBetAdd from "../../components/matchDetails/MaxBetAdd";
const ManualMarket = ({ currentMatch, liveData, type, showResultBox }: any) => {
  const [visible, setVisible] = useState(false);
  const dispatch: AppDispatch = useDispatch();
  const [visibleImg, setVisibleImg] = useState<boolean>(true);
  const [open, setOpen] = useState(false);
  const [live, setLive] = useState<boolean>(
    liveData?.activeStatus === "live" ? true : false
  );
  const { success } = useSelector((state: RootState) => state.match);
  const handleClose = (data: any) => {
    setOpen(data);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  
  useEffect(() => {
    setLive(liveData?.activeStatus === "live" ? true : false);
  }, [liveData?.activeStatus]);

  useEffect(() => {
    if (success) {
      dispatch(declareMatchStatusReset());
      setVisible(false);
    }
  }, [success]);

  return (
    <Box
      sx={{
        boxShadow: "0px 5px 10px #0000001A",
        display: "flex",
        backgroundColor: "white",
        flexDirection: "column",
        width: { lg: "49%", md: "49%", xs: "100%" },
        marginTop: ".3vh",
        // marginX: "0",
        alignSelf: {
          xs: "center",
          md: "flex-start",
          lg: "flex-start",
        },
        position: "relative",
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
          {(!liveData?.id || liveData?.activeStatus === "result") && (
            <Typography
              sx={{
                fontSize: { lg: "9px", md: "9px", xs: "10px" },
                fontWeight: "bold",
                marginLeft: "7px",
              }}
            >
              {liveData?.name}
            </Typography>
          )}
          {liveData?.id && liveData?.activeStatus !== "result" && (
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
              height="18px"
              title={liveData?.name}
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
          {liveData?.activeStatus !== "result" && (
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
              width={{ lg: "25px", xs: "20px" }}
              title={live ? "Live" : "Go Live"}
              color={live ? "#46e080" : "#FF4D4D"}
              customStyle={{
                justifyContent: "center",
                textAlign: "center",
              }}
              height="18px"
            />
          )}
           <MaxLimitEditButton handleClickOpen={handleClickOpen} />

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
          width: { lg: "30vh", xs: "30vh" },
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
          liveData={liveData}
        />
      )}
      {/* </Box> */}
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
                width: { lg: "70%", xs: "50%", md: "60%", sm: "81%" },
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

          <Box sx={{ position: "relative" }}>
            <ManualBoxComponent
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
              status={liveData?.statusTeamA}
              livestatus={liveData?.statusTeamA === "suspended" ? true : false}
              data={{ back: liveData?.backTeamA, lay: liveData?.layTeamA }}
              //   lock={liveData?.runners?.length > 0 ? false : true}
              ballStatus={liveData?.statusTeamA === "ball start" ? true : false}
              name={type === "manualTiedMatch" ? "Yes" : currentMatch?.teamA}
              isTeamC={currentMatch?.teamC}
              currentMatch={currentMatch}
            />

            <Divider />
            <ManualBoxComponent
              livestatus={liveData?.statusTeamB === "suspended" ? true : false}
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
              //   lock={liveData?.runners?.length > 0 ? false : true}
              status={liveData?.statusTeamB}
              ballStatus={liveData?.statusTeamB === "ball start" ? true : false}
              name={type === "manualTiedMatch" ? "No" : currentMatch?.teamB}
              data={{ back: liveData?.backTeamB, lay: liveData?.layTeamB }}
              align="end"
              isTeamC={currentMatch?.teamC}
              currentMatch={currentMatch}
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
                  name={currentMatch?.teamC}
                  status={liveData?.statusTeamC}
                  ballStatus={
                    liveData?.statusTeamC === "ball start" ? true : false
                  }
                  data={{ back: liveData?.backTeamC, lay: liveData?.layTeamC }}
                  align="end"
                  isTeamC={currentMatch?.teamC}
                  currentMatch={currentMatch}
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
            {typeof currentMatch?.resultStatus === "string" &&
            liveData?.id &&
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

export default ManualMarket;
