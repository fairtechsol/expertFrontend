import { createReducer } from "@reduxjs/toolkit";
import {
  addSession,
  getBookmakerById,
  getPlacedBets,
  getSessionById,
  getSessionProfitLoss,
  resetPlacedBets,
  sessionByIdReset,
  setCurrentOdd,
  successReset,
  updateBetsPlaced,
  updateSessionById,
  updateSessionByIdForUndeclare,
  updateSessionProfitLoss,
} from "../../actions/addSession";

interface InitialState {
  sessionById: any;
  selectedSessionId: string;
  sessionProfitLoss: any;
  currentOdd: any;
  bookmakerById: any;
  placedBets: any;
  success: boolean;
  loading: boolean;
}

const initialState: InitialState = {
  sessionById: null,
  selectedSessionId: "",
  sessionProfitLoss: [],
  currentOdd: null,
  bookmakerById: null,
  placedBets: [],
  success: false,
  loading: false,
};

export const addSessionReducers = createReducer(initialState, (builder) => {
  builder
    .addCase(addSession.pending, (state) => {
      state.loading = true;
      state.success = false;
    })
    .addCase(addSession.fulfilled, (state, action) => {
      state.sessionById = action.payload;
      state.selectedSessionId = action.payload?.id;
      state.loading = false;
      state.success = true;
    })
    .addCase(addSession.rejected, (state) => {
      state.loading = false;
    })
    .addCase(getSessionById.pending, (state) => {
      state.loading = true;
      state.success = false;
    })
    .addCase(getSessionById.fulfilled, (state, action) => {
      state.sessionById = action.payload;
      state.selectedSessionId = "";
      state.loading = false;
      state.success = true;
    })
    .addCase(getSessionById.rejected, (state) => {
      state.loading = false;
    })
    .addCase(getSessionProfitLoss.pending, (state) => {
      state.loading = true;
      state.success = false;
    })
    .addCase(getSessionProfitLoss.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.sessionProfitLoss = action.payload;
    })
    .addCase(getSessionProfitLoss.rejected, (state) => {
      state.loading = false;
    })
    .addCase(setCurrentOdd.fulfilled, (state, action) => {
      state.currentOdd = action.payload;
    })
    .addCase(getBookmakerById.pending, (state) => {
      state.loading = true;
      state.success = false;
    })
    .addCase(getBookmakerById.fulfilled, (state, action) => {
      state.bookmakerById = action.payload;
      state.loading = false;
      state.success = true;
    })
    .addCase(getBookmakerById.rejected, (state) => {
      state.loading = false;
    })
    .addCase(getPlacedBets.pending, (state) => {
      state.loading = true;
      state.success = false;
    })
    .addCase(getPlacedBets.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.placedBets = action.payload;
    })
    .addCase(getPlacedBets.rejected, (state) => {
      state.loading = true;
      state.success = false;
    })
    .addCase(updateBetsPlaced.fulfilled, (state, action) => {
      let objToUpdate = {
        ...action.payload.placedBet,
        myStake: +action.payload.betPlaceObject.myStack,
        user: {
          userName: action.payload.betPlaceObject.betPlacedData.userName,
        },
      };
      const id = objToUpdate.id;

      if (!state.placedBets.some((item: any) => item.id === id)) {
        state.placedBets = [objToUpdate, ...state.placedBets];
      }
    })
    .addCase(updateSessionById.fulfilled, (state, action) => {
      state.sessionById = {
        ...state.sessionById,
        activeStatus: action.payload.activeStatus,
        result: action.payload.score,
      };
    })
    .addCase(updateSessionProfitLoss.fulfilled, (state, action) => {
      state.sessionProfitLoss = action.payload;
    })
    .addCase(sessionByIdReset, (state) => {
      return {
        ...state,
        success: false,
        sessionById: null,
        sessionProfitLoss: null,
      };
    })
    .addCase(successReset, (state) => {
      return { ...state, success: false };
    })
    .addCase(updateSessionByIdForUndeclare.fulfilled, (state, action) => {
      return { ...state, selectedSessionId: action.payload };
    })
    .addCase(resetPlacedBets, (state) => {
      return { ...state, placedBets: [] };
    });
});
