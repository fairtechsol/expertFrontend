import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import service from "../../../service";
import { ApiConstants } from "../../../utils/Constants";

export const getOtherGamesMatchDetail = createAsyncThunk<any, any>(
  "getMatchDetailOtherMatch",
  async (requestData, thunkApi) => {
    try {
      const resp = await service.get(
        `${ApiConstants.MATCH.OTHER_MATCH_DETAIL}/${requestData}`
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

export const updateTeamRatesOtherGames = createAsyncThunk<any, any>(
  "/teamRates/updateOtherGames",
  async (data) => {
    return data;
  }
);
