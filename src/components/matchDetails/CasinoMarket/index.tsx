import { Box, Typography } from "@mui/material";
import { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ARROWUP } from "../../../assets";
import { sessionBetLiveStatus } from "../../../store/actions/match/matchAction";
import { AppDispatch, RootState } from "../../../store/store";
import Divider from "../../Common/Divider";
import { formatToINR } from "../../helper";
import Result from "../Result";
import CasinoMarketBox from "./CasinoMarketBox";
import CustomCasinoMarketResult from "./CustomCasinoMarketResult";
import LiveStatusButtonBox from "./LiveStatusButtonBox";

const CasinoMarket = ({
  title,
  sessionData,
  currentMatch,
  profitLossData,
}: any) => {
  const [visible, setVisible] = useState(true);
  const [showResultModal, setShowResultModal] = useState(false);
  const dispatch: AppDispatch = useDispatch();

  const { success } = useSelector((state: RootState) => state.matchList);

  useEffect(() => {
    if (success) {
      setShowResultModal(false);
    }
  }, [success]);

  return (
    <Box
      sx={{
        display: "flex",
        position: "relative",
        backgroundColor: "white",
        flexDirection: "column",
        marginY: { lg: "4px" },
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
            {`(MIN: ${formatToINR(currentMatch?.betFairSessionMinBet)})`}
          </Typography>
          <Box>
            {sessionData?.activeStatus !== "live" && (
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
                width="33px"
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
          {sessionData?.activeStatus !== "live" && (
            <Result
              width={7}
              onClick={() => {
                setShowResultModal(true);
              }}
            />
          )}
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
                  background: "rgba(0,0,0,0.4)",
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
                        ? `Declared`
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
