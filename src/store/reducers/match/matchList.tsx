import { createSlice } from "@reduxjs/toolkit";
import {
  betLiveStatus,
  editMatch,
  editSuccessReset,
  getMatchList,
  getMatchListDropdown,
  matchListReset,
  noResultDeclare,
  resultDeclare,
  updateMatchActiveStatus,
  updateMatchActiveStatusReset,
} from "../../actions/match/matchAction";

interface InitialState {
  matchList: any;
  matchListDropdown: any;
  success: boolean;
  editSuccess: boolean;
  statusSuccess: boolean;
  statusBetLive: boolean;
  loading: boolean;
  error: any;
}

const initialState: InitialState = {
  matchList: [],
  matchListDropdown: [],
  loading: false,
  success: false,
  editSuccess: false,
  statusSuccess: false,
  statusBetLive: false,
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
      .addCase(betLiveStatus.pending, (state) => {
        state.loading = true;
        state.statusBetLive = false;
        state.error = null;
      })
      .addCase(betLiveStatus.fulfilled, (state) => {
        state.statusSuccess = true;
        state.loading = false;
      })
      .addCase(betLiveStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      })
      .addCase(resultDeclare.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(resultDeclare.fulfilled, (state) => {
        state.success = true;
        state.loading = false;
      })
      .addCase(resultDeclare.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      })
      .addCase(noResultDeclare.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(noResultDeclare.fulfilled, (state) => {
        state.success = true;
        state.loading = false;
      })
      .addCase(noResultDeclare.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      })
      .addCase(editMatch.pending, (state) => {
        state.loading = true;
        state.editSuccess = false;
        state.error = null;
      })
      .addCase(editMatch.fulfilled, (state) => {
        state.loading = false;
        state.editSuccess = true;
      })
      .addCase(editMatch.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      })
      .addCase(editSuccessReset, (state) => {
        return {
          ...state,
          editSuccess: false,
        };
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
