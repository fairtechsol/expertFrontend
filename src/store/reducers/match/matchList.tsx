import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";
import { updateRaceRates } from "../../actions/addMatch/addMatchAction";
import { resetPlacedBetsMatch } from "../../actions/addSession";
import {
  addStatusBetByBetId,
  betLiveStatus,
  editMatch,
  editRace,
  editSuccessReset,
  getCountryCode,
  getMatchList,
  getMatchListDropdown,
  getMatchListSessionProfitLoss,
  getPlacedBetsForSessionDetail,
  getPlacedBetsMatch,
  getRaceList,
  getRaceMatch,
  getSessionProfitLossAfterDeclare,
  getSessionProfitLossBets,
  getTabList,
  matchListReset,
  noResultDeclare,
  raceLiveStatus,
  resetContryCodeList,
  resetMatchListDropdown,
  resetMatchListSessionProLoss,
  resetRaceEdit,
  resetRaceList,
  resetSuccessObject,
  resultDeclare,
  sessionBetLiveStatus,
  sessionResultSuccessReset,
  setSelectedTabForMatchList,
  undeclareResult,
  updateDeletedBetReasonOnEdit,
  updateMatchActiveStatus,
  updateMatchBetsPlace,
  updateMatchBetsReason,
  updateMatchListCurrentPage,
  updateResultStatusOfrace,
  updateSessionBetsPlace,
  updateTeamRatesForHorseRacing,
  updateTeamRatesForHorseRacingOnDelete,
} from "../../actions/match/matchAction";

interface InitialState {
  matchList: any;
  tabList: any;
  matchListDropdown: any;
  matchListCurrentPage: number;
  success: boolean;
  editSuccess: boolean;
  editRaceSuccess: boolean;
  placedBetsMatch: any;
  loading: boolean;
  error: any;
  declareLoading: boolean;
  dropDownLoading: boolean;
  statusBetLive: boolean;
  sessionProLoss: any;
  countryCode: any;
  raceList: any;
  raceDetail: any;
  selectedTab: number;
  sessionPL: any;
  sessionPLBets: any;
  successStatusForSessionDetail: any;
}

const initialState: InitialState = {
  matchList: [],
  tabList: [],
  matchListDropdown: [],
  matchListCurrentPage: 1,
  loading: false,
  success: false,
  dropDownLoading: false,
  editSuccess: false,
  editRaceSuccess: false,
  statusBetLive: false,
  error: null,
  declareLoading: false,
  placedBetsMatch: [],
  sessionProLoss: [],
  countryCode: [],
  raceList: [],
  raceDetail: null,
  selectedTab: 0,
  sessionPL: null,
  sessionPLBets: null,
  successStatusForSessionDetail: {},
};

const matchList = createSlice({
  name: "matchList",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMatchList.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(getMatchList.fulfilled, (state, action) => {
        state.matchList = action.payload;
        state.loading = false;
        state.success = true;
      })
      .addCase(getMatchList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message;
      })
      .addCase(getTabList.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(getTabList.fulfilled, (state, action) => {
        state.tabList = action.payload;
        state.loading = false;
        state.success = true;
      })
      .addCase(getTabList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message;
      })
      .addCase(getMatchListDropdown.pending, (state) => {
        state.dropDownLoading = true;
        state.matchListDropdown = [];
        state.success = false;
        state.error = null;
      })
      .addCase(getMatchListDropdown.fulfilled, (state, action) => {
        state.matchListDropdown = action.payload;
        state.dropDownLoading = false;
        state.success = true;
      })
      .addCase(getMatchListDropdown.rejected, (state, action) => {
        state.dropDownLoading = false;
        state.error = action.error?.message;
      })
      .addCase(resetMatchListDropdown, (state) => {
        state.matchListDropdown = [];
      })
      .addCase(updateMatchActiveStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateMatchActiveStatus.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateMatchActiveStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message;
      })
      .addCase(betLiveStatus.pending, (state) => {
        state.loading = true;
        state.statusBetLive = false;
        state.error = null;
      })
      .addCase(betLiveStatus.fulfilled, (state) => {
        state.statusBetLive = true;
        state.loading = false;
      })
      .addCase(betLiveStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message;
      })
      .addCase(sessionBetLiveStatus.pending, (state) => {
        state.loading = true;
        state.statusBetLive = false;
        state.error = null;
      })
      .addCase(sessionBetLiveStatus.fulfilled, (state) => {
        state.statusBetLive = true;
        state.loading = false;
      })
      .addCase(sessionBetLiveStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message;
      })
      .addCase(resultDeclare.pending, (state) => {
        state.declareLoading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(resultDeclare.fulfilled, (state, action) => {
        state.success = true;
        state.declareLoading = false;
        state.successStatusForSessionDetail = {
          success: true,
          betId: action.payload?.betId,
        };
      })
      .addCase(resultDeclare.rejected, (state, action) => {
        state.declareLoading = false;
        state.error = action.error?.message;
      })
      .addCase(undeclareResult.pending, (state) => {
        state.declareLoading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(undeclareResult.fulfilled, (state, action) => {
        state.success = true;
        state.declareLoading = false;
        state.successStatusForSessionDetail = {
          success: true,
          betId: action.payload?.betId,
        };
      })
      .addCase(undeclareResult.rejected, (state, action) => {
        state.declareLoading = false;
        state.error = action.error?.message;
      })
      .addCase(noResultDeclare.pending, (state) => {
        state.declareLoading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(noResultDeclare.fulfilled, (state, action) => {
        state.success = true;
        state.declareLoading = false;
        state.successStatusForSessionDetail = {
          success: true,
          betId: action.payload?.betId,
        };
      })
      .addCase(noResultDeclare.rejected, (state, action) => {
        state.declareLoading = false;
        state.error = action.error?.message;
      })
      .addCase(resetSuccessObject, (state) => {
        state.successStatusForSessionDetail = {};
      })
      .addCase(editMatch.pending, (state) => {
        state.loading = true;
        state.editSuccess = false;
        state.error = null;
      })
      .addCase(editMatch.fulfilled, (state) => {
        state.loading = false;
        state.editSuccess = true;
      })
      .addCase(editMatch.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message;
      })
      .addCase(getPlacedBetsMatch.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(getPlacedBetsMatch.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.placedBetsMatch = action.payload;
      })
      .addCase(getPlacedBetsMatch.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message;
      })
      .addCase(addStatusBetByBetId.fulfilled, (state, action) => {
        const { betId, activeStatus } = action.payload;
        state.loading = false;
        state.success = true;

        state.placedBetsMatch = _.map(state.placedBetsMatch, (item) =>
          item.betId === betId
            ? { ...item, result: activeStatus === "result" ? "WIN" : "" }
            : item
        );
      })
      .addCase(getPlacedBetsForSessionDetail.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(getPlacedBetsForSessionDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.placedBetsMatch = action.payload;
      })
      .addCase(getPlacedBetsForSessionDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message;
      })
      .addCase(getSessionProfitLossAfterDeclare.pending, (state) => {
        state.loading = true;
        state.sessionPL = null;
        state.error = null;
      })
      .addCase(getSessionProfitLossAfterDeclare.fulfilled, (state, action) => {
        state.loading = false;
        state.sessionPL = action.payload;
      })
      .addCase(getSessionProfitLossAfterDeclare.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message;
      })
      .addCase(getSessionProfitLossBets.pending, (state) => {
        state.loading = true;
        state.sessionPLBets = null;
        state.error = null;
      })
      .addCase(getSessionProfitLossBets.fulfilled, (state, action) => {
        state.loading = false;
        state.sessionPLBets = action.payload;
      })
      .addCase(getSessionProfitLossBets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message;
      })
      .addCase(updateMatchBetsReason.fulfilled, (state, action) => {
        const { betPlacedId, deleteReason, isPermanentDelete } = action.payload;

        if (isPermanentDelete) {
          state.placedBetsMatch = _.filter(
            state.placedBetsMatch,
            (item) => !betPlacedId?.includes(item?.id)
          );
        } else {
          state.placedBetsMatch = _.map(state.placedBetsMatch, (bet) => {
            if (betPlacedId?.includes(bet?.id)) {
              return { ...bet, deleteReason };
            }
            return bet;
          });
        }
      })
      .addCase(updateDeletedBetReasonOnEdit.fulfilled, (state, action) => {
        const { betIds, deleteReason } = action.payload;

        state.placedBetsMatch = _.map(state.placedBetsMatch, (bet) =>
          betIds?.includes(bet?.id) ? { ...bet, deleteReason } : bet
        );
      })
      .addCase(getMatchListSessionProfitLoss.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(getMatchListSessionProfitLoss.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.sessionProLoss = action.payload;
      })
      .addCase(getMatchListSessionProfitLoss.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message;
      })
      .addCase(updateMatchBetsPlace.fulfilled, (state, action) => {
        const { jobData } = action.payload;
        const newBet = jobData?.newBet;
        const betId = newBet?.betId;

        state.placedBetsMatch = state.placedBetsMatch || [];

        const isAlreadyPlaced = _.some(state.placedBetsMatch, { id: betId });

        if (newBet && !isAlreadyPlaced) {
          const betToAdd = {
            ...newBet,
            user: { userName: jobData?.userName },
            myStake: jobData?.myStake || 0,
            domain: jobData?.domainUrl,
          };

          state.placedBetsMatch.unshift(betToAdd);
        }
      })
      .addCase(updateSessionBetsPlace.fulfilled, (state, action) => {
        const { jobData } = action.payload;
        const newBetId = jobData?.newBet?.betId;
        const placedBet = jobData?.placedBet;

        state.placedBetsMatch = state.placedBetsMatch || [];

        const isAlreadyPlaced = _.some(state.placedBetsMatch, { id: newBetId });

        if (placedBet && !isAlreadyPlaced) {
          const { betPlacedData } = jobData?.betPlaceObject || {};
          const partnership = JSON.parse(jobData?.partnership || "{}");

          const betToAdd = {
            ...placedBet,
            user: {
              userName: betPlacedData?.userName,
              fwPartnership: partnership?.fwPartnership,
              faPartnership: partnership?.faPartnership,
            },
            myStake: parseFloat(jobData?.betPlaceObject?.myStack || "0"),
            domain: jobData?.domainUrl,
          };

          state.placedBetsMatch.unshift(betToAdd);
        }
      })
      .addCase(editSuccessReset, (state) => {
        state.editSuccess = false;
      })
      .addCase(sessionResultSuccessReset, (state) => {
        state.success = false;
      })
      .addCase(matchListReset, (state) => {
        state.success = false;
      })
      .addCase(resetMatchListSessionProLoss, (state) => {
        state.success = false;
        state.sessionProLoss = [];
      })
      .addCase(getCountryCode.pending, (state) => {
        state.loading = true;
        state.countryCode = [];
        state.error = null;
      })
      .addCase(getCountryCode.fulfilled, (state, action) => {
        state.loading = false;
        state.countryCode = action.payload;
      })
      .addCase(getCountryCode.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message;
      })
      .addCase(getRaceList.pending, (state) => {
        state.loading = true;
        state.raceList = [];
        state.error = null;
      })
      .addCase(getRaceList.fulfilled, (state, action) => {
        state.loading = false;
        state.raceList = action.payload;
      })
      .addCase(getRaceList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message;
      })
      .addCase(getRaceMatch.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(getRaceMatch.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.raceDetail = action.payload;
      })
      .addCase(getRaceMatch.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message;
      })
      .addCase(updateRaceRates.fulfilled, (state, action) => {
        const { matchOdd } = action.payload;
        state.raceDetail = {
          ...state.raceDetail,
          matchOdd: {
            ...state.raceDetail.matchOdd,
            ...matchOdd,
            runners: state?.raceDetail?.matchOdd?.runners?.map((item: any) => {
              const runnersData = matchOdd?.runners?.find(
                (items: any) => items?.selectionId == item?.selectionId
              );
              return {
                ...item,
                ...runnersData,
              };
            }),
          },
        };
      })
      .addCase(raceLiveStatus.pending, (state) => {
        state.loading = true;
        state.statusBetLive = false;
        state.error = null;
      })
      .addCase(raceLiveStatus.fulfilled, (state) => {
        state.statusBetLive = true;
        state.loading = false;
      })
      .addCase(raceLiveStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message;
      })
      .addCase(updateTeamRatesForHorseRacing.fulfilled, (state, action) => {
        const { userRedisObj } = action.payload;
        state.raceDetail = {
          ...state.raceDetail,
          profitLossDataMatch: userRedisObj,
        };
      })
      .addCase(
        updateTeamRatesForHorseRacingOnDelete.fulfilled,
        (state, action) => {
          const { teamRate } = action.payload;
          state.raceDetail = {
            ...state.raceDetail,
            profitLossDataMatch: teamRate,
          };
        }
      )
      .addCase(updateResultStatusOfrace.fulfilled, (state, action) => {
        const { status, matchId } = action.payload;
        if (state.raceDetail && state.raceDetail.id === matchId) {
          state.raceDetail = {
            ...state.raceDetail,
            resultStatus: status,
          };
        }
      })
      .addCase(editRace.pending, (state) => {
        state.loading = true;
        state.editRaceSuccess = false;
        state.error = null;
      })
      .addCase(editRace.fulfilled, (state) => {
        state.loading = false;
        state.editRaceSuccess = true;
      })
      .addCase(editRace.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message;
      })
      .addCase(resetRaceEdit, (state) => {
        state.loading = false;
        state.editRaceSuccess = false;
      })
      .addCase(resetRaceList, (state) => {
        state.raceList = [];
      })
      .addCase(resetContryCodeList, (state) => {
        state.countryCode = [];
      })
      .addCase(setSelectedTabForMatchList.fulfilled, (state, action) => {
        state.selectedTab = action.payload;
      })
      .addCase(resetPlacedBetsMatch, (state) => {
        state.placedBetsMatch = [];
      })
      .addCase(updateMatchListCurrentPage.fulfilled, (state, action) => {
        state.matchListCurrentPage = action.payload;
      });
  },
});

export const matchListReducers = matchList.reducer;
