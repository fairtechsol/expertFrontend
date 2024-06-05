import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import Result from "../Result";
import SmallBox from "../SmallBox";
import { ARROWUP, edit } from "../../../assets";
import ResultComponent from "../ResultComponent";
import Divider from "../../Common/Divider";
import BoxComponent from "./BoxComponent";
import { raceLiveStatus } from "../../../store/actions/match/matchAction";
import { AppDispatch } from "../../../store/store";
import { useDispatch } from "react-redux";
import { formatToINR } from "../../helper";
import ModalMUI from "@mui/material/Modal";
import MaxBetEdit from "../MaxBetEditBox";

const MatchOdds = ({ currentMatch, matchOddsLive }: any) => {
  const [visible, setVisible] = useState(false);
  const [visibleImg, setVisibleImg] = useState(true);
  const [maxLimitModal, setShowMaxLimitModal] = useState(false);
  const [live, setLive] = useState(
    matchOddsLive?.activeStatus === "live" ? true : false
  );
  const dispatch: AppDispatch = useDispatch();

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
              Match odds
            </Typography>
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
                        raceLiveStatus({
                          isStop: live,
                          betId: matchOddsLive?.id,
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
            top: { lg: currentMatch?.stopAt ? "10%" : "26%", xs: "26%" },
            right: { lg: currentMatch?.stopAt ? "-20%" : "60px", xs: "60px" },
            width: { lg: "50vh", xs: "30vh" },
          }}
        >
          {visible && (
            <ResultComponent
              currentMatch={currentMatch}
              stopAt={currentMatch?.stopAt}
              tie={currentMatch?.matchType === "cricket" ? "Tie" : ""}
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
                <Box
                  sx={{
                    width: "30px",
                    height: "18px",
                    backgroundColor: "#fff",
                    marginLeft: "5px",
                    zIndex: "999",
                    borderRadius: "3px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    // paddingY: "2px",
                  }}
                  onClick={() => setShowMaxLimitModal(true)}
                >
                  <img src={edit} style={{ width: "18px", height: "12px" }} />
                </Box>
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
              {currentMatch?.matchOdd?.runners?.length > 0 &&
                currentMatch?.matchOdd?.runners?.map((item: any, index:number) => {
                  return (
                    <>
                      <BoxComponent
                        data={item ? item : {}}
                        lock={item !== undefined ? false : true}
                        name={item?.runnerName}
                        currentMatch={currentMatch}
                        teamRates={
                          currentMatch?.profitLossDataMatch
                            ? currentMatch?.profitLossDataMatch[item?.id]
                              ? currentMatch?.profitLossDataMatch[item?.id]
                              : 0
                            : 0
                        }
                        index={index}
                      />
                      <Divider />
                    </>
                  );
                })}

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
              {currentMatch?.resultStatus && (
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
                    {currentMatch?.stopAt ||
                    currentMatch?.activeStatus === "result"
                      ? "DECLARED"
                      : currentMatch?.resultStatus}
                  </Typography>
                </Box>
              )}
            </Box>
          </>
        )}
        <ModalMUI
          open={maxLimitModal}
          aria-labelledby="parent-modal-title"
          aria-describedby="parent-modal-description"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <>
            <MaxBetEdit
              matchOdd={matchOddsLive}
              id={currentMatch?.id}
              onClickCancel={() => {
                setShowMaxLimitModal(false);
              }}
            />
          </>
        </ModalMUI>
      </Box>
    </>
  );
};

export default MatchOdds;
