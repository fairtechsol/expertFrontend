import { createAsyncThunk } from "@reduxjs/toolkit";
import service from "../../../service";
import { ApiConstants } from "../../../utils/Constants";
import { AxiosError } from "axios";

export const getOtherGamesMatchDetail = createAsyncThunk<any, any>(
  "getMatchDetailOtherMatch",
  async (requestData, thunkApi) => {
    try {
      const resp = await service.get(
        `${ApiConstants.MATCH.OTHER_MATCH_DETAIL}/${requestData}`
      );
      if (resp) {
        // let sessionBetting = resp?.data?.sessionBettings;
        // const updatedData = sessionBetting.map((item: any) => {
        //   const parsedItem = JSON.parse(item);

        //   if (
        //     parsedItem.selectionId &&
        //     parsedItem.yesPercent === 0 &&
        //     parsedItem.noPercent === 0
        //   ) {
        //     parsedItem.yesRate = 0;
        //     parsedItem.noRate = 0;
        //   }

        //   return JSON.stringify(parsedItem);
        // });
        return {
          ...resp?.data,
          // sessionBettings: updatedData,
        };
      }
    } catch (error) {
      const err = error as AxiosError;
      return thunkApi.rejectWithValue(err.response?.status);
    }
  }
);
