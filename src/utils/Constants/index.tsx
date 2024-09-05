import constants from "../../components/helper/constants";

export const ApiConstants = {
  LOGIN: "auth/login",
  LOGOUT: "auth/logout",
  OLD_PASSWORD: "/user/check/oldPassword",
  MATCH: {
    ADD: "match/add",
    ADD_RACE: "match/racingAdd",
    EDIT: "match/update",
    EDIT_RACE: "match/racingUpdate",
    LIST: "match/list",
    LIST_SESSION_PRO_LOSS: "session/result",
    DROPDOWNLIST: "/match/listWithManualBetting",
    GETDETAIL: "match",
    OTHER_MATCH_DETAIL: "match/otherMatch",
    UPDATEACTIVESTATUS: "match/updateActiveStatus",
    UPDATEMULTIPLEACTIVESTATUS: "match/updateActiveStatus/multiple",
    DECLARE: "bet/declare/result/match",
    OTHER_DECLARE: "bet/declare/result/other/match",
    RACE_DECLARE: "bet/declare/result/race/match",
    UNDECLARE: "bet/unDeclare/result/match",
    OTHER_UNDECLARE: "bet/unDeclare/result/other/match",
    RACE_UNDECLARE: "bet/unDeclare/result/race/match",
    GET_BETS: "/bet",
    GET_DATES: "match/dateWiseList",
    GET_COUNTRY_CODE: "match/countryWiseList",
    GET_RACE_LIST: "match/racing/list",
    GET_RACE_MATCH: "match/racing",
  },
  USER: {
    CHANGEPASSWORD: "user/password",
    MARQUEE_NOTIFICATION: "/general/notification/add",
    PROFILE: "user/profile",
    LOGGED_USER: "user/totalLoginCount",
  },
  SESSION: {
    ADD: "session/add",
    UPDATE: "session/update",
    GET: "session",
    BETTING_STATUS: "/session/status",
    RESULTDECLARE: "/bet/declare/result/session",
    NO_RESULT: "/bet/declare/noResult/session",
    UNDECLARE_RESULT: "/bet/unDeclare/result/session",
    PROFIT_LOSS: "/session/profitLoss",
    GET_PLACED_BETS: "/bet",
  },
  BOOKMAKER: {
    GET: "matchBeting",
    BETTINGSTATUS: "/matchBeting/status/change",
    RACESTATUS: "/matchBeting/race/status/change",
  },
};

export const Constants = {
  pageLimit: 15,
  apiBasePath: "https://devmaxbet9api.fairgame.club",
  expertSocketBasePath: "https://devexpertapi.fairgame.club",
  thirdParty: "https://devserviceapi.fairgame.club",
  apiBasePathLive: "https://betfairapi.fairgame7.com",
  expertSocketBasePathLive: "https://expertapi.fairgame7.com",
  thirdPartyLive: "https://serviceapi.fairgame7.com",
  localPath: "http://localhost:5000",
  localPathThird: "http://localhost:3200",
  localPathExpert: "http://localhost:6060",

  ///Routes Constants

  AuthPaths: {
    root: "/",
    login: "expert/login",
    changePassword: "expert/change_password",
  },

  MainPaths: {
    root: "/expert",
    match: "match",
    race: "race/:raceType",
    addMatch: "add_match",
    addRace: "add_race",
    editMatch: "edit_match",
    editrace: "edit_race",
    live: "live",
    live_update: "live/:id",
    addBookMaker: "add_book_maker",
    // betOdds: "betOdds",
    betOddsOtherGames: "betOdds/otherGames",
    betOddsRace: "betOdds/race",
    session: "session",
    sessionBetList: "sessionBetList",
    market: "market",
    changePassword: "change-password",
  },
  WEBSOCKET: "websocket",
  POLLING: "polling",
  PRODUCTION: "production",
};

export const ButtonRatesQuickSessions = [
  { name: "90-110", value: "90-110" },
  { name: "95-110", value: "95-110" },
  { name: "95-115", value: "95-115" },
  { name: "85-115", value: "85-115" },
  { name: "75-125", value: "75-125" },
  { name: "80-120", value: "80-120" },
  { name: "80-130", value: "80-130" },
  { name: "90-140", value: "90-140" },
  { name: "85-100", value: "85-100" },
  { name: "80-100", value: "80-100" },
  { name: "70-100", value: "70-100" },
  { name: "60-90", value: "60-90" },
  { name: "50-80", value: "50-80" },
  { name: "40-70", value: "40-70" },
  { name: "30-60", value: "30-60" },
  { name: "25-50", value: "25-50" },
  { name: "100-115", value: "100-115" },
  { name: "100-120", value: "100-120" },
  { name: "100-130", value: "100-130" },
  { name: "100-150", value: "100-150" },
  { name: "130-200", value: "130-200" },
  { name: "150-250", value: "150-250" },
  { name: "200-350", value: "200-350" },
  { name: "250-400", value: "250-400" },
];

export const matchBettingType = {
  matchOdd: "matchOdd",
  bookmaker: "bookmaker",
  quickbookmaker1: "quickbookmaker1",
  quickbookmaker2: "quickbookmaker2",
  quickbookmaker3: "quickbookmaker3",
  tiedMatch1: "tiedMatch1",
  tiedMatch2: "tiedMatch2",
  completeMatch: "completeMatch",
  completeManual: "completeManual",
  setWinner1: "setWinner1",
  setWinner2: "setWinner2",
  ...Array.from({ length: 20 }, (_, index: any) => index).reduce(
    (prev, curr) => {
      prev[`overUnder${curr}.5`] = `overUnder${curr}.5`;
      return prev;
    },
    {}
  ),
  ...Array.from({ length: 20 }, (_, index: any) => index).reduce(
    (prev, curr) => {
      prev[`firstHalfGoal${curr}.5`] = `firstHalfGoal${curr}.5`;
      return prev;
    },
    {}
  ),
  halfTime: "halfTime",
};

export const eventWiseMatchData = {
  [constants.matchType[0]]: {
    manual: [
      {
        matchType: matchBettingType.completeManual,
        apiKey: "manualCompleteMatch",
        label: "Complete Manual Match Max Bet",
        name: "CompleteManual",
      },
      {
        matchType: matchBettingType.tiedMatch2,
        apiKey: "manualTideMatch",
        label: "Manual Tied Match Max Bet",
        name: "ManualTide",
      },
    ],
    market: [
      {
        matchType: matchBettingType.tiedMatch1,
        apiKey: "apiTideMatch",
        label: "API Tied Match Max Bet",
        name: "Tied",
        marketIdKey: "apiTideMatch",
      },
      {
        matchType: matchBettingType.matchOdd,
        apiKey: "matchOdd",
        marketIdKey: "matchOdd",
        label: "API Match Odd Max Bet",
        name: "MatchOdd",
      },
      {
        matchType: matchBettingType.bookmaker,
        apiKey: "bookmaker",
        label: "API Bookmaker Max Bet",
        name: "Bookmaker",
        marketIdKey: "matchOdd",
      },
      {
        matchType: matchBettingType.completeMatch,
        apiKey: "marketCompleteMatch",
        label: "API Complete Match Max Bet",
        name: "Complete",
        marketIdKey: "marketCompleteMatch",
      },
    ],
  },
  [constants.matchType[1]]: {
    manual: [],
    market: [
      {
        matchType: matchBettingType.matchOdd,
        apiKey: "matchOdd",
        marketIdKey: "matchOdd",
        label: "API Match Odd Max Bet",
        name: "MatchOdd",
      },
      ...Array.from({ length: 20 }, (_, index: any) => index).map((curr) => {
        // prev[`overUnder${curr}.5`] = `overUnder${curr}.5`
        return {
          matchType: matchBettingType[`setWinner${curr}`],
          apiKey: `setWinner${curr}`,
          label: `Set Winner ${curr} Max Bet`,
          name: "Set Winner",
          marketIdKey: `setWinner${curr}`,
        };
      }),
    ],
  },
  [constants.matchType[2]]: {
    manual: [],
    market: [
      {
        matchType: matchBettingType.matchOdd,
        apiKey: "matchOdd",
        marketIdKey: "matchOdd",
        label: "API Match Odd Max Bet",
        name: "MatchOdd",
      },
      {
        matchType: matchBettingType.bookmaker,
        apiKey: "bookmaker",
        label: "API Bookmaker Max Bet",
        name: "Bookmaker",
        marketIdKey: "matchOdd",
      },

      ...Array.from({ length: 20 }, (_, index: any) => index).map((curr) => {
        // prev[`overUnder${curr}.5`] = `overUnder${curr}.5`
        return {
          matchType: matchBettingType[`overUnder${curr}.5`],
          apiKey: `overUnder${curr}.5`,
          label: `Over Under ${curr}.5 Max Bet`,
          name: "Over Under",
          marketIdKey: `overUnder${curr}.5`,
        };
      }),
      ...Array.from({ length: 20 }, (_, index: any) => index).map((curr) => {
        // prev[`firstHalfGoal${curr}.5`] = `firstHalfGoal${curr}.5`
        return {
          matchType: matchBettingType[`firstHalfGoal${curr}.5`],
          apiKey: `firstHalfGoal${curr}.5`,
          label: `First Half ${curr}.5 Max Bet`,
          name: "First Half",
          marketIdKey: `firstHalfGoal${curr}.5`,
        };
      }),
      {
        matchType: matchBettingType.halfTime,
        apiKey: "halfTime",
        label: "Half Time Max Bet",
        name: "Half Time",
        marketIdKey: "halfTime",
      },
    ],
  },
};

export const profitLossDataForMatchConstants = {
  [matchBettingType.matchOdd]: {
    A: "teamARate",
    B: "teamBRate",
    C: "teamCRate",
  },
  [matchBettingType.bookmaker]: {
    A: "teamARate",
    B: "teamBRate",
    C: "teamCRate",
  },
  [matchBettingType.quickbookmaker1]: {
    A: "teamARate",
    B: "teamBRate",
    C: "teamCRate",
  },
  [matchBettingType.quickbookmaker2]: {
    A: "teamARate",
    B: "teamBRate",
    C: "teamCRate",
  },
  [matchBettingType.quickbookmaker3]: {
    A: "teamARate",
    B: "teamBRate",
    C: "teamCRate",
  },
  [matchBettingType.tiedMatch1]: {
    A: "yesRateTie",
    B: "noRateTie",
  },
  [matchBettingType.tiedMatch2]: {
    A: "yesRateTie",
    B: "noRateTie",
  },
  [matchBettingType.completeMatch]: {
    A: "yesRateComplete",
    B: "noRateComplete",
  },
  [matchBettingType.completeManual]: {
    A: "yesRateComplete",
    B: "noRateComplete",
  },
  ...Array.from({ length: 20 }, (_, index) => index).reduce(
    (prev: any, curr) => {
      prev[`overUnder${curr}.5`] = {
        A: `yesRateUnderOver${curr}.5`,
        B: `noRateUnderOver${curr}.5`,
      };
      return prev;
    },
    {}
  ),
  ...Array.from({ length: 20 }, (_, index) => index).reduce(
    (prev: any, curr) => {
      prev[`firstHalfGoal${curr}.5`] = {
        A: `yesRateFirstHalfGoal${curr}.5`,
        B: `noRateFirstHalfGoal${curr}.5`,
      };
      return prev;
    },
    {}
  ),
  [matchBettingType.halfTime]: {
    A: "userTeamARateHalfTime",
    B: "userTeamBRateHalfTime",
    C: "userTeamCRateHalfTime",
  },

  ...Array.from({ length: 20 }, (_, index) => index).reduce(
    (prev: any, curr) => {
      prev[`setWinner${curr}`] = {
        A: `userTeamARateSetWinner${curr}`,
        B: `userTeamBRateSetWinner${curr}`,
        C: `userTeamCRateSetWinner${curr}`,
      };
      return prev;
    },
    {}
  ),
};

export const gameTypeMatchBetting = {
  match: "match",
  match1: "match1",
  fancy: "fancy",
  fancy1: "fancy1",
  oddeven: "oddeven",
  cricketcasino: "cricketcasino",
};

export const betListColorConstants: any = {
  session: "#319E5B",
  matchOdd: "#F1C550",
  bookmaker: "#F1C550",
  quickbookmaker1: "#F1C550",
  quickbookmaker2: "#F1C550",
  quickbookmaker3: "#F1C550",
  completeMatch: "#faf11b",
  completeManual: "#faf11b",
  tiedMatch1: "#faf11b",
  tiedMatch2: "#faf11b",
  cricketCasino: "#00c0f987",
  oddEven: "#bebebe",
  fancy1: "#46e080",
  overByOver: "#f5c0c0",
  ballByBall: "#e5ffd5",
};

export const addMatchThirdParty =
  process.env.NODE_ENV === Constants.PRODUCTION
    ? Constants.thirdParty
    : Constants.localPathThird;

export const baseUrls = {
  socket:
    process.env.NODE_ENV === Constants.PRODUCTION
      ? Constants.apiBasePath
      : Constants.localPath,
  expertSocket:
    process.env.NODE_ENV === Constants.PRODUCTION
      ? Constants.expertSocketBasePath
      : Constants.localPathExpert,
  matchSocket:
    process.env.NODE_ENV === Constants.PRODUCTION
      ? Constants.thirdParty
      : Constants.localPathThird,
};

// export const addMatchThirdParty =
//   process.env.NODE_ENV === Constants.PRODUCTION
//     ? Constants.thirdPartyLive
//     : Constants.localPathThird;

// export const baseUrls = {
//   socket:
//     process.env.NODE_ENV === Constants.PRODUCTION
//       ? Constants.apiBasePathLive
//       : Constants.localPath,
//   expertSocket:
//     process.env.NODE_ENV === Constants.PRODUCTION
//       ? Constants.expertSocketBasePathLive
//       : Constants.localPathExpert,
//   matchSocket:
//     process.env.NODE_ENV === Constants.PRODUCTION
//       ? Constants.thirdPartyLive
//       : Constants.localPathThird,
// };
