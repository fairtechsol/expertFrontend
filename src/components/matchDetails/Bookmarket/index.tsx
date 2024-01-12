import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Stop from "../SessionMarket/Stop";
import SmallBox from "../SmallBox";
import { ARROWUP } from "../../../assets";
import Divider from "../../Common/Divider";
import BoxComponent from "../MatchOdds/BoxComponent";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { betLiveStatus } from "../../../store/actions/match/matchAction";

const BookMarket = ({ currentMatch, socket, liveData, matchOdds }: any) => {
  const [newMatchOdds] = useState(matchOdds);
  const [visibleImg, setVisibleImg] = useState(true);
  const [live, setLive] = useState(false);
  const dispatch: AppDispatch = useDispatch();

  const { statusBetLive } = useSelector((state: RootState) => state.matchList);

  console.log(live, "live333")


  // useEffect(() => {
  //   // if (statusBetLive) {
  //   //   dispatch(betLiveStatus());
  //   // }
  //   console.log("liveStatus2222", statusBetLive);
  // }, []);
  return (
    <Box
      sx={{
        boxShadow: "0px 5px 10px #0000001A",
        display: "flex",
        backgroundColor: "white",
        flexDirection: "column",
        width: "100%",
        marginTop: ".3vh",
        marginX: "0",
        alignSelf: {
          xs: "center",
          md: "center",
          lg: "flex-start",
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
            Bookmaker Market
          </Typography>
          {/* <img src={LOCKED} style={{ width: '14px', height: '20px' }} /> */}
          <Stop
            onClick={() => {
              // setLive(false);
              socket.emit("bookMakerRateLive", {
                matchId: currentMatch?.id,
                bookMakerLive: false,
              });
            }}
          />
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
          {!currentMatch?.bookMakerRateLive ? (
            <>
              <SmallBox
                onClick={() => {
                  dispatch(betLiveStatus({
                    isStop: live,
                    betId: currentMatch?.bookmaker?.id
                  }));
                  setLive(!live)
                  // if (newMatchOdds?.id) {
                  //   socket.emit("bookMakerRateLive", {
                  //     matchId: currentMatch?.id,
                  //     bookMakerLive: false,
                  //   });
                  //     setLive(!live);
                  // } else {
                  //   //   activateMatchOdds(1, "");
                  //   socket.emit("bookMakerRateLive", {
                  //     matchId: currentMatch?.id,
                  //     bookMakerLive: true,
                  //   });

                }}
                width={"80px"}
                title={live ? "Live" : "Go Live"}
                color={live ? "#46e080" : "#FF4D4D"}
                customStyle={{
                  justifyContent: "center",
                }}
              />
            </>

          ) : (
            <SmallBox
              onClick={() => {
                socket.emit("bookMakerRateLive", {
                  matchId: currentMatch?.id,
                  bookMakerLive: false,
                });
                // setLive(false);
              }}
              width={"80px"}
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
      <Divider />
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
                MIN: {currentMatch?.bookmaker?.minBet} MAX:{" "}
                {currentMatch?.bookmaker?.maxBet}
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

          <Box sx={{ position: "relative" }}>
            <BoxComponent
              //   teamRates={teamRates?.teamA}
              // teamImage={currentMatch?.bookmaker?.teamA_Image}
              livestatus={liveData?.status === "SUSPENDED" ? true : false}
              data={liveData?.runners?.length > 0 ? liveData?.runners[0] : []}
              lock={liveData?.runners?.length > 0 ? false : true}
              name={currentMatch?.teamA}
            />
            <Divider />
            <BoxComponent
              livestatus={liveData?.status === "SUSPENDED" ? true : false}
              //   teamRates={teamRates?.teamB}
              teamImage={currentMatch?.bookmaker?.teamB_Image}
              lock={liveData?.runners?.length > 0 ? false : true}
              name={currentMatch?.teamB}
              data={liveData?.runners?.length > 0 ? liveData?.runners[1] : []}
              align="end"
            />
            {currentMatch?.teamC && (
              <>
                <Divider />
                <BoxComponent
                  color={"#FF4D4D"}
                  livestatus={liveData?.status === "SUSPENDED" ? true : false}
                  //   teamRates={teamRates?.teamC}
                  teamImage={null}
                  lock={liveData?.runners?.length > 0 ? false : true}
                  name={currentMatch?.teamC}
                  data={
                    liveData?.runners?.length > 0 ? liveData?.runners[2] : []
                  }
                  align="end"
                />
              </>
            )}

            <Divider />
            {!currentMatch?.bookMakerRateLive && (
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
  );
};

export default BookMarket;
