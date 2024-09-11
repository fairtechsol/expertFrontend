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
export const otherUnDeclareMatchResult = createAsyncThunk<any, any>(
  "/match/otherUnDeclareResult",
  async (requestData, thunkApi) => {
    try {
      const response = await service.post(
        `${ApiConstants.MATCH.OTHER_UNDECLARE}`,
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
export const UnDeclareRaceResult = createAsyncThunk<any, any>(
  "/race/UnDeclareRaceResult",
  async (requestData, thunkApi) => {
    try {
      const response = await service.post(
        `${ApiConstants.MATCH.RACE_UNDECLARE}`,
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
export const UnDeclareOtherMarketCricketResult = createAsyncThunk<any, any>(
  "/race/UnDeclareOtherMarketCricketResult",
  async (requestData, thunkApi) => {
    try {
      const response = await service.post(
        `${ApiConstants.MATCH.OTHER_MARKET_UNDECLARE}`,
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
export const declareRaceResult = createAsyncThunk<any, any>(
  "/race/declareRaceResult",
  async (requestData, thunkApi) => {
    try {
      const response = await service.post(
        `${ApiConstants.MATCH.RACE_DECLARE}`,
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
export const declareOtherMarketCricketResult = createAsyncThunk<any, any>(
  "/race/declareOtherMarketCricketResult",
  async (requestData, thunkApi) => {
    try {
      const response = await service.post(
        `${ApiConstants.MATCH.OTHER_MARKET_DECLARE}`,
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
