import { Box, Typography } from "@mui/material";
import { memo, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { socket, socketService } from "../../../socketManager";
import {
  addSession,
  addsuccessReset,
  getPlacedBets,
  getSessionProfitLoss,
  resetPlacedBets,
  sessionByIdReset,
  setCurrentOdd,
  updateBetsPlaced,
  updateDeleteReason,
  updateDeleteReasonOnEdit,
  updateProLossSession,
  updateResultStatusOfSessionById,
  updateSessionById,
  updateSessionMaxLimit,
  updateSessionProfitLoss,
} from "../../../store/actions/addSession";
import {
  getMatchListSessionProfitLoss,
  sessionResultSuccessReset,
} from "../../../store/actions/match/matchAction";
import { AppDispatch, RootState } from "../../../store/store";
import { ButtonRatesQuickSessions } from "../../../utils/Constants";
import SessionResultModal from "../SessionResult/SessionResultModal";
import AddSessionInput from "./AddSessionInput";
import RunsAmountBox from "./RunsAmountBox";
import CommissionDot from "../../Common/CommissionDot";
import SessionLimit2 from "./SessionLimit2";

interface SessionAddComponentProps {
  createSession: boolean;
  match: any;
  setMode: (val: string) => void;
}

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

const SessionAddComponent = ({
  createSession,
  match,
  setMode,
}: SessionAddComponentProps) => {
  const { id } = useParams();
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const inputRef: any = useRef(null);
  const {
    sessionById,
    loading,
    sessionProfitLoss,
    currentOdd,
    selectedSessionId,
    addSuccess,
  } = useSelector((state: RootState) => state.addSession);
  const { success } = useSelector((state: RootState) => state.matchList);
  const [isCreateSession, setIsCreateSession] = useState(createSession);
  const [incGap, setIncGap] = useState<number>(1);
  const [isPercent, setIsPercent] = useState<string>("");
  const [isBall, setIsBall] = useState<boolean>(false);
  const [inputDetail, setInputDetail] = useState<any>(stateDetail);
  const [isDisable, setIsDisable] = useState(false);
  const [showUndeclare, setShowUndeclare] = useState(false);
  const [visible, setVisible] = useState(false);
  const [visible1, setVisible1] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [visible3, setVisible3] = useState(false);
  const [open, setOpen] = useState(false);
  const [lock, setLock] = useState<any>({
    isNo: true,
    isYes: true,
    isNoPercent: true,
    isYesPercent: true,
  });
  const [live] = useState(true);

  const addSessions = () => {
    try {
      if (
        !inputDetail?.betCondition &&
        !inputDetail?.leftYesRatePercent &&
        !inputDetail?.leftNoRatePercent
      ) {
        return true;
      }
      const payload = {
        matchId: match?.id,
        type: "session",
        name: inputDetail?.betCondition,
        yesRate: inputDetail?.leftYesRate,
        noRate: inputDetail?.leftNoRate,
        yesPercent: inputDetail?.leftYesRatePercent,
        noPercent: inputDetail?.leftNoRatePercent,
        maxBet: match?.betFairSessionMaxBet,
        minBet: match?.betFairSessionMinBet,
        gtype: "fancy",
      };
      dispatch(addSession(payload));
    } catch (error) {
      console.error(error);
    }
  };

  const handleLiveChange = (yesRatePercent: number, noRatePercent: number) => {
    try {
      let data = {
        matchId: match?.id,
        id: id,
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
    } catch (error) {
      console.error(error);
    }
  };

  const handleQuickRateSetButton = (e: any, item: any) => {
    e.preventDefault();
    if (
      !isCreateSession &&
      !sessionById?.result &&
      sessionById?.activeStatus === "live" &&
      !sessionById?.resultStatus
    ) {
      const [yesRatePercent, noRatePercent] = item?.value?.split("-");
      setInputDetail((prev: any) => {
        return {
          ...prev,
          leftYesRatePercent: parseInt(yesRatePercent),
          leftNoRatePercent: parseInt(noRatePercent),
          yesRatePercent: parseInt(yesRatePercent),
          noRatePercent: parseInt(noRatePercent),
        };
      });
      handleLiveChange(parseInt(yesRatePercent), parseInt(noRatePercent));
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  };

  const updateResultDeclared = (event: any) => {
    try {
      if (match?.id === event?.matchId) {
        dispatch(getMatchListSessionProfitLoss(match?.id));
        setMode("0");
      }
      if (match?.id === event?.matchId && id === event?.betId) {
        if (event?.activeStatus === "result") {
          dispatch(resetPlacedBets());
          dispatch(sessionByIdReset());
          navigate("/expert/live", {
            state: {
              createSession: true,
              match: match,
            },
            replace: true,
          });
        } else if (event?.activeStatus === "live") {
          dispatch(updateSessionById(event));
          dispatch(getSessionProfitLoss({ id, matchId: match?.id }));
          dispatch(getPlacedBets({ betId: id }));
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  const updateUserProfitLoss = (event: any) => {
    if (
      match?.id === event?.jobData?.placedBet?.matchId &&
      id === event?.jobData?.placedBet?.betId
    ) {
      dispatch(updateSessionProfitLoss(event?.redisData));
      dispatch(updateBetsPlaced(event?.jobData));
      dispatch(
        setCurrentOdd({
          matchId: event?.jobData?.placedBet?.matchId,
          betId: event?.jobData?.placedBet?.betId,
          odds: event?.jobData?.placedBet?.odds,
        })
      );
    }
  };

  const updatedSessionMaxLmit = (event: any) => {
    if (match?.id === event?.matchId && id === event?.id) {
      dispatch(updateSessionMaxLimit(event));
    }
  };

  const sessionDeleteBet = (event: any) => {
    try {
      if (event?.matchId === match?.id) {
        dispatch(updateDeleteReason(event));
        dispatch(updateProLossSession(event));
      }
    } catch (e) {
      console.log(e);
    }
  };

  const updateSessionResultStatus = (event: any) => {
    if (event?.matchId === match?.id) {
      dispatch(updateResultStatusOfSessionById(event));
    }
  };

  const updateDeleteBetReason = (event: any) => {
    try {
      if (event?.matchId === match?.id) {
        dispatch(updateDeleteReasonOnEdit(event));
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    try {
      if (addSuccess) {
        setIsCreateSession(false);
        navigate(`/expert/live/${selectedSessionId}`, {
          state: {
            createSession: false,
            match: match,
            betId: selectedSessionId,
          },
        });
        dispatch(addsuccessReset());
      }
    } catch (e) {
      console.log(e);
    }
  }, [addSuccess]);

  useEffect(() => {
    if (createSession && !sessionById) {
      setIsCreateSession(createSession);
    } else setIsCreateSession(false);
    if (success) {
      setVisible(false);
      setVisible1(false);
      setVisible2(false);
      dispatch(sessionResultSuccessReset());
    }
  }, [createSession, sessionById, success, id]);

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
          result: sessionById?.result,
          resultStatus: sessionById?.resultStatus
            ? sessionById?.resultStatus
            : null,
        };
      });
      if (sessionById?.activeStatus === "result") {
        setShowUndeclare(true);
        setIsDisable(true);
      } else if (sessionById?.activeStatus !== "result") {
        setShowUndeclare(false);
        setIsDisable(false);
      }
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
  }, [sessionById, isCreateSession, id]);

  useEffect(() => {
    try {
      if (id && socket) {
        socketService.user.updateSessionRateClient((data: any) => {
          if (data?.id === id && data?.matchId === match?.id) {
            if (data?.status === "ball start") {
              setIsBall(true);
              setLock((prev: any) => {
                return {
                  ...prev,
                  isNo: false,
                  isYes: false,
                  isNoPercent: false,
                  isYesPercent: false,
                };
              });
            } else if (data?.status === "suspended") {
              setIsBall(false);
              setLock((prev: any) => {
                return {
                  ...prev,
                  isNo: true,
                  isYes: true,
                  isNoPercent: true,
                  isYesPercent: true,
                };
              });
            } else if (data?.status === "active") {
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
              setIsBall(false);
              setLock((prev: any) => {
                return {
                  ...prev,
                  isNo: false,
                  isYes: false,
                  isNoPercent: false,
                  isYesPercent: false,
                };
              });
            }
          }
        });
        socketService.user.userSessionBetPlaced(updateUserProfitLoss);
        socketService.user.sessionDeleteBet(sessionDeleteBet);
        socketService.user.sessionUpdated(updatedSessionMaxLmit);
        socketService.user.updateInResultDeclare(updateSessionResultStatus);
        socketService.user.updateDeleteReason(updateDeleteBetReason);
      }
      if (match?.id || id) {
        socketService.user.sessionResultDeclared(updateResultDeclared);
      }
      return () => {
        socketService.user.updateSessionRateClientOff();
        socketService.user.sessionResultDeclaredOff();
        socketService.user.userSessionBetPlacedOff();
        socketService.user.sessionDeleteBetOff();
        socketService.user.sessionUpdatedOff();
        socketService.user.updateInResultDeclareOff();
        socketService.user.updateDeleteReasonOff();
      };
    } catch (e) {
      console.log(e);
    }
  }, [match, id, socket]);

  return (
    <Box
      sx={{
        flex: 1,
        background: "#F8C851",
        borderRadius: "5px",
        minHeight: "42vh",
        py: "3px",
        px: "20px",
      }}
    >
      <Typography
        sx={{
          color: "#0B4F26",
          fontSize: { lg: "20px", xs: "16px", md: "18px" },
          fontWeight: "600",
        }}
      >
        {match?.title && match.title}(min:
        {sessionById ? sessionById?.minBet : match?.betFairSessionMinBet} max:
        {sessionById ? sessionById?.maxBet : match?.betFairSessionMaxBet})
      </Typography>
      <Box
        onClick={(e) => {
          e.stopPropagation();
          if (
            !createSession &&
            inputDetail?.resultStatus !== "PENDING" &&
            inputDetail?.resultStatus !== "MISSMATCHED"
          ) {
            setVisible3(true);
          }
        }}
        sx={{
          width: "fit-content",
          position: "relative",
          display: "flex",
          background: "#0B4F26",
          justifyContent: "center",
          alignItems: "center",
          height: "35px",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        <Typography
          sx={{
            color: "white",
            fontWeight: "400",
            fontSize: "12px",
            lineHeight: "0.9",
            paddingX: "6px",
          }}
          onClick={() => setOpen(true)}
        >
          Set limits
        </Typography>
        {sessionById?.isCommissionActive && <CommissionDot />}

        <Box
          sx={{
            position: "absolute",
            zIndex: 999,
            top: "40px",
            left: 0,
          }}
        >
          {visible3 && (
            <SessionLimit2
              open={open}
              handleClose={() => setOpen(false)}
              matchOddsLive={sessionById}
              title={`${sessionById?.name} Max/Min Bet Limit`}
              exposureLimit={sessionById?.exposureLimit}
              isCommissionActive={sessionById?.isCommissionActive}
            />
          )}
        </Box>
      </Box>

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
            betId={id}
            inputRef={inputRef}
            match={match}
          />
          <Box sx={{ border: "1px solid black", p: 1 }}>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, 46px)",
                gap: "10px",
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              {ButtonRatesQuickSessions?.map((item, index) => (
                <Box
                  onClick={(e: any) => handleQuickRateSetButton(e, item)}
                  key={index}
                  sx={{
                    position: "relative",
                    display: "flex",
                    background:
                      !isCreateSession &&
                      !sessionById?.result &&
                      sessionById?.activeStatus === "live" &&
                      !sessionById?.resultStatus
                        ? "#0B4F26"
                        : "#696969",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "35px",
                    borderRadius: "5px",
                    cursor: "pointer",
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
                      width: { lg: "30%", md: "30%", xs: "45%" },
                      display: "flex",
                      background: "#FF4D4D",
                      maxWidth: "120px",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "35px",
                      borderRadius: "5px",
                      cursor: "pointer",
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
                            id: id,
                            matchId: match?.id,
                            betStatus: 2,
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
                      maxWidth: "120px",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "35px",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                    <Typography
                      sx={{
                        color: "white",
                        fontWeight: "500",
                        fontSize: "12px",
                      }}
                    >
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
                            id: id,
                            matchId: match?.id,
                            betStatus: 0,
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
                      cursor: "pointer",
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
                            id: id,
                            matchId: match?.id,
                            betStatus: 3,
                            isNoResult: true,
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
                  cursor: "pointer",
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
              betId={id}
              currentOdds={currentOdd?.betId === id ? currentOdd : null}
              proLoss={sessionProfitLoss}
            />
          ) : (
            <Box sx={{ width: "162px", minHeight: "182px" }} />
          )}
        </Box>
      </Box>
    </Box>
  );
};
export default memo(SessionAddComponent);
