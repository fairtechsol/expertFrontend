import { createSlice } from "@reduxjs/toolkit";
import {
  editMatch,
  editSuccessReset,
  getMatchList,
  getMatchListDropdown,
  matchListReset,
  noResultDeclare,
  resultDeclare,
  sessionResultSuccessReset,
  undeclareResult,
  updateMatchActiveStatus,
  updateMatchActiveStatusReset,
  betLiveStatus,
  getPlacedBetsMatch,
  getMatchListSessionProfitLoss,
  resetMatchListSessionProLoss,
  sessionBetLiveStatus,
  updateMatchBetsPlace,
} from "../../actions/match/matchAction";

interface InitialState {
  matchList: any;
  matchListDropdown: any;
  success: boolean;
  editSuccess: boolean;
  statusSuccess: boolean;
  placedBetsMatch: any;
  loading: boolean;
  error: any;
  statusBetLive: boolean;
  sessionProLoss: any;
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
  placedBetsMatch: [],
  sessionProLoss: [],
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
        state.statusBetLive = true;
        state.loading = false;
      })
      .addCase(betLiveStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      })
      .addCase(sessionBetLiveStatus.pending, (state) => {
        state.loading = true;
        state.statusBetLive = false;
        state.error = null;
      })
      .addCase(sessionBetLiveStatus.fulfilled, (state) => {
        state.statusBetLive = true;
        state.loading = false;
      })
      .addCase(sessionBetLiveStatus.rejected, (state, action) => {
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
      .addCase(undeclareResult.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(undeclareResult.fulfilled, (state) => {
        state.success = true;
        state.loading = false;
      })
      .addCase(undeclareResult.rejected, (state, action) => {
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
      .addCase(getPlacedBetsMatch.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(getPlacedBetsMatch.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.placedBetsMatch = action.payload;
      })
      .addCase(getPlacedBetsMatch.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      })
      .addCase(getMatchListSessionProfitLoss.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(getMatchListSessionProfitLoss.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.sessionProLoss = action.payload;
      })
      .addCase(getMatchListSessionProfitLoss.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      })
      .addCase(updateMatchBetsPlace.fulfilled, (state, action) => {
        const { jobData } = action.payload;
        state.placedBetsMatch = state.placedBetsMatch || [];

        if (jobData && jobData.newBet) {
          let obj = jobData.newBet;
          obj.user = {
            userName: jobData.userName,
          };
          obj.myStake = jobData.myStake || 0;
          state.placedBetsMatch.unshift(obj);
        }
      })
      .addCase(editSuccessReset, (state) => {
        return {
          ...state,
          editSuccess: false,
        };
      })
      .addCase(sessionResultSuccessReset, (state) => {
        return { ...state, success: false };
      })
      .addCase(matchListReset, (state) => {
        return { ...state, success: false };
      })
      .addCase(updateMatchActiveStatusReset, (state) => {
        return { ...state, statusSuccess: false };
      })
      .addCase(resetMatchListSessionProLoss, (state) => {
        return { ...state, success: false, sessionProLoss: [] };
      });
  },
});

export const matchListReducers = matchList.reducer;
