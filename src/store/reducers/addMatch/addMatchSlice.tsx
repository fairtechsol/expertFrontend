import { createSlice } from "@reduxjs/toolkit";
import {
  addMatchExpert,
  addMatchReset,
  addRaceExpert,
  editMatchReset,
  eventListReset,
  getAllEventsList,
  getAllLiveTournaments,
  getExtraMarketList,
  getMatchDetail,
  getRaceMatches,
  handleBetResultStatus,
  matchDetailReset,
  matchDetailSuccessReset,
  runnerDetailReset,
  tournamentListReset,
  updateExtraMarketListOnEdit,
  updateMatchBettingStatus,
  updateMatchRates,
  updateMatchRatesOnMarketUndeclare,
  updateRaceRunners,
  updateRates,
  updateSessionAdded,
} from "../../actions/addMatch/addMatchAction";
import { updateApiSessionById } from "../../actions/addSession";
import {
  updateMaxLoss,
  updateResultBoxStatus,
  updateResultStatusOfMatch,
  updateResultStatusOfSession,
  updateTeamRates,
} from "../../actions/match/matchAction";
import { getOtherGamesMatchDetail } from "../../actions/otherGamesAction/matchDetailActions";
import { profitLossDataForMatchConstants } from "../../../utils/Constants";
import {
  convertData,
  updateSessionBettingsItem,
} from "../../../helpers/sessionsHelpers";

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
  raceRunners: any;
  resultBox: any;
  quickBookmaker1: any;
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
  extraMarketList: [],
  extraMarketListFootball: [],
  selectionIds: {},
  matchDetail: null,
  loading: false,
  matchAdded: false,
  success: false,
  error: null,
  resultBox: { visible: false, betId: "" },
  quickBookmaker1: [],
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
        const { matchesList1, matchesList2 } = action?.payload;
        matchesList1.forEach((item1: any) => {
          const matchingItem = matchesList2.find(
            (item2: any) => item2.marketId === item1.MarketId
          );
          if (matchingItem) {
            item1.runners = matchingItem.runners;
          } else {
            let teams = item1?.EventName.split(" v ");
            let runners: any = [
              { runnerName: teams[0] },
              { runnerName: teams[1] },
            ];
            item1.runners = runners;
          }
        });
        state.eventsList = matchesList1;
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
        state.eventsList = action?.payload;
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
        state.extraMarketList = action?.payload;
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
        state.matchDetail = action?.payload;
        state.quickBookmaker1 = action?.payload?.quickBookmaker;
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
        state.error = action?.error?.message;
      })
      .addCase(getOtherGamesMatchDetail.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
        state.matchDetail = null;
      })
      .addCase(getOtherGamesMatchDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.matchDetail = action.payload;
        action.payload?.sessionBettings?.forEach((item: any) => {
          item = JSON.parse(item);
          if (item.selectionId) {
            state.selectionIds[item.selectionId] = 1;
          }
        });
      })
      .addCase(getOtherGamesMatchDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      })
      .addCase(editMatchReset, (state) => {
        state.success = false;
        state.matchDetail = null;
      })
      .addCase(updateMatchRates.fulfilled, (state, action) => {
        const {
          apiSession,
          apiTiedMatch,
          apiTiedMatch2,
          bookmaker,
          bookmaker2,
          marketCompleteMatch,
          matchOdd,
          firstHalfGoal,
          overUnder,
          halfTime,
          setWinner,
          manualTideMatch,
          completeManual,
          quickbookmaker,
          other,
          marketCompleteMatch1,
          tournament,
        } = action.payload;

        let parsedSessionBettings = state?.matchDetail?.sessionBettings?.map(
          (item: any) => {
            let parsedItem = JSON.parse(item);
            return parsedItem;
          }
        );

        let updatedFormat = convertData(parsedSessionBettings);

        let updatedSessionBettings = updateSessionBettingsItem(
          updatedFormat,
          apiSession
        );

        state.matchDetail = {
          ...state.matchDetail,
          apiSessionActive: apiSession ? true : false,
          apiSession: apiSession,
          firstHalfGoal,
          overUnder,
          halfTime,
          apiTideMatch: apiTiedMatch,
          apiTiedMatch2: apiTiedMatch2,
          bookmaker,
          marketBookmaker2: bookmaker2,
          marketCompleteMatch,
          marketCompleteMatch1: marketCompleteMatch1,
          matchOdd,
          setWinner,
          manualTideMatch,
          manualCompleteMatch: completeManual,
          quickBookmaker: quickbookmaker,
          updatedSesssionBettings: updatedSessionBettings || {},
          other,
          tournament,
          // sessionBettings: state.matchDetail?.sessionBettings?.map(
          //   (item: any) => {
          //     const parsedItem = JSON.parse(item);
          //     let id = parsedItem?.id;

          //     const matchingApiSession = apiSession?.find(
          //       (sessionItem: any) => sessionItem?.id === id
          //     );

          //     if (matchingApiSession) {
          //       return JSON.stringify({
          //         ...parsedItem,
          //         noRate: matchingApiSession?.LayPrice1 ?? 0,
          //         noPercent: matchingApiSession?.LaySize1 ?? 0,
          //         yesRate: matchingApiSession?.BackPrice1 ?? 0,
          //         yesPercent: matchingApiSession?.BackSize1 ?? 0,
          //         activeStatus: matchingApiSession?.activeStatus,
          //         maxBet: matchingApiSession?.max,
          //         minBet: matchingApiSession?.min,
          //         status: matchingApiSession?.GameStatus,
          //         updatedAt: matchingApiSession?.updatedAt,
          //         isComplete:
          //           (!matchingApiSession?.LayPrice1 &&
          //             !matchingApiSession?.LaySize1 &&
          //             !matchingApiSession?.BackPrice1 &&
          //             !matchingApiSession?.BackSize1) ||
          //           matchingApiSession?.activeStatus !== "live"
          //             ? true
          //             : false,
          //         showSessions: true,
          //       });
          //     } else {
          //       return JSON.stringify({
          //         ...parsedItem,
          //         noRate: 0,
          //         yesRate: 0,
          //         yesPercent: 0,
          //         noPercent: 0,
          //         activeStatus:
          //           parsedItem.activeStatus === "live"
          //             ? "save"
          //             : parsedItem.activeStatus,
          //         isComplete: true,
          //         showSessions: true,
          //       });
          //     }
          //   }
          // ),
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
                if (parsedItem?.id === betId) {
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
                } else return item;
              }
            ),
          };
        } catch (e) {
          console.log(e);
        }
      })
      .addCase(updateSessionAdded.fulfilled, (state, action) => {
        const newSessionBetting = JSON.stringify(action?.payload);

        if (state.matchDetail?.sessionBettings?.length === 0) {
          state.matchDetail?.sessionBettings?.push(newSessionBetting);
        }

        const existingIds = state.matchDetail?.sessionBettings?.map(
          (existingSession: any) => {
            return JSON.parse(existingSession)?.id;
          }
        );

        const newId = JSON.parse(newSessionBetting)?.id;

        if (!existingIds?.includes(newId)) {
          state.matchDetail?.sessionBettings?.unshift(newSessionBetting);
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
        state.eventsList = [
          {
            EventName: "No Matches Available",
          },
        ];
        state.extraMarketList = [];
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
      .addCase(updateMaxLoss.fulfilled, (state, action) => {
        const { id, maxLoss, totalBet, profitLoss } = action?.payload;
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
        // debugger;
        const { userRedisObj, jobData } = action.payload;
        if (jobData?.newBet?.marketType === "other") {
          state.matchDetail.teamRates = {
            ...state.matchDetail.teamRates,
            [profitLossDataForMatchConstants[jobData?.newBet?.marketType].A +
            "_" +
            jobData?.newBet?.betId +
            "_" +
            state.matchDetail?.id]: userRedisObj[jobData?.teamArateRedisKey],
            [profitLossDataForMatchConstants[jobData?.newBet?.marketType].B +
            "_" +
            jobData?.newBet?.betId +
            "_" +
            state.matchDetail?.id]: userRedisObj[jobData?.teamBrateRedisKey],
            [profitLossDataForMatchConstants[jobData?.newBet?.marketType].C +
            "_" +
            jobData?.newBet?.betId +
            "_" +
            state.matchDetail?.id]: userRedisObj[jobData?.teamCrateRedisKey],
          };
        } else
          state.matchDetail.teamRates = {
            ...state.matchDetail.teamRates,
            [profitLossDataForMatchConstants[jobData?.newBet?.marketType].A +
            "_" +
            state.matchDetail?.id]: userRedisObj[jobData?.teamArateRedisKey],
            [profitLossDataForMatchConstants[jobData?.newBet?.marketType].B +
            "_" +
            state.matchDetail?.id]: userRedisObj[jobData?.teamBrateRedisKey],
            [profitLossDataForMatchConstants[jobData?.newBet?.marketType].C +
            "_" +
            state.matchDetail?.id]: userRedisObj[jobData?.teamCrateRedisKey],
          };
      })
      .addCase(updateMatchRatesOnMarketUndeclare.fulfilled, (state, action) => {
        const {
          profitLossData,
          betType,
          teamArateRedisKey,
          teamBrateRedisKey,
          teamCrateRedisKey,
        } = action?.payload;

        state.matchDetail.teamRates = {
          ...state.matchDetail.teamRates,
          [profitLossDataForMatchConstants[betType].A]:
            profitLossData[teamArateRedisKey],
          [profitLossDataForMatchConstants[betType].B]:
            profitLossData[teamBrateRedisKey],
          [profitLossDataForMatchConstants[betType].C]:
            profitLossData[teamCrateRedisKey],
        };
      })
      .addCase(updateRates.fulfilled, (state, action) => {
        const {
          redisObject,
          betId,
          matchBetType,
          teamArateRedisKey,
          teamBrateRedisKey,
          teamCrateRedisKey,
        } = action?.payload;

        if (matchBetType === "other") {
          state.matchDetail.teamRates = {
            ...state.matchDetail.teamRates,
            [profitLossDataForMatchConstants[matchBetType].A +
            "_" +
            betId +
            "_" +
            state.matchDetail?.id]: redisObject[teamArateRedisKey],
            [profitLossDataForMatchConstants[matchBetType].B +
            "_" +
            betId +
            "_" +
            state.matchDetail?.id]: redisObject[teamBrateRedisKey],
            [profitLossDataForMatchConstants[matchBetType].C +
            "_" +
            betId +
            "_" +
            state.matchDetail?.id]: redisObject[teamCrateRedisKey],
          };
        } else
          state.matchDetail.teamRates = {
            ...state.matchDetail.teamRates,
            [profitLossDataForMatchConstants[matchBetType].A +
            "_" +
            state.matchDetail?.id]: redisObject[teamArateRedisKey],
            [profitLossDataForMatchConstants[matchBetType].B +
            "_" +
            state.matchDetail?.id]: redisObject[teamBrateRedisKey],
            [profitLossDataForMatchConstants[matchBetType].C +
            "_" +
            state.matchDetail?.id]: redisObject[teamCrateRedisKey],
          };
      })
      .addCase(updateExtraMarketListOnEdit.fulfilled, (state, action) => {
        state.extraMarketList = action.payload;
      })
      .addCase(updateResultStatusOfSession.fulfilled, (state, action) => {
        const updatedSessionBetting = state.matchDetail?.sessionBettings?.map(
          (item: any) => {
            let parsedItem = JSON.parse(item);
            if (parsedItem?.id === action?.payload?.betId) {
              return JSON.stringify({
                ...parsedItem,
                resultStatus: action?.payload?.status,
                selfDeclare:
                  action?.payload?.status === ""
                    ? false
                    : action?.payload?.userId === action?.payload?.loggedUserId,
              });
            } else return item;
          }
        );
        state.matchDetail = {
          ...state.matchDetail,
          sessionBettings: updatedSessionBetting,
        };
      })
      .addCase(updateResultStatusOfMatch.fulfilled, (state, action) => {
        const { status, betId, betType } = action?.payload;
        const index = state.quickBookmaker1?.findIndex(
          (item: any) => item.type === "quickbookmaker1"
        );

        const isCricketMatch = state.matchDetail?.matchType === "cricket";

        if (
          index !== -1 &&
          isCricketMatch &&
          betId === state.quickBookmaker1?.[index]?.id
        ) {
          state.matchDetail = {
            ...state.matchDetail,
            resultStatus: status ?? null,
          };
        } else {
          if (state.matchDetail?.matchType !== "cricket") {
            state.matchDetail = {
              ...state.matchDetail,
              resultStatus: {
                ...state.matchDetail?.resultStatus,
                [betId]: {
                  ...state.matchDetail?.resultStatus?.[betId],
                  betId,
                  status,
                },
              },
            };
          } else if (
            state.matchDetail?.matchType === "cricket" &&
            betType === "other"
          ) {
            state.matchDetail = {
              ...state.matchDetail,
              otherBettings: {
                ...state.matchDetail?.otherBettings,
                [betId]: status ?? null,
              },
            };
          }
        }
        // const { status, betId } = action?.payload;
        // const index = state.matchDetail?.quickBookmaker?.findIndex(
        //   (item: any) => item.type === "quickbookmaker1"
        // );
        // if (index !== -1) {
        //   if (state.matchDetail?.matchType === "cricket") {
        //     if (betId === state.matchDetail?.quickBookmaker[index]?.id) {
        //       state.matchDetail = {
        //         ...state.matchDetail,
        //         resultStatus: status ? status : null,
        //       };
        //     }
        //   } else {
        //     if (state.matchDetail?.matchType !== "cricket") {
        //       state.matchDetail = {
        //         ...state.matchDetail,
        //         resultStatus: {
        //           ...state.matchDetail?.resultStatus,
        //           [betId]: {
        //             ...state.matchDetail?.resultStatus?.[betId],
        //             betId: betId,
        //             status: status,
        //           },
        //         },
        //       };
        //     }
        //   }
        // } else {
        //   if (state.matchDetail?.matchType !== "cricket") {
        //     state.matchDetail = {
        //       ...state.matchDetail,
        //       resultStatus: {
        //         ...state.matchDetail?.resultStatus,
        //         [betId]: {
        //           ...state.matchDetail?.resultStatus?.[betId],
        //           betId: betId,
        //           status: status,
        //         },
        //       },
        //     };
        //   }
        // }
      })
      .addCase(handleBetResultStatus.fulfilled, (state, action) => {
        const { betId } = action.payload;
        const resultStatusObj = state.matchDetail?.resultStatus;
        if (resultStatusObj && resultStatusObj.hasOwnProperty(betId)) {
          delete resultStatusObj[betId];
        }
      })
      .addCase(getRaceMatches.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(getRaceMatches.fulfilled, (state, action) => {
        state.eventsList = action?.payload;
        state.loading = false;
        state.success = true;
      })
      .addCase(getRaceMatches.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
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
        state.error = action?.error?.message;
      })
      .addCase(updateResultBoxStatus.fulfilled, (state, action) => {
        state.resultBox = action?.payload;
        state.loading = false;
        state.success = true;
      });
  },
});

export const addMatchReducers = addMatch.reducer;
