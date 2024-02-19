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
  updateSessionAdded,
} from "../../actions/addMatch/addMatchAction";
import { updateApiSessionById } from "../../actions/addSession";
import { updateTeamRates } from "../../actions/match/matchAction";

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
        state.matchDetail = null;
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
          apiTideMatch: { ...state.matchDetail?.apiTideMatch, ...apiTiedMatch },
          bookmaker: { ...state.matchDetail?.bookmaker, ...bookmaker },
          marketCompleteMatch: {
            ...state.matchDetail?.marketCompleteMatch,
            ...marketCompleteMatch,
          },
          matchOdd: { ...state.matchDetail?.matchOdd, ...matchOdd },
          sessionBettings: state.matchDetail?.sessionBettings?.map(
            (item: any) => {
              const parsedItem = JSON.parse(item);
              let id = parsedItem?.id;

              const matchingApiSession = apiSession?.find(
                (sessionItem: any) => sessionItem.id === id
              );

              if (matchingApiSession) {
                return JSON.stringify({
                  ...parsedItem,
                  noRate: matchingApiSession.LayPrice1,
                  noPercent: matchingApiSession.LaySize1,
                  yesRate: matchingApiSession.BackPrice1,
                  yesPercent: matchingApiSession.BackSize1,
                  activeStatus: "live",
                  status: matchingApiSession.GameStatus,
                });
              } else {
                return JSON.stringify({
                  ...parsedItem,
                  noRate: 0,
                  yesRate: 0,
                  yesPercent: 0,
                  noPercent: 0,
                  // status: matchingApiSession.GameStatus,
                  activeStatus:
                    parsedItem.activeStatus === "live"
                      ? "save"
                      : parsedItem.activeStatus,
                });
              }
            }
          ),
        };
      })
      .addCase(updateApiSessionById.fulfilled, (state, action) => {
        state.matchDetail = {
          ...state.matchDetail,
          sessionBettings: state.matchDetail.sessionBettings.map(
            (item: any) => {
              const parsedItem = JSON.parse(item);
              let id = parsedItem?.id;
              if (id === action.payload.betId) {
                return JSON.stringify({
                  ...parsedItem,
                  activeStatus: action.payload.activeStatus,
                  result: action.payload.score ? action.payload.score : null,
                });
              } else return item;
            }
          ),
        };
      })
      .addCase(updateSessionAdded.fulfilled, (state, action) => {
        state.matchDetail.sessionBettings.push(JSON.stringify(action.payload));
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
      })
      .addCase(updateTeamRates.fulfilled, (state, action) => {
        const { userRedisObj, jobData } = action.payload;
        if (["tiedMatch2", "tiedMatch"].includes(jobData?.newBet?.marketType)) {
          state.matchDetail.teamRates = {
            ...state.matchDetail.teamRates,
            yesRateTie: userRedisObj[jobData?.teamArateRedisKey],
            noRateTie: userRedisObj[jobData?.teamBrateRedisKey],
          };
        } else if (["completeMatch"].includes(jobData?.newBet?.marketType)) {
          state.matchDetail.teamRates = {
            ...state.matchDetail.teamRates,
            yesRateComplete: userRedisObj[jobData?.teamArateRedisKey],
            noRateComplete: userRedisObj[jobData?.teamBrateRedisKey],
          };
        } else {
          state.matchDetail.teamRates = {
            ...state.matchDetail.teamRates,
            teamARate: userRedisObj[jobData?.teamArateRedisKey],
            teamBRate: userRedisObj[jobData?.teamBrateRedisKey],
            teamCRate: userRedisObj[jobData?.teamCrateRedisKey] ?? "",
          };
        }
      });
  },
});

export const addMatchReducers = addMatch.reducer;
