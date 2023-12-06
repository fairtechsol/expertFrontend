import { useState } from "react";
import { Box, TextField, Typography } from "@mui/material";
import { BallStart, Lock } from "../../../assets";
import KeyboardEventHandler from "react-keyboard-event-handler";
import BookButton from "./BookButton";
import ResultComponent from "./ResultComponent";

const EditBookmaker = (props: any) => {
  const { add, match } = props;
  const [teamRates] = useState({
    teamA: "",
    teamB: "",
    teamC: "",
  });

  const [visible, setVisible] = useState(false);
  const [visible1, setVisible1] = useState(false);

  const [localQuickBookmaker] = useState({
    teamA: {
      rate: null,
      lock: true,
      suspended: true,
      lay: null,
      back: null,
      layLock: false,
    },
    teamB: {
      rate: null,
      lock: true,
      suspended: true,
      lay: null,
      back: null,
      layLock: false,
    },
    teamC: {
      rate: null,
      lock: true,
      suspended: true,
      lay: null,
      back: null,
      layLock: false,
    },
    teamBall: {
      isABall: false,
      isBBall: false,
      isCBall: false,
    },
    teamSuspended: {
      teamA_suspend: true,
      teamB_suspend: true,
      teamC_suspend: true,
    },
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
            Test
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
          <BookButton rate={bookRatioA(teamRates?.teamA, teamRates?.teamB)} />
          <BookButton rate={bookRatioB(teamRates?.teamA, teamRates?.teamB)} />
        </Box>
      </Box>
      <Box sx={{ border: "2px solid #FFFFFF" }}>
        <Box sx={{ display: "flex" }}>
          <Box sx={{ background: "#319E5B", width: "60%", px: "5px" }}></Box>
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
          <Box
            sx={{ background: "#FFFFFF", width: "60%", position: "relative" }}
          >
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
                {match?.teamA}
              </Typography>
              <Box
                sx={{
                  width: "180px",
                  // my: "5px",
                  marginRight: "15px",
                  border: "1px solid #2626264D",
                  justifyContent: "center",
                  alignItems: "center",
                  display: "flex",
                  height: "50px",
                  background: "#F6F6F6",
                  borderRadius: "7px",
                  zIndex: 100,
                }}
              >
                <Typography
                  sx={{
                    fontSize: "16px",
                    fontWeight: "bold",
                    color: +teamRates?.teamA <= 0 ? "#FF4D4D" : "#46e080",
                  }}
                >
                  {teamRates?.teamA}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  width: "30%",
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
                  // onKeyEvent={(key, e) => handleKeysMatchEvents(key, e)}
                >
                  <TextField
                    className="InputChild"
                    // onChange={handleChange}
                    name={"teamA_rate"}
                    // inputRef={innerRefTeamA}
                    // onFocus={() => handleFocus(innerRefTeamA)}
                    type="number"
                    variant="standard"
                    // fullWidth
                    // value={lQuickBookMaker?.l_teamARate}
                    InputProps={{
                      disableUnderline: true,
                      // inputProps: { min: "0", max: "100" },
                      sx: {
                        height: "55px",
                        width: "98%",
                        background: "#F6F6F6",
                        // border: '1px solid #2626264D',
                        // borderRadius: '4px',
                        // border: "0.5px solid white",
                        alignSelf: "flex-end",
                        textAlign: "center",
                        alignItems: "center",
                        paddingX: "2px",
                        color: "#319E5B",
                        fontWeight: "600",
                        backgroundColor: "#A7DCFF",
                      },
                    }}
                  />
                </KeyboardEventHandler>
                <TextField
                  // fullWidth
                  className="InputChild"
                  disabled
                  // onChange={(e) => handleChange(e)}
                  variant="standard"
                  // value={lQuickBookMaker?.l_teamALayValue}
                  InputProps={{
                    disableUnderline: true,
                    // inputProps: { min: "0", max: "100" },
                    sx: {
                      height: "55px",
                      width: "97%",
                      background: "#F6F6F6",
                      // border: '1px solid #2626264D',
                      // borderRadius: '4px',
                      // border: "0.5px solid white",
                      alignSelf: "flex-end",
                      alignItems: "center",
                      paddingX: "2px",
                      color: "#319E5B",
                      fontWeight: "600",
                      backgroundColor: "#FFB5B5",
                      textAlign: "center",
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
                {match?.teamB}
              </Typography>
              <Box
                sx={{
                  width: "180px",
                  marginRight: "15px",
                  border: "1px solid #2626264D",
                  justifyContent: "center",
                  alignItems: "center",
                  display: "flex",
                  height: "50px",
                  background: "#F6F6F6",
                  borderRadius: "7px",
                  zIndex: 100,
                }}
              >
                <Typography
                  sx={{
                    fontSize: "16px",
                    fontWeight: "bold",
                    color: +teamRates?.teamB <= 0 ? "#FF4D4D" : "#319E5B",
                  }}
                >
                  {teamRates?.teamB}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  width: "30%",
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
                  // onKeyEvent={(key, e) => handleKeysMatchEvents(key, e)}
                >
                  <TextField
                    // fullWidth
                    className="InputChild"
                    variant="standard"
                    // value={lQuickBookMaker?.l_teamBRate}
                    // onChange={handleChange}
                    name={"teamB_rate"}
                    // inputRef={innerRefTeamB}
                    type="number"
                    // onFocus={() => handleFocus(innerRefTeamB)}
                    // onChange={(i) => setValue2(i.target.value)}
                    InputProps={{
                      disableUnderline: true,
                      // inputProps: { min: "0", max: "100" },
                      sx: {
                        height: "55px",
                        width: "98%",
                        background: "#F6F6F6",
                        // border: '1px solid #2626264D',
                        // borderRadius: '4px',
                        // border: "0.5px solid white",
                        alignSelf: "flex-end",
                        textAlign: "center",
                        alignItems: "center",
                        paddingX: "2px",
                        color: "#319E5B",
                        fontWeight: "600",
                        backgroundColor: "#A7DCFF",
                      },
                    }}
                  />
                </KeyboardEventHandler>
                <TextField
                  className="InputChild"
                  variant="standard"
                  disabled
                  // fullWidth
                  // value={lQuickBookMaker?.l_teamBLayValue}
                  // onChange={(i) => setTeamBLayValue(i.target.value)}
                  InputProps={{
                    disableUnderline: true,
                    // inputProps: { min: "0", max: "100" },
                    sx: {
                      height: "55px",
                      width: "97%",
                      background: "#F6F6F6",
                      // border: '1px solid #2626264D',
                      // borderRadius: '4px',
                      // border: "0.5px solid white",
                      alignSelf: "flex-end",
                      alignItems: "center",
                      paddingX: "2px",
                      color: "#319E5B",
                      fontWeight: "600",
                      backgroundColor: "#FFB5B5",
                      textAlign: "center",
                    },
                  }}
                />
              </Box>
            </Box>
            {match?.teamC && (
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
                    width: "180px",
                    marginRight: "15px",
                    border: "1px solid #2626264D",
                    justifyContent: "center",
                    alignItems: "center",
                    display: "flex",
                    height: "55px",
                    background: "#F6F6F6",
                    borderRadius: "7px",
                    zIndex: 100,
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "14px",
                      fontWeight: "bold",
                      color: +teamRates?.teamC <= 0 ? "#FF4D4D" : "#46e080",
                    }}
                  >
                    {teamRates?.teamC}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    width: "30%",
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
                    // onKeyEvent={(key, e) => handleKeysMatchEvents(key, e)}
                  >
                    <TextField
                      className="InputChild"
                      variant="standard"
                      // value={lQuickBookMaker?.l_teamCRate}
                      // onChange={handleChange}
                      name={"teamC_rate"}
                      // inputRef={innerRefTeamC}
                      type="number"
                      // fullWidth
                      // onFocus={() => handleFocus(innerRefTeamC)}
                      // onChange={(i) => setValue2(i.target.value)}
                      InputProps={{
                        disableUnderline: true,
                        // inputProps: { min: "0", max: "100" },
                        sx: {
                          height: "55px",
                          width: "98%",
                          background: "#F6F6F6",
                          alignSelf: "flex-end",
                          textAlign: "center",
                          alignItems: "center",
                          paddingX: "2px",
                          color: "#319E5B",
                          fontWeight: "600",
                          backgroundColor: "#A7DCFF",
                        },
                      }}
                    />
                  </KeyboardEventHandler>
                  <TextField
                    className="InputChild"
                    variant="standard"
                    disabled
                    // value={lQuickBookMaker?.l_teamCLayValue}
                    InputProps={{
                      disableUnderline: true,
                      // inputProps: { min: "0", max: "100" },
                      sx: {
                        height: "55px",
                        width: "97%",
                        background: "#F6F6F6",
                        // border: '1px solid #2626264D',
                        // borderRadius: '4px',
                        // border: "0.5px solid white",
                        alignSelf: "flex-end",
                        alignItems: "center",
                        paddingX: "2px",
                        color: "#319E5B",
                        fontWeight: "600",
                        backgroundColor: "#FFB5B5",
                        textAlign: "center",
                      },
                    }}
                  />
                </Box>
              </Box>
            )}
          </Box>

          <Box sx={{ borderLeft: "2px solid white", width: "40%" }}>
            {localQuickBookmaker?.teamBall?.isABall ? (
              <Box
                sx={{
                  borderTop: "2px solid white",
                  background: "rgba(0,0,0,1)",
                  height: match?.teamC ? "170px" : "112px",
                  right: 0,
                  // position: "absolute",
                  width: "100%",
                  // width: { lg: "50%", xs: "40.5%" },
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
                {/* {!teamBall?.isABall ?  */}
                <Box display={"flex"} sx={{ borderTop: "2px solid white" }}>
                  {!localQuickBookmaker?.teamBackUnlock ? (
                    <Box
                      sx={{
                        background: localQuickBookmaker?.teamBackUnlock
                          ? "#FDF21A"
                          : "#A7DCFF",
                        width: "50%",
                        display: "flex",
                        height: "55px",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      {!localQuickBookmaker?.teamBackUnlock ? (
                        <Typography
                          sx={{ fontWeight: "600", fontSize: "22px" }}
                        >
                          {localQuickBookmaker?.teamBackUnlock
                            ? 0
                            : localQuickBookmaker?.teamA?.rate}
                        </Typography>
                      ) : (
                        <img
                          src={Lock}
                          style={{ width: "10px", height: "15px" }}
                        />
                      )}
                    </Box>
                  ) : (
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
                      {!localQuickBookmaker?.teamA?.suspended ? (
                        <Typography
                          sx={{ fontWeight: "600", fontSize: "22px" }}
                        >
                          {localQuickBookmaker?.teamA?.suspended
                            ? 0
                            : localQuickBookmaker?.teamA?.rate}
                        </Typography>
                      ) : (
                        <img
                          src={Lock}
                          style={{ width: "10px", height: "15px" }}
                        />
                      )}
                    </Box>
                  )}
                  {localQuickBookmaker?.teamA?.layLock ? (
                    <Box
                      sx={{
                        background:
                          localQuickBookmaker?.teamA?.lay === null
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
                      {localQuickBookmaker?.teamA?.lay ? (
                        <Typography
                          sx={{ fontWeight: "600", fontSize: "22px" }}
                        >
                          {localQuickBookmaker?.teamA?.lay}
                        </Typography>
                      ) : (
                        <img
                          src={Lock}
                          style={{ width: "10px", height: "15px" }}
                        />
                      )}
                    </Box>
                  ) : (
                    <Box
                      sx={{
                        background:
                          localQuickBookmaker?.teamA?.suspended ||
                          localQuickBookmaker?.teamA?.lay === null
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
                      localQuickBookmaker?.teamA?.lay ? (
                        <Typography
                          sx={{ fontWeight: "600", fontSize: "22px" }}
                        >
                          {localQuickBookmaker?.teamA?.suspended
                            ? 0
                            : localQuickBookmaker?.teamA?.lay}
                        </Typography>
                      ) : (
                        <img
                          src={Lock}
                          style={{ width: "10px", height: "15px" }}
                        />
                      )}
                    </Box>
                  )}
                </Box>
                <Box display={"flex"} sx={{ borderTop: "2px solid white" }}>
                  {!localQuickBookmaker?.teamBackUnlock ? (
                    <Box
                      sx={{
                        background: localQuickBookmaker?.teamBackUnlock
                          ? "#FDF21A"
                          : "#A7DCFF",
                        width: "50%",
                        display: "flex",
                        height: "55px",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      {!localQuickBookmaker?.teamBackUnlock ? (
                        <Typography
                          sx={{ fontWeight: "600", fontSize: "22px" }}
                        >
                          {localQuickBookmaker?.teamBackUnlock
                            ? 0
                            : localQuickBookmaker?.teamB?.rate}
                        </Typography>
                      ) : (
                        <img
                          src={Lock}
                          style={{ width: "10px", height: "15px" }}
                        />
                      )}
                    </Box>
                  ) : (
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
                      {!localQuickBookmaker?.teamB?.suspended ? (
                        <Typography
                          sx={{ fontWeight: "600", fontSize: "22px" }}
                        >
                          {localQuickBookmaker?.teamB?.suspended
                            ? 0
                            : localQuickBookmaker?.teamB?.rate}
                        </Typography>
                      ) : (
                        <img
                          src={Lock}
                          style={{ width: "10px", height: "15px" }}
                        />
                      )}
                    </Box>
                  )}
                  {localQuickBookmaker?.teamB?.layLock ? (
                    <Box
                      sx={{
                        background:
                          localQuickBookmaker?.teamB?.lay === null
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
                      {localQuickBookmaker?.teamB?.lay ? (
                        <Typography
                          sx={{ fontWeight: "600", fontSize: "22px" }}
                        >
                          {localQuickBookmaker?.teamB?.lay}
                        </Typography>
                      ) : (
                        <img
                          src={Lock}
                          style={{ width: "10px", height: "15px" }}
                        />
                      )}
                    </Box>
                  ) : (
                    <Box
                      sx={{
                        background:
                          localQuickBookmaker?.teamB?.suspended ||
                          localQuickBookmaker?.teamB?.lay === null
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
                      localQuickBookmaker?.teamB?.lay ? (
                        <Typography
                          sx={{ fontWeight: "600", fontSize: "22px" }}
                        >
                          {localQuickBookmaker?.teamB?.suspended
                            ? 0
                            : localQuickBookmaker?.teamB?.lay}
                        </Typography>
                      ) : (
                        <img
                          src={Lock}
                          style={{ width: "10px", height: "15px" }}
                        />
                      )}
                    </Box>
                  )}
                </Box>
                {match?.teamC && (
                  <>
                    {/* {!teamBall?.isCBall ?  */}
                    <Box display={"flex"} sx={{ borderTop: "2px solid white" }}>
                      {!localQuickBookmaker?.teamBackUnlock ? (
                        <Box
                          sx={{
                            background: localQuickBookmaker?.teamBackUnlock
                              ? "#FDF21A"
                              : "#A7DCFF",
                            width: "50%",
                            display: "flex",
                            height: "56px",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          {!localQuickBookmaker?.teamBackUnlock ? (
                            <Typography
                              sx={{ fontWeight: "600", fontSize: "22px" }}
                            >
                              {localQuickBookmaker?.teamBackUnlock
                                ? 0
                                : localQuickBookmaker?.teamC?.rate}
                            </Typography>
                          ) : (
                            <img
                              src={Lock}
                              style={{ width: "10px", height: "15px" }}
                            />
                          )}
                        </Box>
                      ) : (
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
                          {!localQuickBookmaker?.teamC?.suspended ? (
                            <Typography
                              sx={{ fontWeight: "600", fontSize: "22px" }}
                            >
                              {localQuickBookmaker?.teamC?.suspended
                                ? 0
                                : localQuickBookmaker?.teamC?.rate}
                            </Typography>
                          ) : (
                            <img
                              src={Lock}
                              style={{ width: "10px", height: "15px" }}
                            />
                          )}
                        </Box>
                      )}
                      {localQuickBookmaker?.teamC?.layLock ? (
                        <Box
                          sx={{
                            background:
                              localQuickBookmaker?.teamC?.lay === null
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
                          {localQuickBookmaker?.teamC?.lay ? (
                            <Typography
                              sx={{ fontWeight: "600", fontSize: "22px" }}
                            >
                              {localQuickBookmaker?.teamC?.lay}
                            </Typography>
                          ) : (
                            <img
                              src={Lock}
                              style={{ width: "10px", height: "15px" }}
                            />
                          )}
                        </Box>
                      ) : (
                        <Box
                          sx={{
                            background:
                              localQuickBookmaker?.teamC?.suspended ||
                              localQuickBookmaker?.teamC?.lay === null
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
                          localQuickBookmaker?.teamC?.lay ? (
                            <Typography
                              sx={{ fontWeight: "600", fontSize: "22px" }}
                            >
                              {localQuickBookmaker?.teamC?.suspended
                                ? 0
                                : localQuickBookmaker?.teamC?.lay}
                            </Typography>
                          ) : (
                            <img
                              src={Lock}
                              style={{ width: "10px", height: "15px" }}
                            />
                          )}
                        </Box>
                      )}
                    </Box>
                  </>
                )}
              </>
            )}
          </Box>
        </Box>
      </Box>
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
        {false ? (
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
                  // betId={[
                  //   { match_id: match?.id, id: localSelectedBookmaker?.betId },
                  // ]}
                  teamA={match?.teamA}
                  teamB={match?.teamB}
                  tie={"Tie"}
                  draw={match?.teamC ? match?.teamC : ""}
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
              }}
            >
              {visible && (
                <ResultComponent
                  onClick={() => {
                    setVisible(false);
                  }}
                  // betId={[
                  //   { match_id: match?.id, id: localSelectedBookmaker?.betId },
                  // ]}
                  teamA={match?.teamA}
                  teamB={match?.teamB}
                  tie={"Tie"}
                  draw={match?.teamC ? match?.teamC : ""}
                  // betStatus={localSelectedBookmaker?.betStatus}
                />
              )}
            </Box>
          </Box>
        )}
      </Box>
    </>
  );
};

export default EditBookmaker;
