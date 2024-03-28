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
  updateExtraMarketListOnEdit,
  updateMatchBettingStatus,
  updateMatchRates,
  updateRates,
  updateSessionAdded,
} from "../../actions/addMatch/addMatchAction";
import { updateApiSessionById } from "../../actions/addSession";
import {
  updateMaxLoss,
  updateTeamRates,
} from "../../actions/match/matchAction";

interface InitialState {
  tournamentList: any;
  eventsList: any;
  extraMarketList: any;
  extraMarketListFootball: any;
  matchDetail: any;
  selectionIds: any;
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
  extraMarketListFootball: [],
  selectionIds: {},
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

        action.payload?.sessionBettings?.forEach((item: any) => {
          item = JSON.parse(item);
          if (item.selectionId) {
            state.selectionIds[item.selectionId] = 1;
          }
        });
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
          firstHalfGoal,
          overUnder,
          halfTime,
        } = action.payload;
        state.matchDetail = {
          ...state.matchDetail,
          apiSession: apiSession?.filter(
            (item: any) => state.selectionIds[item?.SelectionId] == null
          ),
          apiTideMatch: { ...state.matchDetail?.apiTideMatch, ...apiTiedMatch },
          bookmaker: { ...state.matchDetail?.bookmaker, ...bookmaker },
          marketCompleteMatch: {
            ...state.matchDetail?.marketCompleteMatch,
            ...marketCompleteMatch,
          },
          matchOdd: { ...state.matchDetail?.matchOdd, ...matchOdd },
          firstHalfGoal,
          overUnder,
          halfTime,
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
                  noRate: matchingApiSession.LayPrice1 ?? 0,
                  noPercent: matchingApiSession.LaySize1 ?? 0,
                  yesRate: matchingApiSession.BackPrice1 ?? 0,
                  yesPercent: matchingApiSession.BackSize1 ?? 0,
                  activeStatus: matchingApiSession.activeStatus,
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
        try {
          state.matchDetail = {
            ...state.matchDetail,
            sessionBettings: state.matchDetail.sessionBettings.map(
              (item: any) => {
                const parsedItem = JSON.parse(item);
                let id = parsedItem?.id;
                if (id === action.payload.betId) {
                  return JSON.stringify({
                    ...parsedItem,
                    activeStatus: action?.payload?.activeStatus,
                    result: action?.payload?.score
                      ? action?.payload?.score
                      : null,
                    resultData: action?.payload?.score
                      ? {
                          result: action?.payload?.score,
                          profitLoss: action.payload.profitLoss,
                        }
                      : null,
                  });
                } else return item;
              }
            ),
          };
        } catch (e) {
          console.log(e);
        }
      })
      .addCase(updateSessionAdded.fulfilled, (state, action) => {
        const newSessionBetting = JSON.stringify(action.payload);

        const isIdAlreadyPresent = state.matchDetail.sessionBettings.some(
          (existingSession: any) => {
            try {
              const existingId = JSON.parse(existingSession).id;
              const newId = JSON.parse(newSessionBetting).id;
              return existingId === newId;
            } catch (error) {
              return false;
            }
          }
        );

        if (!isIdAlreadyPresent) {
          state.matchDetail.sessionBettings.push(newSessionBetting);
        }
      })
      .addCase(updateMatchBettingStatus.fulfilled, (state, action) => {
        let matchingObjectKey = Object.keys(state?.matchDetail).find(
          (key) => state?.matchDetail[key].type === action.payload.type
        );
        if (matchingObjectKey) {
          state.matchDetail[matchingObjectKey] = {
            ...state.matchDetail[matchingObjectKey],
            activeStatus: action.payload.activeStatus,
          };
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
      .addCase(updateMaxLoss.fulfilled, (state, action) => {
        const { id, maxLoss, totalBet } = action.payload;
        state.matchDetail = {
          ...state.matchDetail,
          sessionProfitLoss: {
            ...state.matchDetail.sessionProfitLoss,
            [id]: {
              maxLoss,
              totalBet,
            },
          },
        };
      })
      .addCase(updateTeamRates.fulfilled, (state, action) => {
        const { userRedisObj, jobData } = action.payload;
        if (
          ["tiedMatch2", "tiedMatch1"].includes(jobData?.newBet?.marketType)
        ) {
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
      })
      .addCase(updateRates.fulfilled, (state, action) => {
        const { redisObject, matchBetType } = action.payload;
        if (["tiedMatch2", "tiedMatch1"].includes(matchBetType)) {
          state.matchDetail.teamRates = {
            ...state.matchDetail.teamRates,
            yesRateTie: redisObject[action.payload.teamArateRedisKey],
            noRateTie: redisObject[action.payload.teamBrateRedisKey],
          };
        } else if (["completeMatch"].includes(matchBetType)) {
          state.matchDetail.teamRates = {
            ...state.matchDetail.teamRates,
            yesRateComplete: redisObject[action.payload.teamArateRedisKey],
            noRateComplete: redisObject[action.payload.teamBrateRedisKey],
          };
        } else {
          state.matchDetail.teamRates = {
            ...state.matchDetail.teamRates,
            teamARate: redisObject[action.payload.teamArateRedisKey],
            teamBRate: redisObject[action.payload.teamBrateRedisKey],
            teamCRate: redisObject[action.payload.teamCrateRedisKey],
          };
        }
      })
      .addCase(updateExtraMarketListOnEdit.fulfilled, (state, action) => {
        state.extraMarketList = action.payload;
      });
  },
});

export const addMatchReducers = addMatch.reducer;
