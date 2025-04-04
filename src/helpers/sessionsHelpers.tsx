interface SectionItem {
  type: string;
  gtype?: string;
  status?: string;
  [key: string]: any; // for other properties
}

interface ResultItem {
  mname: string;
  rem: string;
  gtype?: string;
  status?: string;
  section: SectionItem[];
}

export const convertData = (
  items: SectionItem[] | undefined
): Record<string, ResultItem> => {
  if (!items) return {};

  const result: Record<string, ResultItem> = {};

  for (const item of items) {
    if (!item?.type) continue;

    if (!result[item.type]) {
      result[item.type] = {
        mname: item.type,
        rem: "",
        gtype: item.gtype,
        status: item.status,
        section: [],
      };
    }

    result[item.type].section.push({ ...item });
  }

  return result;
};

interface BettingSection {
  id?: string;
  isComplete?: boolean;
  activeStatus?: string;
  GameStatus?: string;
  ex?: {
    availableToBack?: Array<{ price?: number; size?: number }>;
    availableToLay?: Array<{ price?: number; size?: number }>;
  };
  min?: number;
  max?: number;
  section?: any;
  [key: string]: any;
}

interface BettingGroup {
  [key: string]: {
    section?: BettingSection[];
  };
}

export const updateSessionBettingsItem = (
  matchDetailBettings: BettingGroup,
  apiResponseBettings: BettingGroup
): BettingGroup => {
  if (!apiResponseBettings || Object.keys(apiResponseBettings).length === 0) {
    return markAllSectionsComplete(matchDetailBettings);
  }

  for (const key in matchDetailBettings) {
    if (!matchDetailBettings.hasOwnProperty(key)) continue;

    const matchSections = matchDetailBettings[key]?.section;
    if (!matchSections) continue;

    if (apiResponseBettings.hasOwnProperty(key)) {
      updateMatchingSections(matchSections, apiResponseBettings[key].section);
    } else {
      markSectionsComplete(matchSections);
    }
  }

  return matchDetailBettings;
};

const markAllSectionsComplete = (bettings: BettingGroup): BettingGroup => {
  for (const key in bettings) {
    if (bettings.hasOwnProperty(key)) {
      markSectionsComplete(bettings[key]?.section);
    }
  }
  return bettings;
};

const markSectionsComplete = (sections?: BettingSection[]): void => {
  sections?.forEach((section) => {
    section.isComplete = true;
  });
};

const updateMatchingSections = (
  matchSections: BettingSection[],
  apiSections?: BettingSection[]
): void => {
  if (!apiSections) return;

  matchSections.forEach((matchSection, index) => {
    const apiSection = apiSections.find((s) => s?.id === matchSection?.id);

    if (apiSection) {
      matchSections[index] = {
        ...matchSection,
        ...apiSection,
        isComplete: determineCompletionStatus(apiSection, matchSections[index]),
        minBet: apiSection.min,
        maxBet: apiSection.max,
      };
    } else {
      matchSections[index] = {
        ...matchSection,
        isComplete: true,
      };
    }
  });
};

const determineCompletionStatus = (
  apiSection: BettingSection,
  matchSection: BettingSection
): boolean => {
  if (matchSection.type === "cricketCasino") {
    return !(apiSection.section && apiSection.activeStatus === "live");
  }

  if (apiSection.activeStatus === "unSave") {
    return false;
  }

  if (apiSection.ex) {
    const backItems = apiSection.ex.availableToBack ?? [];
    const layItems = apiSection.ex.availableToLay ?? [];
    const hasBack = backItems.length > 0;
    const hasLay = layItems.length > 0;

    if (hasBack && hasLay) {
      const validStatus = ["", "OPEN", "open", "active", "ACTIVE"].includes(
        apiSection.GameStatus || ""
      );
      const firstBack = backItems[0];
      const firstLay = layItems[0];
      const noPrices =
        !firstBack?.price &&
        !firstBack?.size &&
        !firstLay?.price &&
        !firstLay?.size;

      return !(validStatus && noPrices) || apiSection.activeStatus !== "live";
    }
  }

  return true;
};
