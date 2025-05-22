import { createReducer } from "@reduxjs/toolkit";
import _ from "lodash";
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
      state.sessionById = action.payload;
      state.selectedSessionId = action.payload?.id;
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
    .addCase(getPlacedBets.pending, (state) => {
      state.loading = true;
      state.success = false;
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
      const { betPlacedId, deleteReason, isPermanentDelete } = action.payload;
      const betIdsSet = new Set(betPlacedId);
      const currentBets = _.defaultTo(state.placedBets, []);

      state.placedBets = isPermanentDelete
        ? _.reject(currentBets, (bet) => betIdsSet.has(bet.id))
        : _.map(currentBets, (bet) =>
            betIdsSet.has(bet.id) ? _.assign({}, bet, { deleteReason }) : bet
          );
    })
    .addCase(updateDeleteReasonOnEdit.fulfilled, (state, action) => {
      const { betIds, deleteReason } = action.payload;
      const betIdSet = new Set(betIds);

      state.placedBets = _.map(state.placedBets || [], (bet) =>
        betIdSet.has(bet.id) ? _.assign({}, bet, { deleteReason }) : bet
      );
    })
    .addCase(updateBetsPlaced.fulfilled, (state, action) => {
      const { partnership, placedBet, betPlaceObject, domainUrl } =
        action.payload;

      const objToUpdate = {
        ...placedBet,
        myStake: +(betPlaceObject?.myStake || 0),
        user: {
          userName: betPlaceObject?.betPlacedData?.userName || "",
          fwPartnership: Number(JSON.parse(partnership).fwPartnership || 0),
        },
        domain: domainUrl,
        id: placedBet.id,
      };

      if (state.placedBets.some((bet: any) => bet.id === objToUpdate.id))
        return;

      state.placedBets = [objToUpdate, ...state.placedBets];
    })
    .addCase(updateMatchBetsPlaced.fulfilled, (state, action) => {
      const { jobData } = action.payload;

      const objToUpdate = _.merge({}, _.get(jobData, "newBet", {}), {
        myStake: _.toNumber(_.get(jobData, "myStake", 0)),
        user: { userName: _.get(jobData, "userName", "") },
        domain: _.get(jobData, "domainUrl", ""),
      });

      if (!_.some(state.placedBets, { id: objToUpdate.id })) {
        state.placedBets = _.unionWith(
          [objToUpdate],
          state.placedBets || [],
          _.isEqual
        );
      }
    })
    .addCase(updateSessionById.fulfilled, (state, action) => {
      const { activeStatus, score, resultStatus } = action.payload;
      state.sessionById = {
        ...state.sessionById,
        activeStatus: activeStatus,
        result: score,
        resultStatus: resultStatus ? resultStatus : null,
      };
    })
    .addCase(updateSessionProfitLoss.fulfilled, (state, action) => {
      state.sessionProfitLoss = action.payload;
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
      const { profitLoss } = action.payload;
      state.sessionProfitLoss = profitLoss;
    })
    .addCase(updateSession.pending, (state) => {
      state.loading = true;
      state.maxLimitUpdateSuccess = false;
    })
    .addCase(updateSession.fulfilled, (state, action) => {
      const { maxBet, id } = action.payload;

      if (id === state.sessionById?.id) {
        state.sessionById.maxBet = maxBet;
      }

      state.loading = false;
      state.maxLimitUpdateSuccess = true;
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
      const updateProps = _.pick(action.payload, [
        "maxBet",
        "minBet",
        "exposureLimit",
        "isCommissionActive",
      ]);

      if (
        _.isMatch(_.get(state, "sessionById", {}), { id: action.payload.id })
      ) {
        _.merge(state.sessionById, updateProps);
        _.assign(state, {
          loading: false,
          maxLimitUpdateSuccess: true,
        });
      }
    })
    .addCase(resetSessionMaxLimitSuccess, (state) => {
      state.maxLimitUpdateSuccess = false;
    })
    .addCase(resetMultiSessionMaxLimitSuccess, (state) => {
      state.multiMaxLimitUpdateSuccess = false;
    })
    .addCase(updateResultStatusOfSessionById.fulfilled, (state, action) => {
      const { status, betId } = action.payload;
      if (betId === state.sessionById?.id) {
        state.sessionById = {
          ...state.sessionById,
          resultStatus: status ? status : null,
        };
      }
    });
});
