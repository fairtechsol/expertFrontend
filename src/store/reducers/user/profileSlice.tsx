import { createSlice } from "@reduxjs/toolkit";
import {
  changePassword,
  changePasswordReset,
  getDateList,
  getLoggedUserCount,
  getProfile,
  resetDateList,
} from "../../actions/user/userAction";

interface InitialState {
  transactionPassword: string;
  success: boolean;
  loggedUserCount: number;
  loading: boolean;
  error: any;
  profileDetail: any;
  dateList: any;
}

const initialState: InitialState = {
  profileDetail: null,
  transactionPassword: "",
  loggedUserCount: 0,
  loading: false,
  success: false,
  error: null,
  dateList: [],
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
        state.profileDetail = action?.payload;
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
        state.loggedUserCount = action?.payload;
      })
      .addCase(getLoggedUserCount.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      })
      .addCase(changePasswordReset, (state) => {
        state.success = false;
        state.transactionPassword = "";
      })
      .addCase(getDateList.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(getDateList.fulfilled, (state, action) => {
        state.loading = false;
        state.dateList = action?.payload;
      })
      .addCase(getDateList.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      })
      .addCase(resetDateList, (state) => {
        state.dateList = [];
      });
  },
});

export const profileReducer = profileSlice.reducer;
