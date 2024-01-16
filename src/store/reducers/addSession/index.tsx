import { createReducer } from "@reduxjs/toolkit";
import {
  addSession,
  getBookmakerById,
  getSessionById,
  getSessionProfitLoss,
  sessionByIdReset,
  setCurrentOdd,
  successReset,
  updateSessionById,
  updateSessionProfitLoss,
} from "../../actions/addSession";

interface InitialState {
  sessionById: any;
  selectedSessionId: string;
  sessionProfitLoss: any;
  currentOdd: any;
  bookmakerById: any;
  success: boolean;
  loading: boolean;
}

const initialState: InitialState = {
  sessionById: null,
  selectedSessionId: "",
  sessionProfitLoss: [],
  currentOdd: null,
  bookmakerById: null,
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
    .addCase(getBookmakerById.rejected, (state) => {
      state.loading = false;
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
    });
});
