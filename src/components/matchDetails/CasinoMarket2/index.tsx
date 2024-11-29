import { Box, Typography } from "@mui/material";
import { memo, useState } from "react";
import { ARROWUP } from "../../../assets";
// import { sessionBetLiveStatus } from "../../../store/actions/match/matchAction";
// import { RootState } from "../../../store/store";
import Divider from "../../Common/Divider";
// import { formatToINR } from "../../helper";
// import Result from "../Result";
import CasinoMarketBox from "./CasinoMarketBox";
// import { useSelector } from "react-redux";
// import CustomCasinoMarketResult from "./CustomCasinoMarketResult";
// import LiveStatusButtonBox from "./LiveStatusButtonBox";
// import PlaceBetComponent from "../SessionMarket/PlaceBetComponent";
const CasinoMarket = ({
  title,
  sessionData,
  // currentMatch,
  profitLossData,
}: any) => {
  const [visible, setVisible] = useState(true);
  // const [showResultModal, setShowResultModal] = useState(false);
  // const dispatch: AppDispatch = useDispatch();

  // const { success } = useSelector((state: RootState) => state.matchList);
  // const { matchDetail } = useSelector(
  //   (state: RootState) => state.addMatch.addMatch
  // );

  // useEffect(() => {
  //   if (success) {
  //     setShowResultModal(false);
  //   }
  // }, [success]);

  // let totalBet = 0;
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
          height: "22px",
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
              fontSize: "9px",
              fontWeight: "bold",
              marginLeft: "7px",
              lineHeight: 1,
            }}
          >
            {title}
          </Typography>
          <Box></Box>
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
                  !["ACTIVE", "active", "", undefined, null, 0, "open"].includes(
                    sessionData?.GameStatus?.toLowerCase()
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
                // maxHeight: { lg: "85vh", xs: "40vh" },
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
