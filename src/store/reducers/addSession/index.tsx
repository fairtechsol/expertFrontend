import { createReducer } from "@reduxjs/toolkit";
import {
  addSession,
  addsuccessReset,
  getPlacedBets,
  getSessionById,
  getSessionProfitLoss,
  resetMultiSessionMaxLimitSuccess,
  resetPlacedBets,
  resetSessionMaxLimitSuccess,
  sessionByIdReset,
  sessionSuccessReset,
  setCurrentOdd,
  successReset,
  updateBetsPlaced,
  updateDeleteReason,
  updateDeleteReasonOnEdit,
  updateMatchBetsPlaced,
  updateMultiSessionMarketAmount,
  updateProLossSession,
  updateResultStatusOfSessionById,
  updateSession,
  updateSessionById,
  updateSessionMaxLimit,
  updateSessionProfitLoss,
} from "../../actions/addSession";

interface InitialState {
  sessionById: any;
  selectedSessionId: string;
  sessionProfitLoss: any;
  currentOdd: any;
  placedBets: any;
  success: boolean;
  addSuccess: boolean;
  getSessionSuccess: boolean;
  maxLimitUpdateSuccess: boolean;
  multiMaxLimitUpdateSuccess: boolean;
  loading: boolean;
}

const initialState: InitialState = {
  sessionById: null,
  selectedSessionId: "",
  sessionProfitLoss: [],
  currentOdd: null,
  placedBets: [],
  success: false,
  addSuccess: false,
  getSessionSuccess: false,
  maxLimitUpdateSuccess: false,
  multiMaxLimitUpdateSuccess: false,
  loading: false,
};

export const addSessionReducers = createReducer(initialState, (builder) => {
  builder
    .addCase(addSession.pending, (state) => {
      state.loading = true;
      state.addSuccess = false;
    })
    .addCase(addSession.fulfilled, (state, action) => {
      state.sessionById = action?.payload;
      state.selectedSessionId = action?.payload?.id;
      state.loading = false;
      state.addSuccess = true;
    })
    .addCase(addSession.rejected, (state) => {
      state.loading = false;
      state.addSuccess = false;
    })
    .addCase(getSessionById.pending, (state) => {
      state.loading = true;
      state.getSessionSuccess = false;
      state.sessionById = null;
    })
    .addCase(getSessionById.fulfilled, (state, action) => {
      state.sessionById = action?.payload;
      state.loading = false;
      state.getSessionSuccess = true;
    })
    .addCase(getSessionById.rejected, (state) => {
      state.loading = false;
      state.getSessionSuccess = false;
    })
    .addCase(getSessionProfitLoss.pending, (state) => {
      state.loading = true;
      state.success = false;
      state.sessionProfitLoss = [];
    })
    .addCase(getSessionProfitLoss.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.sessionProfitLoss = action?.payload;
    })
    .addCase(getSessionProfitLoss.rejected, (state) => {
      state.loading = false;
    })
    .addCase(setCurrentOdd.fulfilled, (state, action) => {
      state.currentOdd = action?.payload;
    })
    .addCase(getPlacedBets.pending, (state) => {
      state.loading = true;
      state.success = false;
    })
    .addCase(getPlacedBets.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.placedBets = action?.payload;
    })
    .addCase(getPlacedBets.rejected, (state) => {
      state.loading = true;
      state.success = false;
    })
    .addCase(updateDeleteReason.fulfilled, (state, action) => {
      const { betPlacedId, deleteReason, isPermanentDelete } = action?.payload;
      const updateDeleteReason = (bet: any) => {
        if (betPlacedId?.includes(bet?.id)) {
          bet.deleteReason = deleteReason;
        }
        return bet;
      };
      if (isPermanentDelete) {
        const updatedBetPlaced = state?.placedBets?.filter(
          (item: any) => !betPlacedId?.includes(item?.id)
        );
        state.placedBets = Array.from(new Set(updatedBetPlaced));
      } else {
        const updatedBetPlaced = state?.placedBets?.map(updateDeleteReason);
        state.placedBets = Array.from(new Set(updatedBetPlaced));
      }
    })
    .addCase(updateDeleteReasonOnEdit.fulfilled, (state, action) => {
      const { betIds, deleteReason } = action?.payload;
      const updateDeleteReason = (bet: any) => {
        if (betIds?.includes(bet?.id)) {
          bet.deleteReason = deleteReason;
        }

        return bet;
      };

      const updatedBetPlaced = state.placedBets?.map(updateDeleteReason);

      state.placedBets = Array.from(new Set(updatedBetPlaced));
    })
    .addCase(updateBetsPlaced.fulfilled, (state, action) => {
      const { partnership } = action?.payload;
      const fpartnerShip = JSON.parse(partnership);
      let objToUpdate = {
        ...action.payload.placedBet,
        myStake: +action?.payload?.betPlaceObject?.myStack,
        user: {
          userName: action?.payload?.betPlaceObject?.betPlacedData?.userName,
          fwPartnership: Number(fpartnerShip?.fwPartnership),
        },
        domain: action?.payload?.domainUrl,
      };

      const id = objToUpdate?.id;

      if (!state?.placedBets?.some((item: any) => item?.id === id)) {
        state.placedBets = [objToUpdate, ...state.placedBets];
      }
    })
    .addCase(updateMatchBetsPlaced.fulfilled, (state, action) => {
      const { jobData } = action?.payload;
      let objToUpdate = {
        ...jobData.newBet,
        myStake: +jobData?.myStake,
        user: {
          userName: jobData?.userName,
        },
        domain: jobData?.domainUrl,
      };
      const id = objToUpdate?.id;

      if (!state.placedBets?.find((item: any) => item?.id === id)) {
        state.placedBets = [objToUpdate, ...state.placedBets];
      }
    })

    .addCase(updateSessionById.fulfilled, (state, action) => {
      state.sessionById = {
        ...state.sessionById,
        activeStatus: action?.payload?.activeStatus,
        result: action?.payload?.score,
        resultStatus: action?.payload?.resultStatus
          ? action?.payload?.resultStatus
          : null,
      };
    })
    .addCase(updateSessionProfitLoss.fulfilled, (state, action) => {
      state.sessionProfitLoss = action?.payload;
    })
    .addCase(sessionByIdReset, (state) => {
      state.success = false;
      state.sessionById = null;
      state.sessionProfitLoss = [null];
    })
    .addCase(successReset, (state) => {
      state.success = false;
    })
    .addCase(addsuccessReset, (state) => {
      state.addSuccess = false;
    })
    .addCase(sessionSuccessReset, (state) => {
      state.getSessionSuccess = false;
    })
    .addCase(resetPlacedBets, (state) => {
      state.placedBets = [];
      state.sessionProfitLoss = [];
    })
    .addCase(updateProLossSession.fulfilled, (state, action) => {
      const { profitLoss } = action?.payload;
      state.sessionProfitLoss = profitLoss;
    })
    .addCase(updateSession.pending, (state) => {
      state.loading = true;
      state.maxLimitUpdateSuccess = false;
    })
    .addCase(updateSession.fulfilled, (state, action) => {
      const { maxBet, id } = action?.payload;
      const { sessionById } = state;

      if (id === sessionById?.id) {
        state.sessionById = {
          ...sessionById,
          maxBet,
        };
        state.loading = false;
        state.maxLimitUpdateSuccess = true;
      } else {
        state.maxLimitUpdateSuccess = true;
        state.loading = false;
      }
    })
    .addCase(updateSession.rejected, (state) => {
      state.loading = false;
    })
    .addCase(updateMultiSessionMarketAmount.pending, (state) => {
      state.loading = true;
      state.multiMaxLimitUpdateSuccess = false;
    })
    .addCase(updateMultiSessionMarketAmount.fulfilled, (state) => {
      state.loading = false;
      state.multiMaxLimitUpdateSuccess = true;
    })
    .addCase(updateMultiSessionMarketAmount.rejected, (state) => {
      state.loading = false;
    })
    .addCase(updateSessionMaxLimit.fulfilled, (state, action) => {
      const { maxBet, id, minBet, exposureLimit, isCommissionActive } =
        action?.payload;
      const { sessionById } = state;

      if (id === sessionById?.id) {
        state.sessionById = {
          ...sessionById,
          maxBet,
          minBet,
          exposureLimit,
          isCommissionActive,
        };
        state.loading = false;
        state.maxLimitUpdateSuccess = true;
      }
    })
    .addCase(resetSessionMaxLimitSuccess, (state) => {
      state.maxLimitUpdateSuccess = false;
    })
    .addCase(resetMultiSessionMaxLimitSuccess, (state) => {
      state.multiMaxLimitUpdateSuccess = false;
    })
    .addCase(updateResultStatusOfSessionById.fulfilled, (state, action) => {
      const { status, betId } = action?.payload;
      if (betId === state.sessionById?.id) {
        state.sessionById = {
          ...state.sessionById,
          resultStatus: status ? status : null,
        };
      }
    });
});
