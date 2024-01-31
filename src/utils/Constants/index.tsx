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
    addBookMaker: "add_book_maker",
    betOdds: "betOdds",
    changePassword: "change-password",
  },
};

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
