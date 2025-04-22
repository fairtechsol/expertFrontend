export const convertData = (items: any) => {
  try {
    const result: any = {};

    items?.forEach((item: any) => {
      item = JSON.parse(item);
      if (item?.isManual) {
        item.type = "manualSession";
      }
      if (!result[item?.type]) {
        result[item?.type] = {
          mname: item?.type,
          rem: "",
          gtype: item?.gtype,
          status: item?.status,
          section: [],
        };
      }
      const sectionItem = {
        ...item,
      };
      result[item?.type]?.section?.push(sectionItem);
    });
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const updateSessionBettingsItem = (
  matchDetailBettings: any,
  apiResponseBettings: any
) => {
  try {
    if (!apiResponseBettings || Object.keys(apiResponseBettings).length === 0) {
      Object.values(matchDetailBettings).forEach((sessionData: any) => {
        if (sessionData?.section) {
          sessionData.section.forEach((section: any) => {
            section.isComplete = true;
          });
        }
      });
      return matchDetailBettings;
    }

    const apiSessionIndex: any = {};
    Object.entries(apiResponseBettings).forEach(
      ([sessionKey, sessionData]: any) => {
        if (!sessionData?.section) return;

        apiSessionIndex[sessionKey] = {};
        sessionData.section.forEach((section: any, index: number) => {
          if (section?.id) {
            apiSessionIndex[sessionKey][section.id] = index;
          }
        });
      }
    );

    Object.entries(matchDetailBettings).forEach(
      ([sessionKey, sessionData]: any) => {
        if (!sessionData?.section) return;

        const apiSections = apiResponseBettings[sessionKey]?.section;

        sessionData.section.forEach(
          (matchDetailSection: any, index: number) => {
            if (!matchDetailSection?.id) {
              matchDetailSection.isComplete = true;
              return;
            }

            if (
              apiSessionIndex[sessionKey] &&
              apiSessionIndex[sessionKey][matchDetailSection.id] !== undefined
            ) {
              const apiSectionIndex =
                apiSessionIndex[sessionKey][matchDetailSection.id];
              const apiSection = apiSections[apiSectionIndex];

              let isComplete = true;

              if (sessionKey === "cricketCasino") {
                isComplete = !(
                  apiSection?.section && apiSection?.activeStatus === "live"
                );
              } else if (apiSection?.activeStatus === "unSave") {
                isComplete = false;
              } else if (apiSection?.ex) {
                const backData = apiSection.ex?.availableToBack || [];
                const layData = apiSection.ex?.availableToLay || [];
                const hasMarketData = backData.length > 0 && layData.length > 0;

                if (hasMarketData) {
                  const gameStatusActive = [
                    "",
                    "OPEN",
                    "open",
                    "active",
                    "ACTIVE",
                  ].includes(apiSection?.GameStatus);
                  const noValidPrices =
                    !backData[0]?.price &&
                    !backData[0]?.size &&
                    !layData[0]?.price &&
                    !layData[0]?.size;
                  const notLive = apiSection?.activeStatus !== "live";

                  isComplete = (gameStatusActive && noValidPrices) || notLive;
                }
              }

              sessionData.section[index] = {
                ...matchDetailSection,
                ...apiSection,
                isComplete,
                minBet: apiSection?.min,
                maxBet: apiSection?.max,
              };
            } else {
              matchDetailSection.isComplete = true;
            }
          }
        );
      }
    );

    return matchDetailBettings;
  } catch (error) {
    console.log("Error updating session betting items:", error);
    return matchDetailBettings;
  }
};
