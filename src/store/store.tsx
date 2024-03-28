import { configureStore } from "@reduxjs/toolkit";
import { addMatchReducer } from "./reducers/addMatch";
import { addSessionReducers } from "./reducers/addSession";
import { authReducer } from "./reducers/auth/authReducer";
import { matchDeclareReducers } from "./reducers/match/matchDeclare";
import { matchListReducers } from "./reducers/match/matchList";
import { userReducer } from "./reducers/user";

const store = configureStore({
  reducer: {
    auth: authReducer,
    addSession: addSessionReducers,
    user: userReducer,
    addMatch: addMatchReducer,
    matchList: matchListReducers,
    match: matchDeclareReducers,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
