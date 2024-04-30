import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import service from "../../../service";
import { ApiConstants } from "../../../utils/Constants";
import { AxiosError } from "axios";

export const declareMatchResult = createAsyncThunk<any, any>(
  "/match/declareResult",
  async (requestData, thunkApi) => {
    try {
      const response = await service.post(
        `${ApiConstants.MATCH.DECLARE}`,
        requestData
      );
      if (response?.status === 200) {
        return response?.data;
      }
    } catch (error) {
      const err = error as AxiosError;
      return thunkApi.rejectWithValue(err.response?.status);
    }
  }
);
export const otherDeclareMatchResult = createAsyncThunk<any, any>(
  "/match/otherDeclareResult",
  async (requestData, thunkApi) => {
    try {
      const response = await service.post(
        `${ApiConstants.MATCH.OTHER_DECLARE}`,
        requestData
      );
      if (response?.status === 200) {
        return response?.data;
      }
    } catch (error) {
      const err = error as AxiosError;
      return thunkApi.rejectWithValue(err.response?.status);
    }
  }
);
export const unDeclareMatchResult = createAsyncThunk<any, any>(
  "/match/unDeclareResult",
  async (requestData, thunkApi) => {
    try {
      const response = await service.post(
        `${ApiConstants.MATCH.UNDECLARE}`,
        requestData
      );
      if (response?.status === 200) {
        return response?.data;
      }
    } catch (error) {
      const err = error as AxiosError;
      return thunkApi.rejectWithValue(err.response?.status);
    }
  }
);

export const declareMatchStatusReset = createAction("declareMatch/reset");
