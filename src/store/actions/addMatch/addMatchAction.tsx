import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import service from "../../../service";
import { ApiConstants } from "../../../utils/Constants";
import constants from "../../../components/helper/constants";

export const getAllLiveTournaments = createAsyncThunk<any, string>(
  "addMatch/getAllLiveTournaments",
  async (requestData, thunkApi) => {
    try {
      const { data } = await axios.get(
        `${constants.microServiceApiPath}/competitionList?type=${requestData}`
      );
      if (data) {
        let tournamentList: any = [
          {
            EventName: "No Tournaments Available",
          },
        ];
        if (data && data.length > 0) {
          let tournamentList1: any = [];
          data.forEach((tournament: any) => {
            tournamentList1.push({
              EventName: tournament?.competition?.name,
              EventId: tournament?.competition?.id,
              competitionRegion: tournament?.competitionRegion,
              marketCount: tournament?.marketCount,
            });
          });
          tournamentList = tournamentList1;
        }
        return tournamentList;
      }
    } catch (error) {
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
        `${constants.microServiceApiPath}/eventList/${requestData}`
      );
      if (data) {
        let matchesList: any = [
          {
            EventName: "No Matches Available",
          },
        ];
        if (data && data.length > 0) {
          let matchesList1: any = [];
          data.forEach((match: any) => {
            matchesList1.push({
              EventName: match?.event?.name,
              EventId: match?.event?.id,
              MarketId: match?.marketId,
              CompetitionId: match?.competition?.id,
              CompetitionName: match?.competition?.name,
              EventDetail: {
                EventDate: match?.event?.openDate,
                Runners: match?.runners,
                // Runnercount: match?.runners,
              },
            });
          });
          matchesList = matchesList1;
        }
        return matchesList;
      }
    } catch (error) {
      const err = error as AxiosError;
      return thunkApi.rejectWithValue(err.response?.status);
    }
  }
);

export const getExtraMarketList = createAsyncThunk<any, string>(
  "addMatch/extraMarketList",
  async (requestData, thunkApi) => {
    try {
      const { data } = await axios.get(
        `${constants.microServiceApiPath}/extraMarketList/${requestData}`
      );
      if (data) {
        let extraMarketList: any = {
          matchOdds: {
            marketId: data?.find(
              (match: any) => match?.marketName === "Match Odds"
            )?.marketId,
          },
          tiedMatch: {
            marketId: data?.find(
              (match: any) => match?.marketName === "Tied Match"
            )?.marketId,
          },
          completedMatch: {
            marketId: data?.find(
              (match: any) => match?.marketName === "Completed Match"
            )?.marketId,
          },
        };

        return extraMarketList;
      }
    } catch (error) {
      const err = error as AxiosError;
      return thunkApi.rejectWithValue(err.response?.status);
    }
  }
);

export const addMatchExpert = createAsyncThunk<any, any>(
  "addMatchExpert",
  async (requestData, thunkApi) => {
    try {
      const resp = await service.post(`${ApiConstants.MATCH.ADD}`, requestData);
      if (resp) {
        console.log(resp);
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
      const resp = await service.get(
        `${ApiConstants.MATCH.GETDETAIL}/${requestData}`
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

export const updateMatchRates = createAsyncThunk<any, any>(
  "/match/rates",
  async (matchDetails) => {
    return matchDetails;
  }
);
export const updateMatchBettingStatus = createAsyncThunk<any, any>(
  "/match/bettingtatus",
  async (betting) => {
    return betting;
  }
);

export const addMatchReset = createAction("add/reset");
export const editMatchReset = createAction("edit/reset");
export const matchDetailReset = createAction("matchDetail/reset");
export const eventListReset = createAction("eventList/reset");
export const tournamentListReset = createAction("tournamentList/reset");
