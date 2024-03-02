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

export const customSort = (a: any, b: any) => {
  console.log(a, "abc", b);
  // betStatus 1 should come before betStatus 2
  const betStatusOrder: any = { 1: "live", 0: "save", 2: "result" };
  const aStatus = betStatusOrder[JSON.parse(a)?.activeStatus] || 0;
  const bStatus = betStatusOrder[JSON.parse(b)?.activeStatus] || 0;
  if (aStatus === bStatus) {
    // If both have the same status, maintain their current order
    return 0;
  } else if (aStatus === "live") {
    // "live" should come before other statuses
    return -1;
  } else if (bStatus === "live") {
    // Other statuses should come after "live"
    return 1;
  } else if (aStatus === "save") {
    // "save" should come before "result"
    return -1;
  } else if (bStatus === "save") {
    // "result" should come after "save"
    return 1;
  } else {
    // Default case: compare based on their numeric order
    return aStatus - bStatus;
  }
};
