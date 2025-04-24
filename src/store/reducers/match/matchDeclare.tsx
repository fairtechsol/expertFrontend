import { createSlice } from "@reduxjs/toolkit";
import {
  removeSessionProLoss,
  updateSessionProLoss,
} from "../../actions/addMatch/addMatchAction";
import {
  getSessionProfitLossMatchDetail,
  getSessionProfitLossMatchDetailFilter,
  getSessionProfitLossMatchDetailReset,
} from "../../actions/match/matchAction";
import {
  UnDeclareRaceResult,
  UnDeclareTournamentMarketCricketResult,
  declareFinalMatchResult,
  declareMatchResult,
  declareMatchStatusReset,
  declareRaceResult,
  declareTournamentMarketCricketResult,
  otherDeclareMatchResult,
  otherUnDeclareMatchResult,
  unDeclareFinalMatchResult,
  unDeclareMatchResult,
} from "../../actions/match/matchDeclareActions";

interface InitialState {
  sessionProLoss: any;
  success: boolean;
  loading: boolean;
  error: any;
}

const initialState: InitialState = {
  sessionProLoss: [],
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
        state.error = action.error?.message;
      })
      .addCase(declareFinalMatchResult.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(declareFinalMatchResult.fulfilled, (state) => {
        state.success = true;
        state.loading = false;
      })
      .addCase(declareFinalMatchResult.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message;
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
        state.error = action.error?.message;
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
        state.error = action.error?.message;
      })
      .addCase(unDeclareFinalMatchResult.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(unDeclareFinalMatchResult.fulfilled, (state) => {
        state.success = true;
        state.loading = false;
      })
      .addCase(unDeclareFinalMatchResult.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message;
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
        state.error = action.error?.message;
      })
      .addCase(getSessionProfitLossMatchDetail.pending, (state) => {
        state.error = null;
      })
      .addCase(getSessionProfitLossMatchDetail.fulfilled, (state, action) => {
        const { id } = action.payload;

        if (id && !state.sessionProLoss?.some((item: any) => item?.id === id)) {
          state.sessionProLoss?.push(action.payload);
        }
      })
      .addCase(getSessionProfitLossMatchDetail.rejected, (state, action) => {
        state.error = action.error?.message;
      })
      .addCase(
        getSessionProfitLossMatchDetailFilter.fulfilled,
        (state, action) => {
          const idToRemove = action.payload;
          state.sessionProLoss = state?.sessionProLoss?.filter(
            (item: any) => item?.id !== idToRemove
          );
        }
      )
      .addCase(updateSessionProLoss.fulfilled, (state, action) => {
        const { id } = action.payload;

        const foundItemIndex = state.sessionProLoss?.findIndex(
          (item: any) => item?.id === id
        );

        if (foundItemIndex !== -1) {
          state.sessionProLoss[foundItemIndex].proLoss = {
            ...state.sessionProLoss[foundItemIndex].proLoss,
            betPlaced: action.payload?.betPlaced,
          };
        }
      })
      .addCase(removeSessionProLoss.fulfilled, (state, action) => {
        const idToRemove = action.payload?.id;

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
        state.error = action.error?.message;
      })
      .addCase(UnDeclareTournamentMarketCricketResult.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(UnDeclareTournamentMarketCricketResult.fulfilled, (state) => {
        state.success = true;
        state.loading = false;
      })
      .addCase(
        UnDeclareTournamentMarketCricketResult.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.error?.message;
        }
      )
      .addCase(declareTournamentMarketCricketResult.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(declareTournamentMarketCricketResult.fulfilled, (state) => {
        state.success = true;
        state.loading = false;
      })
      .addCase(
        declareTournamentMarketCricketResult.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.error?.message;
        }
      )
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
        state.error = action.error?.message;
      });
  },
});

export const matchDeclareReducers = matchDeclare.reducer;
