import { memo, useState } from "react";
import { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import Divider from "../../Common/Divider";
import { ARROWUP } from "../../../assets";
import SessionMarketBoxLive from "./SessionMarketBoxLive";
import { formatToINR } from "../../helper";

const SessionMarketLive = ({
  currentMatch,
  liveOnly,
  setCurrentMatch,
  setLocalState,
  hideResult,
  title,
  hideTotalBet,
  setMatchLiveSession,
  sessionData,
}: any) => {
  const [stop, setStop] = useState(true);
  const [matchSessionData, setMatchSessionData] = useState(sessionData);
  useEffect(() => {
    setMatchSessionData(sessionData);
  }, [sessionData]);
  const [visible, setVisible] = useState(true);

  return (
    <Box
      sx={{
        display: "flex",
        backgroundColor: "white",
        flexDirection: "column",
        marginY: { lg: "2px" },
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
            height: "40px",
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
          {/* <SmallBoxSeason /> */}
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
                  {currentMatch?.betFairSessionMaxBet} */}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  background: "#319E5B",
                  height: "25px",
                  // paddingRight: "17px",
                  width: { lg: "62%", xs: "80%" },
                  justifyContent: "flex-end",
                }}
              >
                <Box
                  sx={{
                    background: "#FF9292",
                    width: { lg: "26.5%", xs: "24.5%" },
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
                    width: { lg: "26.5%", xs: "22.5%" },
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
              // height: "auto",
              maxHeight: { lg: "85vh", xs: "40vh" },
              overflowY: "auto",
            }}
          >
            {matchSessionData?.length > 0 &&
              matchSessionData?.map((match: any, index: any) => {
                if (!match?.id) {
                  return (
                    <Box key={index}>
                      <SessionMarketBoxLive
                        setMatchLiveSession={setMatchLiveSession}
                        liveOnly={liveOnly}
                        hideResult={hideResult}
                        hideTotalBet={hideTotalBet}
                        setMatchSessionData={setMatchSessionData}
                        setLocalState={(val: any) => setLocalState(val)}
                        currentMatch={currentMatch}
                        setCurrentMatch={setCurrentMatch}
                        newData={match}
                        setStop={setStop}
                        stop={stop}
                        index={index}
                      />
                      <Divider />
                    </Box>
                  );
                }
              })}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default memo(SessionMarketLive);
