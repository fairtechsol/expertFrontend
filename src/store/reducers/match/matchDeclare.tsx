import { createSlice } from "@reduxjs/toolkit";
import {
  UnDeclareOtherMarketCricketResult,
  UnDeclareRaceResult,
  declareMatchResult,
  declareMatchStatusReset,
  declareOtherMarketCricketResult,
  declareRaceResult,
  otherDeclareMatchResult,
  otherUnDeclareMatchResult,
  unDeclareMatchResult,
} from "../../actions/match/matchDeclareActions";
import {
  getSessionProfitLossMatchDetail,
  getSessionProfitLossMatchDetailFilter,
  getSessionProfitLossMatchDetailReset,
} from "../../actions/match/matchAction";
import {
  removeSessionProLoss,
  updateSessionProLoss,
} from "../../actions/addMatch/addMatchAction";

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
      .addCase(otherDeclareMatchResult.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(otherDeclareMatchResult.fulfilled, (state) => {
        state.success = true;
        state.loading = false;
      })
      .addCase(otherDeclareMatchResult.rejected, (state, action) => {
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
      .addCase(otherUnDeclareMatchResult.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(otherUnDeclareMatchResult.fulfilled, (state) => {
        state.success = true;
        state.loading = false;
      })
      .addCase(otherUnDeclareMatchResult.rejected, (state, action) => {
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
        const idToAdd = action?.payload?.id;

        if (
          idToAdd &&
          !state.sessionProLoss?.some((item: any) => item?.id === idToAdd)
        ) {
          state.sessionProLoss?.push(action?.payload);
        }
      })
      .addCase(getSessionProfitLossMatchDetail.rejected, (state, action) => {
        state.loadingProLoss = false;
        state.error = action?.error?.message;
      })
      .addCase(
        getSessionProfitLossMatchDetailFilter.fulfilled,
        (state, action) => {
          const idToRemove = action?.payload;
          state.sessionProLoss = state?.sessionProLoss?.filter(
            (item: any) => item?.id !== idToRemove
          );
        }
      )
      .addCase(updateSessionProLoss.fulfilled, (state, action) => {
        const idToFind = action?.payload?.id;

        const foundItemIndex = state.sessionProLoss?.findIndex(
          (item: any) => item?.id === idToFind
        );

        if (foundItemIndex !== -1) {
          state.sessionProLoss[foundItemIndex].proLoss = {
            ...state.sessionProLoss[foundItemIndex].proLoss,
            betPlaced: action?.payload?.betPlaced,
          };
        }
      })
      .addCase(removeSessionProLoss.fulfilled, (state, action) => {
        const idToRemove = action?.payload?.id;

        state.sessionProLoss = state.sessionProLoss?.filter(
          (item: any) => item?.id !== idToRemove
        );
      })
      .addCase(getSessionProfitLossMatchDetailReset, (state) => {
        state.sessionProLoss = [];
      })
      .addCase(declareMatchStatusReset, (state) => {
        state.success = false;
      })
      .addCase(UnDeclareRaceResult.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(UnDeclareRaceResult.fulfilled, (state) => {
        state.success = true;
        state.loading = false;
      })
      .addCase(UnDeclareRaceResult.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      })
      .addCase(UnDeclareOtherMarketCricketResult.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(UnDeclareOtherMarketCricketResult.fulfilled, (state) => {
        state.success = true;
        state.loading = false;
      })
      .addCase(UnDeclareOtherMarketCricketResult.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      })
      .addCase(declareOtherMarketCricketResult.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(declareOtherMarketCricketResult.fulfilled, (state) => {
        state.success = true;
        state.loading = false;
      })
      .addCase(declareOtherMarketCricketResult.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      })
      .addCase(declareRaceResult.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(declareRaceResult.fulfilled, (state) => {
        state.success = true;
        state.loading = false;
      })
      .addCase(declareRaceResult.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      });
  },
});

export const matchDeclareReducers = matchDeclare.reducer;
