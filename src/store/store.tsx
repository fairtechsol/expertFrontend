import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./reducers/auth/authReducer";
import { userReducer } from "./reducers/user";
import { addMatchReducer } from "./reducers/addMatch";

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    addMatch: addMatchReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
