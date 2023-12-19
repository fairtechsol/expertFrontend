import { combineReducers } from "@reduxjs/toolkit";
import { profileReducer } from "./profileSlice";

export const userReducer = combineReducers({
  profile: profileReducer,
});
