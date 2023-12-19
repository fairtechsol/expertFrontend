import { createSlice } from "@reduxjs/toolkit";
// import { addMatch } from "../../actions/auth/authAction";
// import {  profileReset } from "../../actions/user/userAction";
import { addMatchAPI } from "../../actions/match/matchAction";

interface InitialState {
  matchDetail: any;
  success: boolean;
  loading: boolean;
  error: any;
}

const initialState: InitialState = {
  matchDetail: null,
  loading: false,
  success: false,
  error: null,
};

const addMatchSlice = createSlice({
  name: "addMatch",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addMatchAPI.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(addMatchAPI.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.matchDetail = action.payload;
      })
      .addCase(addMatchAPI.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      });
  },
});

export const addMatchReducer = addMatchSlice.reducer;
