export const handleKeysMatchEvents = (...props: any) => {
  const { key, e, setInputDetail, inputDetail } = props;
  e.preventDefault;

  let targetValue = parseFloat(e.target.value);
  if (key === "up") {
    setInputDetail((prev: any) => {
      return {
        ...prev,
      };
    });
  }
};
