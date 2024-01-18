const constants = {
  apiPath: "http://3.89.232.255:6060",
  microServiceApiPath:
    process.env.NODE_ENV === "production"
      ? "http://3.89.232.255:3200"
      : "http://localhost:3200",

  //---------------------------------------User Roles--------------------------------------------------\\

  SuperAdmin: 1,
  Expert: 2,
  Admin: 3,
  SuperMaster: 4,
  Master: 5,
  User: 6,

  //----------------------------------------Match Types------------------------------------------------\\

  MatchType: 1,
  SessionType: 2,
  TestType: 3,

  //---------------------------------------Button Types-------------------------------------------------\\

  Save: 1,
  Launch: 2,
  Close: 3,

  // --------------------------------------Session Bets Type -------------------------------------------------//

  Manual: 1,
  Fancy: 2,

  SessionTimerLOGOUT: 24 * 60 * 60 * 1000,
  SessionTimerWARN: 23 * 60 * 60 * 1000,

  // --------------------------------------ErrorMessages -------------------------------------------------//

  LoginServerError:
    "Sorry, we were unable to process your login request at this time due to a server configuration error. Please try again later or contact our support team for assistance.",

  // -------React Captcha--------//

  REACT_APP_SECRET_KEY: "6Lc7BsAiAAAAAA6gDOpiBsb8fybpUYfS8_qLY9NS",
  REACT_APP_SITE_KEY: "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI",

  // ----------- Matches ---------- //

  matchType: [
    "cricket",
    "tennis",
    "football",
    "ice",
    "hockey",
    "volleyball",
    "politics",
    "basketball",
    "table_tennis",
    "darts",
  ],
  defaultMarketId: 4312,

  pageLimit: 10,
  pageCount: 10,
  listOfClientCountLimit: 15,

  // customPageLimit: 10,
  // customTimeOut: 300000,// 5 mint in mili seconds user ideal 5 mint after that logout
  // customTimer: 30000,// 30 sec in mili seconds remainint timer start and show message  Your session will expire in 30 second
  // sessionExpireTime: 30 // 30 sec,

  customPageLimit: 15,
  customTimeOut: 1000 * 60 * 60, // 5 mint in mili seconds user ideal 5 mint after that logout
  customTimer: 1000 * 60 * 5, // 30 sec in mili seconds remainint timer start and show message  Your session will expire in 30 second
  sessionExpireTime: 60 * 5, // 30 sec,
};

export default constants;
