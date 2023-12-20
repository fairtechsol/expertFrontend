import { Box, TextField, Typography } from "@mui/material";
import StyledImage from "../../Common/StyledImages";
import KeyboardEventHandler from "react-keyboard-event-handler";
import { BallStart, LiveOff, Lock } from "../../../assets";
import CustomDisableInput from "../../Common/CustomDisableInput";
import { handleKeysMatchEvents } from "../../../utils/InputKeys/SessionInputKeys";

const AddSessionInput = (props: any) => {
  const {
    betId,
    inputDetail,
    setInputDetail,
    inputRef,
    lock,
    isBall,
    isCreateSession,
    live,
    isDisable,
    incGap,
    setIncGap,
  } = props;

  const handleSuspend = () => {};

  const handleChange = (event: any) => {
    let targetValue = parseFloat(event.target.value);
    let checkValue = parseFloat(event.target.value);
    setInputDetail((prev: any) => {
      return {
        ...prev,
        no_rate: targetValue,
        yes_rate: targetValue + 1,
        y_rate_percent: checkValue >= 0 ? 100 : "",
        n_rate_percent: checkValue >= 0 ? 100 : "",
        l_no_rate: targetValue,
        l_yes_rate: targetValue + 1,
        ly_rate_percent: checkValue >= 0 ? 100 : "",
        ln_rate_percent: checkValue >= 0 ? 100 : "",
      };
    });
    // handleSuspend();
  };

  return (
    <Box sx={{ border: "2px solid #FFFFFF", position: "relative" }}>
      <Box sx={{ display: "flex" }}>
        <Box sx={{ background: "#319E5B", width: "70%", px: "5px" }}>
          <Typography
            sx={{ color: "white", fontWeight: "600", fontSize: "12px" }}
          >
            {isCreateSession ? "Add" : "Your"} Session
          </Typography>
        </Box>
        <Box
          sx={{
            background: "#FF9292",
            width: "19.5%",
            borderLeft: "2px solid white",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography sx={{ fontWeight: "600", fontSize: "12px" }}>
            No
          </Typography>
        </Box>
        <Box
          sx={{
            background: "#00C0F9",
            width: "19.5%",
            borderLeft: "2px solid white",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography sx={{ fontWeight: "600", fontSize: "12px" }}>
            Yes
          </Typography>
        </Box>
      </Box>
      <Box sx={{ display: "flex" }}>
        <Box sx={{ background: "#FFFFFF", width: "40%" }}>
          <TextField
            onChange={(e: any) => {
              setInputDetail({
                ...inputDetail,
                bet_condition: e.target.value,
              });
            }}
            autoComplete="off"
            disabled={betId ? true : false}
            value={inputDetail.bet_condition}
            variant="standard"
            InputProps={{
              placeholder: "Your Bet Condition Here...",
              disableUnderline: true,
              style: {
                fontSize: "15px",
                marginLeft: "5px",
                height: "45px",
                fontWeight: "600",
                color: "black",
              },
            }}
          />
        </Box>
        <Box
          display={"flex"}
          sx={{ borderLeft: "2px solid white", width: "60%" }}
        >
          <Box sx={{ width: "40%" }}>
            <Box display={"flex"} sx={{ borderTop: "2px solid white" }}>
              <Box
                sx={{
                  background: "#FFB5B5",
                  width: "50%",
                  display: "flex",
                  height: "45px",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography sx={{ fontWeight: "600", fontSize: "14px" }}>
                  <KeyboardEventHandler
                    handleKeys={[
                      "a",
                      "d",
                      "w",
                      "z",
                      "up",
                      "q",
                      "e",
                      "down",
                      "left",
                      "right",
                      // "tab",
                      "shift",
                      // "`",
                      ",",
                      ".",
                      // "/",
                      "enter",
                      "return",
                      "esc",
                      // "*",
                      "plus",
                      // "=",
                      "minus",
                    ]}
                    isDisabled={false}
                    onKeyEvent={(key, e) =>
                      handleKeysMatchEvents(key, e, setInputDetail, inputDetail)
                    }
                  >
                    <TextField
                      disabled={isDisable}
                      onChange={(e) => handleChange(e)}
                      type="Number"
                      autoComplete="off"
                      inputRef={inputRef}
                      value={inputDetail?.l_no_rate}
                      variant="standard"
                      InputProps={{
                        disableUnderline: true,
                        style: {
                          fontSize: "14px",
                          marginLeft: "5px",
                          height: "45px",
                          fontWeight: "600",
                          color: "black",
                        },
                      }}
                    />
                  </KeyboardEventHandler>
                </Typography>
              </Box>
              <Box
                sx={{
                  background: "#A7DCFF",
                  width: "50%",
                  borderLeft: "2px solid white",
                  display: "flex",
                  height: "45px",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography sx={{ fontWeight: "600", fontSize: "14px" }}>
                  <CustomDisableInput
                    type="Number"
                    autoComplete="off"
                    value={inputDetail?.l_yes_rate}
                    variant="standard"
                    disabled={true}
                    InputProps={{
                      disableUnderline: true,
                      style: {
                        fontSize: "14px",
                        marginLeft: "5px",
                        height: "45px",
                        fontWeight: "600",
                        color: "black",
                      },
                    }}
                  />
                </Typography>
              </Box>
            </Box>
            <Box display={"flex"} sx={{ borderTop: "2px solid white" }}>
              <Box
                sx={{
                  background: "#FFB5B5",
                  width: "50%",
                  display: "flex",
                  height: "45px",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography sx={{ fontWeight: "600", fontSize: "14px" }}>
                  <CustomDisableInput
                    type="Number"
                    disabled={true}
                    value={
                      inputDetail?.ln_rate_percent
                        ? inputDetail?.ln_rate_percent
                        : ""
                    }
                    autoComplete="off"
                    variant="standard"
                    InputProps={{
                      disableUnderline: true,
                      style: {
                        fontSize: "14px",
                        marginLeft: "5px",
                        height: "45px",
                        fontWeight: "600",
                        color: "black",
                      },
                    }}
                  />
                </Typography>
              </Box>
              <Box
                sx={{
                  background: "#A7DCFF",
                  width: "50%",
                  borderLeft: "2px solid white",
                  display: "flex",
                  height: "45px",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography sx={{ fontWeight: "600", fontSize: "14px" }}>
                  <CustomDisableInput
                    disabled={true}
                    autoComplete="off"
                    type="Number"
                    value={
                      inputDetail.ly_rate_percent
                        ? inputDetail.ly_rate_percent
                        : ""
                    }
                    variant="standard"
                    InputProps={{
                      disableUnderline: true,
                      style: {
                        fontSize: "14px",
                        marginLeft: "5px",
                        height: "45px",
                        fontWeight: "600",
                        color: "black",
                      },
                    }}
                  />
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box sx={{ width: "60%" }}>
            {!isBall?.isBall ? (
              <>
                <Box display={"flex"} sx={{ borderTop: "2px solid white" }}>
                  <Box
                    sx={{
                      background: lock?.isNo ? "#FDF21A" : "#FFB5B5",
                      width: "50%",
                      display: "flex",
                      height: "45px",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {!lock?.isNo ? (
                      <Typography
                        sx={{
                          fontWeight: "600",
                          fontSize: "18px",
                          color: "black",
                        }}
                      >
                        {inputDetail?.no_rate ? inputDetail?.no_rate : ""}
                      </Typography>
                    ) : (
                      <img
                        src={Lock}
                        alt="Lock"
                        style={{ width: "10px", height: "15px" }}
                      />
                    )}
                  </Box>

                  <Box
                    sx={{
                      background: lock?.isYes ? "#FDF21A" : "#A7DCFF",
                      width: "50%",
                      borderLeft: "2px solid white",
                      display: "flex",
                      height: "45px",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {!lock?.isYes ? (
                      <Typography
                        sx={{
                          fontWeight: "600",
                          fontSize: "18px",
                          color: "black",
                        }}
                      >
                        {inputDetail.yes_rate ? inputDetail.yes_rate : ""}
                      </Typography>
                    ) : (
                      <img
                        src={Lock}
                        alt="Lock"
                        style={{ width: "10px", height: "15px" }}
                      />
                    )}
                  </Box>
                </Box>
                <Box display={"flex"} sx={{ borderTop: "2px solid white" }}>
                  <Box
                    sx={{
                      background: lock?.isNoPercent ? "#FDF21A" : "#FFB5B5",
                      width: "50%",
                      display: "flex",
                      height: "45px",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {!lock?.isNoPercent ? (
                      <Typography
                        sx={{
                          fontWeight: "600",
                          fontSize: "18px",
                          color: "black",
                        }}
                      >
                        {inputDetail.n_rate_percent}
                      </Typography>
                    ) : (
                      <img
                        src={Lock}
                        alt="Lock"
                        style={{ width: "10px", height: "15px" }}
                      />
                    )}
                  </Box>
                  <Box
                    sx={{
                      background: lock?.isYesPercent ? "#FDF21A" : "#A7DCFF",
                      width: "50%",
                      borderLeft: "2px solid white",
                      display: "flex",
                      height: "45px",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {!lock?.isYesPercent ? (
                      <Typography
                        sx={{
                          fontWeight: "600",
                          fontSize: "18px",
                          color: "black",
                        }}
                      >
                        {inputDetail.y_rate_percent}
                      </Typography>
                    ) : (
                      <img
                        src={Lock}
                        alt="Lock"
                        style={{ width: "10px", height: "15px" }}
                      />
                    )}
                  </Box>
                </Box>
              </>
            ) : (
              <Box
                sx={{
                  borderTop: "2px solid white",
                  background: "#000",
                  width: "100%",
                  display: "flex",
                  height: "94px",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img
                  src={BallStart}
                  alt="BallStart"
                  style={{ width: "80%", height: "30%" }}
                />
              </Box>
            )}
          </Box>
        </Box>
      </Box>
      {/* comment */}
      {!live && (
        <Box
          sx={{
            position: "absolute",
            width: "100%",
            top: "0px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            opacity: 1,
            backdropFilter: " blur(1px)",
            "-webkit-backdrop-filter": "blur(1px)",
          }}
        >
          <StyledImage src={LiveOff} sx={{ height: "4vw", width: "4vw" }} />
        </Box>
      )}
    </Box>
  );
};

export default AddSessionInput;
