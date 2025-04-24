import { createSlice } from "@reduxjs/toolkit";
import {
  convertData,
  updateSessionBettingsItem,
} from "../../../helpers/sessionsHelpers";
import {
  addMatchExpert,
  addMatchReset,
  addRaceExpert,
  editMatchReset,
  eventListReset,
  getAllEventsList,
  getAllLiveTournaments,
  getMatchDetail,
  geTournamentBetting,
  getRaceMatches,
  matchDetailReset,
  matchDetailSuccessReset,
  resetMarketListMinMax,
  runnerDetailReset,
  tournamentListReset,
  updateMarketRates,
  updateMatchRates,
  updateMultiSessionMinMax,
  updateRaceRunners,
  updateRates,
  updateSessionAdded,
  updateTeamRatesOnManualTournamentMarket,
} from "../../actions/addMatch/addMatchAction";
import {
  updateApiSessionById,
  updateResultStatusOfQuickBookmaker,
} from "../../actions/addSession";
import {
  updateMaxLoss,
  updateResultBoxStatus,
  updateResultStatusOfMatch,
  updateResultStatusOfSession,
  updateTeamRates,
  updateTeamRatesOnUndeclare,
} from "../../actions/match/matchAction";

interface InitialState {
  tournamentList: any;
  eventsList: any;
  matchDetail: any;
  selectionIds: any;
  success: boolean;
  matchAdded: boolean;
  loading: boolean;
  error: any;
  raceRunners: any;
  resultBox: any;
  quickBookmaker1: any;
  maxLimitLoading: boolean;
  maxLimitSuccess: boolean;
  tournament: any;
  addedBettingId: any;
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
  raceRunners: [],
  selectionIds: {},
  matchDetail: null,
  loading: false,
  matchAdded: false,
  success: false,
  error: null,
  resultBox: { visible: false, betId: "" },
  quickBookmaker1: [],
  maxLimitLoading: false,
  maxLimitSuccess: false,
  tournament: {},
  addedBettingId: null,
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
        const { matchesList1, matchesList2 } = action.payload ?? {};
        if (!matchesList1 || !matchesList2) return;

        const marketMap = new Map<string, any>();
        matchesList2.forEach((item: any) => {
          if (item.marketId) {
            marketMap.set(item.marketId, item);
          }
        });

        const processedList = matchesList1.map((item1: any) => {
          const matchingItem = item1.MarketId
            ? marketMap.get(item1.MarketId)
            : undefined;

          if (matchingItem) {
            return {
              ...item1,
              runners: matchingItem.runners,
              competitionName: matchingItem.competition?.name ?? null,
              competitionId: matchingItem.competition?.id ?? null,
            };
          }

          const teams = item1.EventName?.split(" v ") ?? [];
          const runners = [0, 1, 2]
            .map((index) => ({
              runnerName: item1.section?.[index]?.nat ?? teams[index] ?? "",
            }))
            .filter((runner) => runner.runnerName);

          return {
            ...item1,
            runners,
            competitionName: null,
            competitionId: null,
          };
        });

        state.eventsList = processedList;
        state.loading = false;
        state.success = true;
      })
      .addCase(getAllLiveTournaments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message;
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
        state.error = action.error?.message;
      })

      .addCase(geTournamentBetting.pending, (state) => {
        state.loading = true;
        state.tournament = {};
        state.error = null;
      })
      .addCase(geTournamentBetting.fulfilled, (state, action) => {
        state.tournament = action.payload;
        state.loading = false;
      })
      .addCase(geTournamentBetting.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message;
      })
      .addCase(
        updateResultStatusOfQuickBookmaker.fulfilled,
        (state, action) => {
          state.tournament.matchBetting["resultStatus"] =
            action.payload?.status;
        }
      )

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
        state.error = action.error?.message;
      })
      .addCase(getMatchDetail.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
        state.matchDetail = null;
      })
      .addCase(getMatchDetail.fulfilled, (state, action) => {
        state.matchDetail = action.payload;
        state.quickBookmaker1 = action.payload?.quickBookmaker;
        state.success = true;
        state.loading = false;

        action.payload?.sessionBettings?.forEach((item: any) => {
          item = JSON.parse(item);
          if (item.selectionId) {
            state.selectionIds[item?.selectionId] = 1;
          }
        });
      })
      .addCase(getMatchDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message;
      })
      .addCase(editMatchReset, (state) => {
        state.success = false;
        state.matchDetail = null;
      })
      .addCase(updateMatchRates.fulfilled, (state, action) => {
        const { apiSession, tournament } = action.payload;

        let updatedFormat = convertData(state?.matchDetail?.sessionBettings);
        let updatedSessionBettings = updateSessionBettingsItem(
          updatedFormat,
          apiSession
        );

        const sortedTournament = [...(tournament || [])].sort(
          (a, b) =>
            a.sno - b.sno ||
            (a.parentBetId === null && b.parentBetId !== null
              ? -1
              : a.parentBetId !== null && b.parentBetId === null
              ? 1
              : 0)
        );

        state.matchDetail = {
          ...state.matchDetail,
          apiSessionActive: !!apiSession,
          apiSession,
          updatedSesssionBettings: updatedSessionBettings,
          tournament: sortedTournament,
        };
      })
      .addCase(updateApiSessionById.fulfilled, (state, action) => {
        try {
          const { betId, score, profitLoss } = action.payload;
          state.matchDetail = {
            ...state.matchDetail,
            sessionBettings: state.matchDetail?.sessionBettings?.map(
              (item: any) => {
                const parsedItem = JSON.parse(item);
                if (parsedItem?.id !== betId) return item;
                return JSON.stringify({
                  ...parsedItem,
                  activeStatus: score ? "result" : "save",
                  result: score ? score : null,
                  resultStatus: null,
                  resultData: score
                    ? {
                        result: score,
                        profitLoss: profitLoss,
                      }
                    : null,
                  isComplete: true,
                });
              }
            ),
          };
        } catch (e) {
          console.log(e);
        }
      })
      .addCase(updateSessionAdded.fulfilled, (state, action) => {
        if (!action.payload || !state.matchDetail) return;

        const newSessionBetting = JSON.stringify(action.payload);
        const sessionBettings = (state.matchDetail.sessionBettings ??= []);

        const existingIds = new Set(
          sessionBettings
            .map((item: any) => {
              try {
                return JSON.parse(item)?.id;
              } catch {
                return undefined;
              }
            })
            .filter(Boolean)
        );

        const newId = JSON.parse(newSessionBetting)?.id;

        if (newId && !existingIds.has(newId)) {
          sessionBettings.unshift(newSessionBetting);
        }
      })
      .addCase(tournamentListReset, (state) => {
        return {
          ...state,
          tournamentList: [
            {
              EventName: "No Tournaments Available",
              label: "No Tournaments Available",
              option: "No Tournaments Available",
            },
          ],
          eventsList: [
            {
              EventName: "No Matches Available",
              label: "No Matches Available",
              option: "No Matches Available",
            },
          ],
          extraMarketList: [],
        };
      })
      .addCase(eventListReset, (state) => {
        state.eventsList = [
          {
            EventName: "No Matches Available",
          },
        ];
      })
      .addCase(matchDetailReset, (state) => {
        state.matchDetail = null;
      })
      .addCase(runnerDetailReset, (state) => {
        state.raceRunners = [];
      })
      .addCase(matchDetailSuccessReset, (state) => {
        state.success = false;
      })
      .addCase(addMatchReset, (state) => {
        state.matchAdded = false;
      })
      .addCase(
        updateTeamRatesOnManualTournamentMarket.fulfilled,
        (state, action) => {
          const { userRedisObj } = action.payload;
          state.tournament.teamRates = userRedisObj;
        }
      )
      .addCase(updateMaxLoss.fulfilled, (state, action) => {
        const { id, maxLoss, totalBet, profitLoss } = action.payload;
        state.matchDetail = {
          ...state.matchDetail,
          sessionProfitLoss: {
            ...state.matchDetail?.sessionProfitLoss,
            [id]: {
              maxLoss,
              totalBet,
              profitLoss,
            },
          },
        };
      })
      .addCase(updateTeamRates.fulfilled, (state, action) => {
        const { userRedisObj, jobData } = action.payload;
        state.matchDetail.teamRates = {
          ...state.matchDetail.teamRates,
          [jobData?.newBet?.betId +
          "_" +
          "profitLoss" +
          "_" +
          state.matchDetail?.id]: JSON.stringify(userRedisObj),
        };
      })
      .addCase(updateTeamRatesOnUndeclare.fulfilled, (state, action) => {
        const { betId, profitLossData } = action.payload;
        state.matchDetail.teamRates = {
          ...state.matchDetail.teamRates,
          [betId + "_" + "profitLoss" + "_" + state.matchDetail?.id]:
            profitLossData,
        };
      })
      .addCase(updateRates.fulfilled, (state, action) => {
        const { betId, teamRate } = action.payload;

        state.matchDetail.teamRates = {
          ...state.matchDetail.teamRates,
          [betId + "_" + "profitLoss" + "_" + state.matchDetail?.id]:
            JSON.stringify(teamRate),
        };
      })
      .addCase(updateResultStatusOfSession.fulfilled, (state, action) => {
        const { betId, status, userId, loggedUserId } = action.payload;
        const updatedSessionBetting = state.matchDetail?.sessionBettings?.map(
          (item: any) => {
            let parsedItem = JSON.parse(item);
            if (parsedItem?.id !== betId) return item;
            return JSON.stringify({
              ...parsedItem,
              resultStatus: status,
              selfDeclare: status === "" ? false : userId === loggedUserId,
            });
          }
        );
        state.matchDetail = {
          ...state.matchDetail,
          sessionBettings: updatedSessionBetting,
        };
      })
      .addCase(updateResultStatusOfMatch.fulfilled, (state, action) => {
        const { status, betId, activeStatus } = action.payload;

        state.matchDetail = {
          ...state.matchDetail,
          otherBettings: {
            ...state.matchDetail?.otherBettings,
            [betId]: activeStatus === "result" ? "DECLARED" : status ?? null,
          },
        };
      })
      .addCase(getRaceMatches.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(getRaceMatches.fulfilled, (state, action) => {
        state.eventsList = action.payload;
        state.loading = false;
        state.success = true;
      })
      .addCase(getRaceMatches.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message;
      })
      .addCase(updateRaceRunners.fulfilled, (state, action) => {
        state.raceRunners = action.payload;
      })
      .addCase(addRaceExpert.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(addRaceExpert.fulfilled, (state) => {
        state.matchAdded = true;
        state.loading = false;
      })
      .addCase(addRaceExpert.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message;
      })
      .addCase(updateResultBoxStatus.fulfilled, (state, action) => {
        state.resultBox = action.payload;
        state.loading = false;
        state.success = true;
      })
      .addCase(updateMultiSessionMinMax.fulfilled, (state, action) => {
        const { type, minBet, maxBet, exposureLimit } = action.payload;
        state.matchDetail = {
          ...state.matchDetail,
          sessionMaxBets: {
            ...state.matchDetail.sessionMaxBets,
            [type]: maxBet,
            [type + "_minBet"]: minBet,
            [type + "_exposureLimit"]: exposureLimit,
          },
        };
      })
      .addCase(updateMarketRates.pending, (state) => {
        state.maxLimitLoading = true;
        state.addedBettingId = null;
      })
      .addCase(updateMarketRates.fulfilled, (state, action) => {
        state.maxLimitLoading = false;
        state.maxLimitSuccess = true;
        state.addedBettingId = action.payload?.id;
      })
      .addCase(updateMarketRates.rejected, (state) => {
        state.maxLimitLoading = false;
        state.addedBettingId = null;
      })
      .addCase(resetMarketListMinMax, (state) => {
        state.maxLimitSuccess = false;
        state.addedBettingId = null;
      });
  },
});

export const addMatchReducers = addMatch.reducer;
