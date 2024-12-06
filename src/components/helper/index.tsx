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
      completeManual: 4,
      tiedMatch1: 5,
      tiedMatch2: 6,
      quickbookmaker1: 7,
      quickbookmaker2: 8,
      quickbookmaker3: 9,
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

export const formatToINR = (amount: any) => {
  const formatter = new Intl.NumberFormat("en-IN", {
    currency: "INR",
  });
  return formatter.format(amount || 0);
};

export const handleMarketSorting = (a: any, b: any) => {
  const order: any = { "": 1, pending: 2, declared: 3 };
  return order[a?.result] - order[b?.result];
};
