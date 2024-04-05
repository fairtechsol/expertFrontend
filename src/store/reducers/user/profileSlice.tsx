import { createSlice } from "@reduxjs/toolkit";
import {
  changePassword,
  changePasswordReset,
  getLoggedUserCount,
  getProfile,
} from "../../actions/user/userAction";

interface InitialState {
  transactionPassword: string;
  success: boolean;
  loggedUserCount: number;
  loading: boolean;
  error: any;
  getProfile: any;
}

const initialState: InitialState = {
  getProfile: null,
  transactionPassword: "",
  loggedUserCount: 0,
  loading: false,
  success: false,
  error: null,
};

const profileSlice = createSlice({
  name: "profile",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(changePassword.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(changePassword.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      })
      .addCase(getProfile.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.getProfile = action.payload;
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      })
      .addCase(getLoggedUserCount.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(getLoggedUserCount.fulfilled, (state, action) => {
        state.loading = false;
        state.loggedUserCount = action.payload;
      })
      .addCase(getLoggedUserCount.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      })
      .addCase(changePasswordReset, (state) => {
        state.success = false;
        state.transactionPassword = "";
      });
  },
});

export const profileReducer = profileSlice.reducer;
