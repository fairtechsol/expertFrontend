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
    OTHER_MARKET_DECLARE: "bet/declare/result/other/market",
    OTHER_MARKET_UNDECLARE: "bet/unDeclare/result/other/market",
    TOURNAMENT_MARKET_DECLARE: "bet/declare/result/tournament/match",
    TOURNAMENT_MARKET_UNDECLARE: "bet/unDeclare/result/tournament/match",
    UNDECLARE: "bet/unDeclare/result/match",
    OTHER_UNDECLARE: "bet/unDeclare/result/other/match",
    RACE_UNDECLARE: "bet/unDeclare/result/race/match",
    GET_BETS: "/bet",
    GET_DATES: "match/dateWiseList",
    GET_COUNTRY_CODE: "match/countryWiseList",
    GET_RACE_LIST: "match/racing/list",
    GET_RACE_MATCH: "match/racing",
    GET_TOURNAMENT: "matchBeting/tournament/",
    GET_RATE: "getExpertRateDetails/",
  },
  USER: {
    CHANGEPASSWORD: "user/password",
    MARQUEE_NOTIFICATION: "/general/notification/add",
    BANNER: "/general/banner/add",
    PROFILE: "user/profile",
    LOGGED_USER: "user/totalLoginCount",
  },
  SESSION: {
    ADD: "session/add",
    UPDATE: "session/update",
    UPDATE_MULTI_MARKET_AMOUNT: "session/multi/maxBet/update",
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
  BLINK: {
    GET_TAB: "blinkingTabs",
    ADD: "blinkingTabs/add",
    DELETE: "/blinkingTabs/",
  },
};

export const Constants = {
  pageLimit: 30,
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
    tab: "tab",
    race: "race/:raceType",
    addMatch: "add_match",
    addRace: "add_race",
    editMatch: "edit_match",
    editrace: "edit_race",
    live: "live",
    live_update: "live/:id",
    addBookMaker: "add_book_maker",
    addManualMarket: "addManualMarket",
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
  randomeNumber: "JiskaPataNaLageG",
  publicNumber: `U2FsdGVkX1+7Lz0LzD8AsrBoHiQrViZiWhIWBqYuL4dgfGXwUbjJndfELn+Usn4xpSEl8s1RoIqzSS/EHUfPLYK/iq/6V0lKQpDaaK52maKES7/cOdFiuXYTVTGu+/HajYeHTly+Xgn1egPHG1NcK9wP6U3vTUDEkHaB2C4hNejgB/JPzdDD8pp60kc+VzCrkbxbRM2oiR4iEtCRQPac4vz0SdQFaSPaG1gexmBFdu/w5ZMSPoPxuSM2rSA0UvmYobUoP5VkQbkIlL1fZhlwOmJ2bm5AHUyfzfHU1njCgwYhB6eJswzg0Qr8lu2cstCaB6zmxeXmdYF41o157foAyeXgBT/TRYt4nwFQ4WuKngLRPPjM6/LD/sY9sZBFv58i`,
  privateNumber: `U2FsdGVkX19PB0k7pc6tsaolSzWPHY2kgJvHhevrMQ7JuPxXzoTJ/RVKBD6yBUt3xnPx4Nu+beP2YSbQ5GvSxw0ZJRzPMDNp1UOtOPzl5afvOf2wbvZLzhHSkW/qUmERYHLa7b24YLZDY0nIjS6PRLxc22qlRavxSa0/LCRGN0tWmTneiwD6aCgYPkD6YyzpL7qhBPCPSzCJ4CG05wknMfhg6kZSfNEYssJy3moQdlNTjr/6H923TMHCyE5GNfXeLgEYFdA2xxfbRiDJNvm9oJeDyhOiKOqM5kw7GceZQ4pHbtd4snOkfrMjVCY+ogpkXGpauvyTO+dJrqb2rDJ2OZlfHgXhCbWXlyq6CPFmmwqly5ZtJMDyOLhUZ/yJ2z4e/vLJYFuEcOFk4BQrpmnsAiVsCZyV9WGZER5mR11Wri0kWBw0Nya/mbGljAYWJzB8PcpUvZcwa3/Zoh6WgYzoSeAKWP8ftQvcHOQIa7XrFUWWYGH9DpHFJ4f2TnLb+azIMeFkdLXRTO0wETkf3G1H8uSND7B95tHn4L77wcXe5lHTguj4vFHs3dy+o+sqRKqilB6et/ehikfinAh6aBg2isbVnnp5BFzvfwwPKEMb1bKfMpFB3xg9ip8qsVKN6t3Igx5ur8E6ZQ/GpQ4IBUqFc/gkj3cA4v+inA/x/J4Al3RB2kw5V3Jm0Nq9cDf7pUY9AGOoTWZz+TOGKXCrctWBRolCLBmJRKMBGcPCZd7WgCTU3dMzqb4MB8e86QBVNQO8rAr1Nb4IQIcohAthGaFScD0VmWv1/omL0GxIvFY+tNl0IT9OK0rF9pAM+LjuCzP56MeMpEQx+K5LR8sUQtN9QXcHaQfmkBv8ThPmQGkyRKM7t6Pimf9j1niiUp3HArtIFCKFTzYpPEXHc0LeAYLr7TQ06zlLuQLsOcHsIim/0aNAjyXVUFcVvNX673sKA6wvaAMLdJOAzea54U+MVOgeP1t2WTJGjr7TiUKm8SWxVy0OhxRKyjFtJPGktUCYA/4h0oNtVb1atSBBGfcbtt6RubdtQzGfYGjjJHSc329dS17AgoCdlyu1FllcJ3MqGya6LySxBN29Jh9qM9N5Qw3cnvvkkhG/f0yj44Vcna3MjxS4gobAFa5jZacxQ8w0xGRkjETfN/22Kt7qUZnKwQ5f21iMeTDXDtNwN/Pld866Z9GVBQKekM6J9AhR0kWVZJQJ`,
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
  bookmaker2: "bookmaker2",
  quickbookmaker1: "quickbookmaker1",
  quickbookmaker2: "quickbookmaker2",
  quickbookmaker3: "quickbookmaker3",
  tiedMatch1: "tiedMatch1",
  tiedMatch2: "tiedMatch2",
  tiedMatch3: "tiedMatch3",
  completeMatch: "completeMatch",
  completeMatch1: "completeMatch1",
  completeManual: "completeManual",
  setWinner1: "setWinner1",
  setWinner2: "setWinner2",
  other: "other",
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
  [matchBettingType.bookmaker2]: {
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
  [matchBettingType.tiedMatch3]: {
    A: "yesRateTie",
    B: "noRateTie",
  },
  [matchBettingType.completeMatch]: {
    A: "yesRateComplete",
    B: "noRateComplete",
  },
  [matchBettingType.completeMatch1]: {
    A: "yesRateComplete",
    B: "noRateComplete",
  },
  [matchBettingType.completeManual]: {
    A: "yesRateComplete",
    B: "noRateComplete",
  },
  [matchBettingType.other]: {
    A: "userTeamARateOther",
    B: "userTeamBRateOther",
    C: "userTeamCRateOther",
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
  session: { background: "#319E5B", textColor: "#fff" },
  match_odds: { background: "#fff", textColor: "#000" },
  bookmaker: { background: "#F6C550", textColor: "#000" },
  bookmakermatch: { background: "#F6C550", textColor: "#000" },
  bookmaker2: { background: "#F6C550", textColor: "#000" },
  quickbookmaker1: { background: "#5c1d04", textColor: "#fff" },
  quickbookmaker2: { background: "#5c1d04", textColor: "#fff" },
  quickbookmaker3: { background: "#5c1d04", textColor: "#fff" },
  completed_match: { background: "#0549F5", textColor: "#fff" },
  completedmatch: { background: "#0549F5", textColor: "#fff" },
  completeManual: { background: "#3F345C", textColor: "#fff" },
  tied_match: { background: "#fcf11b", textColor: "#000" },
  tiedMatch2: { background: "#EE82EE", textColor: "#000" },
  tiedmatch: { background: "#452245", textColor: "#fff" },
  cricketCasino: { background: "#FF1111", textColor: "#fff" },
  oddEven: { background: "#7c46e6", textColor: "#fff" },
  fancy1: { background: "#FF8633", textColor: "#000" },
  overByover: { background: "#FFA07A", textColor: "#fff" },
  ballByBall: { background: "#33FF33", textColor: "#fff" },
  khado: { background: "#E6E6FA", textColor: "#000" },
  meter: { background: "#808000 ", textColor: "#fff" },
  other: { background: "#000", textColor: "#fff" },
  tournament: { background: "#FFC0CB", textColor: "#000" },
};

export const marketArray = [
  "matchOdd",
  "bookmaker",
  "marketBookmaker2",
  "quickBookmaker",
  "apiTideMatch",
  "apiTiedMatch2",
  "tiedMatch1",
  "tiedMatch2",
  "tiedMatch3",
  "manualTiedMatch",
  "marketCompleteMatch",
  "marketCompleteMatch1",
  "manualCompleteMatch",
];

export const gameType = ["cricket", "football", "tennis", "politics"];

export const addMatchThirdParty = import.meta.env.VITE_THIRD_PARTY_BASE_URL;

export const serviceUrl = import.meta.env.VITE_BASE_URL;

export const baseUrls = {
  matchSocket: import.meta.env.VITE_THIRD_PARTY_BASE_URL,
  expertSocket: import.meta.env.VITE_BASE_URL,
};
