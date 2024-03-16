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
  liveOnly,
  setCurrentMatch,
  setLocalState,
  hideResult,
  stopAllHide,
  title,
  hideTotalBet,
  sessionData,
  setIObtes,
  setData,
  setLocalSessionExpertOdds,
  profitLossData,
}: any) => {
  const dispatch: AppDispatch = useDispatch();
  const [stop, setStop] = useState(true);
  const [visible, setVisible] = useState(true);

  return (
    <Box
      sx={{
        display: "flex",
        backgroundColor: "white",
        flexDirection: "column",
        marginY: { lg: ".5vh" },
        width: "100%",
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
          height: 38,
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
                  width: { lg: "40%", xs: "80%", marginLeft: "8px" },
                  justifyContent: { lg: "flex-start", xs: "flex-end" },
                }}
              >
                <Box
                  sx={{
                    background: "#FF9292",
                    width: { lg: "22%", xs: "26.5%" },
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
                    width: { lg: "21.9%", xs: "26.5%" },
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
              height: "auto",
              maxHeight: "300px",
              overflowY: "scroll",
            }}
          >
            {sessionData?.length > 0 &&
              sessionData
                ?.slice()
                .sort(customSort)
                ?.map((match: any, index: any) => {
                  if (JSON.parse(match).selectionId) {
                    return (
                      <Box key={index}>
                        <SessionMarketBox
                          liveOnly={liveOnly}
                          setIObtes={setIObtes}
                          setData={setData}
                          hideResult={hideResult}
                          hideTotalBet={hideTotalBet}
                          setMatchSessionData={setLocalSessionExpertOdds}
                          setLocalState={(val: any) => setLocalState(val)}
                          currentMatch={currentMatch}
                          setCurrentMatch={setCurrentMatch}
                          newData={JSON.parse(match)}
                          setStop={setStop}
                          stop={stop}
                          index={index}
                          profitLossData={profitLossData}
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
