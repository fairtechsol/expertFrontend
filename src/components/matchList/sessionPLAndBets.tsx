import { Box, Typography } from "@mui/material";
import { Fragment, memo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ArrowDown, ArrowDownPL, ARROWUPPL } from "../../assets";
import { handleNumber } from "../../helpers";
import { getSessionProfitLossBets } from "../../store/actions/match/matchAction";
import { AppDispatch, RootState } from "../../store/store";
import StyledImage from "../Common/StyledImages";
import SessionBetSeperate from "./sessionBets";

const SessionProLoss = ({ setShowSessionPopup, matchId, betId }: any) => {
  const [show, setShow] = useState(false);
  const [userId, setUserId] = useState(null);
  const { sessionPL, sessionPLBets } = useSelector(
    (state: RootState) => state.matchList
  );
  const dispatch: AppDispatch = useDispatch();

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          alignSelf: "center",
          width: { xs: "90%", lg: "50%" },
        }}
      >
        <Box
          display={"flex"}
          sx={{
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            px: "10px",
            py: "6px",
            backgroundColor: "#F8C851",
          }}
        >
          <Box
            display={"flex"}
            alignItems="center"
            sx={{ alignItems: "center" }}
          >
            <Typography
              sx={{
                fontSize: {
                  xs: "14px",
                  lg: "18px",
                  md: "18px",
                },
                color: "#000",
                marginRight: {
                  xs: "10px",
                  lg: "20px",
                  md: "20px",
                },
              }}
            >
              User wise profit/loss Results
            </Typography>
          </Box>
          <Typography
            sx={{
              color: "#000",
              fontSize: "30px",
              cursor: "pointer",
            }}
            onClick={(e) => {
              e.stopPropagation();
              // dispatch(resetMatchListSessionProLoss());
              setShowSessionPopup((prev: boolean) => !prev);
            }}
          >
            &times;
          </Typography>
        </Box>
        <Box
          sx={{
            overflowY: "auto",
            maxHeight: "30rem",
          }}
        >
          {sessionPL?.length > 0 ? (
            sessionPL?.map((item: any) => (
              <Fragment key={item?.userId}>
                <Box
                  onClick={() => {
                    if (!show || item?.userId != userId) {
                      setUserId(item?.userId);
                      setShow(true);
                      dispatch(
                        getSessionProfitLossBets({
                          betId: betId,
                          matchId: matchId,
                          userId: item?.userId,
                          url: item?.url,
                        })
                      );
                    } else {
                      setShow(false);
                    }
                  }}
                  sx={{
                    width: "100%",
                    height: { lg: "60px", xs: "50px" },
                    background: "white",
                    display: "flex",
                    padding: 0.1,
                  }}
                >
                  <Box
                    sx={{
                      width: { xs: "40%", sm: "55%", lg: "56%" },
                      height: "100%",
                      alignItems: "center",
                      display: "flex",
                      paddingX: "10px",
                      background: "#F8C851",
                      marginLeft: 0.1,
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: { lg: "15px", sm: "15px", xs: "12px" },
                        color: "black",
                        fontWeight: "600",
                      }}
                    >
                      {item?.userName}
                    </Typography>
                    <StyledImage
                      src={ArrowDown}
                      alt="down"
                      sx={{
                        width: { lg: "20px", xs: "10px" },
                        transform:
                          show && item?.userId == userId
                            ? "rotate(180deg)"
                            : "rotate(0deg)",
                        height: { lg: "10px", xs: "6px" },
                      }}
                    />
                  </Box>
                  <Box
                    sx={{
                      background:
                        parseFloat(item?.sessionProfitLoss) > 0
                          ? "#27AC1E"
                          : "#E32A2A",
                      paddingX: "2px",
                      width: { xs: "25%", sm: "25%", lg: "25%" },
                      height: "100%",
                      marginLeft: 0.1,
                      justifyContent: "center",
                      display: "flex",
                      flexDirection: "column",
                      paddingLeft: "10px",
                    }}
                  >
                    <Box
                      sx={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: { lg: "14px", sm: "14px", xs: "11px" },
                          fontWeight: "700",
                          color: "white",
                        }}
                      >
                        {parseFloat(item?.sessionProfitLoss) > 0
                          ? "Profit"
                          : "Loss"}
                      </Typography>
                      <StyledImage
                        src={
                          parseFloat(item?.sessionProfitLoss) > 0
                            ? ARROWUPPL
                            : ArrowDownPL
                        }
                        alt="updown icon"
                        sx={{
                          width: { lg: "25px", xs: "15px" },
                          height: { lg: "12px", xs: "8px" },
                        }}
                      />
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Typography
                        sx={{
                          fontSize: { lg: "14px", xs: "10px" },
                          fontWeight: "700",
                          color: "white",
                          lineHeight: "0.9",
                        }}
                      >
                        {handleNumber(
                          parseFloat(item?.sessionProfitLoss || 0),
                          "white"
                        )}{" "}
                      </Typography>
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      background: "#0B4F26",
                      paddingX: "2px",
                      width: { xs: "35%", sm: "20%", lg: "20%" },
                      height: "100%",
                      marginLeft: 0.1,
                      justifyContent: "center",
                      display: "flex",
                      flexDirection: "column",
                      paddingLeft: "10px",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: { lg: "14px", sm: "14px", xs: "11px" },
                        fontWeight: "700",
                        color: "white",
                      }}
                    >
                      Total Bet
                    </Typography>
                    <Box sx={{ display: "flex" }}>
                      <Typography
                        sx={{
                          fontSize: { lg: "14px", xs: "10px" },
                          fontWeight: "700",
                          color: "white",
                          textAlign: "center",
                        }}
                      >
                        {item?.totalBet}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                {show && sessionPLBets && item?.userId == userId && (
                  <Box
                    sx={{
                      width: "100%",
                    }}
                  >
                    <SessionBetSeperate
                      betHistory={false}
                      allBetsData={sessionPLBets}
                      profit
                      isArrow={true}
                    />
                  </Box>
                )}
              </Fragment>
            ))
          ) : (
            <Box
              sx={{
                background: "#fff",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: { lg: "60px", xs: "50px" },
              }}
            >
              <Typography>No Data Found</Typography>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default memo(SessionProLoss);
