import { socketService } from "../../../socketManager";
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
  type: any,
  teamKey: string,
  back: number,
  lay: number,
  setLocalQuickBookmaker: any
) => {
  setLocalQuickBookmaker((prev: any) => {
    const newBody = {
      ...prev,
      teamA: { ...prev?.teamA, back: 0, lay: 0, suspended: true },
      teamB: { ...prev?.teamB, back: 0, lay: 0, suspended: true },
      teamC: { ...prev?.teamC, back: 0, lay: 0, suspended: true },
      [teamKey]: {
        ...prev?.[teamKey],
        back: +back,
        lay: +lay,
        rightBack: +back,
        rightLay: +lay,
      },
    };
    return newBody;
  });
  setLocalQuickBookmaker((prev: any) => {
    if (
      !prev.teamA.suspended ||
      !prev.teamB.suspended ||
      !prev.teamC.suspended
    ) {
      let data = {
        matchId: match?.id,
        id: Bid,
        type: type,
        backTeamA: prev.teamA.back,
        backTeamB: prev.teamB.back,
        backTeamC: prev.teamC.back,
        layTeamA: prev.teamA.lay,
        layTeamB: prev.teamB.lay,
        layTeamC: prev.teamC.lay,
        statusTeamA: "suspended",
        statusTeamB: "suspended",
        statusTeamC: "suspended",
      };
      socketService.user.updateMatchBettingRate(data);
    }
    return prev;
  });
};



export const handleHunderedValue = (back: number, lay: number,bookmakerById:any) => {

  if(bookmakerById?.rateThan100){
    return false
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
