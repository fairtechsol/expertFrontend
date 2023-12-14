import { createReducer } from "@reduxjs/toolkit";
import { authReset, login } from "../../actions/auth/authAction";

const initialState = {
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
    .addCase(login.rejected, (state, action) => {
      console.log(action);
      state.loading = false;
    })
    .addCase(authReset, (state) => {
      // Reset the state to initial state
      return { ...state, success: false, forceChangePassword: false };
    });
});
