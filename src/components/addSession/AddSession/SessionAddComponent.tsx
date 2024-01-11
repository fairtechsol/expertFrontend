import { useEffect, useRef, useState } from "react";
import { Box, Typography } from "@mui/material";
import RunsAmountBox from "./RunsAmountBox";
import SessionResultModal from "../SessionResult/SessionResultModal";
import AddSessionInput from "./AddSessionInput";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { addSession, getSessionById } from "../../../store/actions/addSession";
import { socketService } from "../../../socketManager";

const stateDetail = {
  match_id: "",
  matchType: "",
  sessionBet: true,
  betStatus: 1,
  betCondition: "",
  leftNoRate: "",
  leftYesRate: "",
  leftYesRatePercent: "",
  leftNoRatePercent: "",
  noRate: "",
  yesRate: "",
  yesRatePercent: "",
  noRatePercent: "",
  status: "active",
};

const SessionAddComponent = (props: any) => {
  const { createSession, sessionEvent, match } = props;
  const dispatch: AppDispatch = useDispatch();
  const inputRef: any = useRef(null);
  const { sessionById, selectedSessionId } = useSelector(
    (state: RootState) => state.addSession
  );

  const [isCreateSession, setIsCreateSession] = useState(createSession);
  useEffect(() => {
    setIsCreateSession(createSession);
  }, [createSession]);

  const [loading] = useState(false);
  const [incGap, setIncGap] = useState<number>(1);
  const [isPercent, setIsPercent] = useState<string>("");
  const [isBall, setIsBall] = useState<boolean>(false);
  const [inputDetail, setInputDetail] = useState<any>(stateDetail);
  const [isDisable, setIsDisable] = useState(false);
  const [showUndeclare, setShowUndeclare] = useState(false);
  const [visible, setVisible] = useState(false);
  const [visible1, setVisible1] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [betId, setBetId] = useState("");
  const [lock, setLock] = useState<any>({
    isNo: true,
    isYes: true,
    isNoPercent: true,
    isYesPercent: true,
  });
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

  const addSessions = () => {
    const payload = {
      matchId: match?.id,
      type: "session",
      name: inputDetail?.betCondition,
      // minBet: "any",
      // maxBet: "any",
      yesRate: inputDetail?.leftYesRate,
      noRate: inputDetail?.leftNoRate,
      yesPercent: inputDetail?.leftYesRatePercent,
      noPercent: inputDetail?.leftNoRatePercent,
    };
    dispatch(addSession(payload));
    setIsCreateSession(false);
  };

  const handleLiveChange = (yesRatePercent: number, noRatePercent: number) => {
    let data = {
      matchId: match?.id,
      id: betId,
      noRate: inputDetail?.leftNoRate,
      yesRate: inputDetail?.leftYesRate,
      noPercent: noRatePercent,
      yesPercent: yesRatePercent,
      status: "active",
    };

    setLock({
      ...lock,
      isNo: inputDetail.leftNoRate > 0 ? false : true,
      isYes: false,
      isNoPercent: false,
      isYesPercent: false,
    });
    setIsBall(false);
    socketService.user.updateSessionRate(data);
  };

  useEffect(() => {
    if (sessionEvent?.id || selectedSessionId) {
      dispatch(
        getSessionById({
          matchId: match?.id,
          id: sessionEvent?.id || selectedSessionId,
        })
      );
      setBetId(sessionEvent?.id || selectedSessionId);
    } else if (isCreateSession) {
      setBetId("");
    }
  }, [sessionEvent?.id, selectedSessionId]);

  useEffect(() => {
    if (!isCreateSession && sessionById !== null) {
      if (sessionById?.status === "suspended") {
        setIsBall(false);
        setLock({
          isNo: true,
          isYes: true,
          isNoPercent: true,
          isYesPercent: true,
        });
      } else if (sessionById?.status === "ball start") {
        setIsBall(true);
        setLock({
          isNo: false,
          isYes: false,
          isNoPercent: false,
          isYesPercent: false,
        });
      } else {
        setIsBall(false);
        setLock({
          isNo: false,
          isYes: false,
          isNoPercent: false,
          isYesPercent: false,
        });
      }
      setInputDetail((prev: any) => {
        return {
          ...prev,
          betCondition: sessionById?.name,
          leftNoRate: Math.floor(sessionById?.noRate),
          leftYesRate: Math.floor(sessionById?.yesRate),
          leftNoRatePercent: Math.floor(sessionById?.noPercent),
          leftYesRatePercent: Math.floor(sessionById?.yesPercent),
          noRate: Math.floor(sessionById?.noRate),
          yesRate: Math.floor(sessionById?.yesRate),
          yesRatePercent: Math.floor(sessionById?.yesPercent),
          noRatePercent: Math.floor(sessionById?.noPercent),
        };
      });
    } else {
      setIsBall(false);
      setLock({
        isNo: true,
        isYes: true,
        isNoPercent: true,
        isYesPercent: true,
      });
      setInputDetail(stateDetail);
    }
    socketService.user.updateSessionRateClient((data: any) => {
      if (data?.id === betId && data?.matchId === match?.id) {
        setInputDetail((prev: any) => {
          return {
            ...prev,
            noRate: data?.noRate,
            yesRate: data?.yesRate,
            yesRatePercent: data?.yesPercent,
            noRatePercent: data?.noPercent,
            status: data?.status,
          };
        });
      }
    });
  }, [sessionById, isCreateSession]);

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
            inputDetail={inputDetail}
            setInputDetail={setInputDetail}
            incGap={incGap}
            setIncGap={setIncGap}
            live={live}
            lock={lock}
            setLock={setLock}
            isPercent={isPercent}
            setIsPercent={setIsPercent}
            isBall={isBall}
            setIsBall={setIsBall}
            isCreateSession={isCreateSession}
            betId={betId}
            // socket={socket}
            // sessionEvent={sessionEvent}
            inputRef={inputRef}
            // sessionBetId={sessionBetId}
            match={match}
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
                  onClick={(e) => {
                    e.preventDefault();
                    if (
                      !isNaN(inputDetail?.leftNoRate) &&
                      inputDetail?.leftNoRate != null
                    ) {
                      const [yesRatePercent, noRatePercent] =
                        item?.value?.split("-");
                      setInputDetail((prev: any) => {
                        return {
                          ...prev,
                          leftYesRatePercent: parseInt(yesRatePercent),
                          leftNoRatePercent: parseInt(noRatePercent),
                          yesRatePercent: parseInt(yesRatePercent),
                          noRatePercent: parseInt(noRatePercent),
                        };
                      });
                      handleLiveChange(
                        parseInt(yesRatePercent),
                        parseInt(noRatePercent)
                      );
                      if (inputRef.current) {
                        inputRef.current.focus();
                      }
                    }
                  }}
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
                            id: betId,
                            matchId: match?.id,
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
                            id: betId,
                            matchId: match?.id,
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
                            id: betId,
                            matchId: match?.id,
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
                    addSessions();
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
};

export default SessionAddComponent;
