export const ApiConstants = {
  LOGIN: "auth/login",
  LOGOUT: "auth/logout",
  CHANGE_PASS: "/user/check/oldPassword",
  MATCH: {
    ADD: "match/add",
    EDIT: "match/update",
    LIST: "match/list",
    LIST_SESSION_PRO_LOSS: "session/result",
    DROPDOWNLIST: "/match/listWithManualBetting",
    GETDETAIL: "match",
    UPDATEACTIVESTATUS: "match/updateActiveStatus",
    DECLARE: "bet/declare/result/match",
    UNDECLARE: "bet/unDeclare/result/match",
    GET_BETS: "/bet",
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
  },
};
const thirdParty = "https://devserviceapi.fairgame.club";
const thirdPartyLive = "https://serviceapi.fairgame7.com";

export const Constants = {
  pageLimit: 15,
  apiBasePath: "https://devmaxbet9api.fairgame.club",
  expertSocketBasePath: "https://devexpertapi.fairgame.club",
  thirdParty: thirdParty,
  apiBasePathLive: "https://betfairapi.fairgame7.com",
  expertSocketBasePathLive: "https://expertapi.fairgame7.com",
  thirdPartyLive: "https://serviceapi.fairgame7.com",
  localPath: "http://localhost:5000",
  localPathThird: "http://localhost:3200",
  localPathExpert: "http://localhost:6060",
  addMatchThirdParty:
    process.env.NODE_ENV === "production" ? thirdPartyLive : thirdParty,

  ///Routes Constants

  AuthPaths: {
    root: "/",
    login: "expert/login",
    changePassword: "expert/change_password",
  },

  MainPaths: {
    root: "/expert",
    match: "match",
    addMatch: "add_match",
    editMatch: "edit_match",
    live: "live",
    live_update: "live/:id",
    addBookMaker: "add_book_maker",
    betOdds: "betOdds",
    changePassword: "change-password",
  },
  WEBSOCKET: "websocket",
  POLLING: "polling",
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

// use below baseUrl for testing build

// export const baseUrls = {
//   socket:
//     process.env.NODE_ENV === "production"
//       ? `${Constants.apiBasePath}`
//       : `${Constants.localPath}`,
//   expertSocket:
//     process.env.NODE_ENV === "production"
//       ? `${Constants.expertSocketBasePath}`
//       : `${Constants.localPathExpert}`,
//   matchSocket:
//     process.env.NODE_ENV === "production"
//       ? `${Constants.thirdParty}`
//       : `${Constants.localPathThird}`,
// };

// use below baseUrl for live build

export const baseUrls = {
  socket:
    process.env.NODE_ENV === "production"
      ? `${Constants.apiBasePathLive}`
      : `${Constants.localPath}`,
  expertSocket:
    process.env.NODE_ENV === "production"
      ? `${Constants.expertSocketBasePathLive}`
      : `${Constants.localPathExpert}`,
  matchSocket:
    process.env.NODE_ENV === "production"
      ? `${Constants.thirdPartyLive}`
      : `${Constants.localPathThird}`,
};
