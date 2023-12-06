import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import RunsAmountBox from "./RunsAmountBox";
import SessionResultModal from "../SessionResult/SessionResultModal";
import AddSessionInput from "./AddSessionInput";

const SessionAddComponent = React.forwardRef((props: any) => {
  const { createSession, match } = props;
  const [isCreateSession] = useState(createSession);

  const [loading] = useState(false);
  const [isDisable, setIsDisable] = useState(false);
  const [showUndeclare, setShowUndeclare] = useState(false);
  const [visible, setVisible] = useState(false);
  const [visible1, setVisible1] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [Detail, setDetail] = useState({});
  const [live] = useState(true);

  const rates = [
    { name: "90-110", value: "90-110" },
    { name: "95-110", value: "95-110" },
    { name: "95-115", value: "95-115" },
    { name: "85-115", value: "85-115" },
    { name: "75-125", value: "75-125" },
    { name: "80-120", value: "80-120" },
    { name: "80-130", value: "80-130" },
    { name: "90-140", value: "90-140" },
    { name: "85-100", value: "85-100" },
    { name: "80-100", value: "80-100" },
    { name: "70-100", value: "70-100" },
    { name: "60-90", value: "60-90" },
    { name: "50-80", value: "50-80" },
    { name: "40-70", value: "40-70" },
    { name: "30-60", value: "30-60" },
    { name: "25-50", value: "25-50" },
    { name: "100-115", value: "100-115" },
    { name: "100-120", value: "100-120" },
    { name: "100-130", value: "100-130" },
    { name: "100-150", value: "100-150" },
    { name: "130-200", value: "130-200" },
    { name: "150-250", value: "150-250" },
    { name: "200-350", value: "200-350" },
    { name: "250-400", value: "250-400" },
  ];
  return (
    <Box
      sx={{
        flex: 1,
        background: "#F8C851",
        borderRadius: "5px",
        minHeight: "42vh",
        py: "25px",
        pt: "5px",
        px: "20px",
      }}
    >
      <Typography
        sx={{ color: "#0B4F26", fontSize: "20px", fontWeight: "600" }}
      >
        {match?.title ? match.title : "India vs Pakistan"}
      </Typography>
      <Box sx={{ display: "flex", marginTop: "6px" }}>
        <Box
          sx={{
            flex: 1,
            justifyContent: "flex-start",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <AddSessionInput
            // createSession={createSession}
            // betId={betId}
            Detail={{ Detail, setDetail }}
            // incGap={{ incGap, setIncGap }}
            // socket={socket}
            // sessionEvent={sessionEvent}
            // lock={lock}
            // inputRef={inputRef}
            // setLock={setLock}
            // isBall={{ isBall, setIsBall }}
            // isCreateSession={isCreateSession}
            // sessionBetId={sessionBetId}
            // match={match}
            // isPercent={{ isPercent, setIsPercent }}
            live={live}
            // isDisable={isDisable}
          />
          <Box sx={{ mt: 2, border: "1px solid black", p: 1 }}>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, 46px)",
                gap: "10px",
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              {rates?.map((item, index) => (
                <Box
                  key={index}
                  sx={{
                    position: "relative",
                    display: "flex",
                    background: true ? "#0B4F26" : "#696969",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "35px",
                    borderRadius: "5px",
                    cursor: "pointer",
                    // p: 1,
                  }}
                >
                  <Typography
                    sx={{
                      color: "white",
                      fontWeight: "500",
                      fontSize: "9px",
                    }}
                  >
                    {item?.name}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mt: "14px",
            }}
          >
            {!isCreateSession ? (
              <>
                {isDisable && showUndeclare && (
                  <Box
                    onClick={(e) => {
                      setVisible1(true);
                      e.stopPropagation();
                    }}
                    sx={{
                      position: "relative",
                      width: "30%",
                      display: "flex",
                      background: "#FF4D4D",
                      maxWidth: "120px",
                      marginLeft: "5px",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "35px",
                      borderRadius: "5px",
                    }}
                  >
                    <Typography
                      sx={{
                        color: "white",
                        fontWeight: "500",
                        fontSize: "12px",
                      }}
                    >
                      Un Declare
                    </Typography>
                    <Box
                      sx={{
                        position: "absolute",
                        zIndex: 999,
                        top: "40px",
                        left: 0,
                      }}
                    >
                      {visible1 && (
                        <SessionResultModal
                          newData={{
                            // id: betId,
                            match_id: match?.id,
                            betStatus: 2,
                          }}
                          undeclare={true}
                          onClick={() => {
                            setVisible1(false);
                            // getSessionResult(match?.id);
                          }}
                          onClickCancel={() => {
                            setVisible1(false);
                          }}
                        />
                      )}
                    </Box>
                  </Box>
                )}
                {!isDisable && (
                  <Box
                    onClick={(e) => {
                      setShowUndeclare(true);
                      setVisible(true);
                      e.stopPropagation();
                    }}
                    sx={{
                      width: "30%",
                      position: "relative",
                      display: "flex",
                      background: "#0B4F26",
                      marginLeft: "5px",
                      maxWidth: "120px",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "35px",
                      borderRadius: "5px",
                    }}
                  >
                    <Typography
                      sx={{
                        color: "white",
                        fontWeight: "500",
                        fontSize: "12px",
                      }}
                    >
                      {/* {resultPending ? "Change Result" : "Declare"} */}
                      Declare
                    </Typography>
                    <Box
                      sx={{
                        position: "absolute",
                        zIndex: 999,
                        top: "40px",
                        left: 0,
                      }}
                    >
                      {visible && (
                        <SessionResultModal
                          newData={{
                            // id: betId,
                            match_id: match?.id,
                            betStatus: 0,
                          }}
                          // setResultPending={setResultPending}
                          onClick={() => {
                            setVisible(false);
                            setIsDisable(true);
                            // getSessionResult(match?.id);
                          }}
                          onClickCancel={() => {
                            setVisible(false);
                          }}
                        />
                      )}
                    </Box>
                  </Box>
                )}
                {!isDisable && (
                  <Box
                    onClick={(e) => {
                      setVisible2(true);
                      e.stopPropagation();
                    }}
                    sx={{
                      width: "30%",
                      position: "relative",
                      display: "flex",
                      background: "#303030",
                      marginLeft: "5px",
                      justifyContent: "center",
                      maxWidth: "120px",
                      alignItems: "center",
                      height: "35px",
                      borderRadius: "5px",
                    }}
                  >
                    <Typography
                      sx={{
                        color: "white",
                        fontWeight: "500",
                        fontSize: "12px",
                      }}
                    >
                      No Result
                    </Typography>
                    <Box
                      sx={{
                        position: "absolute",
                        zIndex: 999,
                        top: "40px",
                        left: 0,
                      }}
                    >
                      {visible2 && (
                        <SessionResultModal
                          newData={{
                            // id: betId,
                            match_id: match?.id,
                            betStatus: 3,
                            isNoResult: true,
                          }}
                          onClick={() => {
                            setIsDisable(true);
                            setVisible2(false);
                            setShowUndeclare(false);
                            // getSessionResult(match?.id);
                          }}
                          onClickCancel={() => {
                            setVisible2(false);
                          }}
                        />
                      )}
                    </Box>
                  </Box>
                )}
              </>
            ) : (
              <Box
                onClick={() => {
                  if (loading) {
                    return true;
                  } else {
                    // doSubmitSessionBet(
                    //   Detail.n_rate_percent + "-" + Detail.y_rate_percent
                    // );
                  }
                }}
                sx={{
                  width: "30%",
                  position: "relative",
                  display: "flex",
                  background: "#0B4F26",
                  marginLeft: "5px",
                  maxWidth: "120px",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "35px",
                  borderRadius: "5px",
                }}
              >
                <Typography
                  sx={{ color: "white", fontWeight: "500", fontSize: "12px" }}
                >
                  {loading ? "Loading" : "Submit"}
                </Typography>
                <Box
                  sx={{
                    position: "absolute",
                    zIndex: 999,
                    top: "40px",
                    left: 0,
                  }}
                >
                  {visible && (
                    <SessionResultModal
                      onClick={() => {
                        setVisible(false);
                      }}
                      onClickCancel={() => {
                        setVisible(false);
                      }}
                    />
                  )}
                </Box>
              </Box>
            )}
          </Box>
        </Box>

        <Box sx={{ marginLeft: "15px", width: "30%" }}>
          {!isCreateSession ? (
            <RunsAmountBox
            // betId={betId}
            // currentOdds={currentOdds?.bet_id === betId ? currentOdds : null}
            // proLoss={proLoss}
            />
          ) : (
            <Box sx={{ width: "162px", minHeight: "182px" }} />
          )}
        </Box>
      </Box>
    </Box>
  );
});

export default SessionAddComponent;
