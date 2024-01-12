export const ApiConstants = {
  LOGIN: "auth/login",
  LOGOUT: "auth/logout",
  MATCH: {
    ADD: "match/add",
    EDIT: "match/update",
    LIST: "match/list",
    DROPDOWNLIST: "/match/listWithManualBetting",
    GETDETAIL: "match",
    UPDATEACTIVESTATUS: "match/updateActiveStatus",
  },
  USER: {
    CHANGEPASSWORD: "user/password",
    MARQUEE_NOTIFICATION: "/general/notification/add",
    PROFILE: "user/profile",
  },
  SESSION: {
    ADD: "session/add",
    GET: "session",
    RESULTDECLARE: "/bet/declare/result/session",
    NO_RESULT: "/bet/declare/noResult/session",
  },
  BOOKMAKER: {
    GET: "matchBeting",
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
  matchSocket:
    process.env.NODE_ENV === "production"
      ? `${Constants.thirdParty}`
      : "http://localhost:3200",
};
