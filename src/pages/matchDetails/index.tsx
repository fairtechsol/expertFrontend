import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import Loader from "../../components/Loader";
import SessionMarketLive from "../../components/matchDetails/SessionMarketLive";
import SessionMarket from "../../components/matchDetails/SessionMarket";
import RunsBox from "../../components/matchDetails/RunsBox";
import MatchOdds from "../../components/matchDetails/MatchOdds";
import BookMarket from "../../components/matchDetails/Bookmarket";
import BetList from "../../components/matchDetails/BetList";
import { useLocation } from "react-router-dom";
import {
  getMatchDetail,
  updateMatchBettingStatus,
  updateMatchRates,
} from "../../store/actions/addMatch/addMatchAction";
import { AppDispatch, RootState } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import TiedMatchMarket from "../../components/matchDetails/TiedMatchMarket";
import CompleteMatchMarket from "../../components/matchDetails/CompleteMatchMarket";
import { expertSocketService, socketService } from "../../socketManager";

const MatchDetails = () => {
  const data: any = [];
  const { state } = useLocation();
  const dispatch: AppDispatch = useDispatch();
  const { matchDetail, loading } = useSelector(
    (state: RootState) => state.addMatch.addMatch
  );
  const [Bets, setIObtes] = useState<any>([]);

  const updateMatchDetailToRedux = (event: any) => {
    if (state?.id === event?.id) {
      dispatch(updateMatchRates(event));
    } else return;
  };

  const updateBettingStatus = (event: any) => {
    if (state?.id === event?.matchId) {
      dispatch(updateMatchBettingStatus(event));
    }
  };

  useEffect(() => {
    if (state?.id) {
      dispatch(getMatchDetail(state?.id));
    }
  }, [state?.id]);

  useEffect(() => {
    if (state?.id) {
      expertSocketService.match.joinMatchRoom(state?.id, "expert");
      socketService.user.matchBettingStatusChange(updateBettingStatus);
      expertSocketService.match.getMatchRates(
        state?.id,
        updateMatchDetailToRedux
      );
    }
    return () => {
      expertSocketService.match.leaveAllRooms();
      expertSocketService.match.leaveMatchRoom(state?.id);
    };
  }, []);

  return (
    <Box
      sx={{
        display: { lg: "flex" },
        alignSelf: "center",
        borderRadius: "10px",
        flexDirection: "row",
        width: "100%",
        height: {
          xs: loading ? "80vh" : "100%",
          lg: loading ? "90vh" : "100%",
        },
        minHeight: "92vh",
        background: !loading ? "white" : "",
        padding: 1,
        gap: 1,
      }}
    >
      {loading ? (
        <Loader text="" />
      ) : (
        <>
          <Box
            sx={{
              width: { lg: "50%", xs: "100%", md: "100%" },
            }}
          >
            {(matchDetail?.apiSessionActive ||
              matchDetail?.manualSessionActive) && (
              <Box
                sx={{
                  width: { lg: "100%", xs: "100%", md: "100%" },
                  display: "flex",
                  gap: 0.1,
                  flexDirection: { md: "column", lg: "coulmn" },
                }}
              >
                <Box
                  sx={{
                    width: { lg: "100%", xs: "100%", md: "100%" },
                    flexDirection: "column",
                    display: "flex",
                  }}
                >
                  <SessionMarketLive
                    title={"Session API Market"}
                    hideTotalBet={true}
                    liveOnly={true}
                    stopAllHide={true}
                    hideResult={true}
                    sessionData={matchDetail?.apiSession}
                    currentMatch={matchDetail}
                  />
                </Box>
                <Box
                  sx={{
                    width: { lg: "100%", xs: "100%", md: "100%" },
                    flexDirection: "column",
                    display: "flex",
                  }}
                >
                  <SessionMarket
                    setIObtes={(val: any) => {
                      setIObtes((prev: any) =>
                        prev?.filter(
                          (v: any) =>
                            v?.bet_id !== val?.betId &&
                            val?.match_id === v?.match_id
                        )
                      );
                    }}
                    title={"Session Market"}
                    liveOnly={false}
                    hideTotalBet={false}
                    stopAllHide={false}
                    sessionData={matchDetail?.sessionBettings}
                    hideResult={false}
                    currentMatch={matchDetail}
                  />
                </Box>
              </Box>
            )}

            {data?.length > 0 && (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap",
                  gap: "1px",
                  rowGap: "5px",
                  height: "524px",
                  overflow: "scroll",
                  marginTop: "1.25vw",
                }}
              >
                {data?.map((v: any) => {
                  return <RunsBox key={v?.id} item={v} />;
                })}
              </Box>
            )}
          </Box>
          <Box
            sx={{
              width: { lg: "50%", xs: "100%", md: "100%" },
              flexDirection: "column",
              display: "flex",
              paddingLeft: "5px",
            }}
          >
            {matchDetail?.matchOdd?.isActive && (
              <MatchOdds
                showHeader={true}
                currentMatch={matchDetail}
                matchOddsLive={matchDetail?.matchOdd}
              />
            )}
            {matchDetail?.bookmaker?.isActive && (
              <BookMarket
                currentMatch={matchDetail}
                liveData={matchDetail?.bookmaker}
              />
            )}
            {matchDetail?.apiTideMatch?.isActive && (
              <TiedMatchMarket
                currentMatch={matchDetail}
                liveData={matchDetail?.apiTideMatch}
              />
            )}
            {matchDetail?.marketCompleteMatch?.isActive && (
              <CompleteMatchMarket
                currentMatch={matchDetail}
                liveData={matchDetail?.marketCompleteMatch}
              />
            )}

            {matchDetail?.id && <BetList allBetRates={Bets} />}
          </Box>
        </>
      )}
    </Box>
  );
};

export default MatchDetails;
