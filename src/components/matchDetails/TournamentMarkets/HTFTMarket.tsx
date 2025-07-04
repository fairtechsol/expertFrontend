import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { memo, useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ARROWUP } from "../../../assets";
import { betLiveStatus } from "../../../store/actions/match/matchAction";
import { AppDispatch } from "../../../store/store";
import AddMarketButton from "../../Common/AddMarketButton";
import Divider from "../../Common/Divider";
import MaxLimitEditButton from "../../Common/MaxLimitEditButton";
import { formatToINR } from "../../helper";
import HTFTBoxComponent from "../MatchOdds/HTFTBoxComponent";
import Result from "../Result";
import Stop from "../SessionMarket/Stop";
import SmallBox from "../SmallBox";
import ResultComponentTournamentMarket from "./ResultComponentTournamentMarket";
import TournamentMarketAdd from "./TournamentMarketAdd";

interface HTFTMarketProps {
  currentMatch: any;
  liveData: any;
  title: string;
  firstKnownKey: any;
}

const HTFTMarket = ({
  currentMatch,
  liveData,
  title,
  firstKnownKey,
}: HTFTMarketProps) => {
  const dispatch: AppDispatch = useDispatch();
  const theme = useTheme();
  const matchesMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [visibleImg, setVisibleImg] = useState<boolean>(true);
  const [visible, setVisible] = useState<boolean>(false);
  const [live, setLive] = useState<boolean>(
    liveData?.activeStatus === "live" ? true : false
  );
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setLive(liveData?.activeStatus === "live" ? true : false);
  }, [liveData?.activeStatus]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (data: any) => {
    setOpen(data);
  };

  const toggleVisibility = useCallback(() => {
    setVisible((prev) => !prev);
  }, []);
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
          md: "flex-start",
          lg: "flex-start",
          position: "relative",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          height: 20,
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
          <Box
            sx={{
              fontSize: { lg: "9px", md: "9px", xs: "10px", sm: "8px" },
              fontWeight: "bold",
              marginLeft: "7px",
              display: "flex",
              alignItems: "center",
              fontFamily: "Poppins, sans-serif",
            }}
          >
            {liveData?.isCommissionActive && (
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  backgroundColor: "#74ee15",
                  margin: "2px",
                }}
              />
            )}
            {title}
          </Box>
          {liveData?.id && liveData?.activeStatus !== "result" && (
            <Stop
              onClick={() => {
                dispatch(
                  betLiveStatus({
                    isStop: true,
                    betId: liveData?.id,
                    isManual: false,
                    isTournament: true,
                  })
                );
                setLive(false);
              }}
              height="18px"
            />
          )}
        </Box>
        <Box
          sx={{
            flex: 0.1,
            background: "#262626",
          }}
        >
          <div className="slanted" />
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
          {liveData?.id ? (
            <>
              {(!currentMatch?.stopAt || firstKnownKey === undefined) && (
                <Result
                  onClick={() => {
                    setVisible(true);
                  }}
                  invert={true}
                />
              )}
              {liveData?.activeStatus !== "result" && (
                <>
                  <SmallBox
                    onClick={() => {
                      dispatch(
                        betLiveStatus({
                          isStop: live,
                          betId: liveData?.id,
                          isManual: false,
                          isTournament: true,
                        })
                      );
                      setLive(!live);
                    }}
                    width={{ lg: "25px", xs: "20px" }}
                    title={live ? "Live" : "Go Live"}
                    color={live ? "#46e080" : "#FF4D4D"}
                    customStyle={{
                      justifyContent: "center",
                    }}
                    height="18px"
                  />
                  <MaxLimitEditButton handleClickOpen={handleClickOpen} />
                </>
              )}
            </>
          ) : (
            <AddMarketButton handleClickOpen={handleClickOpen} />
          )}
          <img
            onClick={() => {
              setVisibleImg(!visibleImg);
            }}
            src={ARROWUP}
            alt="arrow up"
            style={{
              transform: !visibleImg ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.3s ease",
              width: "12px",
              height: "12px",
              marginRight: "5px",
              marginLeft: "5px",
              cursor: "pointer",
            }}
          />
        </Box>
      </Box>
      <Divider />
      <Box
        sx={{
          position: "absolute",
          zIndex: 999,
          right: "1%",
          width: { lg: "30vh", xs: "30vh" },
        }}
      >
        {visible && (
          <ResultComponentTournamentMarket
            currentMatch={currentMatch}
            onClick={toggleVisibility}
            liveData={liveData}
          />
        )}
      </Box>
      {visibleImg && (
        <>
          <Box
            sx={{
              display: "flex",
              background: "#319E5B",
              height: "15px",
              width: "100%",
              alignSelf: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                background: "'#319E5B'",
                height: "15px",
                width: "50%",
                alignItems: "center",
              }}
            >
              <Typography
                sx={{
                  color: "white",
                  fontSize: { lg: "9px", xs: "9px" },
                  marginLeft: "7px",
                }}
              >
                MIN: {formatToINR(liveData?.minBet)} MAX:{" "}
                {formatToINR(liveData?.maxBet)}
              </Typography>
            </Box>
          </Box>

          <Box
            sx={{
              position: "relative",
              display: "flex",
              flexWrap: "wrap",
              flexDirection: "row",
            }}
          >
            {liveData?.runners?.map((item: any) => (
              <Box
                key={item?.id}
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  width: matchesMobile ? "50%" : "33.33%",
                  position: "relative",
                }}
              >
                {(![
                  "ACTIVE",
                  "",
                  undefined,
                  null,
                  "OPEN",
                  "active",
                  "open",
                ].includes(item?.status?.toLowerCase()) ||
                  item?.status?.toLowerCase() === "suspended"
                  ? true
                  : false) && (
                    <Box
                      sx={{
                        position: "absolute",
                        height: "100%",
                        width: "100%",
                        display: "flex",
                        zIndex: "899",
                        justifyContent: "center",
                        alignItems: "center",
                        background: "rgba(0, 0, 0, .6)",
                      }}
                    >
                      <h4
                        style={{
                          textTransform: "uppercase",
                          color: "#FFF",
                          fontWeight: "400",
                          fontSize: matchesMobile ? "12px" : "12px",
                        }}
                      >
                        {item?.status}
                      </h4>
                    </Box>
                  )}

                <HTFTBoxComponent
                  teamRates={
                    currentMatch?.teamRates?.[
                      liveData?.id + "_" + "profitLoss" + "_" + currentMatch?.id
                    ]
                      ? currentMatch?.teamRates?.[
                      liveData?.id +
                      "_" +
                      "profitLoss" +
                      "_" +
                      currentMatch?.id
                      ]?.[item?.id] ?? 0
                      : 0
                  }
                  data={item}
                  lock={liveData?.runners?.length > 0 ? false : true}
                  name={item?.nat ?? item?.runnerName}
                />

                <Divider />
              </Box>
            ))}
            {!live && (
              <Box
                sx={{
                  width: "100%",
                  position: "absolute",
                  height: "100%",
                  bottom: 0,
                  background: "rgba(0,0,0,0.5)",
                }}
              />
            )}
            {currentMatch?.resultStatus &&
              currentMatch?.resultStatus[liveData?.id]?.status && (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%",
                    position: "absolute",
                    height: "100%",
                    bottom: 0,
                    color: "#fff",
                    backgroundColor: "rgba(203 24 24 / 70%)",
                  }}
                >
                  <Typography sx={{ color: "#fff", textAlign: "center" }}>
                    RESULT {currentMatch?.resultStatus[liveData?.id]?.status}
                  </Typography>
                </Box>
              )}
            {currentMatch?.otherBettings?.[liveData?.id] && (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                  position: "absolute",
                  height: "100%",
                  bottom: 0,
                  color: "#fff",
                  backgroundColor: "rgba(203 24 24 / 70%)",
                }}
              >
                <Typography sx={{ color: "#fff", textAlign: "center" }}>
                  RESULT{" "}
                  {liveData?.activeStatus === "result"
                    ? "DECLARED"
                    : currentMatch?.otherBettings?.[liveData?.id]}
                </Typography>
              </Box>
            )}
          </Box>
        </>
      )}
      <TournamentMarketAdd
        open={open}
        handleClose={handleClose}
        matchOddsLive={liveData}
        currentMatch={currentMatch}
        title={`${title} Max Bet`}
        exposureLimit={liveData?.exposureLimit}
        isCommissionActive={liveData.isCommissionActive}
      />
    </Box>
  );
};

export default memo(HTFTMarket);
