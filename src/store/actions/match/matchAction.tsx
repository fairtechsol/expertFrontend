import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import service from "../../../service";
import { ApiConstants } from "../../../utils/Constants";

export const getMatchList = createAsyncThunk<any>("/match/list", async () => {
  try {
    const response = await service.get(`/${ApiConstants.MATCH.LIST}`);
    if (response) {
      return response?.data?.matches
    }
  } catch (error) {
    const err = error as AxiosError;
    return err.response?.status;
  }
});

export const matchListReset = createAction("matchList/reset");
