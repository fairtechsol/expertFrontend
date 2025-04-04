import { createReducer } from "@reduxjs/toolkit";
import { authReset, checkOldPass, login } from "../../actions/auth/authAction";

interface InitialState {
  success: boolean;
  loading: boolean;
  forceChangePassword: boolean;
  userRole: string;
  oldPasswordMatched: boolean;
}

const initialState: InitialState = {
  success: false,
  loading: false,
  forceChangePassword: false,
  userRole: "",
  oldPasswordMatched: false,
};

export const authReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(login.pending, (state) => {
      state.loading = true;
    })
    .addCase(login.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.userRole = action?.payload?.roleName;
      state.forceChangePassword = action?.payload?.forceChangePassword;
    })
    .addCase(login.rejected, (state) => {
      state.loading = false;
    })
    .addCase(authReset, (state) => {
      state.success = false;
      state.forceChangePassword = false;
    })
    .addCase(checkOldPass.pending, (state) => {
      state.loading = true;
      state.oldPasswordMatched = false;
    })
    .addCase(checkOldPass.fulfilled, (state, action) => {
      state.loading = false;
      state.oldPasswordMatched = action?.payload;
    })
    .addCase(checkOldPass.rejected, (state) => {
      state.loading = false;
    });
});
