import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import service from "../../../service";
import { ApiConstants, Constants } from "../../../utils/Constants";

interface SessionById {
  matchId: string;
  id?: string | any;
}

export const getMatchList = createAsyncThunk<any, any>(
  "/match/list",
  async (requestData, thunkApi) => {
    try {
      let params: any = {
        searchBy: "title",
        keyword: requestData.keyword,
        page: requestData?.currentPage || 1,
        limit: requestData?.pageLimit || Constants.pageLimit,
        sort: "match.createdAt:DESC",
        "match.matchType": requestData?.matchType,
      };
      if (requestData?.stopAt) {
        params.stopAt = "isNull";
      }
      const response = await service.get(ApiConstants.MATCH.LIST, {
        params,
      });
      if (response) {
        return response?.data;
      }
    } catch (error) {
      const err = error as AxiosError;
      return thunkApi.rejectWithValue(err.response?.status);
    }
  }
);

export const getSessionProfitLossAfterDeclare = createAsyncThunk<any, any>(
  "/session/profitLoss/declare",
  async (requestData, thunkApi) => {
    try {
      const response = await service.get(ApiConstants.MATCH.SESSION_PL, {
        params: {
          betId: requestData?.id,
        },
      });
      if (response) {
        return response?.data;
      }
    } catch (error) {
      const err = error as AxiosError;
      return thunkApi.rejectWithValue(err.response?.status);
    }
  }
);

export const getSessionProfitLossBets = createAsyncThunk<any, any>(
  "/session/profitLoss/declare/bets",
  async ({ betId, matchId, url, userId }, thunkApi) => {
    try {
      const response = await service.get(ApiConstants.MATCH.SESSION_PL_BETS, {
        params: {
          betId,
          matchId,
          url,
          userId,
        },
      });
      if (response) {
        return response?.data;
      }
    } catch (error) {
      const err = error as AxiosError;
      return thunkApi.rejectWithValue(err.response?.status);
    }
  }
);

export const getTabList = createAsyncThunk<any, any>(
  "/tab/list",
  async (requestData, thunkApi) => {
    try {
      const response = await service.get(ApiConstants.BLINK.GET_TAB, {
        params: {
          searchBy: "title",
          keyword: requestData.keyword,
          page: requestData?.currentPage || 1,
          limit: Constants.pageLimit,
          sort: "match.createdAt:DESC",
        },
      });
      if (response) {
        return response?.data;
      }
    } catch (error) {
      const err = error as AxiosError;
      return thunkApi.rejectWithValue(err.response?.status);
    }
  }
);
export const getMatchListSessionProfitLoss = createAsyncThunk<any, any>(
  "/matchListSession/profitLoss",
  async (requestData, thunkApi) => {
    try {
      const response = await service.get(
        `${ApiConstants.MATCH.LIST_SESSION_PRO_LOSS}/${requestData}`
      );
      if (response) {
        return response?.data;
      }
    } catch (error) {
      const err = error as AxiosError;
      return thunkApi.rejectWithValue(err.response?.status);
    }
  }
);
export const getMatchListDropdown = createAsyncThunk<any, any>(
  "/match/listDropdown",
  async (requestData, thunkApi) => {
    try {
      const response = await service.get(ApiConstants.MATCH.DROPDOWNLIST, {
        params: {
          matchType: requestData,
        },
      });
      if (response) {
        return response?.data?.matches;
      }
    } catch (error) {
      const err = error as AxiosError;
      return thunkApi.rejectWithValue(err.response?.status);
    }
  }
);
export const betLiveStatus = createAsyncThunk<any, any>(
  "matchBeting/status/change",
  async (requestData, thunkApi) => {
    try {
      const response = await service.post(
        ApiConstants.BOOKMAKER.BETTINGSTATUS,
        requestData
      );
      if (response) {
        return response?.data;
      }
    } catch (error) {
      const err = error as AxiosError;
      return thunkApi.rejectWithValue(err.response?.status);
    }
  }
);
export const sessionBetLiveStatus = createAsyncThunk<any, any>(
  "session/status/change",
  async (requestData, thunkApi) => {
    try {
      const { betId, ...data } = requestData;
      const response = await service.post(
        `${ApiConstants.SESSION.BETTING_STATUS}/${betId}`,
        data
      );
      if (response) {
        return response?.data;
      }
    } catch (error) {
      const err = error as AxiosError;
      return thunkApi.rejectWithValue(err.response?.status);
    }
  }
);

export const marketClone = createAsyncThunk<any, any>(
  "matchBeting/clone",
  async (requestData, thunkApi) => {
    try {
      const response = await service.post(
        ApiConstants.MATCH.MARKET_CLONE,
        requestData
      );
      if (response) {
        return response?.data;
      }
    } catch (error) {
      const err = error as AxiosError;
      return thunkApi.rejectWithValue(err.response?.status);
    }
  }
);

export const getPlacedBetsMatch = createAsyncThunk<any, any>(
  "placedBets/match",
  async (requestData, thunkApi) => {
    try {
      const response = await service.get(ApiConstants.MATCH.GET_BETS, {
        params: {
          "betPlaced.matchId": requestData,
          sort: "betPlaced.createdAt:DESC",
        },
      });
      if (response?.data) {
        return response?.data;
      }
    } catch (error) {
      const err = error as AxiosError;
      return thunkApi.rejectWithValue(err.response?.status);
    }
  }
);

export const addStatusBetByBetId = createAsyncThunk<any, any>(
  "addStatusPlacedBets/match",
  async (betId) => {
    return betId;
  }
);

export const getPlacedBetsForSessionDetail = createAsyncThunk<any, any>(
  "placedBets/sessionDetail",
  async (requestData, thunkApi) => {
    try {
      const response = await service.get(ApiConstants.MATCH.GET_BETS, {
        params: {
          "betPlaced.matchId": requestData,
          marketBetType: "eqSESSION",
        },
      });
      if (response?.data) {
        return response?.data;
      }
    } catch (error) {
      const err = error as AxiosError;
      return thunkApi.rejectWithValue(err.response?.status);
    }
  }
);

export const updateMatchActiveStatus = createAsyncThunk<any, any>(
  "/match/updateActiveStatus",
  async (requestData, thunkApi) => {
    try {
      const response = await service.post(
        ApiConstants.MATCH.UPDATEACTIVESTATUS,
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
export const resultDeclare = createAsyncThunk<any, any>(
  "/bet/declare/result/session",
  async (requestData, thunkApi) => {
    try {
      const response = await service.post(
        ApiConstants.SESSION.RESULTDECLARE,
        requestData
      );
      if (response?.status) {
        return { ...response?.data, betId: requestData?.betId };
      }
    } catch (error) {
      const err = error as AxiosError;
      return thunkApi.rejectWithValue(err.response?.status);
    }
  }
);

export const undeclareResult = createAsyncThunk<any, any>(
  "/bet/unDeclare/result/session",
  async (requestData, thunkApi) => {
    try {
      const response = await service.post(
        ApiConstants.SESSION.UNDECLARE_RESULT,
        requestData
      );
      if (response?.status) {
        return { ...response?.data, betId: requestData?.betId };
      }
    } catch (error) {
      const err = error as AxiosError;
      return thunkApi.rejectWithValue(err.response?.status);
    }
  }
);

export const noResultDeclare = createAsyncThunk<any, any>(
  "/bet/declare/noResult/session",
  async (requestData, thunkApi) => {
    try {
      const response = await service.post(
        ApiConstants.SESSION.NO_RESULT,
        requestData
      );
      if (response?.status) {
        return { ...response?.data, betId: requestData?.betId };
      }
    } catch (error) {
      const err = error as AxiosError;
      return thunkApi.rejectWithValue(err.response?.status);
    }
  }
);

export const editMatch = createAsyncThunk<any, any>(
  "/match/edit",
  async (requestData, thunkApi) => {
    try {
      const response = await service.post(ApiConstants.MATCH.EDIT, requestData);
      if (response) {
        return response.data;
      }
    } catch (error) {
      const err = error as AxiosError;
      return thunkApi.rejectWithValue(err.response?.status);
    }
  }
);
export const editRace = createAsyncThunk<any, any>(
  "/race/edit",
  async (requestData, thunkApi) => {
    try {
      const response = await service.post(
        ApiConstants.MATCH.EDIT_RACE,
        requestData
      );
      if (response) {
        return response.data;
      }
    } catch (error) {
      const err = error as AxiosError;
      return thunkApi.rejectWithValue(err.response?.status);
    }
  }
);
export const getSessionProfitLossMatchDetail = createAsyncThunk<any, any>(
  "get/sessionProfitLossForMatchDetail",
  async (requestData, thunkApi) => {
    try {
      const resp = await service.get(
        `${ApiConstants.SESSION.PROFIT_LOSS}/${requestData?.id}`,
        {
          params: {
            matchId: requestData?.matchId,
          },
        }
      );
      if (resp?.data) {
        return {
          id: requestData?.id,
          name: requestData?.name,
          proLoss: resp?.data,
        };
      } else {
        return {
          id: requestData?.id,
          name: requestData?.name,
          proLoss: [],
        };
      }
    } catch (error) {
      const err = error as AxiosError;
      return thunkApi.rejectWithValue(err.response?.status);
    }
  }
);

export const getCountryCode = createAsyncThunk<any, any>(
  "/match/countryCode",
  async ({ date, matchType }, thunkApi) => {
    try {
      const response = await service.get(ApiConstants.MATCH.GET_COUNTRY_CODE, {
        params: {
          date,
          matchType,
        },
      });
      if (response) {
        return response.data;
      }
    } catch (error) {
      const err = error as AxiosError;
      return thunkApi.rejectWithValue(err.response?.status);
    }
  }
);
export const getRaceList = createAsyncThunk<any, any>(
  "/match/raceList",
  async (requestData, thunkApi) => {
    try {
      const response = await service.get(ApiConstants.MATCH.GET_RACE_LIST, {
        params: {
          countryCode: `eq${requestData?.cc}`,
          "DATE(racingMatch.startAt)": requestData?.date,
          matchType: `eq${requestData.matchType}`,
        },
      });
      if (response) {
        return response.data;
      }
    } catch (error) {
      const err = error as AxiosError;
      return thunkApi.rejectWithValue(err.response?.status);
    }
  }
);
export const getRaceMatch = createAsyncThunk<any, any>(
  "/match/raceMatch",
  async (requestData, thunkApi) => {
    try {
      const response = await service.get(
        `${ApiConstants.MATCH.GET_RACE_MATCH}/${requestData}`
      );
      if (response?.data) {
        return {
          ...response.data,
          matchOdd: {
            ...response.data.matchOdd,
            runners: response.data.runners,
          },
        };
      }
    } catch (error) {
      const err = error as AxiosError;
      return thunkApi.rejectWithValue(err.response?.status);
    }
  }
);
export const raceLiveStatus = createAsyncThunk<any, any>(
  "raceBeting/status/change",
  async (requestData, thunkApi) => {
    try {
      const response = await service.post(
        ApiConstants.BOOKMAKER.RACESTATUS,
        requestData
      );
      if (response) {
        return response?.data;
      }
    } catch (error) {
      const err = error as AxiosError;
      return thunkApi.rejectWithValue(err.response?.status);
    }
  }
);
export const addBlinking = createAsyncThunk<any, any>(
  "/add/blinking",
  async (requestData, thunkApi) => {
    try {
      const response = await service.post(ApiConstants.BLINK.ADD, requestData);
      if (response?.status === 200) {
        return response?.data;
      }
    } catch (error) {
      const err = error as AxiosError;
      return thunkApi.rejectWithValue(err.response?.status);
    }
  }
);
export const deleteBlinking = createAsyncThunk<any, any>(
  "/delete/blinking",
  async (requestData, thunkApi) => {
    try {
      const response = await service.delete(
        `${ApiConstants.BLINK.DELETE}${requestData?.id}`
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
export const updateTeamRates = createAsyncThunk<any, any>(
  "/teamRates/update",
  async (data) => {
    return data;
  }
);

export const updateMaxLoss = createAsyncThunk<any, any>(
  "/updateMaxLoss/update",
  async (data) => {
    return data;
  }
);
export const updateMatchBetsPlace = createAsyncThunk<any, SessionById>(
  "update/matchBetsPlace",
  async (requestData) => {
    return requestData;
  }
);
export const updateSessionBetsPlace = createAsyncThunk<any, SessionById>(
  "update/sessionBetsPlace",
  async (requestData) => {
    return requestData;
  }
);
export const updateMatchBetsReason = createAsyncThunk<any, SessionById>(
  "update/updateMatchBetsReason",
  async (requestData) => {
    return requestData;
  }
);
export const updateDeletedBetReasonOnEdit = createAsyncThunk<any, SessionById>(
  "update/updateDeletedBetReasonOnEdit",
  async (requestData) => {
    return requestData;
  }
);
export const getSessionProfitLossMatchDetailFilter = createAsyncThunk<
  any,
  SessionById
>("getSessionProfitLossMatchDetail/filter", async (requestData) => {
  return requestData;
});
export const updateResultStatusOfSession = createAsyncThunk<any, SessionById>(
  "update/resultStatusSession",
  async (requestData) => {
    return requestData;
  }
);
export const updateResultStatusOfMatch = createAsyncThunk<any, SessionById>(
  "update/resultStatusMatch",
  async (requestData) => {
    return requestData;
  }
);
export const updateTeamRatesOnUndeclare = createAsyncThunk<any, SessionById>(
  "update/teamRatesOnUndeclare",
  async (requestData) => {
    return requestData;
  }
);
export const updateResultStatusOfrace = createAsyncThunk<any, SessionById>(
  "update/resultStatusMatch",
  async (requestData) => {
    return requestData;
  }
);
export const updateTeamRatesForHorseRacing = createAsyncThunk<any, any>(
  "horseRacing/teamRatesUpdate",
  async (data) => {
    return data;
  }
);
export const updateTeamRatesForHorseRacingOnDelete = createAsyncThunk<any, any>(
  "horseRacing/teamRatesUpdateOnDelete",
  async (data) => {
    return data;
  }
);
export const setSelectedTabForMatchList = createAsyncThunk<any, any>(
  "set/selectedTabForMatchList",
  async (data) => {
    return data;
  }
);
export const updateMatchListCurrentPage = createAsyncThunk<any, any>(
  "update/matchListCurrentPage",
  async (data) => {
    return data;
  }
);

export const matchListReset = createAction("matchList/reset");
export const editSuccessReset = createAction("editSuccess/reset");
export const sessionResultSuccessReset = createAction("sessionResult/reset");
export const resetMatchListSessionProLoss = createAction(
  "matchListSessionProLoss/reset"
);
export const getSessionProfitLossMatchDetailReset = createAction(
  "getSessionProfitLossMatchDetail/reset"
);
export const resetRaceEdit = createAction("raceEdit/reset");
export const resetRaceList = createAction("raceListOnDateArrayEmpty/reset");
export const resetContryCodeList = createAction(
  "contryCodeOnDateArrayEmpty/reset"
);
export const resetMatchListDropdown = createAction("matchListDropdown/reset");
export const resetSuccessObject = createAction("successObject/reset");
