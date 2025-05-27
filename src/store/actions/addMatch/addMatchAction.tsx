import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import Worker from "../../../helpers/sessionsHelpers?worker";
import service from "../../../service";
import { ApiConstants, addMatchThirdParty } from "../../../utils/Constants";

export const getAllLiveTournaments = createAsyncThunk<any, string>(
  "addMatch/getAllLiveTournaments",
  async (requestData, thunkApi) => {
    try {
      const { data } = await axios.get(
        `${addMatchThirdParty}/sportsList?type=${requestData}`
      );

      if (!data?.length) {
        return [{ EventName: "No Matches Available" }];
      }

      let directMatches = [];
      if (requestData === "cricket") {
        try {
          const resp = await axios.get(
            `${addMatchThirdParty}/getDirectMatchList?type=${requestData}`,
            { timeout: 2000 }
          );
          directMatches = resp?.data || [];
        } catch (error) {
          console.error("Failed to fetch direct matches:", error);
        }
      }

      const processedMatches = data.map((match: any) => {
        const commonFields = {
          EventId:
            requestData === "cricket"
              ? match?.beventId
              : JSON.stringify(match?.gmid),
          MarketId:
            requestData === "cricket"
              ? match?.bmarketId || "1." + match?.beventId
              : JSON.stringify(match?.mid),
          f: match?.f === "True" || match?.f === true,
          tv: match?.tv === "True" || match?.tv === true,
          m1: match?.m1 === "True" || match?.m1 === true,
          section: match?.section,
        };

        return {
          EventName: match.ename,
          EventDate: match.stime,
          ...commonFields,
        };
      });

      return {
        matchesList1: processedMatches,
        matchesList2: directMatches,
      };
    } catch (error) {
      console.error("Error in getAllLiveTournaments:", error);
      const err = error as AxiosError;
      return thunkApi.rejectWithValue(err.response?.status);
    }
  }
);

export const getAllEventsList = createAsyncThunk<any, string>(
  "addMatch/getAllEvents",
  async (requestData, thunkApi) => {
    try {
      const { data } = await axios.get(
        `${addMatchThirdParty}/eventList/${requestData}`
      );

      if (!data?.length) {
        return [{ EventName: "No Matches Available" }];
      }

      return data.map((match: any) => ({
        EventName: match?.event?.name,
        EventId: match?.event?.id,
        MarketId: match?.marketId,
        CompetitionId: match?.competition?.id,
        CompetitionName: match?.competition?.name,
        EventDetail: {
          EventDate: match?.event?.openDate,
          Runners: match?.runners,
        },
      }));
    } catch (error) {
      const err = error as AxiosError;
      return thunkApi.rejectWithValue(err.response?.status);
    }
  }
);

export const updateTeamRatesOnManualTournamentMarket = createAsyncThunk<
  any,
  any
>("update/updateTeamRatesOnManualTournamentMarket", async (requestData) => {
  return requestData;
});

export const updateRaceRunners = createAsyncThunk<any, any>(
  "updateRaceRunners",
  async (requestData) => {
    return requestData;
  }
);

export const addMatchExpert = createAsyncThunk<any, any>(
  "addMatchExpert",
  async (requestData, thunkApi) => {
    try {
      const resp = await service.post(ApiConstants.MATCH.ADD, requestData);
      if (resp) {
        return resp?.data;
      }
    } catch (error) {
      const err = error as AxiosError;
      return thunkApi.rejectWithValue(err.response?.status);
    }
  }
);

export const geTournamentBetting = createAsyncThunk<any, any>(
  "getTournamentBetting",
  async ({ matchId, betId }, thunkApi) => {
    try {
      const resp = await service.get(
        `${ApiConstants.MATCH.GET_TOURNAMENT}${matchId}`,
        {
          params: {
            id: betId,
            isRate: true,
          },
        }
      );
      if (resp) {
        return resp?.data;
      }
    } catch (error) {
      const err = error as AxiosError;
      return thunkApi.rejectWithValue(err.response?.status);
    }
  }
);

export const addRaceExpert = createAsyncThunk<any, any>(
  "addRaceExpert",
  async (requestData, thunkApi) => {
    try {
      const resp = await service.post(ApiConstants.MATCH.ADD_RACE, requestData);
      if (resp) {
        return resp?.data;
      }
    } catch (error) {
      const err = error as AxiosError;
      return thunkApi.rejectWithValue(err.response?.status);
    }
  }
);
export const getMatchDetail = createAsyncThunk<any, any>(
  "getMatchDetail",
  async (requestData, thunkApi) => {
    try {
      const { data } = await service.get(
        `${ApiConstants.MATCH.GETDETAIL}/${requestData}`
      );

      if (!data) return null;

      const processSessionBetting = (sessionBettings: any[]) => {
        return sessionBettings?.map((item) => {
          const parsedItem = JSON.parse(item);

          if (
            parsedItem.selectionId &&
            parsedItem.yesPercent === 0 &&
            parsedItem.noPercent === 0
          ) {
            return JSON.stringify({
              ...parsedItem,
              yesRate: 0,
              noRate: 0,
            });
          }

          return item;
        });
      };

      return {
        ...data,
        sessionBettings: processSessionBetting(data.sessionBettings),
      };
    } catch (error) {
      const err = error as AxiosError;
      return thunkApi.rejectWithValue(err.response?.status);
    }
  }
);

export const updateMatchRates = createAsyncThunk<any, any>(
  "/match/rates",
  async (matchDetails, { getState }) => {
    const state: any = getState();
    const sessionBettings =
      state.addMatch?.addMatch?.matchDetail?.sessionBettings;
    const tournament = matchDetails?.tournament;
    const apiSession = matchDetails?.apiSession;

    return new Promise((resolve) => {
      const worker = new Worker();

      worker.postMessage({
        sessionBettings,
        apiSession,
      });

      worker.onmessage = (e) => {
        resolve({
          apiSession,
          tournament: tournament,
          updatedSessionBettings: e.data.updatedSessionBettings,
        });
        worker.terminate();
      };
    });
  }
);

export const updateSessionAdded = createAsyncThunk<any, any>(
  "/session/added",
  async (matchDetails) => {
    return matchDetails;
  }
);
export const updateSessionProLoss = createAsyncThunk<any, any>(
  "/sessionProLoss/update",
  async (matchDetails) => {
    return matchDetails;
  }
);
export const removeSessionProLoss = createAsyncThunk<any, any>(
  "/removesessionProLoss/update",
  async (matchDetails) => {
    return matchDetails;
  }
);
export const updateRates = createAsyncThunk<any, any>(
  "/match/ratesUpdate",
  async (rates) => {
    return rates;
  }
);

export const getRaceMatches = createAsyncThunk<any, string>(
  "addMatch/getRaceMatches",
  async (requestData, thunkApi) => {
    try {
      const { data } = await axios.get(
        `${addMatchThirdParty}/getDirectMatchList`,
        {
          params: {
            type: requestData,
          },
        }
      );
      if (data) {
        return data;
      }
    } catch (error) {
      const err = error as AxiosError;
      return thunkApi.rejectWithValue(err.response?.status);
    }
  }
);

export const updateRaceRates = createAsyncThunk<any, any>(
  "/race/rates",
  async (matchDetails) => {
    return matchDetails;
  }
);

export const updateMarketRates = createAsyncThunk<any, any>(
  "/market/rates",
  async (requestData, thunkApi) => {
    try {
      const resp = await service.post(
        `${ApiConstants.BOOKMAKER.GET}/add`,
        requestData
      );
      if (resp) {
        return resp?.data;
      }
    } catch (error) {
      const err = error as AxiosError;
      return thunkApi.rejectWithValue(err.response?.status);
    }
  }
);

export const updateMultiSessionMinMax = createAsyncThunk<any, any>(
  "/multiSessionMinMax/rates",
  async (matchDetails) => {
    return matchDetails;
  }
);
export const addMatchReset = createAction("add/reset");
export const editMatchReset = createAction("edit/reset");
export const matchDetailReset = createAction("matchDetail/reset");
export const runnerDetailReset = createAction("runnerDetail/reset");
export const matchDetailSuccessReset = createAction("matchDetailSuccess/reset");
export const eventListReset = createAction("eventList/reset");
export const tournamentListReset = createAction("tournamentList/reset");
export const resetMarketListMinMax = createAction("marketListMinMax/reset");
