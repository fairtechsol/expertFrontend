import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import service from "../../../service";
import { ApiConstants } from "../../../utils/Constants";

interface ChangePassword {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export const addUser = createAsyncThunk<any, any>(
  "user/add",
  async (requestData) => {
    try {
      const resp = await service.post(
        `${ApiConstants.MATCH.ADD_MATCH}`,
        requestData
      );
      console.log(resp, ">>>>>>>>456");
      if (resp) {
        return resp?.data;
      }
    } catch (error: any) {
      const err = error as AxiosError;
      throw err;
    }
  }
);

export const getProfile = createAsyncThunk<any>("user/profile", async () => {
  try {
    const resp = await service.get(`${ApiConstants.USER.PROFILE}`);
    if (resp) {
      return resp?.data;
    }
  } catch (error: any) {
    const err = error as AxiosError;
    throw err;
  }
});

export const changePassword = createAsyncThunk<any, ChangePassword>(
  "user/changePassword",
  async (requestData, thunkApi) => {
    try {
      const resp = await service.post(
        `${ApiConstants.USER.CHANGEPASSWORD}`,
        requestData
      );
      if (resp) {
        if (resp?.data) {
          return resp?.data?.transactionPassword;
        }
        localStorage.clear();
      }
    } catch (error: any) {
      const err = error as AxiosError;
      return thunkApi.rejectWithValue(err.response?.status);
    }
  }
);
export const headerAddNotification = createAsyncThunk<any, any>(
  "/general/notification/add",
  async (requestData, thunkApi) => {
    try {
      const resp = await service.post(
        `${ApiConstants.USER.MARQUEE_NOTIFICATION}`,
        requestData
      );
      if (resp) {
        if (resp?.data) {
          return resp?.data?.transactionPassword;
        }
        localStorage.clear();
      }
    } catch (error: any) {
      const err = error as AxiosError;
      return thunkApi.rejectWithValue(err.response?.status);
    }
  }
);

export const changePasswordReset = createAction("changePassword/reset");
export const profileReset = createAction("profile/reset");
export const updateReset = createAction("update/reset");
