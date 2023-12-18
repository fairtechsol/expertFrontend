import { createSlice } from "@reduxjs/toolkit";
import { changePassword } from "../../actions/user/userAction";

interface InitialState {
  profileDetail: any;
  success: boolean;
  loading: boolean;
  error: any;
}

const initialState: InitialState = {
  profileDetail: null,
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
      .addCase(changePassword.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.profileDetail = action.payload;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      });
  },
});

export const profileReducer = profileSlice.reducer;
