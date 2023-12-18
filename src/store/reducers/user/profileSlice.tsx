import { createSlice } from "@reduxjs/toolkit";
import {
  changePassword,
  changePasswordReset,
} from "../../actions/user/userAction";

interface InitialState {
  transactionPassword: string;
  success: boolean;
  loading: boolean;
  error: any;
}

const initialState: InitialState = {
  transactionPassword: "",
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
      .addCase(changePasswordReset, (state) => {
        return { ...state, success: false, transactionPassword: "" };
      });
  },
});

export const profileReducer = profileSlice.reducer;
