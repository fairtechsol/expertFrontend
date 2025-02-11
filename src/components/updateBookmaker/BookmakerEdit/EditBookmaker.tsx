import { Box, TextField, Typography, useMediaQuery } from "@mui/material";
import { memo, useEffect, useState } from "react";
import KeyboardEventHandler from "react-keyboard-event-handler";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { BallStart, Lock } from "../../../assets";
import { formatToINR, numberInputOnWheelPreventChange } from "../../../helpers";
import { socket, socketService } from "../../../socketManager";
import {
  successReset,
  updateResultStatusOfQuickBookmaker,
} from "../../../store/actions/addSession";
import { AppDispatch, RootState } from "../../../store/store";
import theme from "../../../theme";
import { handleKeysMatchEvents } from "../../../utils/InputKeys/Bookmaker/BookmakerSessionKeys";
import { updateLocalQuickBookmaker } from "../../../utils/InputKeys/Bookmaker/Utils";
import BookButton from "./BookButton";
// import MaxLimitEditButtonBook from "../../Common/MaxLimitEditButtonBzook";
import { betLiveStatus } from "../../../store/actions/match/matchAction";
import MaxLimitEditButtonBook from "../../Common/MaxLimitEditButtonBook";
import SmallBox from "../../matchDetails/SmallBox";
import ResultComponentTournamentMarket from "../../matchDetails/TournamentMarkets/ResultComponentTournamentMarket";
import TournamentMarketAdd from "../../matchDetails/TournamentMarkets/TournamentMarketAdd";

const EditBookmaker = (props: any) => {
  const { state } = useLocation();
  const {
    add,
    match,
    type,
    exposureLimit,
    matchBetting,
    runners,
    teamRates,
  } = props;
  const dispatch: AppDispatch = useDispatch();
  const matchesMobile = useMediaQuery(theme.breakpoints.down("lg"));
  const { success } = useSelector((state: RootState) => state.addSession);

  const [incGap, setIncGap] = useState<number>(1);

  const [isTab, setIsTab] = useState("");

  const [visible, setVisible] = useState(false);
  const [visible1, setVisible1] = useState(false);
  const [open, setOpen] = useState(false);
  const [live, setLive] = useState<boolean>(
    matchBetting?.activeStatus === "live" ? true : false
  );
  const [localQuickBookmaker, setLocalQuickBookmaker] = useState<any>({
    teams: runners?.map((item: any) => ({
      ...item,
      rightBack: 0,
      rightLay: 0,
      lock: true,
      suspended: true,
      lay: 0,
      back: 0,
      layLock: false,
    })),
    teamBall: false,
    teamBackUnlock: true,
  });

  const bookRatioB = (teamARates: any, teamBRates: any) => {
    if (+teamARates === 0) {
      return "0.00";
    }
    const bookRatio = teamBRates != 0 ? teamARates / teamBRates || 0 : 0;
    const formattedRatio = Math.abs(bookRatio).toFixed(2);
    return teamBRates < 0 ? `-${formattedRatio}` : formattedRatio;
  };

  const bookRatioA = (teamARates: any, teamBRates: any) => {
    if (+teamBRates === 0) {
      return "0.00";
    }
    const bookRatio = teamARates != 0 ? teamBRates / teamARates || 0 : 0;
    const formattedRatio = Math.abs(bookRatio).toFixed(2);
    return teamARates < 0 ? `-${formattedRatio}` : formattedRatio;
  };

  const handleChange = (event: any) => {
    try {
      if (matchBetting?.resultStatus) {
        return true;
      }
      let { name, value } = event.target;
      const decimalValue = value.split(".");
      if (
        decimalValue[1] &&
        !["2", "25", "5", "7", "75", "", "0"].includes(decimalValue[1])
      ) {
        return true;
      }
      if (decimalValue[1] && incGap !== 0.25) {
        return true;
      }

      setIsTab("");

      // if (regex.test(value)) {
      if ((!match?.rateThan100 && value < 100) || match?.rateThan100) {
        updateLocalQuickBookmaker(
          match,
          matchBetting.id,
          name,
          +value,
          +value + incGap,
          setLocalQuickBookmaker
        );

        setLocalQuickBookmaker((prev: any) => {
          if (
            prev.teams?.find((item: any) => !item.suspended) ||
            prev?.teamBall
          ) {
            let data = {
              matchId: match?.id,
              id: matchBetting.id,
              type: type,
              teams: prev.teams?.map((item: any) => ({
                back: item.back ?? 0,
                lay: item.lay ?? 0,
                id: item.id,
                status: "suspended",
              })),
            };
            socketService.user.updateMatchBettingRate(data);
          }
          return {
            ...prev,
            teams: prev.teams?.map((item: any) => ({
              ...item,
              suspended: true,
            })),
            teamBall: false,
          };
        });
      }
      // }
    } catch (error) {
      console.error(error);
    }
  };

  const updateBookmakerResultStatus = (event: any) => {
    if (event?.matchId === state?.matchId) {
      dispatch(updateResultStatusOfQuickBookmaker(event));
    }
  };

  useEffect(() => {
    try {
      setLive(matchBetting?.activeStatus == "live");
      if (success) {
        setLocalQuickBookmaker((prev: any) => {
          return {
            ...prev,
            teams: runners?.map((items: any) => ({
              ...items,
              back: items.backRate ? Number(items.backRate) : 0,
              lay: Number(items.layRate) ? items.layRate : 0,
              rightBack: items.backRate ? Number(items.backRate) : 0,
              rightLay: Number(items.layRate) ? items.layRate : 0,
              suspended: items?.status !== "active" ? true : false,
            })),
            teamBall: !!prev.teams?.find(
              (items: any) => items.status == "ball start"
            ),
          };
        });
        // if (
        //   Number(bookmakerById?.backTeamA) &&
        //   Number(bookmakerById?.backTeamB) &&
        //   Number(bookmakerById?.backTeamC)
        // ) {
        //   setIsTab("tab");
        // } else {
        //   setIsTab("");
        // }
        dispatch(successReset());
      }
    } catch (error) {
      console.log(error);
    }
  }, [matchBetting, success, state?.betId]);

  useEffect(() => {
    try {
      if (socket) {
        socketService.user.updateMatchBettingRateClient((data: any) => {
          if (match?.id === data?.matchId && matchBetting.id === data?.id) {
            if (
              data.teams?.find((items: any) => items.status == "ball start")
            ) {
              setLocalQuickBookmaker((prev: any) => {
                return {
                  ...prev,
                  teamBall: true,
                };
              });
            } else {
              setLocalQuickBookmaker((prev: any) => {
                return {
                  ...prev,
                  teamBall: false,
                };
              });
            }
            setLocalQuickBookmaker((prev: any) => {
              console.log(
                prev.teams?.map((items: any) => ({
                  ...items,
                  rightBack: data?.teams?.find(
                    (item: any) => item.id == items.id
                  )?.back,
                  rightLay: data?.teams?.find(
                    (item: any) => item.id == items.id
                  )?.lay,
                  suspended:
                    data?.teams?.find((item: any) => item.id == items.id)
                      ?.status !== "active"
                      ? true
                      : false,
                }))
              );
              return {
                ...prev,
                teams: prev.teams?.map((items: any) => ({
                  ...items,
                  rightBack: data?.teams?.find(
                    (item: any) => item.id == items.id
                  )?.back,
                  rightLay: data?.teams?.find(
                    (item: any) => item.id == items.id
                  )?.lay,
                  suspended:
                    data?.teams?.find((item: any) => item.id == items.id)
                      ?.status !== "active"
                      ? true
                      : false,
                })),
              };
            });
          }
        });
        socketService.user.updateInResultDeclare(updateBookmakerResultStatus);
      }
    } catch (error) {
      console.log(error);
    }
  }, [socket, matchBetting, state?.betId]);

  useEffect(() => {
    try {
      return () => {
        socketService.user.updateMatchBettingRateClientOff();
        socketService.user.updateInResultDeclareOff();
      };
    } catch (error) {
      console.log(error);
    }
  }, [matchBetting, state?.betId]);
  return (
    <>
      <Box
        sx={{
          display: "flex",
          height: 38,
          flexDirection: "row",
          width: "100%",
          alignSelf: "center",
          paddingX: 0.2,
          paddingTop: 0.2,
          background: "white",
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
              display: "flex",
              alignItems: "center",
              gap: "5px",
            }}
          >
            {matchBetting?.isCommissionActive && (
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  backgroundColor: "#74ee15",
                }}
              />
            )}
            <Box>
              {matchBetting?.name}
              <span
                style={{
                  fontWeight: "600",
                  fontSize: "10px",
                  backgroundColor: "transparent",
                }}
              >
                {` (Min:${matchBetting?.minBet || 0} Max:${
                  matchBetting?.maxBet || 0
                })`}
              </span>
            </Box>
          </Typography>
          {!matchBetting?.result && (
            <>
              <SmallBox
                onClick={() => {
                  dispatch(
                    betLiveStatus({
                      isStop: live,
                      betId: matchBetting?.id,
                      isManual: false,
                      isTournament: true,
                    })
                  );
                  setLive(!live);
                }}
                width={{ lg: "35px", xs: "20px" }}
                title={live ? "Live" : "Go Live"}
                color={live ? "#46e080" : "#FF4D4D"}
                customStyle={{
                  justifyContent: "center",
                }}
                height="25px"
              />
              <MaxLimitEditButtonBook handleClickOpen={() => setOpen(true)} />
            </>
          )}
        </Box>
        <Box
          sx={{
            flex: 0.1,
            background: "#262626",
          }}
        >
          <div className="slanted-b"></div>
        </Box>
        <Box
          sx={{
            flex: 1,
            background: "#262626",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <BookButton
            rate={bookRatioA(
              +teamRates?.[runners?.[0]?.parentRunnerId || runners?.[0]?.id] ||
                0,
              +teamRates?.[runners?.[1]?.parentRunnerId || runners?.[1]?.id] ||
                0
            )}
          />
          <BookButton
            rate={bookRatioB(
              +teamRates?.[runners?.[0]?.parentRunnerId || runners?.[0]?.id] ||
                0,
              +teamRates?.[runners?.[1]?.parentRunnerId || runners?.[1]?.id] ||
                0
            )}
          />
        </Box>
      </Box>
      <Box sx={{ border: "2px solid #FFFFFF", position: "relative" }}>
        {!live && matchBetting?.result && (
          <Box
            sx={{
              position: "absolute",
              top: "0px",
              left: "0px",
              height: "100%",
              width: "100%",
              background: "rgba(0, 0, 0, 0.5)",
              zIndex: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {" "}
            <Typography
              sx={{
                color: "#fff",
                fontWeight: "bold",
                fontSize: "14px",
                textAlign: "center",
              }}
            >
              RESULT DECLARED
            </Typography>
          </Box>
        )}
        {!matchBetting?.result && matchBetting?.resultStatus && (
          <Box
            sx={{
              position: "absolute",
              // top: 80,
              // right: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(203 24 24 / 70%)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 1,
            }}
          >
            <Typography
              sx={{
                color: "#fff",
                fontWeight: "bold",
                fontSize: "14px",
                textAlign: "center",
              }}
            >
              RESULT {matchBetting?.resultStatus}
            </Typography>
          </Box>
        )}
        <Box sx={{ display: "flex" }}>
          <Box sx={{ background: "#319E5B", width: "75%", px: "5px" }}></Box>
          <Box
            sx={{
              background: "#00C0F9",
              width: "20%",
              borderLeft: "2px solid white",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography sx={{ fontWeight: "600", fontSize: "12px" }}>
              Back
            </Typography>
          </Box>
          <Box
            sx={{
              background: "#FF9292",
              width: "20%",
              borderLeft: "2px solid white",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography sx={{ fontWeight: "600", fontSize: "12px" }}>
              Lay
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: "flex" }}>
          <Box sx={{ background: "#FFFFFF", width: "65%" }}>
            {!add && (
              <Box
                sx={{
                  width: "35%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  position: "absolute",
                  left: "30%",
                  top: "1px",
                  background: "black",
                  height: "100%",
                }}
              >
                <img
                  src={BallStart}
                  style={{
                    width: "80%",
                    height: "30%",
                    position: "absolute",
                    zIndex: 3,
                  }}
                />
              </Box>
            )}
            {localQuickBookmaker?.teams?.map((item: any) => {
              const rate = +teamRates?.[item?.parentRunnerId || item?.id] || 0;

              const formattedRate = rate.toFixed(2);
              const [integerPart, decimalPart] = formattedRate.split(".");
              return (
                <>
                  <Box
                    sx={{
                      borderWidth: 0,
                      justifyContent: "space-between",
                      alignItems: "center",
                      display: "flex",
                      width: "100%",
                      paddingLeft: "10px",
                    }}
                    key={item.id}
                  >
                    <Typography
                      sx={{ fontSize: "14px", fontWeight: "600", width: "50%" }}
                    >
                      {item.runnerName}
                    </Typography>
                    <Box
                      sx={{
                        width: { lg: "220px", xs: "120px" },
                        // my: "5px",

                        marginRight: "10px",
                        border: "1px solid #2626264D",
                        justifyContent: "center",
                        alignItems: "center",
                        display: "flex",
                        height: "50px",
                        background: "#F6F6F6",
                        borderRadius: "7px",
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: "16px",
                          fontWeight: "bold",
                          color:
                            +teamRates?.[item?.parentRunnerId || item?.id] <= 0
                              ? "#FF4D4D"
                              : "#319E5B",
                        }}
                      >
                        <span>{formatToINR(integerPart || 0)}</span>
                        <span
                          style={{ fontSize: "0.8em", fontWeight: "normal" }}
                        >{`.${decimalPart}`}</span>
                      </Typography>
                    </Box>

                    <Box
                      sx={{
                        display: "flex",
                        width: "70%",
                        borderTop: "1px solid white",
                      }}
                    >
                      <KeyboardEventHandler
                        handleKeys={[
                          "d",
                          "a",
                          "w",
                          "z",
                          "up",
                          "down",
                          "left",
                          "right",
                          "tab",
                          "shift",
                          "`",
                          ",",
                          ".",
                          "/",
                          "enter",
                          "return",
                          "esc",
                          "*",
                          "ctrl",
                          "plus",
                          "=",
                          "minus",
                          "l",
                        ]}
                        isDisabled={matchBetting?.resultStatus}
                        onKeyEvent={(key, e) =>
                          handleKeysMatchEvents(
                            matchBetting.id,
                            key,
                            e,
                            setLocalQuickBookmaker,
                            match,
                            incGap,
                            setIncGap,
                            isTab,
                            setIsTab
                          )
                        }
                      >
                        <TextField
                          className="InputChild"
                          onChange={(e) => {
                            handleChange(e);
                          }}
                          onWheel={numberInputOnWheelPreventChange}
                          name={item.id}
                          type="text"
                          variant="standard"
                          value={+item?.back}
                          autoComplete="off"
                          InputProps={{
                            disableUnderline: true,
                            sx: {
                              // position: "relative",
                              height: "55px",
                              width: "90%",
                              background: "#F6F6F6",
                              alignSelf: "flex-end",
                              textAlign: "center",
                              alignItems: "center",
                              paddingX: "2px",
                              color: "#319E5B",
                              fontWeight: "600",
                              backgroundColor: "#A7DCFF",
                            },
                            inputProps: {
                              style: { textAlign: "center" },
                            },
                          }}
                        />
                      </KeyboardEventHandler>
                      <TextField
                        className="InputChild"
                        disabled
                        onChange={(e) => handleChange(e)}
                        variant="standard"
                        value={+item?.lay}
                        InputProps={{
                          disableUnderline: true,
                          sx: {
                            height: "55px",
                            width: "97%",
                            background: "#F6F6F6",
                            alignSelf: "flex-end",
                            alignItems: "center",
                            paddingX: "2px",
                            color: "#319E5B",
                            fontWeight: "600",
                            backgroundColor: "#FFB5B5",
                            textAlign: "center",
                          },
                          inputProps: {
                            style: { textAlign: "center" },
                          },
                        }}
                      />
                    </Box>
                  </Box>
                </>
              );
            })}
          </Box>

          <Box sx={{ borderLeft: "2px solid white", width: "35%" }}>
            {localQuickBookmaker?.teamBall ? (
              <Box
                sx={{
                  borderTop: "2px solid white",
                  background: "rgba(0,0,0,1)",
                  height: "100%",
                  right: 0,
                  width: "100%",
                  justifyContent: { xs: "center", lg: "center" },
                  alignItems: "center",
                  display: "flex",
                  color: "#fff",
                }}
              >
                <img
                  src={BallStart}
                  style={{ width: "90px", height: "27px" }}
                />
              </Box>
            ) : (
              <>
                {localQuickBookmaker?.teams?.map((item: any) => {
                  return (
                    <Box display={"flex"} sx={{ borderTop: "2px solid white" }}>
                      {
                        <Box
                          sx={{
                            background: item?.suspended ? "#FDF21A" : "#A7DCFF",
                            width: "50%",
                            display: "flex",
                            height: "55px",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          {!item?.suspended && item?.rightBack > 0 ? (
                            <Typography
                              sx={{ fontWeight: "600", fontSize: "22px" }}
                            >
                              {item?.suspended ? "" : +item?.rightBack}
                            </Typography>
                          ) : (
                            <img
                              src={Lock}
                              style={{ width: "10px", height: "15px" }}
                            />
                          )}
                        </Box>
                      }
                      {
                        <Box
                          sx={{
                            background:
                              item?.suspended || item?.rightLay === 0
                                ? "#FDF21A"
                                : "#FFB5B5",
                            width: "50%",
                            borderLeft: "2px solid white",
                            display: "flex",
                            height: "55px",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          {!item?.suspended && item?.rightLay ? (
                            <Typography
                              sx={{ fontWeight: "600", fontSize: "22px" }}
                            >
                              {item?.suspended ? 0 : +item?.rightLay}
                            </Typography>
                          ) : (
                            <img
                              src={Lock}
                              style={{ width: "10px", height: "15px" }}
                            />
                          )}
                        </Box>
                      }
                    </Box>
                  );
                })}
              </>
            )}
          </Box>
        </Box>
      </Box>

      {!matchesMobile && (
        <Box
          sx={{
            display: "flex",
            zIndex: 2,
            position: "relative",
            justifyContent: "center",
            width: "100%",
            marginTop: "2%",
            alignSelf: "center",
          }}
        >
          <Box sx={{ width: "2%" }}></Box>
          {match?.stopAt ? (
            <Box
              onClick={(e) => {
                setVisible1(true);
                setVisible(false);
                e.stopPropagation();
              }}
              sx={{
                position: "relative",
                width: "100%",
                display: "flex",
                background: "#FF4D4D",
                maxWidth: "150px",
                marginLeft: "5px",
                justifyContent: "center",
                alignItems: "center",
                height: "45px",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              <Typography
                sx={{ color: "white", fontWeight: "500", fontSize: "12px" }}
              >
                Un Declare
              </Typography>
              <Box
                sx={{
                  position: "absolute",
                  zIndex: 999,
                  top: "40px",
                  left: "-120%",
                }}
              >
                {visible1 && (
                  <ResultComponentTournamentMarket
                    currentMatch={match}
                    // stopAt={liveData?.stopAt}
                    onClick={() => {
                      setVisible(false);
                    }}
                    liveData={{ ...matchBetting, runners: runners }}
                  />
                )}
              </Box>
            </Box>
          ) : (
            /* <Box sx={{ width: '2%' }} ></Box> */

            <Box
              onClick={(e) => {
                setVisible(true);
                setVisible1(false);
                e.stopPropagation();
              }}
              sx={{
                width: "100%",
                position: "relative",
                display: "flex",
                background: "white",
                marginLeft: "5px",
                maxWidth: "150px",
                justifyContent: "center",
                alignItems: "center",
                height: "45px",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              <Typography
                sx={{ color: "#0B4F26", fontWeight: "500", fontSize: "12px" }}
              >
                Declare
              </Typography>
              <Box
                sx={{
                  position: "absolute",
                  zIndex: 999,
                  top: "40px",
                  right: 0,
                  width: { lg: "50vh", xs: "30vh" },
                }}
              >
                {visible && (
                  <ResultComponentTournamentMarket
                    currentMatch={match}
                    // stopAt={liveData?.stopAt}
                    onClick={() => {
                      setVisible(false);
                    }}
                    liveData={{ ...matchBetting, runners: runners }}
                  />
                )}
              </Box>
            </Box>
          )}
        </Box>
      )}
      <TournamentMarketAdd
        open={open}
        handleClose={() => setOpen(false)}
        matchOddsLive={{ ...(matchBetting || {}), runners: runners }}
        currentMatch={match}
        title={`${matchBetting?.name} Max Bet`}
        exposureLimit={exposureLimit}
        isManual={true}
        isCommissionActive={matchBetting?.isCommissionActive}
      />
    </>
  );
};

export default memo(EditBookmaker);
