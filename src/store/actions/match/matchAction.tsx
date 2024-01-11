import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import service from "../../../service";
import { ApiConstants, Constants } from "../../../utils/Constants";

export const getMatchList = createAsyncThunk<any, any>(
  "/match/list",
  async (requestData, thunkApi) => {
    try {
      const response = await service.get(
        `${ApiConstants.MATCH.LIST}?searchBy=title&keyword=${
          requestData.keyword ? requestData.keyword : ""
        }&page=${
          requestData?.currentPage ? requestData?.currentPage : 1
        }&limit=${Constants.pageLimit}`
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
export const getMatchListDropdown = createAsyncThunk<any>(
  "/match/listDropdown",
  async (_, thunkApi) => {
    try {
      const response = await service.get(`${ApiConstants.MATCH.DROPDOWNLIST}`);
      if (response) {
        return response?.data?.matches;
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
        `${ApiConstants.MATCH.UPDATEACTIVESTATUS}`,
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
export const betSession = createAsyncThunk<any, any>(
  "/bet/declare/result/session",
  async (requestData, thunkApi) => {
    try {
      const response = await service.post(
        `${ApiConstants.MATCH.UPDATEACTIVESTATUS}`,
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
        `${ApiConstants.SESSION.RESULTDECLARE}`,
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

export const noResultDeclare = createAsyncThunk<any, any>(
  "/bet/declare/noResult/session",
  async (requestData, thunkApi) => {
    try {
      const response = await service.post(
        `${ApiConstants.SESSION.NO_RESULT}`,
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

export const editMatch = createAsyncThunk<any, any>(
  "/match/edit",
  async (requestData, thunkApi) => {
    try {
      const response = await service.post(
        `${ApiConstants.MATCH.EDIT}`,
        requestData
      );
      if (response) {
        return response.data;
      }
    } catch (error) {
      console.log(error);
      const err = error as AxiosError;
      return thunkApi.rejectWithValue(err.response?.status);
    }
  }
);

export const matchListReset = createAction("matchList/reset");
export const editSuccessReset = createAction("editSuccess/reset");
export const updateMatchActiveStatusReset = createAction(
  "updateMatchActiveStatusReset/reset"
);
