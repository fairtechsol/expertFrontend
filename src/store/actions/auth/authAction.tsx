import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import service from "../../../service";
import { ApiConstants } from "../../../utils/Constants";
import {
  CheckOldPasswordInterface,
  LoginInterface,
  UserData,
} from "../../../interface/authInterface";

export const login = createAsyncThunk<UserData, LoginInterface>(
  "auth/login",
  async (requestData, thunkApi) => {
    try {
      const { data } = await service.post(`${ApiConstants.LOGIN}`, requestData);
      const { token } = data;
      sessionStorage.setItem("jwtExpert", token);
      return data;
    } catch (error) {
      const err = error as AxiosError;
      return thunkApi.rejectWithValue(err.response?.status);
    }
  }
);

export const logout = createAsyncThunk<any>(
  "auth/logout",
  async (_, thunkApi) => {
    try {
      const response = await service.post(`${ApiConstants.LOGOUT}`);
      sessionStorage.clear();
      window.location.replace("/expert/login");
      return response;
    } catch (error) {
      const err = error as AxiosError;
      return thunkApi.rejectWithValue(err.response?.status);
    }
  }
);

export const checkOldPass = createAsyncThunk<
  Boolean,
  CheckOldPasswordInterface
>("auth/checkOldPass", async (requestData, thunkApi) => {
  try {
    const resp = await service.post(
      `${ApiConstants.OLD_PASSWORD}`,
      requestData
    );
    if (resp) {
      return resp?.data?.isPasswordMatch;
    }
  } catch (error) {
    const err = error as AxiosError;
    return thunkApi.rejectWithValue(err.response?.status);
  }
});
export const authReset = createAction("auth/reset");
