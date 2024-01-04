import { socketService } from "../../../socketManager";

export const handleKeysMatchEvents = (
  betId: any,
  match: any,
  key: any,
  e: any,
  setInputDetail: any,
  setLock: any,
  incGap: any,
  setIncGap: any,
  isPercent: any,
  setIsPercent: any,
  setIsBall: any
) => {
  e.preventDefault();
  setIsBall(false);
  setLock((prev: any) => {
    return {
      ...prev,
      isNo: true,
      isYes: true,
      isNoPercent: true,
      isYesPercent: true,
    };
  });
  if (key === "enter" || key === "return") {
    setLock((prev: any) => {
      return {
        ...prev,
        isNo: false,
        isYes: false,
        isNoPercent: false,
        isYesPercent: false,
      };
    });
    setInputDetail((prev: any) => {
      let data = {
        matchId: match?.id,
        betId: betId,
        noRate: prev?.leftNoRate,
        yesRate: prev?.leftYesRate,
        noPercent: prev?.leftNoRatePercent,
        yesPercent: prev?.leftYesRatePercent,
        status: "ACTIVE",
      };
      socketService.user.updateSessionRate(data);
      return prev;
    });
  } else if (key === "up" || key === "w") {
    setInputDetail((prev: any) => {
      if (isPercent === "percent") {
        if (+prev.leftYesRatePercent - incGap < 5) {
          return prev;
        } else {
          return {
            ...prev,
            leftYesRatePercent: +prev.leftYesRatePercent - incGap,
            leftNoRatePercent: +prev.leftNoRatePercent + incGap,
            yesRatePercent: +prev.yesRatePercent - incGap,
            noRatePercent: +prev.noRatePercent + incGap,
          };
        }
      } else {
        return {
          ...prev,
          leftYesRate: +prev.leftYesRate + 1,
          yesRate: +prev.yesRate + 1,
        };
      }
    });
  } else if (key === "down" || key === "z") {
    setInputDetail((prev: any) => {
      if (isPercent === "percent") {
        if (prev.leftNoRatePercent - incGap < 5) {
          return prev;
        } else {
          return {
            ...prev,
            leftYesRatePercent: prev.leftYesRatePercent + incGap,
            leftNoRatePercent: prev.leftNoRatePercent - incGap,
            yesRatePercent: prev.yesRatePercent + incGap,
            noRatePercent: prev.noRatePercent - incGap,
          };
        }
      } else {
        if (prev.leftYesRate - 1 > prev.leftNoRate) {
          return {
            ...prev,
            leftYesRate: +prev.leftYesRate - 1,
            yesRate: +prev.yesRate - 1,
          };
        } else {
          return prev;
        }
      }
    });
  } else if (key === "right") {
    setIncGap(1);
    setIsPercent("");
    setInputDetail((prev: any) => {
      if (+prev.leftYesRate + 1 <= 1000) {
        if (+prev.leftNoRate === +prev.leftYesRate) {
          return {
            ...prev,
            leftNoRate: +prev.leftNoRate,
            noRate: +prev.noRate,
            leftYesRate: +prev.leftYesRate + 1,
            yesRate: +prev.yesRate + 1,
            leftYesRatePercent: 100,
            leftNoRatePercent: 100,
            noRatePercent: 100,
            yesRatePercent: 100,
          };
        } else {
          return {
            ...prev,
            leftNoRate: +prev.leftNoRate + 1,
            noRate: +prev.noRate + 1,
            leftYesRate: +prev.leftYesRate + 1,
            yesRate: +prev.yesRate + 1,
            leftYesRatePercent: 100,
            leftNoRatePercent: 100,
            noRatePercent: 100,
            yesRatePercent: 100,
          };
        }
      } else {
        return prev;
      }
    });
  } else if (key === "left") {
    setIncGap(1);
    setIsPercent("");
    setInputDetail((prev: any) => {
      if (+prev.leftNoRate - 1 >= 0) {
        if (+prev.leftNoRate === +prev.leftYesRate) {
          return {
            ...prev,
            leftNoRate: +prev.leftNoRate - 1,
            noRate: +prev.noRate - 1,
            leftYesRate: +prev.leftYesRate,
            yesRate: +prev.yesRate,
            leftYesRatePercent: 100,
            leftNoRatePercent: 100,
            noRatePercent: 100,
            yesRatePercent: 100,
          };
        } else {
          return {
            ...prev,
            leftNoRate: +prev.leftNoRate - 1,
            noRate: +prev.noRate - 1,
            leftYesRate: +prev.leftYesRate - 1,
            yesRate: +prev.yesRate - 1,
            leftYesRatePercent: 100,
            leftNoRatePercent: 100,
            noRatePercent: 100,
            yesRatePercent: 100,
          };
        }
      } else {
        return prev;
      }
    });
  } else if (key === "d") {
    setIncGap(1);
    setIsPercent("");
    setInputDetail((prev: any) => {
      if (+prev.leftYesRate + 1 <= 1000) {
        if (+prev.leftNoRate === +prev.leftYesRate) {
          return {
            ...prev,
            leftNoRate: +prev.leftNoRate,
            noRate: +prev.noRate,
            leftYesRate: +prev.leftYesRate + 1,
            yesRate: +prev.yesRate + 1,
            leftYesRatePercent: 100,
            leftNoRatePercent: 100,
            noRatePercent: 100,
            yesRatePercent: 100,
          };
        } else {
          return {
            ...prev,
            leftNoRate: +prev.leftNoRate + 1,
            noRate: +prev.noRate + 1,
            leftYesRate: +prev.leftYesRate + 1,
            yesRate: +prev.yesRate + 1,
            leftYesRatePercent: 100,
            leftNoRatePercent: 100,
            noRatePercent: 100,
            yesRatePercent: 100,
          };
        }
      } else {
        return prev;
      }
    });
  } else if (key === "a") {
    setIncGap(1);
    setIsPercent("");
    setInputDetail((prev: any) => {
      if (+prev.leftNoRate - 1 >= 0) {
        if (+prev.leftNoRate === +prev.leftYesRate) {
          return {
            ...prev,
            leftNoRate: +prev.leftNoRate - 1,
            noRate: +prev.noRate - 1,
            leftYesRate: +prev.leftYesRate,
            yesRate: +prev.yesRate,
            leftYesRatePercent: 100,
            leftNoRatePercent: 100,
            noRatePercent: 100,
            yesRatePercent: 100,
          };
        } else {
          return {
            ...prev,
            leftNoRate: +prev.leftNoRate - 1,
            noRate: +prev.noRate - 1,
            leftYesRate: +prev.leftYesRate - 1,
            yesRate: +prev.yesRate - 1,
            leftYesRatePercent: 100,
            leftNoRatePercent: 100,
            noRatePercent: 100,
            yesRatePercent: 100,
          };
        }
      } else {
        return prev;
      }
    });
  } else if (key === "esc") {
    setInputDetail((prev: any) => {
      return {
        ...prev,
        leftYesRate: +prev.leftNoRate + 1,
        yesRate: +prev.noRate + 1,
        leftYesRatePercent: 100,
        leftNoRatePercent: 100,
        noRatePercent: 100,
        yesRatePercent: 100,
      };
    });
  } else if (key === "shift") {
    setIsBall(true);
  } else if (key === ",") {
    setIsPercent("percent");
    setIncGap(5);
    setInputDetail((prev: any) => {
      if (+prev.leftNoRate - 1 >= 0) {
        return {
          ...prev,
          noRate: +prev.leftYesRate - 1,
          leftNoRate: +prev.leftYesRate - 1,
          yesRate: +prev.leftYesRate - 1,
          leftYesRate: +prev.leftYesRate - 1,
          noRatePercent: 110,
          yesRatePercent: 90,
          leftNoRatePercent: 110,
          leftYesRatePercent: 90,
        };
      } else {
        return prev;
      }
    });
  } else if (key === ".") {
    setIsPercent("percent");
    setIncGap(5);
    setInputDetail((prev: any) => {
      if (+prev.leftNoRate + 1 <= 1000) {
        return {
          ...prev,
          noRate: +prev.leftNoRate + 1,
          leftNoRate: +prev.leftNoRate + 1,
          yesRate: +prev.leftNoRate + 1,
          leftYesRate: +prev.leftNoRate + 1,
          noRatePercent: 110,
          yesRatePercent: 90,
          leftNoRatePercent: 110,
          leftYesRatePercent: 90,
        };
      } else {
        return prev;
      }
    });
  } else if (key === "q") {
    setIsPercent("percent");
    setIncGap(5);
    setInputDetail((prev: any) => {
      if (+prev.leftNoRate - 1 >= 0) {
        return {
          ...prev,
          noRate: +prev.leftYesRate - 1,
          leftNoRate: +prev.leftYesRate - 1,
          yesRate: +prev.leftYesRate - 1,
          leftYesRate: +prev.leftYesRate - 1,
          noRatePercent: 110,
          yesRatePercent: 90,
          leftNoRatePercent: 110,
          leftYesRatePercent: 90,
        };
      } else {
        return prev;
      }
    });
  } else if (key === "e") {
    setIsPercent("percent");
    setIncGap(5);
    setInputDetail((prev: any) => {
      if (+prev.leftNoRate + 1 <= 1000) {
        return {
          ...prev,
          noRate: +prev.leftNoRate + 1,
          leftNoRate: +prev.leftNoRate + 1,
          yesRate: +prev.leftNoRate + 1,
          leftYesRate: +prev.leftNoRate + 1,
          noRatePercent: 110,
          yesRatePercent: 90,
          leftNoRatePercent: 110,
          leftYesRatePercent: 90,
        };
      } else {
        return prev;
      }
    });
  }
};
