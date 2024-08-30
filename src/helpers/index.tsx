import moment from "moment-timezone";

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

export const customSortUpdated = (a: any, b: any) => {
  const order: any = { live: 1, save: 2, result: 3 };
  const statusComparison = order[a?.activeStatus] - order[b?.activeStatus];

  if (statusComparison !== 0) {
    return statusComparison;
  } else {
    // If activeStatus is the same, compare by updatedAt
    const aUpdatedAt = a?.updatedAt;
    const bUpdatedAt = b?.updatedAt;

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

export const getTimeLeft = (matchStartDate: string | any) => {
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const targetDate = moment(matchStartDate).tz(timezone);

  const difference = targetDate.diff(moment().tz(timezone), "milliseconds");
  if (difference <= 0) {
    return {
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  }

  const hours = Math.floor(difference / (1000 * 60 * 60));
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((difference % (1000 * 60)) / 1000);

  return {
    hours: hours,
    minutes: minutes,
    seconds: seconds,
  };
};

export const convertString = (str: string) => {
  if (str?.includes("_")) {
    let words = str.split("_");
    for (let i = 0; i < words.length; i++) {
      words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
    }
    return words.join(" ");
  } else {
    return str;
  }
};

export const customSortOnName = (a: any, b: any) => {
  let nameA = a.name;
  let nameB = b.name;

  let numA = parseFloat(nameA.match(/[\d.]+$/));
  let numB = parseFloat(nameB.match(/[\d.]+$/));

  if (isNaN(numA)) numA = 0;
  if (isNaN(numB)) numB = 0;

  return numA - numB;
};
