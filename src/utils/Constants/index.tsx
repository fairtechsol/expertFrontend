export const ApiConstants = {
  LOGIN: "auth/login",
  LOGOUT: "auth/logout",
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

export const Constants = {
  pageLimit: 15,
  apiBasePath: "http://3.89.232.255:5000",
  expertSocketBasePath: "http://3.89.232.255:6060",
  thirdParty: "http://3.89.232.255:3200",

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

export const baseUrls = {
  socket:
    process.env.NODE_ENV === "production"
      ? `${Constants.apiBasePath}`
      : "http://localhost:5000",
  expertSocket:
    process.env.NODE_ENV === "production"
      ? `${Constants.expertSocketBasePath}`
      : "http://localhost:6060",
  // : `${Constants.thirdParty}`,
  matchSocket:
    process.env.NODE_ENV === "production"
      ? `${Constants.thirdParty}`
      : "http://localhost:3200",
  // `${Constants.thirdParty}`,
};
