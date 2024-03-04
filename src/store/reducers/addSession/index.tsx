import { createReducer } from "@reduxjs/toolkit";
import {
  addSession,
  addsuccessReset,
  getBookmakerById,
  getPlacedBets,
  getSessionById,
  getSessionProfitLoss,
  resetPlacedBets,
  sessionByIdReset,
  sessionSuccessReset,
  setCurrentOdd,
  successReset,
  updateBetsPlaced,
  updateDeleteReason,
  updateMatchBetsPlaced,
  updateProLossSession,
  updateRatesBook,
  updateSessionById,
  updateSessionByIdForUndeclare,
  updateSessionProfitLoss,
} from "../../actions/addSession";

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
  loading: false,
};

export const addSessionReducers = createReducer(initialState, (builder) => {
  builder
    .addCase(addSession.pending, (state) => {
      state.loading = true;
      state.addSuccess = false;
    })
    .addCase(addSession.fulfilled, (state, action) => {
      state.sessionById = action.payload;
      state.selectedSessionId = action.payload?.id;
      state.selectedMatchId = action.payload.matchId;
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
      state.sessionById = action.payload;
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
      state.sessionProfitLoss = action.payload;
    })
    .addCase(getSessionProfitLoss.rejected, (state) => {
      state.loading = false;
    })
    .addCase(setCurrentOdd.fulfilled, (state, action) => {
      state.currentOdd = action.payload;
    })
    .addCase(getBookmakerById.pending, (state) => {
      state.loading = true;
      state.success = false;
    })
    .addCase(getBookmakerById.fulfilled, (state, action) => {
      state.bookmakerById = action.payload;
      state.loading = false;
      state.success = true;
    })
    .addCase(getBookmakerById.rejected, (state) => {
      state.loading = false;
    })
    .addCase(getPlacedBets.pending, (state) => {
      state.loading = true;
      state.success = false;
      state.placedBets = [];
    })
    .addCase(getPlacedBets.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.placedBets = action.payload;
    })
    .addCase(getPlacedBets.rejected, (state) => {
      state.loading = true;
      state.success = false;
    })
    .addCase(updateDeleteReason.fulfilled, (state, action) => {
      const { betPlacedId, deleteReason } = action.payload;
      const updateDeleteReason = (bet: any) => {
        if (betPlacedId.includes(bet.id)) {
          bet.deleteReason = deleteReason;
        }

        return bet;
      };

      const updatedBetPlaced = state.placedBets.map(updateDeleteReason);

      state.placedBets = Array.from(new Set(updatedBetPlaced));
    })
    .addCase(updateBetsPlaced.fulfilled, (state, action) => {
      const { partnership } = action.payload;
      const fpartnerShip = JSON.parse(partnership);
      let objToUpdate = {
        ...action.payload.placedBet,
        myStake: +action.payload.betPlaceObject.myStack,
        user: {
          userName: action.payload.betPlaceObject.betPlacedData.userName,
          fwPartnership: Number(fpartnerShip?.fwPartnership),
        },
      };

      const id = objToUpdate.id;

      if (!state.placedBets.some((item: any) => item.id === id)) {
        state.placedBets = [objToUpdate, ...state.placedBets];
      }
    })
    .addCase(updateMatchBetsPlaced.fulfilled, (state, action) => {
      const { userRedisObj, jobData } = action.payload;
      let objToUpdate = {
        ...jobData.newBet,
        myStake: +jobData.myStake,
        user: {
          userName: jobData.userName,
        },
      };
      const id = objToUpdate.id;

      if (!state.placedBets.some((item: any) => item.id === id)) {
        state.placedBets = [objToUpdate, ...state.placedBets];
      }
      if (["tiedMatch2", "tiedMatch1"].includes(jobData?.newBet?.marketType)) {
        state.bookmakerById.matchRates = {
          ...state.bookmakerById.matchRates,
          yesRateTie: userRedisObj[jobData?.teamArateRedisKey],
          noRateTie: userRedisObj[jobData?.teamBrateRedisKey],
        };
      } else {
        state.bookmakerById.matchRates = {
          ...state.bookmakerById.matchRates,
          teamARate: userRedisObj[jobData?.teamArateRedisKey],
          teamBRate: userRedisObj[jobData?.teamBrateRedisKey],
          teamCRate: userRedisObj[jobData?.teamCrateRedisKey] ?? "",
        };
      }
    })
    .addCase(updateSessionById.fulfilled, (state, action) => {
      state.sessionById = {
        ...state.sessionById,
        activeStatus: action.payload.activeStatus,
        result: action.payload.score,
      };
    })
    .addCase(updateSessionProfitLoss.fulfilled, (state, action) => {
      state.sessionProfitLoss = action.payload;
    })
    .addCase(sessionByIdReset, (state) => {
      return {
        ...state,
        success: false,
        sessionById: null,
        sessionProfitLoss: null,
      };
    })
    .addCase(successReset, (state) => {
      return { ...state, success: false };
    })
    .addCase(addsuccessReset, (state) => {
      return { ...state, addSuccess: false };
    })
    .addCase(sessionSuccessReset, (state) => {
      return { ...state, getSessionSuccess: false };
    })
    .addCase(updateSessionByIdForUndeclare.fulfilled, (state, action) => {
      return { ...state, selectedSessionId: action.payload };
    })
    .addCase(resetPlacedBets, (state) => {
      return { ...state, placedBets: [], sessionProfitLoss: [] };
    })
    .addCase(updateRatesBook.fulfilled, (state, action) => {
      const { redisObject, matchBetType } = action.payload;
      if (["tiedMatch2", "tiedMatch1"].includes(matchBetType)) {
        state.bookmakerById.matchRates = {
          ...state.bookmakerById.matchRates,
          yesRateTie: redisObject[action.payload.teamArateRedisKey],
          noRateTie: redisObject[action.payload.teamBrateRedisKey],
        };
      } else if (["completeMatch"].includes(matchBetType)) {
        state.bookmakerById.matchRates = {
          ...state.bookmakerById.matchRates,
          yesRateComplete: redisObject[action.payload.teamArateRedisKey],
          noRateComplete: redisObject[action.payload.teamBrateRedisKey],
        };
      } else {
        state.bookmakerById.matchRates = {
          ...state.bookmakerById.matchRates,
          teamARate: redisObject[action.payload.teamArateRedisKey],
          teamBRate: redisObject[action.payload.teamBrateRedisKey],
          teamCRate: redisObject[action.payload.teamCrateRedisKey],
        };
      }
    })
    .addCase(updateProLossSession.fulfilled, (state, action) => {
      const { profitLoss } = action.payload;
      state.sessionProfitLoss = profitLoss;
    });
});
