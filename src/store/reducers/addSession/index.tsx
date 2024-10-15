import { createReducer } from "@reduxjs/toolkit";
import {
  addSession,
  addsuccessReset,
  getBookmakerById,
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
  updateRatesBook,
  updateResultStatusOfQuickBookmaker,
  updateResultStatusOfSessionById,
  updateSession,
  updateSessionById,
  updateSessionByIdForUndeclare,
  updateSessionMaxLimit,
  updateSessionProfitLoss,
  updateTeamRatesOnManualMarket,
} from "../../actions/addSession";
import { profitLossDataForMatchConstants } from "../../../utils/Constants";

interface InitialState {
  sessionById: any;
  selectedSessionId: string;
  selectedMatchId: string;
  sessionProfitLoss: any;
  currentOdd: any;
  bookmakerById: any;
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
  selectedMatchId: "",
  sessionProfitLoss: [],
  currentOdd: null,
  bookmakerById: null,
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
      state.selectedMatchId = action?.payload?.matchId;
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
    .addCase(getBookmakerById.pending, (state) => {
      state.loading = true;
      state.success = false;
    })
    .addCase(getBookmakerById.fulfilled, (state, action) => {
      state.bookmakerById = action?.payload;
      state.loading = false;
      state.success = true;
    })
    .addCase(getBookmakerById.rejected, (state) => {
      state.loading = false;
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
      const { betPlacedId, deleteReason } = action?.payload;
      const updateDeleteReason = (bet: any) => {
        if (betPlacedId?.includes(bet?.id)) {
          bet.deleteReason = deleteReason;
        }

        return bet;
      };

      const updatedBetPlaced = state.placedBets?.map(updateDeleteReason);

      state.placedBets = Array.from(new Set(updatedBetPlaced));
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
    .addCase(updateTeamRatesOnManualMarket.fulfilled, (state, action) => {
      const { userRedisObj, jobData } = action?.payload;
      state.bookmakerById.matchRates = {
        ...state.bookmakerById.matchRates,
        [profitLossDataForMatchConstants[jobData?.newBet?.marketType].A +
        "_" +
        state.bookmakerById?.matchId]: userRedisObj[jobData?.teamArateRedisKey],
        [profitLossDataForMatchConstants[jobData?.newBet?.marketType].B +
        "_" +
        state.bookmakerById?.matchId]: userRedisObj[jobData?.teamBrateRedisKey],
        [profitLossDataForMatchConstants[jobData?.newBet?.marketType].C +
        "_" +
        state.bookmakerById?.matchId]: userRedisObj[jobData?.teamCrateRedisKey],
      };
      // if (["tiedMatch2", "tiedMatch1"].includes(jobData?.newBet?.marketType)) {
      //   state.bookmakerById.matchRates = {
      //     ...state.bookmakerById.matchRates,
      //     yesRateTie: userRedisObj[jobData?.teamArateRedisKey],
      //     noRateTie: userRedisObj[jobData?.teamBrateRedisKey],
      //   };
      // } else if (
      //   ["completeMatch", "completeManual"].includes(
      //     jobData?.newBet?.marketType
      //   )
      // ) {
      //   state.bookmakerById.matchRates = {
      //     ...state.bookmakerById.matchRates,
      //     yesRateComplete: userRedisObj[jobData?.teamArateRedisKey],
      //     noRateComplete: userRedisObj[jobData?.teamBrateRedisKey],
      //   };
      // } else {
      //   state.bookmakerById.matchRates = {
      //     ...state.bookmakerById.matchRates,
      //     teamARate: userRedisObj[jobData?.teamArateRedisKey],
      //     teamBRate: userRedisObj[jobData?.teamBrateRedisKey],
      //     teamCRate: userRedisObj[jobData?.teamCrateRedisKey] ?? "",
      //   };
      // }
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
    .addCase(updateSessionByIdForUndeclare.fulfilled, (state, action) => {
      state.selectedSessionId = action?.payload;
    })
    .addCase(resetPlacedBets, (state) => {
      state.placedBets = [];
      state.sessionProfitLoss = [];
    })
    .addCase(updateRatesBook.fulfilled, (state, action) => {
      const {
        redisObject,
        matchBetType,
        teamArateRedisKey,
        teamBrateRedisKey,
        teamCrateRedisKey,
      } = action?.payload;

      state.bookmakerById.matchRates = {
        ...state.bookmakerById.matchRates,
        [profitLossDataForMatchConstants[matchBetType].A]:
          redisObject[teamArateRedisKey],
        [profitLossDataForMatchConstants[matchBetType].B]:
          redisObject[teamBrateRedisKey],
        [profitLossDataForMatchConstants[matchBetType].C]:
          redisObject[teamCrateRedisKey],
      };
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
      const { maxBet, id } = action?.payload;
      const { sessionById } = state;

      if (id === sessionById?.id) {
        state.sessionById = {
          ...sessionById,
          maxBet,
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
    })
    .addCase(updateResultStatusOfQuickBookmaker.fulfilled, (state, action) => {
      if (state.bookmakerById?.id === action.payload?.betId) {
        state.bookmakerById["resultStatus"] = action?.payload?.status;
      }
    });
});
