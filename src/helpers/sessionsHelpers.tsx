export const convertData = (items: any) => {
  const result: any = {};

  items.forEach((item: any) => {
    if (!result[item.type]) {
      result[item.type] = {
        mname: item.type,
        rem: "",
        gtype: item.gtype,
        status: item?.status,
        section: [],
      };
    }
    const sectionItem = {
      ...item,
    };
    result[item.type].section.push(sectionItem);
  });

  return result;
};

export const updateSessionBettingsItem = (
  matchDetailBettings: any,
  apiResponseBettings: any
) => {
  for (const key in apiResponseBettings) {
    if (matchDetailBettings.hasOwnProperty(key)) {
      const apiSections = apiResponseBettings[key].section;
      const matchDetailSections = matchDetailBettings[key].section;
      for (const apiSection of apiSections) {
        const matchDetailSectionIndex = matchDetailSections.findIndex(
          (section: any) => section.id === apiSection.id
        );
        if (matchDetailSectionIndex !== -1) {
          matchDetailBettings[key].section[matchDetailSectionIndex] = {
            ...matchDetailBettings[key].section[matchDetailSectionIndex],
            ...apiSection,
          };
        }
      }
    }
  }
  return matchDetailBettings;
};
