import { Box, Typography } from "@mui/material";
import { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ARROWUP, UD } from "../../../assets";
import { sessionBetLiveStatus } from "../../../store/actions/match/matchAction";
import { AppDispatch, RootState } from "../../../store/store";
import Divider from "../../Common/Divider";
import { formatToINR } from "../../helper";
import Result from "../Result";
import CasinoMarketBox from "./CasinoMarketBox";
import CustomCasinoMarketResult from "./CustomCasinoMarketResult";
import LiveStatusButtonBox from "./LiveStatusButtonBox";
import { TiArrowLeftThick } from "react-icons/ti";
const CasinoMarket = ({
  title,
  sessionData,
  currentMatch,
  profitLossData,
}: any) => {
  const [visible, setVisible] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showResultModal, setShowResultModal] = useState(false);
  const dispatch: AppDispatch = useDispatch();
  const { statusBetLive, error } = useSelector(
    (state: RootState) => state.matchList
  );

  const { success } = useSelector((state: RootState) => state.matchList);
  const { matchDetail } = useSelector(
    (state: RootState) => state.addMatch.addMatch
  );

  useEffect(() => {
    if (success) {
      setShowResultModal(false);
    }
  }, [success]);
  let totalBet = 0;

  useEffect(() => {
    if (statusBetLive) {
      setLoading(false);
    }
    if (error) {
      setLoading(false);
    }
  }, [statusBetLive, error]);

  return (
    <Box
      sx={{
        display: "flex",
        position: "relative",
        backgroundColor: "white",
        flexDirection: "column",
        marginY: "4px",
        width: { lg: "100%", xs: "100%" },
        alignSelf: {
          xs: "center",
          md: "center",
          lg: "flex-start",
          boxShadow: "0px 5px 10px #0000001A",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          height: "20px",
          flexDirection: "row",
          width: "99.7%",
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
            // height: "40px",
          }}
        >
          <Typography
            sx={{
              fontSize: "10px",
              fontWeight: "bold",
              marginLeft: "7px",
              lineHeight: 1,
            }}
          >
            {title}
            <span
              style={{
                fontSize: "8px",
              }}
            >{`(MIN: ${formatToINR(
              currentMatch?.betFairSessionMinBet
            )})`}</span>
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{ marginRight: "10px", zIndex: showResultModal ? "" : "999" }}
            >
              {(sessionData?.activeStatus === "live" ||
                sessionData?.activeStatus === "save") &&
                !sessionData?.result &&
                !sessionData?.resultStatus && (
                  <TiArrowLeftThick
                    cursor={"pointer"}
                    color="blue"
                    size={15}
                    style={{
                      backgroundColor: "lightgray",
                      alignItems: "center",
                      display: "flex",
                    }}
                    onClick={(e: any) => {
                      if (loading) {
                        return;
                      }
                      e.preventDefault();
                      dispatch(
                        sessionBetLiveStatus({
                          status: "unSave",
                          betId: sessionData?.id,
                        })
                      );
                    }}
                  />
                )}
            </Typography>
            {sessionData?.activeStatus !== "live" &&
              !sessionData?.result &&
              !sessionData?.resultStatus && (
                <LiveStatusButtonBox
                  hide={true}
                  onClick={(e: any) => {
                    e.preventDefault();
                    dispatch(
                      sessionBetLiveStatus({
                        status: "live",
                        betId: sessionData?.id,
                      })
                    );
                  }}
                  textSize="8px"
                  width={{ lg: "20px" }}
                  color="#FF4D4D"
                  height="20px"
                />
              )}
            {sessionData?.activeStatus === "live" && (
              <LiveStatusButtonBox
                hide={true}
                onClick={(e: any) => {
                  e.preventDefault();
                  dispatch(
                    sessionBetLiveStatus({
                      status: "save",
                      betId: sessionData?.id,
                    })
                  );
                }}
                textSize="8px"
                width={{ lg: "20px" }}
                height="20px"
              />
            )}
          </Box>
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
            flex: 0.5,
            background: "#262626",
            // '#262626' ,
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <Result
            width={7}
            onClick={() => {
              setShowResultModal(true);
            }}
          />
          {showResultModal && (
            <Box
              sx={{
                position: "absolute",
                zIndex: 105,
                top: 0,
                right: 0,
                width: "100%",
                display: "flex",
                justifyContent: "end",
              }}
              className="example-2"
            >
              <CustomCasinoMarketResult
                newData={sessionData}
                onClick={() => {
                  setShowResultModal(false);
                }}
              />
            </Box>
          )}
          <Box
            sx={{
              background: "#0B4F26",
              flexDirection: "row",
              display: "flex",
              alignItems: "center",
              top: "2px",
              width: { lg: "7vw", xs: "14vw", md: "13vw" },
              borderRadius: "5px",
              height: "18px",
              right: "6px",
              marginRight: "2%",
              // position: "absolute",
              cursor: "pointer",
            }}
          >
            <Box
              sx={{
                background: "#FDF21A",
                borderRadius: "3px",
                width: "35%",
                height: "85%",
                alignItems: "center",
                justifyContent: "center",
                display: "flex",

                flexDirection: "column",
                marginLeft: "2px",
              }}
            >
              <Typography
                sx={{
                  fontSize: { lg: "7px", xs: "6px", md: "6px" },
                  fontWeight: "bold",
                  textAlign: "center",
                  color: "#FF4D4D",
                  lineHeight: "1",
                }}
              >
                Total Bet
              </Typography>
              <Typography
                sx={{
                  fontSize: { lg: ".6vw", xs: "1vw", md: "1vw" },
                  fontWeight: "bold",
                  color: "#0B4F26",
                  lineHeight: 1,
                }}
              >
                {matchDetail?.updatedSesssionBettings?.cricketCasino?.section?.map(
                  (sectionItem: any, index: number) => {
                    totalBet =
                      sectionItem?.RunnerName == title
                        ? matchDetail?.sessionProfitLoss?.[sectionItem?.id]
                            ?.totalBet || 0
                        : "";

                    return (
                      <Typography
                        key={index}
                        sx={{
                          fontSize: { lg: ".6vw", xs: "1vw", md: "1vw" },
                          fontWeight: "bold",
                          color: "#0B4F26",
                          lineHeight: 1,
                        }}
                      >
                        {`${totalBet}`}
                      </Typography>
                    );
                  }
                )}
              </Typography>
            </Box>
            <Box
              sx={{
                paddingX: "2px",
                width: "60%",
                alignItems: "center",
                justifyContent: "center",
                display: "flex",
                overflowWrap: "anywhere",
              }}
            >
              <Typography
                sx={{
                  fontSize: {
                    lg: !profitLossData?.maxLoss ? "9px" : "9px",
                    xs: !profitLossData?.maxLoss ? "7px" : "7px",
                    md: !profitLossData?.maxLoss ? "9px" : "9px",
                  },
                  fontWeight: "bold",
                  color: "white",
                }}
              >
                {sessionData?.result
                  ? sessionData?.resultData?.profitLoss ?? 0
                  : !profitLossData?.maxLoss
                  ? "P/L"
                  : profitLossData?.maxLoss ?? 0}
              </Typography>
              <img
                src={UD}
                style={{ width: "10px", height: "10px", marginLeft: "4px" }}
              />
            </Box>
          </Box>
          <img
            onClick={() => {
              setVisible(!visible);
            }}
            src={ARROWUP}
            style={{
              transform: visible ? "rotate(180deg)" : "rotate(0deg)",
              width: "12px",
              height: "12px",
              marginRight: "5px",
              marginLeft: "5px",
              cursor: "pointer",
            }}
          />
        </Box>
      </Box>

      {visible && (
        <>
          <Box
            sx={{
              position: "relative",
              width: "100%",
              alignItems: "center",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {sessionData?.activeStatus !== "live" && (
              <Box
                sx={{
                  margin: "1px",
                  width: "100%",
                  height: "100%",
                  right: 0,
                  position: "absolute",
                  background: "rgba(0, 0, 0, 0.4)",
                  zIndex: 2,
                }}
              >
                {sessionData?.resultStatus ? (
                  <Typography
                    sx={{
                      color: "#fff",
                      height: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      fontWeight: "500",
                      textTransform: "uppercase",
                    }}
                  >
                    Result {sessionData?.resultStatus}
                  </Typography>
                ) : (
                  !["ACTIVE", "active", "", undefined, null, 0].includes(
                    sessionData?.GameStatus
                  ) ||
                  (sessionData?.result && (
                    <Typography
                      sx={{
                        color: "#fff",
                        height: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        fontWeight: "500",
                        textTransform: "uppercase",
                      }}
                    >
                      {sessionData?.result
                        ? `Declared (Score = ${sessionData?.result})`
                        : sessionData?.GameStatus}
                    </Typography>
                  ))
                )}
              </Box>
            )}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                position: "relative",
                maxHeight: { lg: "85vh", xs: "40vh" },
                overflowY: "auto",
                "::-webkit-scrollbar": {
                  display: "none",
                },
              }}
            >
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]?.map((item: any) => (
                <CasinoMarketBox
                  newData={
                    sessionData?.section?.length > 0
                      ? sessionData?.section[item]
                      : {}
                  }
                  profitLoss={profitLossData && profitLossData[sessionData?.id]}
                  index={item}
                />
              ))}
              <Divider />
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
};

export default memo(CasinoMarket);
