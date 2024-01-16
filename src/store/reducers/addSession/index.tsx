import { createReducer } from "@reduxjs/toolkit";
import {
  addSession,
  getBookmakerById,
  getSessionById,
  sessionByIdReset,
  successReset,
  updateSessionById,
} from "../../actions/addSession";

interface InitialState {
  sessionById: any;
  selectedSessionId: string;
  bookmakerById: any;
  success: boolean;
  loading: boolean;
}

const initialState: InitialState = {
  sessionById: null,
  selectedSessionId: "",
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
    .addCase(getBookmakerById.rejected, (state) => {
      state.loading = false;
    })
    .addCase(sessionByIdReset, (state) => {
      return { ...state, success: false, sessionById: null };
    })
    .addCase(successReset, (state) => {
      return { ...state, success: false };
    });
});
