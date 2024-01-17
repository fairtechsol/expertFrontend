import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import service from "../../../service";
import { ApiConstants } from "../../../utils/Constants";

interface SessionData {
  matchId: string;
  type: string;
  name: string;
  minBet?: string;
  maxBet?: string;
  yesRate: number;
  noRate: number;
  yesPercent: number;
  noPercent: number;
  selectionId?: string;
}

interface SessionById {
  matchId: string;
  id?: string;
}
interface BookmakerById {
  matchId: string;
  id?: string;
  type?: string;
}

export const addSession = createAsyncThunk<any, SessionData>(
  "add/session",
  async (requestData, thunkApi) => {
    try {
      const resp = await service.post(
        `${ApiConstants.SESSION.ADD}`,
        requestData
      );
      if (resp?.data) {
        return resp?.data;
      }
    } catch (error) {
      const err = error as AxiosError;
      return thunkApi.rejectWithValue(err.response?.status);
    }
  }
);
export const getSessionById = createAsyncThunk<any, SessionById>(
  "get/session",
  async (requestData, thunkApi) => {
    try {
      const resp = await service.get(
        `${ApiConstants.SESSION.GET}/${requestData.matchId}${
          requestData?.id ? `?id=${requestData?.id}` : ""
        }`
      );
      if (resp?.data) {
        return resp?.data;
      }
    } catch (error) {
      const err = error as AxiosError;
      return thunkApi.rejectWithValue(err.response?.status);
    }
  }
);
export const getSessionProfitLoss = createAsyncThunk<any, SessionById>(
  "get/sessionProfitLoss",
  async (requestData, thunkApi) => {
    try {
      const resp = await service.get(
        `${ApiConstants.SESSION.PROFIT_LOSS}/${requestData}`
      );
      if (resp?.data) {
        return resp?.data;
      }
    } catch (error) {
      const err = error as AxiosError;
      return thunkApi.rejectWithValue(err.response?.status);
    }
  }
);

export const updateSessionById = createAsyncThunk<any, SessionById>(
  "update/session",
  async (requestData) => {
    return requestData;
  }
);
export const setCurrentOdd = createAsyncThunk<any, any>(
  "update/currentOdd",
  async (requestData) => {
    return requestData;
  }
);
export const updateSessionProfitLoss = createAsyncThunk<any, SessionById>(
  "update/sessionProLoss",
  async (requestData) => {
    return requestData;
  }
);
export const updateBetsPlaced = createAsyncThunk<any, SessionById>(
  "update/betsPlaced",
  async (requestData) => {
    return requestData;
  }
);

export const getBookmakerById = createAsyncThunk<any, BookmakerById>(
  "get/bookmaker",
  async (requestData, thunkApi) => {
    try {
      const resp = await service.get(
        `${ApiConstants.BOOKMAKER.GET}/${requestData.matchId}${
          requestData?.id ? `?id=${requestData?.id}` : ""
        }&type=${requestData?.type}`
      );
      if (resp?.data) {
        return resp?.data;
      }
    } catch (error) {
      const err = error as AxiosError;
      return thunkApi.rejectWithValue(err.response?.status);
    }
  }
);

export const getPlacedBets = createAsyncThunk<any, any>(
  "get/placedBets",
  async (requestData, thunkApi) => {
    try {
      const resp = await service.get(
        `${ApiConstants.SESSION.GET_PLACED_BETS}?betPlaced.betId=${requestData}&deleteReason=isNull`
      );
      if (resp?.data) {
        return resp?.data;
      }
    } catch (error) {
      const err = error as AxiosError;
      return thunkApi.rejectWithValue(err.response?.status);
    }
  }
);

export const sessionByIdReset = createAction("sessionById/reset");
export const successReset = createAction("success/reset");
