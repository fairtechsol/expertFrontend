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
import { getMatchDetail } from "../../store/actions/addMatch/addMatchAction";
import { AppDispatch, RootState } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import TiedMatchMarket from "../../components/matchDetails/TiedMatchMarket";
import CompleteMatchMarket from "../../components/matchDetails/CompleteMatchMarket";

const MatchDetails = () => {
  const data: any = [];
  const { state } = useLocation();
  const dispatch: AppDispatch = useDispatch();
  const { matchDetail, loading } = useSelector(
    (state: RootState) => state.addMatch.addMatch
  );
  const [Bets, setIObtes] = useState<any>([]);

  const arrayObj = [
    {
      betRestult: null,
      betStatus: 1,
      bet_condition: "1st Innings run bhav BAN",
      createAt: "2023-12-06T06:54:35.851Z",
      createdBy: "5f8d4b41-b1c1-4345-8ed8-88931c07b946",
      deletedAt: null,
      id: "de8a2629-2863-4db5-9345-3a1d386a010c",
      isActive: true,
      matchType: "cricket",
      match_id: "b501723d-a82c-4a95-a20c-c40e428fce04",
      no_rate: "0",
      profitLoss: {
        betData: [
          { odds: 195, profit_loss: -10 },
          { odds: 196, profit_loss: -10 },
          { odds: 197, profit_loss: -10 },
          { odds: 198, profit_loss: -10 },
          { odds: 199, profit_loss: -10 },
          { odds: 200, profit_loss: 11.5 },
          { odds: 201, profit_loss: 11.5 },
          { odds: 202, profit_loss: 11.5 },
          { odds: 203, profit_loss: 11.5 },
          { odds: 204, profit_loss: 11.5 },
          { odds: 205, profit_loss: 11.5 },
        ],
      },
      line: 5,
      max_loss: 10,
      total_bet: 1,
      rate_percent: "120-90",
      selectionId: "1stinningsrunbhavban",
      sessionBet: true,
      stopAt: "2023-12-06T06:54:35.851Z",
      suspended: "",
      updateAt: "2023-12-06T06:54:35.851Z",
      yes_rate: "0",
    },
  ];

  useEffect(() => {
    if (state?.id) {
      dispatch(getMatchDetail(state?.id));
    }
  }, [state?.id]);

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
                    // sessionData={liveSessionData?.filter(
                    //   (v) => !idx?.includes(v?.selectionId)
                    // )}
                    // setMatchLiveSession={setLiveSessionData}
                    // setLocalState={setLocalState}
                    // setCurrentMatch={setCurrentMatch}
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
                    // setLiveData={setLiveData}
                    liveOnly={false}
                    hideTotalBet={false}
                    stopAllHide={false}
                    // setData={setData}
                    sessionData={arrayObj}
                    hideResult={false}
                    // setLocalState={setLocalState}
                    // setCurrentMatch={setCurrentMatch}
                    currentMatch={matchDetail}
                    // setLocalSessionExpertOdds={setLocalSessionExpertOdds}
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
              <MatchOdds showHeader={true} currentMatch={matchDetail} />
            )}
            {matchDetail?.bookmaker?.isActive && (
              <BookMarket currentMatch={matchDetail} />
            )}
            {matchDetail?.apiTideMatch?.isActive && (
              <TiedMatchMarket currentMatch={matchDetail} />
            )}
            {matchDetail?.marketCompleteMatch?.isActive && (
              <CompleteMatchMarket currentMatch={matchDetail} />
            )}

            {matchDetail?.id && <BetList allBetRates={Bets} />}
          </Box>
        </>
      )}
    </Box>
  );
};

export default MatchDetails;
