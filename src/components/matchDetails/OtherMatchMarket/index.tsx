import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ARROWUP } from "../../../assets";
import { betLiveStatus } from "../../../store/actions/match/matchAction";
import { declareMatchStatusReset } from "../../../store/actions/match/matchDeclareActions";
import { AppDispatch, RootState } from "../../../store/store";
import { profitLossDataForMatchConstants } from "../../../utils/Constants";
import AddMarketButton from "../../Common/AddMarketButton";
import Divider from "../../Common/Divider";
import MaxLimitEditButton from "../../Common/MaxLimitEditButton";
import { formatNumber } from "../../helper";
import BoxComponent from "../MatchOdds/BoxComponent";
import Result from "../Result";
import Stop from "../SessionMarket/Stop";
import SmallBox from "../SmallBox";
import OtherMarketAdd from "./OtherMarketAdd";
import ResultComponentOtherMarket from "./ResultComponentOtherMarket";

const OtherMatchMarket = ({
  currentMatch,
  liveData,
  title,
  firstKnownKey,
}: any) => {
  const dispatch: AppDispatch = useDispatch();
  const [visibleImg, setVisibleImg] = useState<boolean>(true);
  const [visible, setVisible] = useState<boolean>(false);
  const [live, setLive] = useState<boolean>(
    liveData?.activeStatus === "live" ? true : false
  );
  const [open, setOpen] = useState(false);
  const { success } = useSelector((state: RootState) => state.match);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (data: any) => {
    setOpen(data);
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
            width: "55%",
          }}
        >
          {(!liveData?.id || liveData?.activeStatus === "result") && (
            <Typography
              sx={{
                fontSize: { lg: "9px", md: "9px", xs: "10px", sm: "8px" },
                fontWeight: "bold",
                marginLeft: "7px",
                lineHeight: 1,
              }}
            >
              {title}
            </Typography>
          )}
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
              title={title}
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
            width: "45%",
          }}
        >
          {liveData?.id ? (
            <>
              {(!currentMatch?.stopAt || firstKnownKey === undefined) && (
                <Result
                  width={"80px"}
                  onClick={() => {
                    setVisible(true);
                  }}
                  invert={true}
                />
              )}
              {liveData?.activeStatus !== "result" && (
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
                    width={{ lg: "25px", xs: "20px" }}
                    title={live ? "Live" : "Go Live"}
                    color={live ? "#46e080" : "#FF4D4D"}
                    customStyle={{
                      justifyContent: "center",
                    }}
                    height="18px"
                  />
                  <MaxLimitEditButton handleClickOpen={handleClickOpen} />
                </>
              )}
            </>
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
      <Divider />
      {/* <Box
        sx={{
          position: "absolute",
          zIndex: 999,
          top: "26%",
          right: "60px",
          width: { lg: "50vh", xs: "30vh" },
        }}
      > */}
      {visible && (
        <ResultComponentOtherMarket
          currentMatch={currentMatch}
          onClick={() => {
            setVisible(false);
          }}
          liveData={liveData}
        />
      )}
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
                {formatNumber(
                  liveData?.id
                    ? liveData?.minBet
                    : currentMatch?.betFairSessionMinBet
                )}{" "}
                MAX: {formatNumber(liveData?.maxBet)}{" "}
                {liveData?.exposureLimit
                  ? `EXP:
                  ${formatNumber(liveData?.exposureLimit)}`
                  : ""}
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
            <BoxComponent
              teamRates={
                liveData?.activeStatus === "result"
                  ? 0
                  : currentMatch?.teamRates
                  ? currentMatch?.teamRates[
                      profitLossDataForMatchConstants[liveData?.type]?.A +
                        "_" +
                        liveData?.id +
                        "_" +
                        currentMatch?.id
                    ]
                    ? currentMatch?.teamRates[
                        profitLossDataForMatchConstants[liveData?.type]?.A +
                          "_" +
                          liveData?.id +
                          "_" +
                          currentMatch?.id
                      ]
                    : 0
                  : 0
              }
              // teamImage={currentMatch?.bookmaker?.teamA_Image}
              livestatus={
                liveData?.runners?.length > 0 &&
                !["ACTIVE", "OPEN", "", "active", "open"].includes(
                  liveData?.runners[0]?.status?.toLowerCase()
                )
                  ? true
                  : false
              }
              data={liveData?.runners?.length > 0 ? liveData?.runners[0] : []}
              lock={liveData?.runners?.length > 0 ? false : true}
              name={
                liveData?.runners?.length > 0
                  ? liveData?.runners[0]?.nat
                  : liveData?.metaData?.teamA
              }
              liveData={liveData}
            />

            <Divider />
            <BoxComponent
              livestatus={
                liveData?.runners?.length > 0 &&
                !["ACTIVE", "OPEN", "", "active", "open"].includes(
                  liveData?.runners[1]?.status?.toLowerCase()
                )
                  ? true
                  : false
              }
              teamRates={
                liveData?.activeStatus === "result"
                  ? 0
                  : currentMatch?.teamRates
                  ? currentMatch?.teamRates[
                      profitLossDataForMatchConstants[liveData?.type]?.B +
                        "_" +
                        liveData?.id +
                        "_" +
                        currentMatch?.id
                    ]
                    ? currentMatch?.teamRates[
                        profitLossDataForMatchConstants[liveData?.type]?.B +
                          "_" +
                          liveData?.id +
                          "_" +
                          currentMatch?.id
                      ]
                    : 0
                  : 0
              }
              teamImage={currentMatch?.bookmaker?.teamB_Image}
              lock={liveData?.runners?.length > 0 ? false : true}
              name={
                liveData?.runners?.length > 0
                  ? liveData?.runners[1]?.nat
                  : liveData?.metaData?.teamB
              }
              data={liveData?.runners?.length > 0 ? liveData?.runners[1] : []}
              align="end"
              liveData={liveData}
            />
            {liveData?.runners?.length>2&&<><Divider />
            <BoxComponent
              livestatus={
                liveData?.runners?.length > 0 &&
                !["ACTIVE", "OPEN", "", "active", "open"].includes(
                  liveData?.runners[1]?.status?.toLowerCase()
                )
                  ? true
                  : false
              }
              teamRates={
                liveData?.activeStatus === "result"
                  ? 0
                  : currentMatch?.teamRates
                  ? currentMatch?.teamRates[
                      profitLossDataForMatchConstants[liveData?.type]?.C +
                        "_" +
                        liveData?.id +
                        "_" +
                        currentMatch?.id
                    ]
                    ? currentMatch?.teamRates[
                        profitLossDataForMatchConstants[liveData?.type]?.C +
                          "_" +
                          liveData?.id +
                          "_" +
                          currentMatch?.id
                      ]
                    : 0
                  : 0
              }
              teamImage={currentMatch?.bookmaker?.teamC_Image}
              lock={liveData?.runners?.length > 0 ? false : true}
              name={
                liveData?.runners?.length > 0
                  ? liveData?.runners[2]?.nat
                  : liveData?.metaData?.teamC
              }
              data={liveData?.runners?.length > 0 ? liveData?.runners[2] : []}
              align="end"
              liveData={liveData}
            /></>}
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
                    RESULT {currentMatch?.resultStatus[liveData?.id]?.status}
                  </Typography>
                </Box>
              )}
            {currentMatch?.otherBettings?.[liveData?.id] && (
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
                  {liveData?.activeStatus === "result"
                    ? "DECLARED"
                    : currentMatch?.otherBettings?.[liveData?.id]}
                </Typography>
              </Box>
            )}
          </Box>
        </>
      )}
      <OtherMarketAdd
        open={open}
        handleClose={handleClose}
        matchOddsLive={liveData}
        currentMatch={currentMatch}
        title={"API Bookmaker Max Bet"}
        exposureLimit={liveData?.exposureLimit}
      />
    </Box>
  );
};

export default OtherMatchMarket;
