import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import service from "../../../service";
import { ApiConstants } from "../../../utils/Constants";

interface SessionData {
  matchId: string;
  type: string;
  name: string;
  minBet?: number;
  maxBet?: number;
  yesRate: number;
  noRate: number;
  yesPercent: number;
  noPercent: number;
  selectionId?: string;
}
interface updateSession {
  maxBet?: number;
  minBet?: number;
  id: any;
}
interface SessionById {
  matchId: string;
  id?: string | any;
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
export const updateSession = createAsyncThunk<any, updateSession>(
  "update/sessionBet",
  async (requestData, thunkApi) => {
    try {
      const resp = await service.post(
        `${ApiConstants.SESSION.UPDATE}`,
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
export const updateMultiSessionMarketAmount = createAsyncThunk<any, any>(
  "update/multiSessionMarketAmount",
  async (requestData, thunkApi) => {
    try {
      const resp = await service.post(
        `${ApiConstants.SESSION.UPDATE_MULTI_MARKET_AMOUNT}`,
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
export const getSessionProfitLoss = createAsyncThunk<any, any>(
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
export const updateApiSessionById = createAsyncThunk<any, SessionById>(
  "update/Apisession",
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
export const updateSessionByIdForUndeclare = createAsyncThunk<any, SessionById>(
  "updateSessionByIdUndeclare/reset",
  async (requestData) => {
    return requestData;
  }
);

export const updateSessionMaxLimit = createAsyncThunk<any, SessionById>(
  "updateSessionMaxLimit",
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
export const updateMatchBetsPlaced = createAsyncThunk<any, SessionById>(
  "update/matchBetsPlaced",
  async (requestData) => {
    return requestData;
  }
);
export const updateTeamRatesOnManualMarket = createAsyncThunk<any, SessionById>(
  "update/updateTeamRatesOnManualMarket",
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
        `${
          ApiConstants.SESSION.GET_PLACED_BETS
        }?betPlaced.betId=${requestData}&result=inArr${JSON.stringify([
          "PENDING",
          "UNDECLARE",
        ])}&sort=betPlaced.createdAt:DESC`
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
export const updateRatesBook = createAsyncThunk<any, any>(
  "/bookmaker/ratesUpdate",
  async (rates) => {
    return rates;
  }
);
export const updateProLossSession = createAsyncThunk<any, any>(
  "/session/prolossupdate",
  async (bets) => {
    return bets;
  }
);
export const updateDeleteReason = createAsyncThunk<any, any>(
  "/deleteReason/update",
  async (detail) => {
    return detail;
  }
);
export const updateDeleteReasonOnEdit = createAsyncThunk<any, any>(
  "/updateDeleteReasonOnEdit/update",
  async (detail) => {
    return detail;
  }
);
export const updateResultStatusOfSessionById = createAsyncThunk<any, any>(
  "/update/resultStatusOfSessionById",
  async (detail) => {
    return detail;
  }
);
export const updateMarketMinMaxLimitOnQuickMaker = createAsyncThunk<any, any>(
  "/update/bookMinMaxLimit",
  async (detail) => {
    return detail;
  }
);

export const updateResultStatusOfQuickBookmaker = createAsyncThunk<
  any,
  SessionById
>("update/resultStatusQuickBookmaker", async (requestData) => {
  return requestData;
});
export const sessionByIdReset = createAction("sessionById/reset");
export const successReset = createAction("success/reset");
export const addsuccessReset = createAction("addsuccess/reset");
export const sessionSuccessReset = createAction("sessionSuccess/reset");
export const resetPlacedBets = createAction("placedBets/reset");
export const resetPlacedBetsMatch = createAction("placedBetsMatch/reset");
export const resetSessionMaxLimitSuccess = createAction(
  "sessionMaxLimitSuccess/reset"
);
export const resetMultiSessionMaxLimitSuccess = createAction(
  "multiSessionMaxLimitSuccess/reset"
);
