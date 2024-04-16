import { Box, Typography } from "@mui/material";
import { useState } from "react";
import { ARROWUP } from "../../../assets";
import Divider from "../../Common/Divider";
import Stop from "./Stop";
import SessionMarketBox from "./SessionMarketBox";
import { sessionBetLiveStatus } from "../../../store/actions/match/matchAction";
import { AppDispatch } from "../../../store/store";
import { useDispatch } from "react-redux";
import { customSort } from "../../../helpers";
import { formatToINR } from "../../helper";

const SessionMarket = ({
  currentMatch,
  hideResult,
  stopAllHide,
  title,
  hideTotalBet,
  sessionData,
  profitLossData,
}: any) => {
  const dispatch: AppDispatch = useDispatch();
  const [visible, setVisible] = useState(true);

  return (
    <Box
      sx={{
        display: "flex",
        backgroundColor: "white",
        flexDirection: "column",
        marginY: { lg: ".5vh" },
        width: "100%",
        height: "100%",
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
          }}
        >
          <Typography
            sx={{
              fontSize: { lg: "13px", md: "12px", xs: "12px" },
              fontWeight: "bold",
              marginLeft: "7px",
            }}
          >
            {title}
          </Typography>
          {!stopAllHide && (
            <Stop
              onClick={() => {
                dispatch(
                  sessionBetLiveStatus({
                    status: "save",
                    matchId: currentMatch?.id,
                    stopAllSessions: true,
                  })
                );
              }}
            />
          )}
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
            flex: 1,
            background: "#262626",
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
            alt={"Up Arrow"}
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
        <Box
          sx={{
            width: "100%",
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {
            <Box
              sx={{
                display: "flex",
                background: "#319E5B",
                height: "25px",
                width: "99.7%",
                alignSelf: "center",
                zIndex: "999",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  background: "'#319E5B'",
                  height: "25px",
                  width: "60%",
                  alignItems: "center",
                }}
              >
                <Typography
                  sx={{
                    color: "white",
                    fontSize: { lg: "11px", xs: "9px" },
                    marginLeft: "7px",
                  }}
                >
                  MIN: {formatToINR(currentMatch?.betFairSessionMinBet)}
                  {/* MAX:
                  {formatToINR(currentMatch?.betFairSessionMaxBet)} */}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  background: "#319E5B",
                  height: "25px",
                  // marginLeft: "0vw",
                  width: { lg: "40%", xs: "80%" },
                  justifyContent: { lg: "flex-start", xs: "flex-end" },
                  marginRight: { xs: "24%", lg: "7%", md: "23%" },
                  marginLeft: { xs: "-10%", lg: "7%", md: "2%" },
                }}
              >
                <Box
                  sx={{
                    background: "#FF9292",
                    width: { lg: "24%", xs: "22.5%" },
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    sx={{ fontSize: "12px", color: "black", fontWeight: "600" }}
                  >
                    No
                  </Typography>
                </Box>
                <Box sx={{ width: ".45%", display: "flex" }}></Box>
                <Box
                  sx={{
                    background: "#00C0F9",
                    width: { lg: "23%", xs: "22.5%" },
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    sx={{ fontSize: "12px", color: "black", fontWeight: "600" }}
                  >
                    Yes
                  </Typography>
                </Box>
              </Box>
            </Box>
          }
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              position: "relative",
              maxHeight: { lg: "85vh", xs: "40vh" },
              overflowY: "auto",
              // maxHeight: "300px",
              // overflowY: "scroll",
            }}
          >
            {sessionData?.length > 0 &&
              sessionData
                ?.slice()
                .sort(customSort)
                ?.map((match: any, index: number) => {
                  if (JSON.parse(match).selectionId) {
                    return (
                      <Box key={JSON.parse(match)?.id}>
                        <SessionMarketBox
                          hideResult={hideResult}
                          hideTotalBet={hideTotalBet}
                          newData={JSON.parse(match)}
                          profitLossData={profitLossData}
                          index={index}
                        />
                        <Divider />
                      </Box>
                    );
                  } else {
                    return null;
                  }
                })}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default SessionMarket;
