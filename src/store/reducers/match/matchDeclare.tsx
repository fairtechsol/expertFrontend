import { createSlice } from "@reduxjs/toolkit";
import {
  declareMatchResult,
  declareMatchStatusReset,
  unDeclareMatchResult,
} from "../../actions/match/matchDeclareActions";

interface InitialState {
  success: boolean;
  loading: boolean;
  error: any;
}

const initialState: InitialState = {
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
      .addCase(declareMatchStatusReset, (state) => {
        return { ...state, success: false };
      });
  },
});

export const matchDeclareReducers = matchDeclare.reducer;
