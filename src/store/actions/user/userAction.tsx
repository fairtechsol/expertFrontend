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
    const fetchProfile = async () => {
      try {
        const resp = await service.get(ApiConstants.USER.PROFILE);
        return resp;
      } catch (error) {
        throw error;
      }
    };

    try {
      let resp = await fetchProfile();

      if (!resp || (!resp?.data && resp?.status !== 401)) {
        resp = await fetchProfile();
      }

      if (resp?.data) {
        if (resp.data.loginAt === null) {
          sessionStorage.clear();
          window.location.replace("/expert/login");
          return thunkApi.rejectWithValue(
            "Redirecting to login due to null loginAt"
          );
        } else {
          return resp.data;
        }
      } else {
        return thunkApi.rejectWithValue("Profile data missing");
      }
    } catch (error: any) {
      const err = error as AxiosError;
      return thunkApi.rejectWithValue(err.response?.status || "Unknown error");
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
