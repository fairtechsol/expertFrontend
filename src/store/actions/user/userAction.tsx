import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import service from "../../../service";
import { ApiConstants } from "../../../utils/Constants";

interface ChangePassword {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export const getProfile = createAsyncThunk<any>(
  "user/profile",
  async (_, thunkApi) => {
    try {
      const resp = await service.get(ApiConstants.USER.PROFILE);
      if (resp) {
        if (resp?.data?.loginAt === null) {
          window.location.replace("/expert/login");
          sessionStorage.clear();
        } else {
          return resp?.data;
        }
      }
    } catch (error: any) {
      const err = error as AxiosError;
      throw thunkApi.rejectWithValue(err.response?.status);
    }
  }
);
export const getLoggedUserCount = createAsyncThunk<any>(
  "logged/user",
  async (_, thunkApi) => {
    try {
      const resp = await service.get(ApiConstants.USER.LOGGED_USER);
      if (resp) {
        return resp?.data;
      }
    } catch (error: any) {
      const err = error as AxiosError;
      throw thunkApi.rejectWithValue(err.response?.status);
    }
  }
);

export const changePassword = createAsyncThunk<any, ChangePassword>(
  "user/changePassword",
  async (requestData, thunkApi) => {
    try {
      const resp = await service.post(
        ApiConstants.USER.CHANGEPASSWORD,
        requestData
      );
      if (resp) {
        if (resp?.data) {
          return resp?.data?.transactionPassword;
        }
        sessionStorage.clear();
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
        ApiConstants.USER.MARQUEE_NOTIFICATION,
        requestData
      );
      if (resp) {
        if (resp?.data) {
          return resp?.data?.transactionPassword;
        }
        sessionStorage.clear();
      }
    } catch (error: any) {
      const err = error as AxiosError;
      return thunkApi.rejectWithValue(err.response?.status);
    }
  }
);
export const headerAddBanner = createAsyncThunk<any, any>(
  "/general/banner/add",
  async (requestData, thunkApi) => {
    try {
      const resp = await service.post(ApiConstants.USER.BANNER, requestData);
      if (resp) {
        if (resp?.data) {
          return resp?.data?.transactionPassword;
        }
        sessionStorage.clear();
      }
    } catch (error: any) {
      const err = error as AxiosError;
      return thunkApi.rejectWithValue(err.response?.status);
    }
  }
);
export const getDateList = createAsyncThunk<any, any>(
  "match/dateList",
  async ({ matchType }, thunkApi) => {
    try {
      const resp = await service.get(ApiConstants.MATCH.GET_DATES, {
        params: {
          matchType,
        },
      });
      if (resp) {
        return resp?.data;
      }
    } catch (error: any) {
      const err = error as AxiosError;
      throw thunkApi.rejectWithValue(err.response?.status);
    }
  }
);
export const changePasswordReset = createAction("changePassword/reset");
export const profileReset = createAction("profile/reset");
export const updateReset = createAction("update/reset");
export const resetDateList = createAction("dateList/reset");
