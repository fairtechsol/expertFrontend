import { createSlice } from "@reduxjs/toolkit";
import {
  addMatchExpert,
  addMatchReset,
  editMatchReset,
  eventListReset,
  getAllEventsList,
  getAllLiveTournaments,
  getExtraMarketList,
  getMatchDetail,
  matchDetailReset,
  tournamentListReset,
  updateMatchBettingStatus,
  updateMatchRates,
} from "../../actions/addMatch/addMatchAction";

interface InitialState {
  tournamentList: any;
  eventsList: any;
  extraMarketList: any;
  matchDetail: any;
  success: boolean;
  matchAdded: boolean;
  loading: boolean;
  error: any;
}

const initialState: InitialState = {
  tournamentList: [
    {
      EventName: "No Tournaments Available",
    },
  ],
  eventsList: [
    {
      EventName: "No Matches Available",
    },
  ],
  extraMarketList: [],
  matchDetail: null,
  loading: false,
  matchAdded: false,
  success: false,
  error: null,
};

const addMatch = createSlice({
  name: "addMatch",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    ``;
    builder
      .addCase(getAllLiveTournaments.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(getAllLiveTournaments.fulfilled, (state, action) => {
        state.tournamentList = action.payload;
        state.loading = false;
        state.success = true;
      })
      .addCase(getAllLiveTournaments.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      })
      .addCase(getAllEventsList.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(getAllEventsList.fulfilled, (state, action) => {
        state.eventsList = action.payload;
        state.loading = false;
        state.success = true;
      })
      .addCase(getAllEventsList.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      })
      .addCase(getExtraMarketList.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(getExtraMarketList.fulfilled, (state, action) => {
        state.extraMarketList = action.payload;
        state.loading = false;
        state.success = true;
      })
      .addCase(getExtraMarketList.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      })
      .addCase(addMatchExpert.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(addMatchExpert.fulfilled, (state) => {
        state.matchAdded = true;
        state.loading = false;
      })
      .addCase(addMatchExpert.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      })
      .addCase(getMatchDetail.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(getMatchDetail.fulfilled, (state, action) => {
        state.matchDetail = action.payload;
        state.success = true;
        state.loading = false;
      })
      .addCase(getMatchDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      })
      .addCase(editMatchReset, (state) => {
        return { ...state, success: false, matchDetail: null };
      })
      .addCase(updateMatchRates.fulfilled, (state, action) => {
        const {
          apiSession,
          apiTiedMatch,
          bookmaker,
          marketCompleteMatch,
          matchOdd,
        } = action.payload;
        state.matchDetail = {
          ...state.matchDetail,
          apiSession: apiSession,
          apiTideMatch: { ...state.matchDetail.apiTideMatch, ...apiTiedMatch },
          bookmaker: { ...state.matchDetail.bookmaker, ...bookmaker },
          marketCompleteMatch: {
            ...state.matchDetail.marketCompleteMatch,
            ...marketCompleteMatch,
          },
          matchOdd: { ...state.matchDetail.matchOdd, ...matchOdd },
        };
      })
      .addCase(updateMatchBettingStatus.fulfilled, (state, action) => {
        let matchingObjectKey = Object.keys(state?.matchDetail).find(
          (key) => state?.matchDetail[key].type === action.payload.type
        );
        if (matchingObjectKey) {
          state.matchDetail[matchingObjectKey] = action.payload;
        }
      })
      .addCase(tournamentListReset, (state) => {
        return {
          ...state,
          tournamentList: [
            {
              EventName: "No Tournaments Available",
            },
          ],
          eventsList: [
            {
              EventName: "No Matches Available",
            },
          ],
          extraMarketList: [],
        };
      })
      .addCase(eventListReset, (state) => {
        return {
          ...state,
          eventsList: [
            {
              EventName: "No Matches Available",
            },
          ],
          extraMarketList: [],
        };
      })
      .addCase(matchDetailReset, (state) => {
        return {
          ...state,
          success: false,
        };
      })
      .addCase(addMatchReset, (state) => {
        return {
          ...state,
          matchAdded: false,
        };
      });
  },
});

export const addMatchReducers = addMatch.reducer;
