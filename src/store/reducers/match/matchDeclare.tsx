import { createSlice } from "@reduxjs/toolkit";
import {
  declareMatchResult,
  declareMatchStatusReset,
  unDeclareMatchResult,
} from "../../actions/match/matchDeclareActions";
import {
  getSessionProfitLossMatchDetail,
  getSessionProfitLossMatchDetailFilter,
  getSessionProfitLossMatchDetailReset,
} from "../../actions/match/matchAction";
import { updateSessionProLoss } from "../../actions/addMatch/addMatchAction";

interface InitialState {
  sessionProLoss: any;
  loadingProLoss: boolean;
  successProLoss: boolean;
  success: boolean;
  loading: boolean;
  error: any;
}

const initialState: InitialState = {
  sessionProLoss: [],
  loadingProLoss: false,
  successProLoss: false,
  loading: false,
  success: false,
  error: null,
};

const matchDeclare = createSlice({
  name: "matchDeclare",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(declareMatchResult.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(declareMatchResult.fulfilled, (state) => {
        state.success = true;
        state.loading = false;
      })
      .addCase(declareMatchResult.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      })
      .addCase(unDeclareMatchResult.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(unDeclareMatchResult.fulfilled, (state) => {
        state.success = true;
        state.loading = false;
      })
      .addCase(unDeclareMatchResult.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      })
      .addCase(getSessionProfitLossMatchDetail.pending, (state) => {
        state.loadingProLoss = true;
        state.successProLoss = false;
        state.error = null;
      })
      .addCase(getSessionProfitLossMatchDetail.fulfilled, (state, action) => {
        state.successProLoss = true;
        state.loadingProLoss = false;
        const idToAdd = action.payload?.id;

        if (
          idToAdd &&
          !state.sessionProLoss.some((item: any) => item.id === idToAdd)
        ) {
          state.sessionProLoss.push(action.payload);
        }
      })
      .addCase(getSessionProfitLossMatchDetail.rejected, (state, action) => {
        state.loadingProLoss = false;
        state.error = action?.error?.message;
      })
      .addCase(
        getSessionProfitLossMatchDetailFilter.fulfilled,
        (state, action) => {
          const idToRemove = action.payload;
          state.sessionProLoss = state.sessionProLoss.filter(
            (item: any) => item?.id !== idToRemove
          );
        }
      )
      .addCase(updateSessionProLoss.fulfilled, (state, action) => {
        const idToFind = action.payload.id;

        const foundItemIndex = state.sessionProLoss.findIndex(
          (item: any) => item?.id === idToFind
        );

        if (foundItemIndex !== -1) {
          state.sessionProLoss[foundItemIndex].proLoss = {
            ...state.sessionProLoss[foundItemIndex].proLoss,
            betPlaced: action.payload.betPlaced,
          };
        }
      })
      .addCase(getSessionProfitLossMatchDetailReset, (state) => {
        return { ...state, sessionProLoss: [] };
      })
      .addCase(declareMatchStatusReset, (state) => {
        return { ...state, success: false };
      });
  },
});

export const matchDeclareReducers = matchDeclare.reducer;
