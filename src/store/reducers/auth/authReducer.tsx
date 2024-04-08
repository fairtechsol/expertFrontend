import { createReducer } from "@reduxjs/toolkit";
import { authReset, login } from "../../actions/auth/authAction";

interface InitialState {
  success: boolean;
  loading: boolean;
  forceChangePassword: boolean;
  userRole: string;
}

const initialState: InitialState = {
  success: false,
  loading: false,
  forceChangePassword: false,
  userRole: "",
};

export const authReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(login.pending, (state) => {
      state.loading = true;
    })
    .addCase(login.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.userRole = action.payload.roleName;
      state.forceChangePassword = action?.payload?.forceChangePassword;
    })
    .addCase(login.rejected, (state) => {
      state.loading = false;
    })
    .addCase(authReset, (state) => {
      // Reset the state to initial state
      state.success = false;
      state.forceChangePassword = false;
    });
});
