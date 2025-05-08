import moment from "moment-timezone";

export const customSort = (a: any, b: any) => {
  const order: any = { live: 1, save: 2, result: 3 };
  const statusComparison =
    order[JSON.parse(a)?.activeStatus] - order[JSON.parse(b)?.activeStatus];

  if (statusComparison !== 0) {
    return statusComparison;
  } else {
    const aUpdatedAt = JSON.parse(a)?.updatedAt;
    const bUpdatedAt = JSON.parse(b)?.updatedAt;

    const aDate = new Date(aUpdatedAt);
    const bDate = new Date(bUpdatedAt);

    return bDate.getTime() - aDate.getTime();
  }
};

export const customSortUpdated = (a: any, b: any) => {
  const order: any = { live: 1, save: 2, result: 3 };
  const statusComparison = order[a?.activeStatus] - order[b?.activeStatus];

  if (statusComparison !== 0) {
    return statusComparison;
  } else {
    const aHasResultStatus = a?.resultStatus ? true : false;
    const bHasResultStatus = b?.resultStatus ? true : false;

    if (aHasResultStatus && !bHasResultStatus) {
      return 1;
    } else if (!aHasResultStatus && bHasResultStatus) {
      return -1;
    }
    const aUpdatedAt = a?.updatedAt;
    const bUpdatedAt = b?.updatedAt;

    const aDate = new Date(aUpdatedAt);
    const bDate = new Date(bUpdatedAt);

    return bDate.getTime() - aDate.getTime();
  }
};

export const customBetSort = (a: any, b: any) => {
  const aUpdatedAt = a?.createdAt;
  const bUpdatedAt = b?.createdAt;

  const aDate = new Date(aUpdatedAt);
  const bDate = new Date(bUpdatedAt);

  return bDate.getTime() - aDate.getTime();
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

const order: any = {
  ballByBall: 1,
  fancy1: 2, // changed position of fancy1 from 4 to 2 as client changed
  session: 3,
  overByover: 4,
  oddEven: 5,
};

export const customSortBySessionMarketName = ([nameA]: any, [nameB]: any) => {
  const orderA = order[nameA] || Infinity;
  const orderB = order[nameB] || Infinity;
  return orderA - orderB;
};

export const handleNumber = (num: any, color: any) => {
  let amount = parseFloat(num)?.toFixed(2);
  let value;

  if (amount && amount?.includes(".")) {
    value = amount?.split(".");
  } else {
    value = amount;
  }
  return value?.length > 0 ? (
    <>
      <span style={{ color: color }}>{formatToINR(value[0])}.</span>
      <span style={{ fontSize: "0.8em", color: color }}>{value[1]}</span>
    </>
  ) : null;
};

export const stripUrl = (url: any) => {
  url = url?.replace(/^(?:https?:\/\/)/, "");

  const parts = url?.split(".");

  url = parts?.[parts.length - 2];
  // if (parts?.length > 2) {
  //   parts?.pop();
  //   url = parts?.join(".");
  // } else if (parts?.length === 2) {
  //   url = parts?.[0];
  // }

  return url || "";
};
