import { createAsyncThunk } from "@reduxjs/toolkit";
import service from "../../../service";
import { ApiConstants } from "../../../utils/Constants";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

interface ChangePassword {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const toastOptions = {
  autoClose: 10000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
};

export const changePassword = createAsyncThunk<any, ChangePassword>(
  "user/changePassword",
  async (requestData, thunkApi) => {
    try {
      const resp = await service.post(
        `${ApiConstants.USER.CHANGEPASSWORD}`,
        requestData
      );
      if (resp) {
        if (resp?.data) {
          toast.success(resp?.data?.transactionPassword, toastOptions);
        }
        window.location.replace("/login");
      }
    } catch (error: any) {
      const err = error as AxiosError;
      return thunkApi.rejectWithValue(err.response?.status);
    }
  }
);
