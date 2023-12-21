import { handleHunderedValue, handleSuspend, handleZeroValue } from "./Utils";

export const handleKeysMatchEvents = (
  key: any,
  e: any,
  setLocalQuickBookmaker: any,
  innerRefTeamB: any,
  innerRefTeamC: any,
  innerRefTeamA: any,
  match: any,
  incGap: number,
  setIncGap: any,
  isTab: string,
  setIsTab: any
) => {
  e.preventDefault();
  let targetValue = e.target.value;
  if (key === "shift") {
    setLocalQuickBookmaker((prev: any) => {
      return {
        ...prev,
        teamBall: true,
      };
    });
  } else if (key === "`") {
    setIsTab("");
    if (match?.teamC) {
      if (e.target.name === "teamArate") {
        innerRefTeamB.current.focus();
        setLocalQuickBookmaker((prev: any) => {
          return {
            ...prev,
            teamA: { ...prev.teamA, rate: "", lay: "", suspended: true },
            teamB: { ...prev.teamB, rate: "", lay: "", suspended: true },
            teamC: { ...prev.teamC, rate: "", lay: "", suspended: true },
          };
        });
      } else if (e.target.name === "teamBrate") {
        innerRefTeamC.current.focus();
        setLocalQuickBookmaker((prev: any) => {
          return {
            ...prev,
            teamA: { ...prev.teamA, rate: "", lay: "", suspended: true },
            teamB: { ...prev.teamB, rate: "", lay: "", suspended: true },
            teamC: { ...prev.teamC, rate: "", lay: "", suspended: true },
          };
        });
      } else if (e.target.name === "teamCrate") {
        innerRefTeamA.current.focus();
        setLocalQuickBookmaker((prev: any) => {
          return {
            ...prev,
            teamA: { ...prev.teamA, rate: "", lay: "", suspended: true },
            teamB: { ...prev.teamB, rate: "", lay: "", suspended: true },
            teamC: { ...prev.teamC, rate: "", lay: "", suspended: true },
          };
        });
      }
    } else {
      if (e.target.name === "teamArate") {
        innerRefTeamB.current.focus();
        setLocalQuickBookmaker((prev: any) => {
          return {
            ...prev,
            teamA: { ...prev.teamA, rate: "", lay: "" },
            teamB: { ...prev.teamB, rate: "", lay: "" },
          };
        });
      } else if (e.target.name === "teamBrate") {
        innerRefTeamA.current.focus();
        setLocalQuickBookmaker((prev: any) => {
          return {
            ...prev,
            teamA: { ...prev.teamA, rate: "", lay: "" },
            teamB: { ...prev.teamB, rate: "", lay: "" },
          };
        });
      }
    }
  } else if (key === "right" || key === "d") {
    setIsTab("");
    let value = +targetValue ? +targetValue + +incGap : +incGap;
    if (e.target.name === "teamArate") {
      setLocalQuickBookmaker((prev: any) => {
        let result = handleHunderedValue(+targetValue, +prev?.teamA?.lay);
        if (result) {
          return prev;
        }
        let checkValue = prev?.teamA?.lay ? prev?.teamA?.lay : value;
        handleSuspend(
          +targetValue + +incGap,
          +checkValue + +incGap,
          incGap,
          setIncGap
        );
        return {
          ...prev,
          teamA: { ...prev.teamA, rate: value, lay: checkValue + +incGap },
        };
      });
    }
    if (e.target.name === "teamBrate") {
      setLocalQuickBookmaker((prev: any) => {
        let result = handleHunderedValue(+targetValue, +prev?.teamB?.lay);
        if (result) {
          return prev;
        }
        let checkValue = prev?.teamB?.lay ? prev?.teamB?.lay : value;
        handleSuspend(
          +targetValue + +incGap,
          +checkValue + +incGap,
          incGap,
          setIncGap
        );
        return {
          ...prev,
          teamB: { ...prev.teamB, rate: value, lay: checkValue + +incGap },
        };
      });
    }
    if (e.target.name === "teamCrate") {
      setLocalQuickBookmaker((prev: any) => {
        let result = handleHunderedValue(+targetValue, +prev?.teamC?.lay);
        if (result) {
          return prev;
        }
        let checkValue = prev?.teamC?.lay ? prev?.teamC?.lay : value;
        handleSuspend(
          +targetValue + +incGap,
          +checkValue + +incGap,
          incGap,
          setIncGap
        );
        return {
          ...prev,
          teamC: { ...prev.teamC, rate: value, lay: checkValue + +incGap },
        };
      });
    }
  } else if (key === "left" || key === "a") {
    setIsTab("");
    let value = +targetValue - +incGap;
    if (e.target.name === "teamArate") {
      setLocalQuickBookmaker((prev: any) => {
        if (+prev?.teamA?.rate - incGap < 0) {
          return prev;
        }
        let checkValue = prev?.teamA?.lay
          ? prev?.teamA?.lay
          : prev?.teamA?.rate;
        handleSuspend(value, +prev?.teamA?.lay - +incGap, incGap, setIncGap);
        return {
          ...prev,
          teamA: { ...prev.teamA, rate: value, lay: checkValue - +incGap },
        };
      });
    }
    if (e.target.name === "teamBrate") {
      setLocalQuickBookmaker((prev: any) => {
        if (+prev?.teamB?.rate - incGap < 0) {
          return prev;
        }
        let checkValue = prev?.teamB?.lay
          ? prev?.teamB?.lay
          : prev?.teamB?.rate;
        handleSuspend(value, +prev?.teamB?.lay - +incGap, incGap, setIncGap);
        return {
          ...prev,
          teamB: { ...prev.teamB, rate: value, lay: checkValue - +incGap },
        };
      });
    }
    if (e.target.name === "teamCrate") {
      setLocalQuickBookmaker((prev: any) => {
        if (+prev?.teamC?.rate - incGap < 0) {
          return prev;
        }
        let checkValue = prev?.teamC?.lay
          ? prev?.teamC?.lay
          : prev?.teamC?.rate;
        handleSuspend(value, +prev?.teamC?.lay - +incGap, incGap, setIncGap);
        return {
          ...prev,
          teamC: { ...prev.teamC, rate: value, lay: checkValue - +incGap },
        };
      });
    }
  } else if (key === "up" || key === "w") {
    if (isTab == "tab") {
      setIsTab("");
    }
    if (e.target.name === "teamArate") {
      setLocalQuickBookmaker((prev: any) => {
        let result = handleHunderedValue(+targetValue, prev?.teamA?.lay);
        if (result) {
          return;
        }
        let value = prev?.teamA?.lay ? prev?.teamA?.lay : prev?.teamA?.rate;
        handleSuspend(+targetValue, value + 1, incGap, setIncGap);
        return {
          ...prev,
          teamA: {
            ...prev?.teamA,
            lay:
              incGap < 1
                ? value + incGap
                : value === 0
                ? 1
                : value
                ? value + 1
                : NaN,
          },
          teamB: { ...prev?.teamB, rate: "", lay: "" },
          teamC: { ...prev?.teamC, rate: "", lay: "" },
        };
      });
    } else if (e.target.name === "teamBrate") {
      setLocalQuickBookmaker((prev: any) => {
        let result = handleHunderedValue(+targetValue, prev?.teamB?.lay);
        if (result) {
          return;
        }
        let value = prev?.teamB?.lay ? prev?.teamB?.lay : prev?.teamB?.rate;
        handleSuspend(+targetValue, value + 1, incGap, setIncGap);
        return {
          ...prev,
          teamB: {
            ...prev?.teamB,
            lay:
              incGap < 1
                ? value + incGap
                : value === 0
                ? 1
                : value
                ? value + 1
                : NaN,
          },
          teamA: { ...prev?.teamA, rate: "", lay: "" },
          teamC: { ...prev?.teamC, rate: "", lay: "" },
        };
      });
    } else if (e.target.name === "teamCrate") {
      setLocalQuickBookmaker((prev: any) => {
        let result = handleHunderedValue(+targetValue, prev?.teamC?.lay);
        if (result) {
          return;
        }
        let value = prev?.teamC?.lay ? prev?.teamC?.lay : prev?.teamC?.rate;
        handleSuspend(+targetValue, value + 1, incGap, setIncGap);
        return {
          ...prev,
          teamC: {
            ...prev?.teamC,
            lay:
              incGap < 1
                ? value + incGap
                : value === 0
                ? 1
                : value
                ? value + 1
                : NaN,
          },
          teamB: { ...prev?.teamB, rate: "", lay: "" },
          teamA: { ...prev?.teamA, rate: "", lay: "" },
        };
      });
    }
  } else if (key === "down" || key === "w") {
    setIsTab("");
    if (e.target.name === "teamArate") {
      setLocalQuickBookmaker((prev: any) => {
        if (
          prev?.teamA?.lay - 1 > prev?.teamA?.rate ||
          prev?.teamA?.lay - incGap > prev?.teamA?.rate
        ) {
          handleSuspend(
            prev?.teamA?.rate,
            prev?.teamA?.lay - 1,
            incGap,
            setIncGap
          );
          return {
            ...prev,
            teamA: {
              ...prev?.teamA,
              lay: prev?.teamA?.lay ? prev?.teamA?.lay - 1 : prev?.teamA?.rate,
            },
            teamB: { ...prev?.teamB, rate: "", lay: "" },
            teamC: { ...prev?.teamC, rate: "", lay: "" },
          };
        } else return prev;
      });
    } else if (e.target.name === "teamBrate") {
      setLocalQuickBookmaker((prev: any) => {
        if (
          prev?.teamB?.lay - 1 > prev?.teamB?.rate ||
          prev?.teamB?.lay - incGap > prev?.teamB?.rate
        ) {
          handleSuspend(
            prev?.teamB?.rate,
            prev?.teamB?.lay - 1,
            incGap,
            setIncGap
          );
          return {
            ...prev,
            teamB: {
              ...prev?.teamB,
              lay: prev?.teamB?.lay ? prev?.teamB?.lay - 1 : prev?.teamB?.rate,
            },
            teamA: { ...prev?.teamA, rate: "", lay: "" },
            teamC: { ...prev?.teamC, rate: "", lay: "" },
          };
        } else return prev;
      });
    } else if (e.target.name === "teamCrate") {
      setLocalQuickBookmaker((prev: any) => {
        if (
          prev?.teamC?.lay - 1 > prev?.teamC?.rate ||
          prev?.teamC?.lay - incGap > prev?.teamC?.rate
        ) {
          handleSuspend(
            prev?.teamC?.rate,
            prev?.teamC?.lay - 1,
            incGap,
            setIncGap
          );
          return {
            ...prev,
            teamC: {
              ...prev?.teamC,
              lay: prev?.teamC?.lay ? prev?.teamC?.lay - 1 : prev?.teamC?.rate,
            },
            teamB: { ...prev?.teamB, rate: "", lay: "" },
            teamA: { ...prev?.teamA, rate: "", lay: "" },
          };
        } else return prev;
      });
    }
  } else if (key === "esc") {
    setIsTab("");
    setIncGap(1);
    if (e.target.name === "teamArate") {
      setLocalQuickBookmaker((prev: any) => {
        let teamARateDecimal = +prev?.teamA?.rate % 1;
        let value;
        if (teamARateDecimal >= 0.5) {
          value = Math.round(prev?.teamA?.rate) - 1;
        } else {
          value = Math.round(prev?.teamA?.rate);
        }
        return {
          ...prev,
          teamA: { ...prev?.teamA, lay: +value + 1, rate: +value },
          teamB: { ...prev?.teamB, lay: "", rate: "" },
          teamC: { ...prev?.teamC, lay: "", rate: "" },
        };
      });
    } else if (e.target.name === "teamBrate") {
      setLocalQuickBookmaker((prev: any) => {
        let teamBRateDecimal = +prev?.teamB?.rate % 1;
        let value;
        if (teamBRateDecimal >= 0.5) {
          value = Math.round(prev?.teamB?.rate) - 1;
        } else {
          value = Math.round(prev?.teamB?.rate);
        }
        return {
          ...prev,
          teamA: { ...prev?.teamA, lay: "", rate: "" },
          teamB: { ...prev?.teamB, lay: +value + 1, rate: +value },
          teamC: { ...prev?.teamC, lay: "", rate: "" },
        };
      });
    } else if (e.target.name === "teamCrate") {
      setLocalQuickBookmaker((prev: any) => {
        let teamCRateDecimal = +prev?.teamC?.rate % 1;
        let value;
        if (teamCRateDecimal >= 0.5) {
          value = Math.round(prev?.teamC?.rate) - 1;
        } else {
          value = Math.round(prev?.teamC?.rate);
        }
        return {
          ...prev,
          teamA: { ...prev?.teamA, lay: "", rate: "" },
          teamB: { ...prev?.teamB, lay: "", rate: "" },
          teamC: { ...prev?.teamC, lay: +value + 1, rate: +value },
        };
      });
    }
  } else if (key === "enter" || key === "return") {
    if (e.target.name === "teamArate") {
      setLocalQuickBookmaker((prev: any) => {
        return {
          ...prev,
          teamA: {
            ...prev.teamA,
            suspended:
              [null, ""].includes(prev?.teamA?.lay) ||
              [null, ""].includes(prev?.teamA?.rate)
                ? true
                : false,
          },
          teamB: { ...prev.teamB, suspended: true },
          teamC: { ...prev.teamC, suspended: true },
        };
      });
    } else if (e.target.name === "teamBrate") {
      setLocalQuickBookmaker((prev: any) => {
        return {
          ...prev,
          teamA: { ...prev.teamA, suspended: true },
          teamB: {
            ...prev.teamB,
            suspended:
              [null, ""].includes(prev?.teamB?.lay) ||
              [null, ""].includes(prev?.teamB?.rate)
                ? true
                : false,
          },
          teamC: { ...prev.teamC, suspended: true },
        };
      });
    } else if (e.target.name === "teamCrate") {
      setLocalQuickBookmaker((prev: any) => {
        return {
          ...prev,
          teamA: { ...prev.teamA, suspended: true },
          teamB: { ...prev.teamB, suspended: true },
          teamC: {
            ...prev.teamC,
            suspended:
              [null, ""].includes(prev?.teamC?.lay) ||
              [null, ""].includes(prev?.teamC?.rate)
                ? true
                : false,
          },
        };
      });
    }
  } else if (key === "ctrl") {
    setIncGap(1);
    setIsTab("");
  } else if (key === "tab") {
    setLocalQuickBookmaker((prev: any) => {
      return {
        ...prev,
        teamA: { ...prev?.teamA, lay: "", rate: +targetValue },
        teamB: { ...prev?.teamB, lay: "", rate: +targetValue },
        teamC: { ...prev?.teamC, lay: "", rate: +targetValue },
      };
    });
  } else if (key === ",") {
    if (isTab == "tab") {
      setIsTab("");
    }
    setIncGap(1);
    if (e.target.name === "teamArate") {
      setLocalQuickBookmaker((prev: any) => {
        if (prev?.teamA?.rate > 0.5 || +targetValue > 0.5) {
          let teamARateDecimal = prev?.teamA?.rate % 1;
          let value: any;
          if (teamARateDecimal >= 0.5) {
            value = prev?.teamA?.rate
              ? Math.round(prev?.teamA?.rate)
              : +targetValue
              ? +targetValue
              : 0;
          } else {
            value = prev?.teamA?.rate
              ? Math.round(prev?.teamA?.rate)
              : +targetValue
              ? +targetValue
              : 0;
          }
          return {
            ...prev,
            teamA: { ...prev?.teamA, lay: value + 1, rate: value - 0.5 },
            teamB: { ...prev?.teamB, rate: "", lay: "" },
            teamC: { ...prev?.teamC, lay: "", rate: "" },
          };
        }
      });
    } else if (e.target.name === "teamBrate") {
      setLocalQuickBookmaker((prev: any) => {
        if (prev?.teamB?.rate > 0.5 || +targetValue > 0.5) {
          let teamARateDecimal = prev?.teamB?.rate % 1;
          let value: any;
          if (teamARateDecimal >= 0.5) {
            value = prev?.teamB?.rate
              ? Math.round(prev?.teamB?.rate)
              : +targetValue
              ? +targetValue
              : 0;
          } else {
            value = prev?.teamB?.rate
              ? Math.round(prev?.teamB?.rate)
              : +targetValue
              ? +targetValue
              : 0;
          }
          return {
            ...prev,
            teamB: { ...prev?.teamB, lay: value + 1, rate: value - 0.5 },
            teamA: { ...prev?.teamA, rate: "", lay: "" },
            teamC: { ...prev?.teamC, lay: "", rate: "" },
          };
        }
      });
    } else if (e.target.name === "teamCrate") {
      setLocalQuickBookmaker((prev: any) => {
        if (prev?.teamC?.rate > 0.5 || +targetValue > 0.5) {
          let teamARateDecimal = prev?.teamC?.rate % 1;
          let value: any;
          if (teamARateDecimal >= 0.5) {
            value = prev?.teamC?.rate
              ? Math.round(prev?.teamC?.rate)
              : +targetValue
              ? +targetValue
              : 0;
          } else {
            value = prev?.teamC?.rate
              ? Math.round(prev?.teamC?.rate)
              : +targetValue
              ? +targetValue
              : 0;
          }
          return {
            ...prev,
            teamA: { ...prev?.teamA, lay: "", rate: "" },
            teamB: { ...prev?.teamB, rate: "", lay: "" },
            teamC: { ...prev?.teamC, lay: value + 1, rate: value - 0.5 },
          };
        }
      });
    }
  } else if (key === ".") {
    if (isTab == "tab") {
      setIsTab("");
    }
    setIncGap(1);
    if (e.target.name === "teamArate") {
      setLocalQuickBookmaker((prev: any) => {
        let teamARateDecimal = prev?.teamA?.rate
          ? prev?.teamA?.rate
          : +targetValue % 1;
        let value: number;
        if (teamARateDecimal >= 0.5) {
          value = prev?.teamA?.rate
            ? Math.round(prev?.teamA?.rate)
            : +targetValue
            ? +targetValue
            : 0;
        } else {
          value = prev?.teamA?.rate
            ? Math.round(prev?.teamA?.rate)
            : +targetValue
            ? +targetValue
            : 0;
        }
        return {
          ...prev,
          teamA: { ...prev?.teamA, lay: value + 1.5, rate: value },
          teamB: { ...prev?.teamB, rate: "", lay: "" },
          teamC: { ...prev?.teamC, rate: "", lay: "" },
        };
      });
    } else if (e.target.name === "teamBrate") {
      setLocalQuickBookmaker((prev: any) => {
        let teamARateDecimal = prev?.teamB?.rate
          ? prev?.teamB?.rate
          : +targetValue % 1;
        let value: number;
        if (teamARateDecimal >= 0.5) {
          value = prev?.teamB?.rate
            ? Math.round(prev?.teamB?.rate)
            : +targetValue
            ? +targetValue
            : 0;
        } else {
          value = prev?.teamB?.rate
            ? Math.round(prev?.teamB?.rate)
            : +targetValue
            ? +targetValue
            : 0;
        }
        return {
          ...prev,
          teamA: { ...prev?.teamA, rate: "", lay: "" },
          teamB: { ...prev?.teamB, lay: value + 1.5, rate: value },
          teamC: { ...prev?.teamC, rate: "", lay: "" },
        };
      });
    } else if (e.target.name === "teamCrate") {
      setLocalQuickBookmaker((prev: any) => {
        let teamARateDecimal = prev?.teamC?.rate
          ? prev?.teamC?.rate
          : +targetValue % 1;
        let value: number;
        if (teamARateDecimal >= 0.5) {
          value = prev?.teamC?.rate
            ? Math.round(prev?.teamC?.rate)
            : +targetValue
            ? +targetValue
            : 0;
        } else {
          value = prev?.teamC?.rate
            ? Math.round(prev?.teamC?.rate)
            : +targetValue
            ? +targetValue
            : 0;
        }
        return {
          ...prev,
          teamA: { ...prev?.teamA, rate: "", lay: "" },
          teamB: { ...prev?.teamB, rate: "", lay: "" },
          teamC: { ...prev?.teamC, lay: value + 1.5, rate: value },
        };
      });
    }
  } else if (key === "minus") {
    if (isTab == "tab") {
      setIsTab("");
    }
    if (incGap != 5) {
      setIncGap(0.5);
      if (e.target.name === "teamArate") {
        setLocalQuickBookmaker((prev: any) => {
          let result = handleZeroValue(+targetValue, prev?.teamA?.lay);
          if (result) {
            return;
          }
          let teamARateDecimal = prev?.teamA?.rate % 1;
          let value: any;
          if (teamARateDecimal >= 0.5) {
            value = parseFloat(e.target.value) - 1;
          } else {
            value = parseFloat(e.target.value) - 0.5;
          }

          if (!value) {
            return;
          }
          return {
            ...prev,
            teamA: { ...prev?.teamA, rate: value, lay: value + 1 },
            teamB: { ...prev?.teamB, lay: "", rate: "" },
            teamC: { ...prev?.teamC, lay: "", rate: "" },
          };
        });
      } else if (e.target.name === "teamBrate") {
        setLocalQuickBookmaker((prev: any) => {
          let result = handleZeroValue(+targetValue, prev?.teamB?.lay);
          if (result) {
            return;
          }
          let teamARateDecimal = prev?.teamB?.rate % 1;
          let value: any;
          if (teamARateDecimal >= 0.5) {
            value = parseFloat(e.target.value) - 1;
          } else {
            value = parseFloat(e.target.value) - 0.5;
          }

          if (!value) {
            return;
          }
          return {
            ...prev,
            teamB: { ...prev?.teamB, rate: value, lay: value + 1 },
            teamA: { ...prev?.teamA, lay: "", rate: "" },
            teamC: { ...prev?.teamC, lay: "", rate: "" },
          };
        });
      } else if (e.target.name === "teamCrate") {
        setLocalQuickBookmaker((prev: any) => {
          let result = handleZeroValue(+targetValue, prev?.teamC?.lay);
          if (result) {
            return;
          }
          let teamARateDecimal = prev?.teamC?.rate % 1;
          let value: any;
          if (teamARateDecimal >= 0.5) {
            value = parseFloat(e.target.value) - 1;
          } else {
            value = parseFloat(e.target.value) - 0.5;
          }

          if (!value) {
            return;
          }
          return {
            ...prev,
            teamC: { ...prev?.teamC, rate: value, lay: value + 1 },
            teamB: { ...prev?.teamB, lay: "", rate: "" },
            teamA: { ...prev?.teamA, lay: "", rate: "" },
          };
        });
      }
    } else {
      if (e.target.name === "teamArate" && e.target.value >= 5) {
        setLocalQuickBookmaker((prev: any) => {
          let result = handleZeroValue(+targetValue, prev?.teamA?.lay);
          if (result) {
            return;
          }
          let value = Math.round(prev?.teamA?.rate) - incGap;

          const newBody = {
            ...prev,
            teamA: {
              ...prev?.teamA,
              lay: value ? value + incGap : incGap,
              rate: value ? value : 0,
            },
            teamB: { ...prev?.teamB, lay: "", rate: "" },
            teamC: { ...prev?.teamC, lay: "", rate: "" },
          };
          return newBody;
        });
      } else if (e.target.name === "teamBrate" && e.target.value >= 5) {
        setLocalQuickBookmaker((prev: any) => {
          let result = handleZeroValue(+targetValue, prev?.teamB?.lay);
          if (result) {
            return;
          }
          let value = Math.round(prev?.teamB?.rate) - incGap;

          const newBody = {
            ...prev,
            teamB: {
              ...prev?.teamB,
              lay: value ? value + incGap : incGap,
              rate: value ? value : 0,
            },
            teamA: { ...prev?.teamA, lay: "", rate: "" },
            teamC: { ...prev?.teamC, lay: "", rate: "" },
          };
          return newBody;
        });
      } else if (e.target.name === "teamCrate" && e.target.value >= 5) {
        setLocalQuickBookmaker((prev: any) => {
          let result = handleZeroValue(+targetValue, prev?.teamC?.lay);
          if (result) {
            return;
          }
          let value = Math.round(prev?.teamC?.rate) - incGap;

          const newBody = {
            ...prev,
            teamC: {
              ...prev?.teamC,
              lay: value ? value + incGap : incGap,
              rate: value ? value : 0,
            },
            teamB: { ...prev?.teamB, lay: "", rate: "" },
            teamA: { ...prev?.teamA, lay: "", rate: "" },
          };
          return newBody;
        });
      }
    }
  } else if (key === "*" || key === "l") {
    setIsTab("");
    if (e.target.name === "teamArate") {
      let value = e.target.value ? ++targetValue + 0.5 : 0;
      setIncGap(0.25);
      setLocalQuickBookmaker((prev: any) => {
        return {
          ...prev,
          teamA: { ...prev?.teamA, lay: value + 0.5, rate: value },
          teamB: { ...prev?.teamB, rate: "", lay: "" },
          teamC: { ...prev?.teamC, rate: "", lay: "" },
        };
      });
    } else if (e.target.name === "teamBrate") {
      let value = e.target.value ? ++targetValue + 0.5 : 0;
      setIncGap(0.25);
      setLocalQuickBookmaker((prev: any) => {
        return {
          ...prev,
          teamA: { ...prev?.teamA, rate: "", lay: "" },
          teamB: { ...prev?.teamB, lay: value + 0.5, rate: value },
          teamC: { ...prev?.teamC, rate: "", lay: "" },
        };
      });
    } else if (e.target.name === "teamCrate") {
      let value = e.target.value ? ++targetValue + 0.5 : 0;
      setIncGap(0.25);
      setLocalQuickBookmaker((prev: any) => {
        return {
          ...prev,
          teamA: { ...prev?.teamA, rate: "", lay: "" },
          teamB: { ...prev?.teamB, rate: "", lay: "" },
          teamC: { ...prev?.teamC, lay: value + 0.5, rate: value },
        };
      });
    }
  } else if (key === "/") {
    setIncGap(5);
    setIsTab("");
    if (e.target.name === "teamArate") {
      let value = e.target.value ? ++targetValue : 0;
      setLocalQuickBookmaker((prev: any) => {
        return {
          ...prev,
          teamA: { ...prev?.teamA, lay: value + 5, rate: value },
          teamB: { ...prev?.teamB, lay: "", rate: "" },
          teamC: { ...prev?.teamC, lay: "", rate: "" },
        };
      });
    } else if (e.target.name === "teamBrate") {
      let value = e.target.value ? ++targetValue : 0;
      setLocalQuickBookmaker((prev: any) => {
        return {
          ...prev,
          teamA: { ...prev?.teamA, lay: "", rate: "" },
          teamB: { ...prev?.teamB, lay: value + 5, rate: value },
          teamC: { ...prev?.teamC, lay: "", rate: "" },
        };
      });
    } else if (e.target.name === "teamCrate") {
      let value = e.target.value ? ++targetValue : 0;
      setLocalQuickBookmaker((prev: any) => {
        return {
          ...prev,
          teamA: { ...prev?.teamA, lay: "", rate: "" },
          teamB: { ...prev?.teamB, lay: "", rate: "" },
          teamC: { ...prev?.teamC, lay: value + 5, rate: value },
        };
      });
    }
  }
};
