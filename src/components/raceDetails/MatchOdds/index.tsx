import { Box, Typography } from "@mui/material";
import ModalMUI from "@mui/material/Modal";
import { Fragment, memo, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ARROWUP, edit } from "../../../assets";
import { raceLiveStatus } from "../../../store/actions/match/matchAction";
import { AppDispatch } from "../../../store/store";
import Divider from "../../Common/Divider";
import { formatToINR } from "../../helper";
import MaxBetEdit from "../MaxBetEditBox";
import Result from "../Result";
import ResultComponent from "../ResultComponent";
import SmallBox from "../SmallBox";
import BoxComponent from "./BoxComponent";

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
            <div className="slanted" />
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
                    title={live ? "Live" : "Go Live"}
                    color={live ? "#46e080" : "#FF4D4D"}
                    customStyle={{
                      justifyContent: "center",
                      textAlign: "center",
                    }}
                  />
                </>
              )}
            <img
              onClick={() => {
                setVisibleImg(!visibleImg);
              }}
              src={ARROWUP}
              alt="arrow up"
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
            top: { lg: currentMatch?.stopAt ? "10%" : "6%", xs: "6%" },
            right: { lg: currentMatch?.stopAt ? "-20%" : "60px", xs: "10px" },
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
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        />
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
                  background: "#319E5B",
                  height: "25px",
                  width: { lg: "35%", xs: "65%" },
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
                  <img
                    src={edit}
                    width={18}
                    height={12}
                    // style={{ width: "18px", height: "12px" }}
                    alt="edit"
                    style={{ objectFit: "contain" }}
                  />
                </Box>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  background: "#319E5B",
                  height: "25px",
                  width: { lg: "65%", xs: "35%" },
                  justifyContent: { lg: "center", xs: "flex-end" },
                }}
              >
                <Box
                  sx={{
                    background: "#00C0F9",
                    width: { lg: "16.5%", xs: "50%" },
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
                <Box sx={{ width: ".35%", display: "flex" }} />
                <Box
                  sx={{
                    background: "#FF9292",
                    width: { lg: "16.5%", xs: "50%" },
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
                currentMatch?.matchOdd?.runners?.map((item: any) => {
                  return (
                    <Fragment key={item?.id}>
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
                      />
                      <Divider />
                    </Fragment>
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
                />
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
                  <Typography sx={{ color: "#fff", textAlign: "center" }}>
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

export default memo(MatchOdds);
