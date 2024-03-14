export const customSort = (a: any, b: any) => {
  const order: any = { live: 1, save: 2, result: 3 };
  return (
    order[JSON.parse(a)?.activeStatus] - order[JSON.parse(b)?.activeStatus]
  );
};

export const formatToINR = (amount:any) => {
  const formatter = new Intl.NumberFormat("en-IN", {
      currency: "INR"
  });
  return formatter.format(parseFloat(amount));
};
