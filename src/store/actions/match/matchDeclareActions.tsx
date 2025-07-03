import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import service from "../../../service";
import { ApiConstants } from "../../../utils/Constants";

export const declareMatchResult = createAsyncThunk<any, any>(
  "/match/declareResult",
  async (requestData, thunkApi) => {
    try {
      const response = await service.post(
        ApiConstants.MATCH.DECLARE,
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

export const declareFinalMatchResult = createAsyncThunk<any, any>(
  "/match/declareFinalResult",
  async (requestData, thunkApi) => {
    try {
      const response = await service.post(
        ApiConstants.MATCH.FINAL_DECLARE,
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
        ApiConstants.MATCH.OTHER_DECLARE,
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
        ApiConstants.MATCH.UNDECLARE,
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

export const unDeclareFinalMatchResult = createAsyncThunk<any, any>(
  "/match/unDeclareFinalResult",
  async (requestData, thunkApi) => {
    try {
      const response = await service.post(
        ApiConstants.MATCH.FINAL_UNDECLARE,
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
        ApiConstants.MATCH.OTHER_UNDECLARE,
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
        ApiConstants.MATCH.RACE_UNDECLARE,
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
export const UnDeclareTournamentMarketCricketResult = createAsyncThunk<
  any,
  any
>(
  "/race/UnDeclareTournamentMarketCricketResult",
  async (requestData, thunkApi) => {
    try {
      const response = await service.post(
        ApiConstants.MATCH.TOURNAMENT_MARKET_UNDECLARE,
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
        ApiConstants.MATCH.RACE_DECLARE,
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
export const declareTournamentMarketCricketResult = createAsyncThunk<any, any>(
  "/race/declareTournamentMarketCricketResult",
  async (requestData, thunkApi) => {
    try {
      const response = await service.post(
        ApiConstants.MATCH.TOURNAMENT_MARKET_DECLARE,
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
