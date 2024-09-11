import { Box, TextField, Typography, useMediaQuery } from "@mui/material";
import { memo, useEffect, useRef, useState } from "react";
import KeyboardEventHandler from "react-keyboard-event-handler";
import { useDispatch, useSelector } from "react-redux";
import { BallStart, Lock } from "../../../assets";
import { socket, socketService } from "../../../socketManager";
import {
  successReset,
  updateResultStatusOfQuickBookmaker,
} from "../../../store/actions/addSession";
import { AppDispatch, RootState } from "../../../store/store";
import { handleKeysMatchEvents } from "../../../utils/InputKeys/Bookmaker/BookmakerSessionKeys";
import { updateLocalQuickBookmaker } from "../../../utils/InputKeys/Bookmaker/Utils";
import BookButton from "./BookButton";
import ResultComponent from "./ResultComponent";
import theme from "../../../theme";
import { formatToINR, numberInputOnWheelPreventChange } from "../../../helpers";
import { useLocation } from "react-router-dom";
import { profitLossDataForMatchConstants } from "../../../utils/Constants";

const EditBookmaker = (props: any) => {
  const { state } = useLocation();
  const { add, match, Bid, type } = props;
  const dispatch: AppDispatch = useDispatch();
  const matchesMobile = useMediaQuery(theme.breakpoints.down("lg"));
  const { bookmakerById, success } = useSelector(
    (state: RootState) => state.addSession
  );

  const innerRefTeamA: any = useRef();
  const innerRefTeamB: any = useRef();
  const innerRefTeamC: any = useRef();

  const [incGap, setIncGap] = useState<number>(1);

  const [isTab, setIsTab] = useState("");

  const [visible, setVisible] = useState(false);
  const [visible1, setVisible1] = useState(false);

  const [localQuickBookmaker, setLocalQuickBookmaker] = useState<any>({
    teamA: {
      rightBack: 0,
      rightLay: 0,
      lock: true,
      suspended: true,
      lay: 0,
      back: 0,
      layLock: false,
    },
    teamB: {
      rightBack: 0,
      rightLay: 0,
      lock: true,
      suspended: true,
      lay: 0,
      back: 0,
      layLock: false,
    },
    teamC: {
      rightBack: 0,
      rightLay: 0,
      lock: true,
      suspended: true,
      lay: 0,
      back: 0,
      layLock: false,
    },
    teamBall: false,
    teamBackUnlock: true,
  });

  const bookRatioB = (teamARates: any, teamBRates: any) => {
    const bookRatio = teamBRates != 0 ? teamARates / teamBRates || 0 : 0;
    const formattedRatio = Math.abs(bookRatio).toFixed(2);
    return teamBRates < 0 ? `-${formattedRatio}` : formattedRatio;
  };

  const bookRatioA = (teamARates: any, teamBRates: any) => {
    const bookRatio = teamARates != 0 ? teamBRates / teamARates || 0 : 0;
    const formattedRatio = Math.abs(bookRatio).toFixed(2);
    return teamARates < 0 ? `-${formattedRatio}` : formattedRatio;
  };

  const handleChange = (event: any) => {
    try {
      let { name, value } = event.target;
      // const regex = /^\d+(\.\d+)?$/;
      const decimalValue = value.split(".");
      if (decimalValue[1]) {
        return true;
      }

      setIsTab("");

      // if (regex.test(value)) {
      if (
        (!bookmakerById?.rateThan100 && value < 100) ||
        bookmakerById?.rateThan100
      ) {
        if (name === "teamArate") {
          updateLocalQuickBookmaker(
            match,
            Bid,
            type,
            "teamA",
            +value,
            +value + 1,
            setLocalQuickBookmaker
          );
        } else if (name === "teamBrate") {
          updateLocalQuickBookmaker(
            match,
            Bid,
            type,
            "teamB",
            +value,
            +value + 1,
            setLocalQuickBookmaker
          );
        } else if (name === "teamCrate") {
          updateLocalQuickBookmaker(
            match,
            Bid,
            type,
            "teamC",
            +value,
            +value + 1,
            setLocalQuickBookmaker
          );
        }
        setLocalQuickBookmaker((prev: any) => {
          if (
            !prev?.teamA?.suspended ||
            !prev?.teamB?.suspended ||
            !prev?.teamC?.suspended ||
            prev?.teamBall
          ) {
            let data = {
              matchId: match?.id,
              id: Bid,
              type: type,
              backTeamA: prev.teamA.back ? prev.teamA.back : 0,
              backTeamB: prev.teamB.back ? prev.teamB.back : 0,
              backTeamC: prev.teamC.back ? prev.teamC.back : 0,
              layTeamA: prev.teamA.lay ? prev.teamA.lay : 0,
              layTeamB: prev.teamB.lay ? prev.teamB.lay : 0,
              layTeamC: prev.teamC.lay ? prev.teamC.lay : 0,
              statusTeamA: "suspended",
              statusTeamB: "suspended",
              statusTeamC: "suspended",
            };
            socketService.user.updateMatchBettingRate(data);
          }
          return {
            ...prev,
            teamA: { ...prev.teamA, suspended: true },
            teamB: { ...prev.teamB, suspended: true },
            teamC: { ...prev.teamC, suspended: true },
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
    if (event?.matchId === state?.match?.id) {
      dispatch(updateResultStatusOfQuickBookmaker(event));
    }
  };

  useEffect(() => {
    try {
      if (success) {
        setLocalQuickBookmaker((prev: any) => {
          return {
            ...prev,
            teamA: {
              ...prev.teamA,
              back: bookmakerById?.backTeamA
                ? Number(bookmakerById?.backTeamA)
                : 0,
              lay: Number(bookmakerById?.layTeamA)
                ? bookmakerById?.layTeamA
                : 0,
              rightBack: bookmakerById?.backTeamA
                ? Number(bookmakerById?.backTeamA)
                : 0,
              rightLay: Number(bookmakerById?.layTeamA)
                ? bookmakerById?.layTeamA
                : 0,
              suspended: bookmakerById?.statusTeamA !== "active" ? true : false,
            },
            teamB: {
              ...prev.teamB,
              back: bookmakerById?.backTeamB
                ? Number(bookmakerById?.backTeamB)
                : 0,
              lay: bookmakerById?.layTeamB
                ? Number(bookmakerById?.layTeamB)
                : 0,
              rightBack: bookmakerById?.backTeamB
                ? Number(bookmakerById?.backTeamB)
                : 0,
              rightLay: bookmakerById?.layTeamB
                ? Number(bookmakerById?.layTeamB)
                : 0,
              suspended: bookmakerById?.statusTeamB !== "active" ? true : false,
            },
            teamC: {
              ...prev.teamC,
              back: bookmakerById?.backTeamC
                ? Number(bookmakerById?.backTeamC)
                : 0,
              lay: bookmakerById?.layTeamC
                ? Number(bookmakerById?.layTeamC)
                : 0,
              rightBack: bookmakerById?.backTeamC
                ? Number(bookmakerById?.backTeamC)
                : 0,
              rightLay: bookmakerById?.layTeamC
                ? Number(bookmakerById?.layTeamC)
                : 0,
              suspended: bookmakerById?.statusTeamC !== "active" ? true : false,
            },
            teamBall:
              bookmakerById?.statusTeamA === "ball start" &&
              bookmakerById?.statusTeamB === "ball start" &&
              bookmakerById?.statusTeamC === "ball start"
                ? true
                : false,
          };
        });
        if (
          Number(bookmakerById?.backTeamA) &&
          Number(bookmakerById?.backTeamB) &&
          Number(bookmakerById?.backTeamC)
        ) {
          setIsTab("tab");
        } else {
          setIsTab("");
        }
        dispatch(successReset());
      }
    } catch (error) {
      console.log(error);
    }
  }, [bookmakerById, success, state?.id]);

  useEffect(() => {
    try {
      if (socket) {
        socketService.user.updateMatchBettingRateClient((data: any) => {
          if (match?.id === data?.matchId && Bid === data?.id) {
            if (
              data?.statusTeamA === "ball start" &&
              data?.statusTeamB === "ball start" &&
              data?.statusTeamC === "ball start"
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
              return {
                ...prev,
                teamA: {
                  ...prev.teamA,
                  rightBack: data?.backTeamA,
                  rightLay: data?.layTeamA,
                  suspended: data?.statusTeamA !== "active" ? true : false,
                },
                teamB: {
                  ...prev.teamB,
                  rightBack: data?.backTeamB,
                  rightLay: data?.layTeamB,
                  suspended: data?.statusTeamB !== "active" ? true : false,
                },
                teamC: {
                  ...prev.teamC,
                  rightBack: data?.backTeamC,
                  rightLay: data?.layTeamC,
                  suspended: data?.statusTeamC !== "active" ? true : false,
                },
              };
            });
          }
        });
        socketService.user.updateInResultDeclare(updateBookmakerResultStatus);
      }
    } catch (error) {
      console.log(error);
    }
  }, [socket, bookmakerById, state?.id]);

  useEffect(() => {
    try {
      return () => {
        socketService.user.updateMatchBettingRateClientOff();
      };
    } catch (error) {
      console.log(error);
    }
  }, [state?.id, bookmakerById, Bid]);

  const rateA =
    +bookmakerById?.matchRates[
      profitLossDataForMatchConstants[bookmakerById?.type]?.A +
        "_" +
        bookmakerById?.matchId
    ] || 0;

  const rateB =
    +bookmakerById?.matchRates[
      profitLossDataForMatchConstants[bookmakerById?.type]?.B +
        "_" +
        bookmakerById?.matchId
    ] || 0;

  const formattedRateB = rateB.toFixed(2);
  const [integerPartB, decimalPartB] = formattedRateB.split(".");

  const formattedRate = rateA.toFixed(2);
  const [integerPart, decimalPart] = formattedRate.split(".");

  const rateC =
    +bookmakerById?.matchRates[
      profitLossDataForMatchConstants[bookmakerById?.type]?.C +
        "_" +
        bookmakerById?.matchId
    ] || 0;

  const formattedRateC = rateC.toFixed(2);
  const [integerPartC, decimalPartC] = formattedRateC.split(".");

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
            }}
          >
            {bookmakerById?.name}
          </Typography>
        </Box>
        <Box
          sx={{
            flex: 0.1,
            background: "#262626",
          }}
        >
          <div className="slanted"></div>
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
              +bookmakerById?.matchRates[
                profitLossDataForMatchConstants[bookmakerById?.type]?.A
              ] || 0,
              +bookmakerById?.matchRates[
                profitLossDataForMatchConstants[bookmakerById?.type]?.B
              ] || 0
            )}
          />
          <BookButton
            rate={bookRatioB(
              +bookmakerById?.matchRates[
                profitLossDataForMatchConstants[bookmakerById?.type]?.A
              ] || 0,
              +bookmakerById?.matchRates[
                profitLossDataForMatchConstants[bookmakerById?.type]?.B
              ] || 0
            )}
          />
        </Box>
      </Box>
      <Box sx={{ border: "2px solid #FFFFFF", position: "relative" }}>
        {!bookmakerById?.result && bookmakerById?.resultStatus && (
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
              sx={{ color: "#fff", fontWeight: "bold", fontSize: "14px" }}
            >
              RESULT {bookmakerById?.resultStatus}
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
            <Box
              sx={{
                borderWidth: 0,
                justifyContent: "space-between",
                alignItems: "center",
                display: "flex",
                width: "100%",
                paddingLeft: "10px",
              }}
            >
              <Typography
                sx={{ fontSize: "14px", fontWeight: "600", width: "50%" }}
              >
                {type === "tiedMatch2" || type === "completeManual"
                  ? "Yes"
                  : match?.teamA
                  ? match?.teamA.slice(0, 4) +
                    (match?.teamA.length > 4 ? "..." : "")
                  : ""}
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
                      +bookmakerById?.matchRates[
                        profitLossDataForMatchConstants[bookmakerById?.type]
                          ?.A +
                          "_" +
                          bookmakerById?.matchId
                      ] <= 0
                        ? "#FF4D4D"
                        : "#319E5B",
                  }}
                >
                  {/* {bookmakerById?.type !== "tiedMatch2"
                    ? +bookmakerById?.matchRates?.teamARate || 0
                    : +bookmakerById?.matchRates?.yesRateTie || 0} */}
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
                  isDisabled={false}
                  onKeyEvent={(key, e) =>
                    handleKeysMatchEvents(
                      Bid,
                      type,
                      key,
                      e,
                      setLocalQuickBookmaker,
                      innerRefTeamB,
                      innerRefTeamC,
                      innerRefTeamA,
                      match,
                      incGap,
                      setIncGap,
                      isTab,
                      setIsTab,
                      bookmakerById
                    )
                  }
                >
                  <TextField
                    className="InputChild"
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    onWheel={numberInputOnWheelPreventChange}
                    name={"teamArate"}
                    inputRef={innerRefTeamA}
                    // onFocus={() => handleFocus(innerRefTeamA)}
                    type="number"
                    variant="standard"
                    value={+localQuickBookmaker?.teamA?.back}
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
                  value={+localQuickBookmaker?.teamA?.lay}
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

            <Box
              sx={{
                border: ".2px solid #2626264D",
                borderBottomWidth: 0,
                alignItems: "center",
                display: "flex",
                borderRightWidth: 0,
                paddingLeft: "10px",
                borderLeftWidth: 0,
                width: "100%",
                justifyContent: "space-between",
              }}
            >
              <Typography
                sx={{ fontSize: "14px", fontWeight: "600", width: "50%" }}
              >
                {type === "tiedMatch2" || type === "completeManual"
                  ? "No"
                  : match?.teamB
                  ? match?.teamB.slice(0, 4) +
                    (match?.teamB.length > 4 ? "..." : "")
                  : ""}
              </Typography>
              <Box
                sx={{
                  width: { lg: "220px", xs: "120px" },
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
                      +bookmakerById?.matchRates[
                        profitLossDataForMatchConstants[bookmakerById?.type]
                          ?.B +
                          "_" +
                          bookmakerById?.matchId
                      ] <= 0
                        ? "#FF4D4D"
                        : "#319E5B",
                  }}
                >
                  {/* {bookmakerById?.type !== "tiedMatch2"
                    ? +bookmakerById?.matchRates?.teamBRate || 0
                    : +bookmakerById?.matchRates?.noRateTie || 0} */}
                  <span>{formatToINR(integerPartB || 0)}</span>
                  <span
                    style={{ fontSize: "0.8em", fontWeight: "normal" }}
                  >{`.${decimalPartB}`}</span>
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  width: "70%",
                  borderTop: "2px solid white",
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
                  isDisabled={false}
                  onKeyEvent={(key, e) =>
                    handleKeysMatchEvents(
                      Bid,
                      type,
                      key,
                      e,
                      setLocalQuickBookmaker,
                      innerRefTeamB,
                      innerRefTeamC,
                      innerRefTeamA,
                      match,
                      incGap,
                      setIncGap,
                      isTab,
                      setIsTab,
                      bookmakerById
                    )
                  }
                >
                  <TextField
                    // fullWidth
                    className="InputChild"
                    variant="standard"
                    value={+localQuickBookmaker?.teamB?.back}
                    onChange={(e) => handleChange(e)}
                    onWheel={numberInputOnWheelPreventChange}
                    name={"teamBrate"}
                    inputRef={innerRefTeamB}
                    type="number"
                    // onFocus={() => handleFocus(innerRefTeamB)}
                    autoComplete="off"
                    InputProps={{
                      disableUnderline: true,
                      sx: {
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
                  variant="standard"
                  disabled
                  // fullWidth
                  value={+localQuickBookmaker?.teamB?.lay}
                  // onChange={(i) => setTeamBLayValue(i.target.value)}
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
            {match?.teamC &&
              !["tiedMatch2", "completeManual"].includes(type) && (
                <Box
                  sx={{
                    border: ".2px solid #2626264D",
                    borderBottomWidth: 0,
                    alignItems: "center",
                    display: "flex",
                    borderRightWidth: 0,
                    paddingLeft: "10px",
                    borderLeftWidth: 0,
                    width: "100%",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography
                    sx={{ fontSize: "14px", fontWeight: "600", width: "50%" }}
                  >
                    {match?.teamC}
                  </Typography>
                  <Box
                    sx={{
                      width: { lg: "220px", xs: "120px" },
                      marginRight: "10px",
                      border: "1px solid #2626264D",
                      justifyContent: "center",
                      alignItems: "center",
                      display: "flex",
                      height: "55px",
                      background: "#F6F6F6",
                      borderRadius: "7px",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "16px",
                        fontWeight: "bold",
                        color:
                          +bookmakerById?.matchRates[
                            profitLossDataForMatchConstants[bookmakerById?.type]
                              ?.C +
                              "_" +
                              bookmakerById?.matchId
                          ] <= 0
                            ? "#FF4D4D"
                            : "#319E5B",
                      }}
                    >
                      {/* {bookmakerById?.matchRates?.teamCRate || 0} */}
                      <span>{integerPartC}</span>
                      <span
                        style={{ fontSize: "0.8em", fontWeight: "normal" }}
                      >{`.${decimalPartC}`}</span>
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      width: "70%",
                      borderTop: "2px solid white",
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
                      isDisabled={false}
                      onKeyEvent={(key, e) =>
                        handleKeysMatchEvents(
                          Bid,
                          type,
                          key,
                          e,
                          setLocalQuickBookmaker,
                          innerRefTeamB,
                          innerRefTeamC,
                          innerRefTeamA,
                          match,
                          incGap,
                          setIncGap,
                          isTab,
                          setIsTab,
                          bookmakerById
                        )
                      }
                    >
                      <TextField
                        className="InputChild"
                        variant="standard"
                        value={+localQuickBookmaker?.teamC?.back}
                        onChange={(e) => handleChange(e)}
                        onWheel={numberInputOnWheelPreventChange}
                        name={"teamCrate"}
                        inputRef={innerRefTeamC}
                        type="number"
                        autoComplete="off"
                        InputProps={{
                          disableUnderline: true,
                          sx: {
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
                      variant="standard"
                      disabled
                      value={+localQuickBookmaker?.teamC?.lay}
                      InputProps={{
                        disableUnderline: true,
                        // inputProps: { min: "0", max: "100" },
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
              )}
          </Box>

          <Box sx={{ borderLeft: "2px solid white", width: "35%" }}>
            {localQuickBookmaker?.teamBall ? (
              <Box
                sx={{
                  borderTop: "2px solid white",
                  background: "rgba(0,0,0,1)",
                  height:
                    match?.teamC &&
                    !["tiedMatch2", "completeManual"].includes(type)
                      ? "170px"
                      : "112px",
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
                <Box display={"flex"} sx={{ borderTop: "2px solid white" }}>
                  {
                    <Box
                      sx={{
                        background: localQuickBookmaker?.teamA?.suspended
                          ? "#FDF21A"
                          : "#A7DCFF",
                        width: "50%",
                        display: "flex",
                        height: "55px",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      {!localQuickBookmaker?.teamA?.suspended &&
                      localQuickBookmaker?.teamA?.rightBack > 0 ? (
                        <Typography
                          sx={{ fontWeight: "600", fontSize: "22px" }}
                        >
                          {localQuickBookmaker?.teamA?.suspended
                            ? ""
                            : +localQuickBookmaker?.teamA?.rightBack}
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
                          localQuickBookmaker?.teamA?.suspended ||
                          localQuickBookmaker?.teamA?.rightLay === 0
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
                      {!localQuickBookmaker?.teamA?.suspended &&
                      localQuickBookmaker?.teamA?.rightLay ? (
                        <Typography
                          sx={{ fontWeight: "600", fontSize: "22px" }}
                        >
                          {localQuickBookmaker?.teamA?.suspended
                            ? 0
                            : +localQuickBookmaker?.teamA?.rightLay}
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
                <Box display={"flex"} sx={{ borderTop: "2px solid white" }}>
                  {
                    <Box
                      sx={{
                        background: localQuickBookmaker?.teamB?.suspended
                          ? "#FDF21A"
                          : "#A7DCFF",
                        width: "50%",
                        display: "flex",
                        height: "55px",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      {!localQuickBookmaker?.teamB?.suspended &&
                      localQuickBookmaker?.teamB?.rightBack > 0 ? (
                        <Typography
                          sx={{ fontWeight: "600", fontSize: "22px" }}
                        >
                          {localQuickBookmaker?.teamB?.suspended
                            ? ""
                            : +localQuickBookmaker?.teamB?.rightBack}
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
                          localQuickBookmaker?.teamB?.suspended ||
                          localQuickBookmaker?.teamB?.rightLay === 0
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
                      {!localQuickBookmaker?.teamB?.suspended &&
                      localQuickBookmaker?.teamB?.rightLay > 0 ? (
                        <Typography
                          sx={{ fontWeight: "600", fontSize: "22px" }}
                        >
                          {localQuickBookmaker?.teamB?.suspended
                            ? 0
                            : +localQuickBookmaker?.teamB?.rightLay}
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
                {match?.teamC &&
                  !["tiedMatch2", "completeManual"].includes(type) && (
                    <>
                      <Box
                        display={"flex"}
                        sx={{ borderTop: "2px solid white" }}
                      >
                        {
                          <Box
                            sx={{
                              background: localQuickBookmaker?.teamC?.suspended
                                ? "#FDF21A"
                                : "#A7DCFF",
                              width: "50%",
                              display: "flex",
                              height: "56px",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            {!localQuickBookmaker?.teamC?.suspended &&
                            localQuickBookmaker?.teamC?.rightBack > 0 ? (
                              <Typography
                                sx={{ fontWeight: "600", fontSize: "22px" }}
                              >
                                {localQuickBookmaker?.teamC?.suspended
                                  ? ""
                                  : +localQuickBookmaker?.teamC?.rightBack}
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
                                localQuickBookmaker?.teamC?.suspended ||
                                localQuickBookmaker?.teamC?.rightLay === 0
                                  ? "#FDF21A"
                                  : "#FFB5B5",
                              width: "50%",
                              borderLeft: "2px solid white",
                              display: "flex",
                              height: "56px",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            {!localQuickBookmaker?.teamC?.suspended &&
                            localQuickBookmaker?.teamC?.rightLay ? (
                              <Typography
                                sx={{ fontWeight: "600", fontSize: "22px" }}
                              >
                                {localQuickBookmaker?.teamC?.suspended
                                  ? 0
                                  : +localQuickBookmaker?.teamC?.rightLay}
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
                    </>
                  )}
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
          {bookmakerById?.stopAt ? (
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
                  <ResultComponent
                    onClick={() => {
                      setVisible1(false);
                    }}
                    currentMatch={match}
                    teamA={match?.teamA}
                    teamB={match?.teamB}
                    tie={match?.matchType === "cricket" ? "Tie" : ""}
                    draw={
                      match?.teamC &&
                      !["tiedMatch2", "completeManual"].includes(type)
                        ? match?.teamC
                        : ""
                    }
                    stopAt={match?.stopAt}
                    // betStatus={localSelectedBookmaker?.betStatus}
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
                  <ResultComponent
                    onClick={() => {
                      setVisible(false);
                    }}
                    currentMatch={match}
                    stopAt={match?.stopAt}
                    teamA={match?.teamA}
                    teamB={match?.teamB}
                    tie={match?.matchType === "cricket" ? "Tie" : ""}
                    draw={
                      match?.teamC &&
                      !["tiedMatch2", "completeManual"].includes(type)
                        ? match?.teamC
                        : ""
                    }
                    // betStatus={localSelectedBookmaker?.betStatus}
                  />
                )}
              </Box>
            </Box>
          )}
        </Box>
      )}
    </>
  );
};

export default memo(EditBookmaker);
