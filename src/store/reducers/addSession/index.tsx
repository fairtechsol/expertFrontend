import { createReducer } from "@reduxjs/toolkit";
import { addSession, getSessionById } from "../../actions/addSession";

interface InitialState {
  sessionById: object;
  success: boolean;
  loading: boolean;
}

const initialState: InitialState = {
  sessionById: {},
  success: false,
  loading: false,
};

export const addSessionReducers = createReducer(initialState, (builder) => {
  builder
    .addCase(addSession.pending, (state) => {
      state.loading = true;
    })
    .addCase(addSession.fulfilled, (state) => {
      state.loading = false;
      state.success = true;
    })
    .addCase(addSession.rejected, (state) => {
      state.loading = false;
    })
    .addCase(getSessionById.pending, (state) => {
      state.loading = true;
    })
    .addCase(getSessionById.fulfilled, (state, action) => {
      state.sessionById = action.payload;
      state.loading = false;
      state.success = true;
    })
    .addCase(getSessionById.rejected, (state) => {
      state.loading = false;
    });
});
