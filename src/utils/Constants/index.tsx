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
  },
  BOOKMAKER: {
    GET: "matchBeting",
  },
};

export const Constants = {
  pageLimit: 15,

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
