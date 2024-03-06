export const customSort = (a: any, b: any) => {
  const order: any = { live: 1, save: 2, result: 3 };
  return (
    order[JSON.parse(a)?.activeStatus] - order[JSON.parse(b)?.activeStatus]
  );
};
