import { Box, TextField, Typography } from "@mui/material";
import KeyboardEventHandler from "react-keyboard-event-handler";
import { BallStart, LiveOff, Lock } from "../../../assets";
import { numberInputOnWheelPreventChange } from "../../../helpers";
import { socketService } from "../../../socketManager";
import { handleKeysMatchEvents } from "../../../utils/InputKeys/Session/SessionInputKeys";
import CustomDisableInput from "../../Common/CustomDisableInput";
import StyledImage from "../../Common/StyledImages";

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
    setLock,
    incGap,
    setIncGap,
    isPercent,
    setIsPercent,
    setIsBall,
    match,
  } = props;

  // const handleSuspend = () => {};

  const handleChange = (event: any) => {
    try {
      const { value } = event.target;
      let targetValue = +value ? +value : 0;
      setLock((prev: any) => {
        return {
          ...prev,
          isNo: true,
          isYes: true,
          isNoPercent: true,
          isYesPercent: true,
        };
      });
      setIsBall(false);
      if (targetValue >= 0 && targetValue <= 999) {
        setInputDetail((prev: any) => {
          return {
            ...prev,
            noRate: targetValue,
            yesRate: targetValue + 1,
            yesRatePercent: targetValue >= 0 ? 100 : "",
            noRatePercent: targetValue >= 0 ? 100 : "",
            leftNoRate: targetValue,
            leftYesRate: targetValue + 1,
            leftYesRatePercent: targetValue >= 0 ? 100 : "",
            leftNoRatePercent: targetValue >= 0 ? 100 : "",
          };
        });
        setInputDetail((prev: any) => {
          let data = {
            matchId: match?.id,
            id: betId,
            noRate: prev?.leftNoRate,
            yesRate: prev?.leftYesRate,
            noPercent: prev?.leftNoRatePercent,
            yesPercent: prev?.leftYesRatePercent,
            status: "suspended",
          };
          socketService.user.updateSessionRate(data);
          return prev;
        });
      } else return;
    } catch (error) {
      console.error(error);
    }
    // handleSuspend();
  };

  return (
    <Box sx={{ border: "2px solid #FFFFFF", position: "relative" }}>
      <Box sx={{ display: "flex" }}>
        <Box sx={{ background: "#319E5B", width: "70%", px: "5px" }}>
          <Typography
            component={"span"}
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
          <Typography
            sx={{ fontWeight: "600", fontSize: "12px" }}
            component={"span"}
          >
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
          <Typography
            sx={{ fontWeight: "600", fontSize: "12px" }}
            component={"span"}
          >
            Yes
          </Typography>
        </Box>
      </Box>
      <Box sx={{ display: "flex" }}>
        <Box sx={{ background: "#FFFFFF", width: "30%" }}>
          <TextField
            onChange={(e: any) => {
              setInputDetail((prev: any) => {
                return {
                  ...prev,
                  betCondition: e.target.value,
                };
              });
            }}
            autoComplete="off"
            disabled={!isCreateSession ? true : false}
            value={inputDetail?.betCondition}
            variant="standard"
            InputProps={{
              placeholder: "Your Bet Condition Here...",
              disableUnderline: true,
              sx: {
                fontSize: { lg: "14px", xs: "8px", sm: "10px", md: "14px" },
              },
              style: {
                // fontSize: "8px",
                marginLeft: "5px",
                height: "45px",
                fontWeight: "600",
                color: "black",
                cursor: !isCreateSession ? "not-allowed" : "auto",
              },
            }}
          />
        </Box>
        <Box
          display={"flex"}
          sx={{ borderLeft: "2px solid white", width: "70%" }}
        >
          {!inputDetail?.result && inputDetail?.resultStatus && (
            <Box
              sx={{
                position: "absolute",
                top: 0,
                right: 0,
                width: "70%",
                height: "100%",
                backgroundColor: "rgba(203 24 24 / 70%)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 999,
              }}
            >
              <Typography
                sx={{ color: "#fff", fontWeight: "bold", fontSize: "14px", textAlign: "center" }}
              >
                RESULT {inputDetail?.resultStatus}
              </Typography>
            </Box>
          )}
          <Box sx={{ width: "57%" }}>
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
                <Typography
                  sx={{ fontWeight: "600", fontSize: "14px" }}
                  component={"span"}
                >
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
                      "shift",
                      ",",
                      ".",
                      "enter",
                      "return",
                      "esc",
                      "plus",
                      "minus",
                    ]}
                    isDisabled={false}
                    onKeyEvent={(key, e) =>
                      handleKeysMatchEvents(
                        betId,
                        match,
                        key,
                        e,
                        setInputDetail,
                        setLock,
                        incGap,
                        setIncGap,
                        isPercent,
                        setIsPercent,
                        setIsBall,
                        isCreateSession
                      )
                    }
                  >
                    <TextField
                      disabled={isDisable}
                      onChange={(e) => handleChange(e)}
                      onWheel={numberInputOnWheelPreventChange}
                      type="Number"
                      autoComplete="off"
                      inputRef={inputRef}
                      value={inputDetail?.leftNoRate}
                      variant="standard"
                      InputProps={{
                        disableUnderline: true,
                        sx: {
                          fontSize: { lg: "14px", xs: "8px", sm: "12px", md: "14px" },
                        },
                        style: {
                          // fontSize: "14px",
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
                <Typography
                  sx={{ fontWeight: "600", fontSize: "14px" }}
                  component={"span"}
                >
                  <CustomDisableInput
                    type="Number"
                    autoComplete="off"
                    value={inputDetail?.leftYesRate}
                    variant="standard"
                    disabled={true}
                    InputProps={{
                      disableUnderline: true,
                      sx: {
                        fontSize: { lg: "14px", xs: "8px", sm: "12px", md: "14px" },
                      },
                      style: {
                        // fontSize: "14px",
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
                <Typography
                  sx={{ fontWeight: "600", fontSize: "14px" }}
                  component={"span"}
                >
                  <CustomDisableInput
                    type="Number"
                    disabled={true}
                    value={
                      inputDetail?.leftNoRatePercent
                        ? inputDetail?.leftNoRatePercent
                        : ""
                    }
                    autoComplete="off"
                    variant="standard"
                    InputProps={{
                      disableUnderline: true,
                      sx: {
                        fontSize: { lg: "14px", xs: "8px", sm: "12px", md: "14px" },
                      },
                      style: {
                        // fontSize: "14px",
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
                <Typography
                  sx={{ fontWeight: "600", fontSize: "14px" }}
                  component={"span"}
                >
                  <CustomDisableInput
                    disabled={true}
                    autoComplete="off"
                    type="Number"
                    value={
                      inputDetail.leftYesRatePercent
                        ? inputDetail.leftYesRatePercent
                        : ""
                    }
                    variant="standard"
                    InputProps={{
                      disableUnderline: true,
                      sx: {
                        fontSize: { lg: "14px", xs: "8px", sm: "12px", md: "14px" },
                      },
                      style: {
                        // fontSize: "14px",
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
            {!isBall ? (
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
                        component={"span"}
                        sx={{
                          fontWeight: "600",
                          // fontSize: "18px",
                          fontSize: { lg: "18px", xs: "10px", sm: "15px", md: "18px" },
                          color: "black",
                        }}
                      >
                        {inputDetail?.noRate ? inputDetail?.noRate : ""}
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
                        component={"span"}
                        sx={{
                          fontWeight: "600",
                          fontSize: { lg: "18px", xs: "10px", sm: "15px", md: "18px" },
                          // fontSize: "18px",
                          color: "black",
                        }}
                      >
                        {inputDetail.yesRate ? inputDetail.yesRate : ""}
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
                        component={"span"}
                        sx={{
                          fontWeight: "600",
                          fontSize: { lg: "18px", xs: "10px", sm: "15px", md: "18px" },
                          // fontSize: "18px",
                          color: "black",
                        }}
                      >
                        {inputDetail.noRatePercent}
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
                        component={"span"}
                        sx={{
                          fontWeight: "600",
                          fontSize: { lg: "18px", xs: "10px", sm: "15px", md: "18px" },
                          // fontSize: "18px",
                          color: "black",
                        }}
                      >
                        {inputDetail.yesRatePercent}
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
