export const convertData = (items: any) => {
  try {
    const result: any = {};

    items?.forEach((item: any) => {
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
      for (const key in matchDetailBettings) {
        if (matchDetailBettings.hasOwnProperty(key)) {
          const matchDetailSections = matchDetailBettings[key]?.section;
          matchDetailSections?.forEach((section: any) => {
            section.isComplete = true;
          });
        }
      }
      return matchDetailBettings;
    } else
      for (const key in matchDetailBettings) {
        if (apiResponseBettings.hasOwnProperty(key)) {
          const apiSections = apiResponseBettings[key].section;
          const matchDetailSections = matchDetailBettings[key]?.section;

          if (matchDetailSections) {
            matchDetailSections.forEach(
              (matchDetailSection: any, index: number) => {
                const matchDetailSectionIndex = apiSections?.findIndex(
                  (section: any) => section?.id === matchDetailSection?.id
                );

                if (matchDetailSectionIndex !== -1) {
                  matchDetailSections[index] = {
                    ...matchDetailSection,
                    ...apiSections[matchDetailSectionIndex],
                    isComplete:
                      key === "cricketCasino"
                        ? apiSections[matchDetailSectionIndex]?.section
                          ? false
                          : true
                        : apiSections[matchDetailSectionIndex]?.activeStatus ===
                          "unSave"
                        ? false
                        : apiSections[matchDetailSectionIndex]?.ex
                        ? apiSections[matchDetailSectionIndex]?.ex
                            ?.availableToBack?.length > 0 &&
                          apiSections[matchDetailSectionIndex]?.ex
                            ?.availableToLay?.length > 0
                          ? (["", "OPEN", "open"].includes(
                              apiSections[matchDetailSectionIndex]?.GameStatus
                            ) &&
                              !apiSections[matchDetailSectionIndex]?.ex
                                ?.availableToBack[0]?.price &&
                              !apiSections[matchDetailSectionIndex]?.ex
                                ?.availableToBack[0]?.size &&
                              !apiSections[matchDetailSectionIndex]?.ex
                                ?.availableToLay[0]?.price &&
                              !apiSections[matchDetailSectionIndex]?.ex
                                ?.availableToLay[0]?.size) ||
                            apiSections[matchDetailSectionIndex]
                              ?.activeStatus !== "live"
                            ? true
                            : false
                          : true
                        : true,
                    minBet: apiSections[matchDetailSectionIndex]?.min,
                    maxBet: apiSections[matchDetailSectionIndex]?.max,
                  };
                } else {
                  matchDetailSections[index] = {
                    ...matchDetailSection,
                    isComplete: true,
                  };
                }
              }
            );
          }
        } else {
          matchDetailBettings[key]?.section?.forEach(
            (item: any, index: number) => {
              matchDetailBettings[key].section[index] = {
                ...item,
                isComplete: true,
              };
            }
          );
        }
      }
    return matchDetailBettings;
  } catch (error) {
    console.log(error);
  }
};
