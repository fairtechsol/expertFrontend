import { Box } from "@mui/material";
import { useState } from "react";
import Loader from "../../components/Loader";
import SessionMarketLive from "../../components/matchDetails/SessionMarketLive";
import SessionMarket from "../../components/matchDetails/SessionMarket";
import RunsBox from "../../components/matchDetails/RunsBox";
import MatchOdds from "../../components/matchDetails/MatchOdds";
import BookMarket from "../../components/matchDetails/Bookmarket";
import BetList from "../../components/matchDetails/BetList";
// import { useLocation } from "react-router-dom";

const MatchDetails = () => {
  const [loading] = useState(false);
  const data: any = [];
  // const { state } = useLocation();
  const [Bets, setIObtes] = useState<any>([
    {
      id: "c5bf1d70-085f-4c4a-b1ff-fc4ee15bc6e4",
      isActive: true,
      createAt: "2023-12-06T10:29:15.841Z",
      updateAt: "2023-12-06T10:29:15.841Z",
      createdBy: "f48b6fb9-82f5-4fb3-b6d9-cae7c5145366",
      deletedAt: null,
      user_id: "f48b6fb9-82f5-4fb3-b6d9-cae7c5145366",
      match_id: "b501723d-a82c-4a95-a20c-c40e428fce04",
      bet_id: "53a0c098-9b8e-44f1-9cf0-acaab915e079",
      result: "pending",
      team_bet: null,
      amount: 1000,
      odds: 23,
      win_amount: 1000,
      loss_amount: 1000,
      max_loss_amount: 1000,
      bet_type: "no",
      country: "India",
      ip_address: "45.248.161.71",
      rate: "100-100",
      marketType: "test 1",
      deleted_reason: null,
      user: {
        id: "f48b6fb9-82f5-4fb3-b6d9-cae7c5145366",
        userName: "USER04",
        fullName: "",
        fw_partnership: 100,
      },
      myStack: "1000.00",
    },
    {
      id: "f67f3d3a-161b-443d-ba40-2f853c97ea0c",
      isActive: true,
      createAt: "2023-12-06T10:08:12.959Z",
      updateAt: "2023-12-06T10:08:12.959Z",
      createdBy: "8d297379-bb60-43f5-8c04-4ffe26b0fc4d",
      deletedAt: null,
      user_id: "8d297379-bb60-43f5-8c04-4ffe26b0fc4d",
      match_id: "b501723d-a82c-4a95-a20c-c40e428fce04",
      bet_id: "5b259bdb-8431-4bab-8696-22a0eec9bf17",
      result: "pending",
      team_bet: "Bangladesh",
      amount: 100,
      odds: 2.12,
      win_amount: 100,
      loss_amount: 112,
      max_loss_amount: 200,
      bet_type: "lay",
      country: "United States",
      ip_address: "38.137.44.59",
      rate: null,
      marketType: "MATCH ODDS",
      deleted_reason: null,
      user: {
        id: "8d297379-bb60-43f5-8c04-4ffe26b0fc4d",
        userName: "USER1",
        fullName: "",
        fw_partnership: 100,
      },
      myStack: "100.00",
    },
  ]);

  const currentMatch: any = {
    id: "b501723d-a82c-4a95-a20c-c40e428fce04",
    isActive: true,
    createAt: "2023-12-06T04:21:20.387Z",
    updateAt: "2023-12-06T04:21:41.565Z",
    createdBy: "5f8d4b41-b1c1-4345-8ed8-88931c07b946",
    deletedAt: null,
    gameType: "cricket",
    competitionId: "11365612",
    competitionName: "Test Matches",
    title: "Bangladesh v New Zealand",
    marketId: "1.222032054",
    EventId: "32848226",
    teamA: "Bangladesh",
    teamB: "New Zealand",
    teamC: "The Draw",
    startAt: "2023-12-06T03:30:00.000Z",
    stopAt: null,
    matchImage: null,
    teamA_Image: null,
    teamB_Image: null,
    match_max_bet: null,
    betfair_match_min_bet: 100,
    betfair_match_max_bet: 100100,
    betfair_session_min_bet: 100,
    betfair_session_max_bet: 100100,
    betfair_bookmaker_min_bet: 100,
    betfair_bookmaker_max_bet: 100100,
    bookmaker_manual_min_bet: 0,
    bookmaker_manual_max_bet: 0,
    manaual_session_min_bet: 100,
    manaual_session_max_bet: 100100,
    apiMatchActive: true,
    apiBookMakerActive: true,
    apiSessionActive: true,
    manualBookMakerActive: false,
    manualSessionActive: true,
    delaySecond: 3,
    bettings: [
      {
        id: "de8a2629-2863-4db5-9345-3a1d386a010c",
        isActive: true,
        createAt: "2023-12-06T06:54:35.851Z",
        updateAt: "2023-12-06T06:54:35.851Z",
        createdBy: "5f8d4b41-b1c1-4345-8ed8-88931c07b946",
        deletedAt: null,
        match_id: "b501723d-a82c-4a95-a20c-c40e428fce04",
        matchType: "cricket",
        bet_condition: "1st Innings run bhav BAN",
        no_rate: 235,
        yes_rate: 235,
        rate_percent: "120-90",
        suspended: "",
        selectionId: "1stinningsrunbhavban",
        sessionBet: true,
        betStatus: 1,
        stopAt: "2023-12-06T06:54:35.851Z",
        betRestult: null,
        profitLoss: null,
      },
      {
        id: "88afaecc-0a4b-46e4-b8ac-adcf7fe34cfd",
        isActive: true,
        createAt: "2023-12-06T06:54:34.229Z",
        updateAt: "2023-12-06T06:54:34.229Z",
        createdBy: "5f8d4b41-b1c1-4345-8ed8-88931c07b946",
        deletedAt: null,
        match_id: "b501723d-a82c-4a95-a20c-c40e428fce04",
        matchType: "cricket",
        bet_condition: "S Hossain run",
        no_rate: 36,
        yes_rate: 36,
        rate_percent: "110-90",
        suspended: "",
        selectionId: "shossainrun",
        sessionBet: true,
        betStatus: 1,
        stopAt: "2023-12-06T06:54:34.229Z",
        betRestult: null,
        profitLoss: null,
      },
      {
        id: "04231a54-4ded-4ba1-99b6-a82c331bbad4",
        isActive: true,
        createAt: "2023-12-06T06:54:33.405Z",
        updateAt: "2023-12-06T06:54:33.405Z",
        createdBy: "5f8d4b41-b1c1-4345-8ed8-88931c07b946",
        deletedAt: null,
        match_id: "b501723d-a82c-4a95-a20c-c40e428fce04",
        matchType: "cricket",
        bet_condition: "Fall of 5th wkt BAN",
        no_rate: 127,
        yes_rate: 127,
        rate_percent: "100-80",
        suspended: "",
        selectionId: "fallof5thwktban",
        sessionBet: true,
        betStatus: 1,
        stopAt: "2023-12-06T06:54:33.405Z",
        betRestult: null,
        profitLoss: null,
      },
      {
        id: "06798c8b-e079-425b-8470-c8706511a125",
        isActive: true,
        createAt: "2023-12-06T04:22:30.160Z",
        updateAt: "2023-12-06T04:23:11.331Z",
        createdBy: "5f8d4b41-b1c1-4345-8ed8-88931c07b946",
        deletedAt: null,
        match_id: "b501723d-a82c-4a95-a20c-c40e428fce04",
        matchType: "cricket",
        bet_condition: "NH Shanto boundaries",
        no_rate: 2,
        yes_rate: 3,
        rate_percent: "100-100",
        suspended: "",
        selectionId: "nhshantoboundaries",
        sessionBet: true,
        betStatus: 1,
        stopAt: "2023-12-06T04:22:30.160Z",
        betRestult: null,
        profitLoss: null,
      },
      {
        id: "815dab29-09e8-47c6-895b-cbf0f28db5dd",
        isActive: true,
        createAt: "2023-12-06T04:22:31.156Z",
        updateAt: "2023-12-06T04:22:31.156Z",
        createdBy: "5f8d4b41-b1c1-4345-8ed8-88931c07b946",
        deletedAt: null,
        match_id: "b501723d-a82c-4a95-a20c-c40e428fce04",
        matchType: "cricket",
        bet_condition: "15 over run BAN",
        no_rate: 37,
        yes_rate: 38,
        rate_percent: "100-100",
        suspended: "",
        selectionId: "15overrunban",
        sessionBet: true,
        betStatus: 1,
        stopAt: "2023-12-06T04:22:31.156Z",
        betRestult: null,
        profitLoss: null,
      },
      {
        id: "f74819de-04a6-4572-a716-44e2e3946e02",
        isActive: true,
        createAt: "2023-12-06T04:22:28.371Z",
        updateAt: "2023-12-06T04:22:28.371Z",
        createdBy: "5f8d4b41-b1c1-4345-8ed8-88931c07b946",
        deletedAt: null,
        match_id: "b501723d-a82c-4a95-a20c-c40e428fce04",
        matchType: "cricket",
        bet_condition: "Fall of 3rd wkt BAN",
        no_rate: 52,
        yes_rate: 52,
        rate_percent: "110-90",
        suspended: "",
        selectionId: "fallof3rdwktban",
        sessionBet: true,
        betStatus: 1,
        stopAt: "2023-12-06T04:22:28.371Z",
        betRestult: null,
        profitLoss: null,
      },
      {
        id: "55fef3e9-9903-4f2a-b52b-d83c48dbb714",
        isActive: true,
        createAt: "2023-12-06T04:22:20.461Z",
        updateAt: "2023-12-06T04:22:20.461Z",
        createdBy: "5f8d4b41-b1c1-4345-8ed8-88931c07b946",
        deletedAt: null,
        match_id: "b501723d-a82c-4a95-a20c-c40e428fce04",
        matchType: "cricket",
        bet_condition: "12 over run BAN",
        no_rate: 30,
        yes_rate: 30,
        rate_percent: "170-120",
        suspended: "",
        selectionId: "12overrunban",
        sessionBet: true,
        betStatus: 1,
        stopAt: "2023-12-06T04:22:20.461Z",
        betRestult: null,
        profitLoss: null,
      },
      {
        id: "5b259bdb-8431-4bab-8696-22a0eec9bf17",
        isActive: true,
        createAt: "2023-12-06T04:21:20.432Z",
        updateAt: "2023-12-06T04:21:20.432Z",
        createdBy: "5f8d4b41-b1c1-4345-8ed8-88931c07b946",
        deletedAt: null,
        match_id: "b501723d-a82c-4a95-a20c-c40e428fce04",
        matchType: "cricket",
        bet_condition: null,
        no_rate: null,
        yes_rate: null,
        rate_percent: null,
        suspended: "suspended",
        selectionId: null,
        sessionBet: false,
        betStatus: 1,
        stopAt: "2023-12-06T04:21:20.432Z",
        betRestult: null,
      },
    ],
    bookmakers: [
      {
        id: "0ce79b49-85c3-463a-bfac-6320a788cd1b",
        isActive: true,
        createAt: "2023-12-06T04:21:20.456Z",
        updateAt: "2023-12-06T07:31:54.616Z",
        createdBy: "5f8d4b41-b1c1-4345-8ed8-88931c07b946",
        deletedAt: null,
        match_id: "b501723d-a82c-4a95-a20c-c40e428fce04",
        bet_id: "5b259bdb-8431-4bab-8696-22a0eec9bf17",
        matchType: "cricket",
        marketType: "QuickBookmaker0",
        marketName: "book0",
        min_bet: 100,
        max_bet: 100100,
        teamA_Back: 3,
        teamB_Back: null,
        teamC_Back: null,
        teamA_suspend: null,
        teamB_suspend: "suspended",
        teamC_suspend: "suspended",
        teamA_lay: 4,
        teamB_lay: null,
        teamC_lay: null,
        sessionBet: false,
        betStatus: 1,
        teamA: "Bangladesh",
        teamB: "New Zealand",
        teamC: "The Draw",
      },
      {
        id: "072a6251-eac0-4344-a792-0dde184e6c17",
        isActive: true,
        createAt: "2023-12-06T04:21:20.456Z",
        updateAt: "2023-12-06T07:31:54.661Z",
        createdBy: "5f8d4b41-b1c1-4345-8ed8-88931c07b946",
        deletedAt: null,
        match_id: "b501723d-a82c-4a95-a20c-c40e428fce04",
        bet_id: "5b259bdb-8431-4bab-8696-22a0eec9bf17",
        matchType: "cricket",
        marketType: "QuickBookmaker1",
        marketName: "book1",
        min_bet: 100,
        max_bet: 100100,
        teamA_Back: null,
        teamB_Back: null,
        teamC_Back: null,
        teamA_suspend: "suspended",
        teamB_suspend: "suspended",
        teamC_suspend: "suspended",
        teamA_lay: null,
        teamB_lay: null,
        teamC_lay: null,
        sessionBet: false,
        betStatus: 1,
        teamA: "Bangladesh",
        teamB: "New Zealand",
        teamC: "The Draw",
      },
    ],
    bookMakerRateLive: true,
    matchOddRateLive: true,
    teamA_rate: "2580",
    teamB_rate: "-805.8",
    teamC_rate: "-790",
  };

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

  // useEffect(() => {
  //   if (state?.id) {
  //   }
  // }, [state?.id]);

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
            {(currentMatch?.apiSessionActive ||
              currentMatch?.manualSessionActive) && (
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
                    currentMatch={currentMatch}
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
                    currentMatch={currentMatch}
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
                  return (
                    <RunsBox
                      // currentOdds={
                      //   currentOdds?.bet_id === v?.id ? currentOdds : null
                      // }
                      key={v?.id}
                      item={v}
                      // setData={setData}
                    />
                  );
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
            {currentMatch?.apiMatchActive && (
              <MatchOdds
                matchOdds={
                  currentMatch?.bettings?.length > 0
                    ? currentMatch?.bettings?.filter(
                        (v: any) => v?.sessionBet === false
                      )[0]
                    : null
                }
                showHeader={true}
                currentMatch={currentMatch}
                // setCurrentMatch={setCurrentMatch}
                // matchOddsLive={matchOddsLive}
              />
            )}
            {currentMatch?.apiBookMakerActive && (
              <BookMarket
                // socket={socket}
                // setCurrentMatch={setCurrentMatch}
                matchOdds={
                  currentMatch?.bettings?.length > 0
                    ? [...currentMatch?.bettings].filter(
                        (v) => v?.sessionBet === false
                      )[0]
                    : null
                }
                currentMatch={currentMatch}
                // liveData={bookmakerLivedata}
              />
            )}

            {currentMatch?.id && <BetList allBetRates={Bets} />}
          </Box>
        </>
      )}
    </Box>
  );
};

export default MatchDetails;
