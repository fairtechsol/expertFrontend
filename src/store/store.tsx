import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./reducers/auth/authReducer";
import { userReducer } from "./reducers/user";
import { addMatchReducer } from "./reducers/addMatch";
import { matchListReducers } from "./reducers/match/matchList";
import { addSessionReducers } from "./reducers/addSession";
import { matchDeclareReducers } from "./reducers/match/matchDeclare";

const store = configureStore({
  reducer: {
    auth: authReducer,
    addSession: addSessionReducers,
    user: userReducer,
    addMatch: addMatchReducer,
    matchList: matchListReducers,
    match: matchDeclareReducers,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
