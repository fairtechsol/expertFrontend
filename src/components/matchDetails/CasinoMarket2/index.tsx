import { Box, Typography } from "@mui/material";
import { memo, useState } from "react";
import { ARROWUP } from "../../../assets";
// import { sessionBetLiveStatus } from "../../../store/actions/match/matchAction";
import { RootState } from "../../../store/store";
import Divider from "../../Common/Divider";
import { formatToINR } from "../../helper";
// import Result from "../Result";
import CasinoMarketBox from "./CasinoMarketBox";
import { useSelector } from "react-redux";
// import CustomCasinoMarketResult from "./CustomCasinoMarketResult";
// import LiveStatusButtonBox from "./LiveStatusButtonBox";
// import PlaceBetComponent from "../SessionMarket/PlaceBetComponent";
const CasinoMarket = ({
  title,
  sessionData,
  currentMatch,
  profitLossData,
}: any) => {
  const [visible, setVisible] = useState(true);
  // const [showResultModal, setShowResultModal] = useState(false);
  // const dispatch: AppDispatch = useDispatch();

  // const { success } = useSelector((state: RootState) => state.matchList);
  const { matchDetail } = useSelector(
    (state: RootState) => state.addMatch.addMatch
  );

  // useEffect(() => {
  //   if (success) {
  //     setShowResultModal(false);
  //   }
  // }, [success]);

  let totalBet = 0;
  return (
    <Box
      sx={{
        display: "flex",
        position: "relative",
        backgroundColor: "white",
        flexDirection: "column",
        marginY: { lg: "6px" },
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
          height: "35px",
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
            }}
          >
            {title}{" "}
            {/* {`(MIN: ${formatToINR(currentMatch?.betFairSessionMinBet)})`} */}
          </Typography>
          <Box>
            {/* {sessionData?.activeStatus !== "live" && (
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
                width="28px"
                color="#FF4D4D"
              />
            )} */}
            {/* {sessionData?.activeStatus === "live" && (
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
                width="33px"
              />
            )} */}
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
          {/* <Result
            width={7}
            onClick={() => {
              setShowResultModal(true);
            }}
          /> */}
          {/* {showResultModal && (
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
          )} */}

          {
            // <PlaceBetComponent
            //   width={7}
            //   profitLossData={
            //     profitLossData &&
            //     profitLossData[
            //       matchDetail?.updatedSesssionBettings?.cricketCasino
            //         ?.section?.[0]?.id
            //     ]
            //   }
            //   newData={
            //     matchDetail?.updatedSesssionBettings?.cricketCasino
            //       ?.section?.[0]?.id
            //   }
            // />
            // <PlaceBetComponent
            //   width={7}
            //   profitLossData={
            //     matchDetail?.sessionProfitLoss &&
            //     matchDetail?.sessionProfitLoss[
            //       matchDetail?.updatedSesssionBettings?.cricketCasino
            //         ?.section?.[0]?.id
            //     ]
            //   }
            //   newData={matchDetail}
            // />
            // <Box
            //   sx={{
            //     background: "#FDF21A",
            //     borderRadius: "3px",
            //     width: "35%",
            //     height: "85%",
            //     alignItems: "center",
            //     justifyContent: "center",
            //     display: "flex",
            //     flexDirection: "column",
            //     marginLeft: "2px",
            //   }}
            // >
            //   <Typography
            //     sx={{
            //       fontSize: { lg: "7px", xs: "6px", md: "9px" },
            //       fontWeight: "bold",
            //       textAlign: "center",
            //       color: "#FF4D4D",
            //       lineHeight: "1",
            //     }}
            //   >
            //     Total Bet
            //   </Typography>
            //   {matchDetail?.updatedSesssionBettings?.cricketCasino?.section?.map(
            //     (sectionItem: any, index: number) => {
            //       totalBet =
            //         sectionItem?.RunnerName == title
            //           ? matchDetail?.sessionProfitLoss?.[sectionItem?.id]
            //               ?.totalBet || 0
            //           : "";
            //       return (
            //         <Typography
            //           key={index}
            //           sx={{
            //             fontSize: { lg: ".6vw", xs: "1.5vw", md: "1.5vw" },
            //             fontWeight: "bold",
            //             color: "#0B4F26",
            //             lineHeight: 1,
            //           }}
            //         >
            //           {`${totalBet}`}
            //         </Typography>
            //       );
            //     }
            //   )}
            // </Box>
          }

          <img
            onClick={() => {
              setVisible(!visible);
            }}
            src={ARROWUP}
            style={{
              transform: visible ? "rotate(180deg)" : "rotate(0deg)",
              width: "15px",
              height: "15px",
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
