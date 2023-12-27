import { useState } from "react";
import { Box, Typography } from "@mui/material";
import Stop from "../SessionMarket/Stop";
import Result from "../Result";
import SmallBox from "../SmallBox";
import { ARROWUP } from "../../../assets";
import ResultComponent from "../../updateBookmaker/BookmakerEdit/ResultComponent";
import Divider from "../../Common/Divider";
import BoxComponent from "./BoxComponent";
import SmallBox2 from "./SmallBox2";

const MatchOdds = ({ currentMatch, matchOdds, matchOddsLive, socket }: any) => {
  const [newMatchOdds] = useState(matchOdds);
  const [visible, setVisible] = useState(false);
  const [visibleImg, setVisibleImg] = useState(true);

  // const manualBookMarkerRates = [{
  //   matchId: currentMatch?.id,
  //   teamA: data?.teamA_rate,
  //   teamB: data?.teamB_rate,
  //   teamC: data?.teamC_rate,
  // }];

  const teamRates = { teamA: 0, teamB: 0, teamC: 0 };

  const valueA = matchOdds?.teamA;
  const valueB = matchOdds?.teamB;
  const bookRatioB = (() => {
    if (valueA === 0) {
      return 0;
    } else {
      const bookRatio = valueB != 0 ? valueA / valueB || 0 : 0;
      const formattedRatio = Math.abs(bookRatio).toFixed(2);
      return valueB < 0 ? `-${formattedRatio}` : formattedRatio;
    }
  })();

  const bookRatioA = (() => {
    if (valueA === 0) {
      return 0;
    } else {
      const bookRatio = valueA != 0 ? valueB / valueA || 0 : 0;
      // alert(teamARates)
      const formattedRatio = Math.abs(bookRatio).toFixed(2);
      // alert(typeof teamARates < 0 ? `-${formattedRatio}` : formattedRatio)

      return valueA < 0 ? `-${formattedRatio}` : formattedRatio;
    }
  })();

  return (
    <>
      <Box
        key="odds"
        sx={{
          display: "flex",
          backgroundColor: "white",
          flexDirection: "column",
          width: "100%",
          marginTop: ".5vh",
          alignSelf: {
            xs: "center",
            md: "center",
            lg: "flex-start",
            boxShadow: "0px 5px 10px #0000001A",
            position: "relative",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            height: 38,
            flexDirection: "row",
            width: "100%",
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
              Match Odds
            </Typography>
            <Stop
              onClick={() => {
                if (newMatchOdds?.id) {
                  //   setLive(false);
                  socket.emit("matchOddRateLive", {
                    matchId: currentMatch?.id,
                    matchOddLive: false,
                  });
                }
              }}
            />

            <SmallBox2 valueA={bookRatioA} valueB={bookRatioB} />
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
            <Result
              width={"80px"}
              onClick={() => {
                setVisible(true);
              }}
              invert={true}
            />
            {!currentMatch?.matchOdd && (
              <SmallBox
                onClick={() => {
                  // if (newMatchOdds?.id) {
                  //   socket.emit("matchOddRateLive", {
                  //     matchId: currentMatch?.id,
                  //     matchOddLive: true,
                  //   });
                  //   // setLive(true);
                  // } else {
                  //   // activateMatchOdds(1, "");
                  // }
                }}
                title={"Go Live"}
                color={"#FF4D4D"}
                customStyle={{
                  justifyContent: "center",
                }}
              />
            )}
            {currentMatch?.matchOddRateLive && (
              <SmallBox
                onClick={() => {
                  socket.emit("matchOddRateLive", {
                    matchId: currentMatch?.id,
                    matchOddLive: false,
                  });
                  //   setLive(false);
                }}
                title={"Live"}
                customStyle={{
                  justifyContent: "center",
                }}
              />
            )}
            <img
              onClick={() => {
                setVisibleImg(!visibleImg);
              }}
              src={ARROWUP}
              style={{
                transform: visibleImg ? "rotate(180deg)" : "rotate(0deg)",
                width: "15px",
                height: "15px",
                marginRight: "5px",
                marginLeft: "5px",
                cursor: "pointer",
              }}
            />
          </Box>
        </Box>

        <Box
          sx={{
            position: "absolute",
            zIndex: 999,
            top: "26%",
            right: "100px",
          }}
        >
          {visible && (
            <ResultComponent
              betId={
                currentMatch?.bettings?.length > 0 &&
                currentMatch?.bettings?.filter(
                  (v: any) => v?.sessionBet === false
                )
              }
              teamA={currentMatch?.matchOdd?.teamA}
              stopAt={currentMatch?.stopAt}
              teamB={currentMatch?.teamB}
              tie={"Tie"}
              draw={currentMatch?.teamC ? currentMatch?.teamC : null}
              onClick={() => {
                setVisible(false);
              }}
            />
          )}
        </Box>

        {visibleImg && (
          <>
            <Box
              sx={{
                display: "flex",
                background: "#319E5B",
                height: "25px",
                width: "100%",
                alignSelf: "center",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  background: "'#319E5B'",
                  height: "25px",
                  width: "35%",
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
                  MIN: {currentMatch?.matchOdd?.minBet} MAX:
                  {currentMatch?.matchOdd?.maxBet}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  background: "#319E5B",
                  height: "25px",
                  width: { lg: "65%", xs: "80%" },
                  justifyContent: { lg: "center", xs: "flex-end" },
                }}
              >
                <Box
                  sx={{
                    background: "#00C0F9",
                    width: { lg: "16.5%", xs: "25%" },
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    sx={{ fontSize: "12px", color: "black", fontWeight: "600" }}
                  >
                    Back
                  </Typography>
                </Box>
                <Box sx={{ width: ".35%", display: "flex" }}></Box>

                <Box
                  sx={{
                    background: "#FF9292",
                    width: { lg: "16.5%", xs: "25%" },
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    sx={{ fontSize: "12px", color: "black", fontWeight: "600" }}
                  >
                    Lay
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Box
              sx={{
                width: "100%",
                position: "relative",
              }}
            >
              <BoxComponent
                data={
                  matchOddsLive?.runners?.length > 0
                    ? matchOddsLive?.runners[0]
                    : []
                }
                teamImage={currentMatch?.teamA_Image}
                lock={
                  matchOddsLive?.runners !== undefined &&
                  matchOddsLive?.runners?.length > 0
                    ? false
                    : true
                }
                name={currentMatch?.teamA}
                currentMatch={currentMatch}
                teamRates={teamRates?.teamA}
              />
              <Divider />
              <BoxComponent
                teamRates={teamRates?.teamB}
                lock={
                  matchOddsLive?.runners !== undefined &&
                  matchOddsLive?.runners?.length > 0
                    ? false
                    : true
                }
                teamImage={currentMatch?.teamB_Image}
                data={
                  matchOddsLive?.runners?.length > 0
                    ? matchOddsLive?.runners[1]
                    : []
                }
                name={currentMatch?.teamB}
                currentMatch={currentMatch}
              />
              {currentMatch?.teamC && (
                <>
                  <Divider />
                  <BoxComponent
                    teamRates={teamRates?.teamC}
                    lock={
                      matchOddsLive?.runners !== undefined &&
                      matchOddsLive?.runners?.length > 0
                        ? false
                        : true
                    }
                    color={"#FF4D4D"}
                    teamImage={null}
                    data={
                      matchOddsLive?.runners?.length > 0
                        ? matchOddsLive?.runners[2]
                        : []
                    }
                    name={currentMatch?.teamC}
                    currentMatch={currentMatch}
                  />
                </>
              )}
              {!currentMatch?.matchOddRateLive && (
                <Box
                  sx={{
                    width: "100%",
                    position: "absolute",
                    height: "100%",
                    bottom: 0,
                    background: "rgba(0,0,0,0.5)",
                  }}
                ></Box>
              )}
            </Box>
          </>
        )}
      </Box>
    </>
  );
};

export default MatchOdds;
