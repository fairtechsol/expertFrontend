export const formatNumber = (value?: any, isRound?: any) => {
  if (value >= 1000) {
    // return (value / 1000).toFixed(1) + "k";
    return isRound
      ? Math.round(value / 1000) + "k"
      : (value / 1000).toFixed(1) + "k";
  } else {
    return isRound ? Math.round(value) : value;
    // return value
  }
};

export const handleSorting = (a: any, b: any) => {
  try {
    const typePriority: any = {
      matchOdd: 1,
      bookmaker: 2,
      completeMatch: 3,
      tiedMatch1: 4,
      tiedMatch2: 5,
      quickBookmaker1: 6,
      quickBookmaker2: 7,
      quickBookmaker3: 8,
    };

    const typeA = a?.type;
    const typeB = b?.type;
    if (typeA in typePriority && typeB in typePriority) {
      return typePriority[typeA] - typePriority[typeB];
    } else if (typeA in typePriority) {
      return -1;
    } else if (typeB in typePriority) {
      return 1;
    }
  } catch (e) {
    console.log(e);
  }
};
