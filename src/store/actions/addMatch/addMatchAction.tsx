import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import service from "../../../service";
import { ApiConstants, addMatchThirdParty, baseUrls } from "../../../utils/Constants";

export const getAllLiveTournaments = createAsyncThunk<any, string>(
  "addMatch/getAllLiveTournaments",
  async (requestData, thunkApi) => {
    try {
      const { data } = await axios.get(
        `${addMatchThirdParty}/sportsList?type=${requestData}`
      );
      let resp: any;
      if (requestData === "cricket") {
        try {
          resp = await axios.get(
            `${addMatchThirdParty}/getDirectMatchList?type=${requestData}`,
            { timeout: 2000 }
          );
        } catch (error) {
          console.log(error);
        }
      }
      if (data) {
        let matchesList: any = [
          {
            EventName: "No Matches Available",
          },
        ];
        if (data && data.length > 0) {
          let matchesList1: any = [];
          let matchesList2: any = resp?.data || [];
          if (requestData === "cricket") {
            data.forEach((match: any) => {
              let matchList = match?.eventName.split(" / ");
              matchesList1.push({
                EventName: matchList[0],
                EventId: match?.gameId,
                MarketId: match?.marketId,
                EventDate: matchList[1],
                f: match?.f === "True" ? true : false,
                tv: match?.tv === "True" ? true : false,
                m1: match?.m1 === "True" ? true : false,
                section: match?.section,
              });
            });
          } else {
            data.forEach((match: any) => {
              let matchList = match?.ename;
              matchesList1.push({
                EventName: matchList,
                EventId: JSON.stringify(match?.gmid),
                MarketId: JSON.stringify(match?.mid),
                EventDate: match?.stime,
                f: match?.f === "True" ? true : false,
                tv: match?.tv === "True" ? true : false,
                m1: match?.m1 === "True" ? true : false,
                section: match?.section,
              });
            });
          }

          matchesList = { matchesList1, matchesList2 };
        }
        return matchesList;
      }
    } catch (error) {
      const err = error as AxiosError;
      return thunkApi.rejectWithValue(err.response?.status);
    }
  }
);

export const getAllEventsList = createAsyncThunk<any, string>(
  "addMatch/getAllEvents",
  async (requestData, thunkApi) => {
    try {
      const { data } = await axios.get(
        `${addMatchThirdParty}/eventList/${requestData}`
      );
      if (data) {
        let matchesList: any = [
          {
            EventName: "No Matches Available",
          },
        ];
        if (data && data.length > 0) {
          let matchesList1: any = [];
          data.forEach((match: any) => {
            matchesList1.push({
              EventName: match?.event?.name,
              EventId: match?.event?.id,
              MarketId: match?.marketId,
              CompetitionId: match?.competition?.id,
              CompetitionName: match?.competition?.name,
              EventDetail: {
                EventDate: match?.event?.openDate,
                Runners: match?.runners,
                // Runnercount: match?.runners,
              },
            });
          });
          matchesList = matchesList1;
        }
        return matchesList;
      }
    } catch (error) {
      const err = error as AxiosError;
      return thunkApi.rejectWithValue(err.response?.status);
    }
  }
);

export const updateTeamRatesOnManualTournamentMarket = createAsyncThunk<any,any>(
  "update/updateTeamRatesOnManualTournamentMarket",
  async (requestData) => {
    return requestData;
  }
);

export const getExtraMarketList = createAsyncThunk<any, any>(
  "addMatch/extraMarketList",
  async (requestData, thunkApi) => {
    try {
      const {
        data,
      } = await axios.get(
        `${addMatchThirdParty}/extraMarketList/${requestData?.id}?eventType=${requestData?.eventType}`,
        { timeout: 2000 }
      );
      if (data) {
        let extraMarketList: any = {};
        if (requestData?.eventType === "cricket") {
          extraMarketList = {
            matchOdd: {
              marketId: data?.find(
                (match: any) => match?.description?.marketType === "MATCH_ODDS"
              )?.marketId,
            },
            apiTideMatch: {
              marketId: data?.find(
                (match: any) => match?.description?.marketType === "TIED_MATCH"
              )?.marketId,
            },
            marketCompleteMatch: {
              marketId: data?.find(
                (match: any) =>
                  match?.description?.marketType === "COMPLETED_MATCH"
              )?.marketId,
            },
          };
        } else if (requestData?.eventType === "football") {
          extraMarketList = {
            matchOdd: {
              marketId: data?.find(
                (match: any) => match?.description?.marketType === "MATCH_ODDS"
              )?.marketId,
            },
            halfTime: {
              marketId: data?.find(
                (match: any) => match?.description?.marketType === "HALF_TIME"
              )?.marketId,
            },
            ...Array.from({ length: 20 }, (_, index: any) => index).reduce(
              (prev, curr) => {
                prev[`overUnder${curr}.5`] = {
                  marketId: data?.find(
                    (match: any) =>
                      match?.description?.marketType === `OVER_UNDER_${curr}5`
                  )?.marketId,
                };
                return prev;
              },
              {}
            ),
            ...Array.from({ length: 20 }, (_, index: any) => index).reduce(
              (prev, curr) => {
                prev[`firstHalfGoal${curr}.5`] = {
                  marketId: data?.find(
                    (match: any) =>
                      match?.description?.marketType ===
                      `FIRST_HALF_GOALS_${curr}5`
                  )?.marketId,
                };
                return prev;
              },
              {}
            ),
          };
        } else if (requestData?.eventType === "tennis") {
          extraMarketList = {
            matchOdd: {
              marketId: requestData?.matchOddId,
            },
            ...Array.from({ length: 20 }, (_, index: any) => index).reduce(
              (prev, curr) => {
                prev[`setWinner${curr}`] = {
                  marketId: data?.find(
                    (match: any) =>
                      match?.description?.marketType === `SET_WINNER` &&
                      match?.marketName === `Set ${curr} Winner`
                  )?.marketId,
                };
                return prev;
              },
              {}
            ),
          };
        }
        // let extraMarketList: any = {
        //   matchOdd: {
        //     marketId: data?.find(
        //       (match: any) => match?.description?.marketType === "MATCH_ODDS"
        //     )?.marketId,
        //   },
        //   apiTideMatch: {
        //     marketId: data?.find(
        //       (match: any) => match?.description?.marketType === "TIED_MATCH"
        //     )?.marketId,
        //   },
        //   marketCompleteMatch: {
        //     marketId: data?.find(
        //       (match: any) =>
        //         match?.description?.marketType === "COMPLETED_MATCH"
        //     )?.marketId,
        //   },
        //   ...Array.from({ length: 20 }, (_, index: any) => index).reduce(
        //     (prev, curr) => {
        //       prev[`setWinner${curr}`] = {
        //         marketId: data?.find(
        //           (match: any) =>
        //             match?.description?.marketType === `SET_WINNER` && match?.marketName === `Set ${curr} Winner`
        //         )?.marketId,
        //       };
        //       return prev;
        //     },
        //     {}
        //   ),
        //   ...Array.from({ length: 20 }, (_, index: any) => index).reduce(
        //     (prev, curr) => {
        //       prev[`overUnder${curr}.5`] = {
        //         marketId: data?.find(
        //           (match: any) =>
        //             match?.description?.marketType === `OVER_UNDER_${curr}5`
        //         )?.marketId,
        //       };
        //       return prev;
        //     },
        //     {}
        //   ),
        //   ...Array.from({ length: 20 }, (_, index: any) => index).reduce(
        //     (prev, curr) => {
        //       prev[`firstHalfGoal${curr}.5`] = {
        //         marketId: data?.find(
        //           (match: any) =>
        //             match?.description?.marketType ===
        //             `FIRST_HALF_GOALS_${curr}5`
        //         )?.marketId,
        //       };
        //       return prev;
        //     },
        //     {}
        //   ),
        //   halfTime: {
        //     marketId: data?.find(
        //       (match: any) => match?.description?.marketType === "HALF_TIME"
        //     )?.marketId,
        //   },
        // };
        return extraMarketList;
      }
    } catch (error) {
      const err = error as AxiosError;
      return thunkApi.rejectWithValue(err.response?.status);
    }
  }
);

export const updateExtraMarketListOnEdit = createAsyncThunk<any, any>(
  "UpdateExtraMarketListOnEdit",
  async (requestData) => {
    return requestData;
  }
);

export const updateRaceRunners = createAsyncThunk<any, any>(
  "updateRaceRunners",
  async (requestData) => {
    return requestData;
  }
);

export const addMatchExpert = createAsyncThunk<any, any>(
  "addMatchExpert",
  async (requestData, thunkApi) => {
    try {
      const resp = await service.post(`${ApiConstants.MATCH.ADD}`, requestData);
      if (resp) {
        return resp?.data;
      }
    } catch (error) {
      const err = error as AxiosError;
      return thunkApi.rejectWithValue(err.response?.status);
    }
  }
);

export const geTournamentBetting = createAsyncThunk<any, any>(
  "getTournamentBetting",
  async ({ matchId, betId }, thunkApi) => {
    try {
      const resp = await service.get(
        `${ApiConstants.MATCH.GET_TOURNAMENT}${matchId}?id=${betId}&isRate=true`
      );
      if (resp) {
        return resp?.data;
      }
    } catch (error) {
      const err = error as AxiosError;
      return thunkApi.rejectWithValue(err.response?.status);
    }
  }
);

export const addRaceExpert = createAsyncThunk<any, any>(
  "addRaceExpert",
  async (requestData, thunkApi) => {
    try {
      const resp = await service.post(
        `${ApiConstants.MATCH.ADD_RACE}`,
        requestData
      );
      if (resp) {
        return resp?.data;
      }
    } catch (error) {
      const err = error as AxiosError;
      return thunkApi.rejectWithValue(err.response?.status);
    }
  }
);
export const getMatchDetail = createAsyncThunk<any, any>(
  "getMatchDetail",
  async (requestData, thunkApi) => {
    try {
      const resp = await service.get(
        `${ApiConstants.MATCH.GETDETAIL}/${requestData}`
      );
      if (resp) {
        let sessionBetting = resp?.data?.sessionBettings;
        const updatedData = sessionBetting?.map((item: any) => {
          const parsedItem = JSON.parse(item);

          if (
            parsedItem.selectionId &&
            parsedItem.yesPercent === 0 &&
            parsedItem.noPercent === 0
          ) {
            parsedItem.yesRate = 0;
            parsedItem.noRate = 0;
          }

          return JSON.stringify(parsedItem);
        });
        return {
          ...resp?.data,
          sessionBettings: updatedData,
        };
      }
    } catch (error) {
      const err = error as AxiosError;
      return thunkApi.rejectWithValue(err.response?.status);
    }
  }
);

export const updateMatchRates = createAsyncThunk<any, any>(
  "/match/rates",
  async (matchDetails) => {
    return matchDetails;
  }
);

export const getMatchRates = createAsyncThunk<any, any>(
  "/third/match/rates",
  async (matchId,thunkApi) => {
    try {
      const resp = await axios.get(
        `${baseUrls.matchSocket}${ApiConstants.MATCH.RATES}${matchId}`
      );
      if (resp) {
        return resp?.data;
      }
    } catch (error: any) {
      const err = error as AxiosError;
      return thunkApi.rejectWithValue(err.response?.status);
    }
  }
);

export const updateSessionAdded = createAsyncThunk<any, any>(
  "/session/added",
  async (matchDetails) => {
    return matchDetails;
  }
);
export const updateSessionProLoss = createAsyncThunk<any, any>(
  "/sessionProLoss/update",
  async (matchDetails) => {
    return matchDetails;
  }
);
export const removeSessionProLoss = createAsyncThunk<any, any>(
  "/removesessionProLoss/update",
  async (matchDetails) => {
    return matchDetails;
  }
);

export const updateMatchBettingStatus = createAsyncThunk<any, any>(
  "/match/bettingtatus",
  async (betting) => {
    return betting;
  }
);
export const updateRates = createAsyncThunk<any, any>(
  "/match/ratesUpdate",
  async (rates) => {
    return rates;
  }
);
export const handleBetResultStatus = createAsyncThunk<any, any>(
  "/match/betResultStatus",
  async (data) => {
    return data;
  }
);
export const updateMatchRatesOnMarketUndeclare = createAsyncThunk<any, any>(
  "/match/updateOnUndeclare",
  async (data) => {
    return data;
  }
);

export const getRaceMatches = createAsyncThunk<any, string>(
  "addMatch/getRaceMatches",
  async (requestData, thunkApi) => {
    try {
      const { data } = await axios.get(
        `${addMatchThirdParty}/getDirectMatchList?type=${requestData}`
      );
      if (data) {
        return data;
      }
    } catch (error) {
      const err = error as AxiosError;
      return thunkApi.rejectWithValue(err.response?.status);
    }
  }
);

export const updateRaceRates = createAsyncThunk<any, any>(
  "/race/rates",
  async (matchDetails) => {
    return matchDetails;
  }
);

export const updateMarketRates = createAsyncThunk<any, any>(
  "/market/rates",
  async (requestData, thunkApi) => {
    try {
      const resp = await service.post(
        `${ApiConstants.BOOKMAKER.GET}/add`,
        requestData
      );
      if (resp) {
        return resp?.data;
      }
    } catch (error) {
      const err = error as AxiosError;
      return thunkApi.rejectWithValue(err.response?.status);
    }
  }
);

export const updateMultiSessionMinMax = createAsyncThunk<any, any>(
  "/multiSessionMinMax/rates",
  async (matchDetails) => {
    return matchDetails;
  }
);
export const addMatchReset = createAction("add/reset");
export const editMatchReset = createAction("edit/reset");
export const matchDetailReset = createAction("matchDetail/reset");
export const runnerDetailReset = createAction("runnerDetail/reset");
export const matchDetailSuccessReset = createAction("matchDetailSuccess/reset");
export const eventListReset = createAction("eventList/reset");
export const tournamentListReset = createAction("tournamentList/reset");
export const resetMarketListMinMax = createAction("marketListMinMax/reset");
