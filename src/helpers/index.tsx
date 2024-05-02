export const customSort = (a: any, b: any) => {
  const order: any = { live: 1, save: 2, result: 3 };
  const statusComparison =
    order[JSON.parse(a)?.activeStatus] - order[JSON.parse(b)?.activeStatus];

  if (statusComparison !== 0) {
    return statusComparison;
  } else {
    // If activeStatus is the same, compare by updatedAt
    const aUpdatedAt = JSON.parse(a)?.updatedAt;
    const bUpdatedAt = JSON.parse(b)?.updatedAt;

    // Convert string dates to actual Date objects for comparison
    const aDate = new Date(aUpdatedAt);
    const bDate = new Date(bUpdatedAt);

    // Compare updatedAt values
    return bDate.getTime() - aDate.getTime(); // Sort in descending order of updatedAt
  }
};

export const customBetSort = (a: any, b: any) => {
  // If activeStatus is the same, compare by updatedAt
  const aUpdatedAt = a?.createdAt;
  const bUpdatedAt = b?.createdAt;

  // Convert string dates to actual Date objects for comparison
  const aDate = new Date(aUpdatedAt);
  const bDate = new Date(bUpdatedAt);

  // Compare updatedAt values
  return bDate.getTime() - aDate.getTime(); // Sort in descending order of updatedAt
};

export const formatToINR = (amount: any) => {
  const formatter = new Intl.NumberFormat("en-IN", {
    currency: "INR",
  });
  return formatter.format(parseFloat(amount));
};

export const numberInputOnWheelPreventChange = (e: any) => {
  e.target.blur();
  e.stopPropagation();
  setTimeout(() => {
    e.target.focus();
  }, 0);
};
