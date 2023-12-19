import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import service from "../../../service";
import { ApiConstants } from "../../../utils/Constants";

export const getAllLiveTournaments = createAsyncThunk<any, string>(
  "addMatch/getAllLiveTournaments",
  async (requestData, thunkApi) => {
    try {
      const { data } = await axios.get(
        `https://3200dev.fairgame.club/competitionList?type=${requestData}`
      );
      if (data) {
        let tournamentList: any = [];
        data.forEach((tournament: any) => {
          tournamentList.push({
            EventName: tournament?.competition?.name,
            EventId: tournament?.competition?.id,
            competitionRegion: tournament?.competitionRegion,
            marketCount: tournament?.marketCount,
          });
        });
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
        `https://3200dev.fairgame.club/eventList/${requestData}`
      );
      if (data) {
        let matchesList: any = [];
        data.forEach((match: any) => {
          matchesList.push({
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
        return matchesList;
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
      const resp = await service.post(
        `/${ApiConstants.MATCH.ADD}`,
        requestData
      );
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
        `/${ApiConstants.MATCH.GETDETAIL}/${requestData}`
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

export const addMatchReset = createAction("auth/reset");
