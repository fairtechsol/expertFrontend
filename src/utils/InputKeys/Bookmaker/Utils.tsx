export const handleSuspend = (
  back: number,
  lay: number,
  incGap: number,
  setIncGap: (value: number) => void
) => {
  if (incGap < 1) {
  } else {
    if (back <= 1 || lay > 98) {
      setIncGap(1);
    } else if (back && lay) {
      if (Math.abs(lay - back) > 6 && lay <= 95) {
        setIncGap(5);
      } else if (Math.abs(lay - back) > 5 && lay <= 96) {
        setIncGap(4);
      } else if (Math.abs(lay - back) > 2 && lay <= 98) {
        setIncGap(2);
      } else if (Math.abs(lay - back) === 2) {
        setIncGap(1);
      }
    }
  }
};

export const updateLocalQuickBookmaker = (
  teamKey: string,
  rate: number,
  lay: number,
  setLocalQuickBookmaker: any
) => {
  setLocalQuickBookmaker((prev: any) => {
    const newBody = {
      ...prev,
      teamA: { ...prev?.teamA, rate: "", lay: "", suspended: true },
      teamB: { ...prev?.teamB, rate: "", lay: "", suspended: true },
      teamC: { ...prev?.teamC, rate: "", lay: "", suspended: true },
      [teamKey]: { ...prev?.[teamKey], rate: +rate, lay: +lay },
    };
    return newBody;
  });
};

export const handleHunderedValue = (back: number, lay: number) => {
  if (back >= 98.5) {
    return true;
  }
  if (lay >= 99.5) {
    return true;
  }
  return false;
};

export const handleZeroValue = (back: number, lay: number) => {
  if (back < 1) {
    return true;
  }
  if (lay < 0) {
    return true;
  }
  return false;
};
