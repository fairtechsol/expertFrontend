import { socketService } from "../../../socketManager";
import { rates } from "./Rates";

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
  match: any,
  Bid: string,
  teamKey: string,
  back: number,
  lay: number,
  setLocalQuickBookmaker: any
) => {
  setLocalQuickBookmaker((prev: any) => {
    const newBody = {
      ...prev,
      teams: prev?.teams?.map((item: any) => {
        if (item?.id == teamKey) {
          return {
            ...item,
            back: +back,
            lay: +lay,
            rightBack: +back,
            rightLay: +lay,
          };
        }
        return item;
      }),
    };
    return newBody;
  });

  setLocalQuickBookmaker((prev: any) => {
    if (prev.teams?.find((item: any) => !item.suspended)) {
      let data = {
        matchId: match?.id,
        id: Bid,
        teams: prev.teams?.map((item: any) => ({
          back: item.back,
          lay: item.lay,
          id: item.id,
          status: "suspended",
        })),
      };
      socketService.user.updateMatchBettingRate(data);
    }
    return prev;
  });
};

export const updateNewLocalQuickBookmaker = (
  match: any,
  Bid: string,
  teamKey: string,
  back: number,
  lay: number,
  setLocalQuickBookmaker: any
) => {
  setLocalQuickBookmaker((prev: any) => {
    const newBody = {
      ...prev,
      teams: prev?.teams?.map((item: any) => {
        if (item?.id == teamKey) {
          return {
            ...item,
            back: +back,
            lay: +lay,
            rightBack: +back,
            rightLay: +lay,
          };
        } else {
          return {
            ...item,
            back: Number(rates[lay] ?? 0),
            lay: Number(rates[back] ?? 0),
            rightBack: Number(rates[lay] ?? 0),
            rightLay: Number(rates[back] ?? 0),
          };
        }
        // return item;
      }),
    };
    return newBody;
  });

  setLocalQuickBookmaker((prev: any) => {
    if (prev.teams?.find((item: any) => !item.suspended)) {
      let data = {
        matchId: match?.id,
        id: Bid,
        teams: prev.teams?.map((item: any) => ({
          back: item.back,
          lay: item.lay,
          id: item.id,
          status: "suspended",
        })),
      };
      socketService.user.updateMatchBettingRate(data);
    }
    return prev;
  });
};

export const handleHunderedValue = (
  back: number,
  lay: number,
  bookmakerById: any
) => {
  if (bookmakerById?.rateThan100) {
    return false;
  }
  if (back >= 98.5) {
    return true;
  }
  if (lay >= 99.5) {
    return true;
  }
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
