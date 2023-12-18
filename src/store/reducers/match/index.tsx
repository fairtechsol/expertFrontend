import { combineReducers } from "@reduxjs/toolkit";
import { addMatchReducer } from "./addMatchSlice";
export const matchReducer = combineReducers({
  addMatch: addMatchReducer,
});
