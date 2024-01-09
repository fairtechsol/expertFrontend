import { createSlice } from "@reduxjs/toolkit";
import {
  editMatch,
  getMatchList,
  getMatchListDropdown,
  matchListReset,
  updateMatchActiveStatus,
  updateMatchActiveStatusReset,
} from "../../actions/match/matchAction";

interface InitialState {
  matchList: any;
  matchListDropdown: any;
  success: boolean;
  statusSuccess: boolean;
  loading: boolean;
  error: any;
}

const initialState: InitialState = {
  matchList: [],
  matchListDropdown: [],
  loading: false,
  success: false,
  statusSuccess: false,
  error: null,
};

const matchList = createSlice({
  name: "matchList",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMatchList.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(getMatchList.fulfilled, (state, action) => {
        state.matchList = action.payload;
        state.loading = false;
        state.success = true;
      })
      .addCase(getMatchList.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      })
      .addCase(getMatchListDropdown.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(getMatchListDropdown.fulfilled, (state, action) => {
        state.matchListDropdown = action.payload;
        state.loading = false;
        state.success = true;
      })
      .addCase(getMatchListDropdown.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      })
      .addCase(updateMatchActiveStatus.pending, (state) => {
        state.loading = true;
        state.statusSuccess = false;
        state.error = null;
      })
      .addCase(updateMatchActiveStatus.fulfilled, (state) => {
        state.statusSuccess = true;
        state.loading = false;
      })
      .addCase(updateMatchActiveStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      })
      .addCase(editMatch.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(editMatch.fulfilled, (state) => {
        console.log(state)
        state.loading = false;
      })
      .addCase(editMatch.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      })
      .addCase(matchListReset, (state) => {
        return { ...state, success: false };
      })
      .addCase(updateMatchActiveStatusReset, (state) => {
        return { ...state, statusSuccess: false };
      });
  },
});

export const matchListReducers = matchList.reducer;
