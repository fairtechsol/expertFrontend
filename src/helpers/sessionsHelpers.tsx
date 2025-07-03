import _ from "lodash";

export const convertData = (items: any[]): Record<string, any> => {
  const result: Record<string, any> = {};

  if (!Array.isArray(items)) return result;

  for (const rawItem of items) {
    const parsedItem = _.attempt(JSON.parse, rawItem);
    if (_.isError(parsedItem)) continue;

    const item = { ...parsedItem };
    if (item?.isManual) {
      item.type = "manualSession";
    }

    const typeKey = item?.type;
    if (!typeKey) continue;

    if (!result[typeKey]) {
      result[typeKey] = {
        mname: typeKey,
        rem: "",
        gtype: item.gtype,
        status: item.status,
        section: [],
      };
    }

    result[typeKey].section.push(item);
  }

  return result;
};

export const updateSessionBettingsItem = (
  matchDetailBettings: any,
  apiResponseBettings: any
) => {
  try {
    if (_.isEmpty(apiResponseBettings)) {
      _.forEach(matchDetailBettings, (sessionData: any) => {
        _.forEach(sessionData?.section, (section: any) => {
          section.isComplete = true;
        });
      });
      return matchDetailBettings;
    }

    const apiSessionIndex: Record<string, Record<string, number>> = {};

    _.forEach(apiResponseBettings, (sessionData: any, sessionKey: string) => {
      if (!Array.isArray(sessionData?.section)) return;

      apiSessionIndex[sessionKey] = {};
      sessionData.section.forEach((section: any, index: number) => {
        if (section?.id) {
          apiSessionIndex[sessionKey][section.id] = index;
        }
      });
    });

    _.forEach(matchDetailBettings, (sessionData: any, sessionKey: string) => {
      const apiSections = _.get(
        apiResponseBettings,
        [sessionKey, "section"],
        []
      );
      const sectionIndexMap = apiSessionIndex[sessionKey] || {};

      sessionData?.section?.forEach((matchSection: any, index: number) => {
        const id = matchSection?.id;
        if (!id || sectionIndexMap[id] === undefined) {
          matchSection.isComplete = true;
          return;
        }

        const apiSection = apiSections[sectionIndexMap[id]];
        const isComplete = determineIsComplete(sessionKey, apiSection);

        sessionData.section[index] = {
          ...matchSection,
          ...apiSection,
          isComplete,
          minBet: apiSection?.min,
          maxBet: apiSection?.max,
        };
      });
    });

    return matchDetailBettings;
  } catch (error) {
    console.error("Error updating session betting items:", error);
    return matchDetailBettings;
  }
};

// 👇 Separated logic for better readability
const determineIsComplete = (sessionKey: string, apiSection: any): boolean => {
  if (sessionKey === "cricketCasino") {
    return !(apiSection?.section && apiSection?.activeStatus === "live");
  }

  if (apiSection?.activeStatus === "unSave") {
    return false;
  }

  if (apiSection?.ex) {
    const back = apiSection.ex.availableToBack || [];
    const lay = apiSection.ex.availableToLay || [];

    const hasMarket = back.length > 0 && lay.length > 0;

    if (hasMarket) {
      const isGameActive = ["OPEN", "open", "active", "ACTIVE", ""].includes(
        apiSection.GameStatus
      );
      const noValidPrices =
        !back[0]?.price && !back[0]?.size && !lay[0]?.price && !lay[0]?.size;

      const notLive = apiSection.activeStatus !== "live";

      return (isGameActive && noValidPrices) || notLive;
    }
  }

  return true;
};

self.onmessage = function (e) {
  const { sessionBettings, apiSession } = e.data;

  let updatedFormat = convertData(sessionBettings);
  let updatedSessionBettings = updateSessionBettingsItem(
    updatedFormat,
    apiSession
  );

  try {
    self.postMessage({ updatedSessionBettings });
  } catch (error) {
    self.postMessage({ type: "CONVERT_DATA_ERROR", error });
  }
};
