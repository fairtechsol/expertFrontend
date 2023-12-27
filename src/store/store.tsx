import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./reducers/auth/authReducer";
import { userReducer } from "./reducers/user";
import { addMatchReducer } from "./reducers/addMatch";
import { matchListReducers } from "./reducers/match/matchList";
import { addSessionReducers } from "./reducers/addSession";

const store = configureStore({
  reducer: {
    auth: authReducer,
    addSession: addSessionReducers,
    user: userReducer,
    addMatch: addMatchReducer,
    matchList: matchListReducers,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
