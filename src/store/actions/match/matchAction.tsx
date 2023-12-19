import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import service from "../../../service";
import { ApiConstants } from "../../../utils/Constants";

interface ChangePassword {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export const addMatchAPI = createAsyncThunk<any, any>(
  "/match/add",
  async (requestData) => {
    try {
      const response = await service.post(
        `/${ApiConstants.MATCH.ADD_MATCH}`,
        requestData
      );
      // localStorage.clear();
      // window.location.replace("/login");
      return response;
    } catch (error) {
      const err = error as AxiosError;
      return err.response?.status;
    }
  }
);
