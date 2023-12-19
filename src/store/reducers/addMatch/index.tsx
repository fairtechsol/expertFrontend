import { combineReducers } from "@reduxjs/toolkit";
import { addMatchReducers } from "./addMatchSlice";

export const addMatchReducer = combineReducers({
  addMatch: addMatchReducers,
});
