import { socketService } from "../../../socketManager";
import { handleHunderedValue, handleSuspend, handleZeroValue } from "./Utils";

export const handleKeysMatchEvents = (
  Bid: any,
  type: any,
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
    setLocalQuickBookmaker((prev: any) => {
      let data = {
        matchId: match?.id,
        id: Bid,
        type: type,
        backTeamA: prev.teamA.back ? prev.teamA.back : 0,
        backTeamB: prev.teamB.back ? prev.teamB.back : 0,
        backTeamC: prev.teamC.back ? prev.teamC.back : 0,
        layTeamA: prev.teamA.lay ? prev.teamA.lay : 0,
        layTeamB: prev.teamB.lay ? prev.teamB.lay : 0,
        layTeamC: prev.teamC.lay ? prev.teamC.lay : 0,
        statusTeamA: "ball start",
        statusTeamB: "ball start",
        statusTeamC: "ball start",
      };
      socketService.user.updateMatchBettingRate(data);
      return prev;
    });
  } else if (key === "`") {
    setLocalQuickBookmaker((prev: any) => {
      if (
        !prev?.teamA?.suspended ||
        !prev?.teamB?.suspended ||
        !prev?.teamC?.suspended ||
        prev?.teamBall
      ) {
        let data = {
          matchId: match?.id,
          id: Bid,
          type: type,
          backTeamA: prev.teamA.back ? prev.teamA.back : 0,
          backTeamB: prev.teamB.back ? prev.teamB.back : 0,
          backTeamC: prev.teamC.back ? prev.teamC.back : 0,
          layTeamA: prev.teamA.lay ? prev.teamA.lay : 0,
          layTeamB: prev.teamB.lay ? prev.teamB.lay : 0,
          layTeamC: prev.teamC.lay ? prev.teamC.lay : 0,
          statusTeamA: "suspended",
          statusTeamB: "suspended",
          statusTeamC: "suspended",
        };
        socketService.user.updateMatchBettingRate(data);
      }
      return {
        ...prev,
        teamA: { ...prev.teamA, suspended: true },
        teamB: { ...prev.teamB, suspended: true },
        teamC: { ...prev.teamC, suspended: true },
        teamBall: false,
      };
    });
    setIsTab("");
    if (match?.teamC) {
      if (e.target.name === "teamArate") {
        innerRefTeamB.current.focus();
        setLocalQuickBookmaker((prev: any) => {
          return {
            ...prev,
            teamA: { ...prev.teamA, back: 0, lay: 0, suspended: true },
            teamB: { ...prev.teamB, back: 0, lay: 0, suspended: true },
            teamC: { ...prev.teamC, back: 0, lay: 0, suspended: true },
          };
        });
      } else if (e.target.name === "teamBrate") {
        innerRefTeamC.current.focus();
        setLocalQuickBookmaker((prev: any) => {
          return {
            ...prev,
            teamA: { ...prev.teamA, back: 0, lay: 0, suspended: true },
            teamB: { ...prev.teamB, back: 0, lay: 0, suspended: true },
            teamC: { ...prev.teamC, back: 0, lay: 0, suspended: true },
          };
        });
      } else if (e.target.name === "teamCrate") {
        innerRefTeamA.current.focus();
        setLocalQuickBookmaker((prev: any) => {
          return {
            ...prev,
            teamA: { ...prev.teamA, back: 0, lay: 0, suspended: true },
            teamB: { ...prev.teamB, back: 0, lay: 0, suspended: true },
            teamC: { ...prev.teamC, back: 0, lay: 0, suspended: true },
          };
        });
      }
    } else {
      if (e.target.name === "teamArate") {
        innerRefTeamB.current.focus();
        setLocalQuickBookmaker((prev: any) => {
          return {
            ...prev,
            teamA: { ...prev.teamA, back: 0, lay: 0 },
            teamB: { ...prev.teamB, back: 0, lay: 0 },
          };
        });
      } else if (e.target.name === "teamBrate") {
        innerRefTeamA.current.focus();
        setLocalQuickBookmaker((prev: any) => {
          return {
            ...prev,
            teamA: { ...prev.teamA, back: 0, lay: 0 },
            teamB: { ...prev.teamB, back: 0, lay: 0 },
          };
        });
      }
    }
  } else if (key === "right") {
    setLocalQuickBookmaker((prev: any) => {
      if (
        !prev?.teamA?.suspended ||
        !prev?.teamB?.suspended ||
        !prev?.teamC?.suspended ||
        prev?.teamBall
      ) {
        let data = {
          matchId: match?.id,
          id: Bid,
          type: type,
          backTeamA: prev.teamA.back ? prev.teamA.back : 0,
          backTeamB: prev.teamB.back ? prev.teamB.back : 0,
          backTeamC: prev.teamC.back ? prev.teamC.back : 0,
          layTeamA: prev.teamA.lay ? prev.teamA.lay : 0,
          layTeamB: prev.teamB.lay ? prev.teamB.lay : 0,
          layTeamC: prev.teamC.lay ? prev.teamC.lay : 0,
          statusTeamA: "suspended",
          statusTeamB: "suspended",
          statusTeamC: "suspended",
        };
        socketService.user.updateMatchBettingRate(data);
      }
      return {
        ...prev,
        teamA: { ...prev.teamA, suspended: true },
        teamB: { ...prev.teamB, suspended: true },
        teamC: { ...prev.teamC, suspended: true },
        teamBall: false,
      };
    });
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
          teamA: { ...prev.teamA, back: value, lay: checkValue + +incGap },
          teamB: { ...prev.teamB, back: 0, lay: 0 },
          teamC: { ...prev.teamC, back: 0, lay: 0 },
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
          teamB: { ...prev.teamB, back: value, lay: checkValue + +incGap },
          teamA: { ...prev.teamA, back: 0, lay: 0 },
          teamC: { ...prev.teamC, back: 0, lay: 0 },
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
          teamC: { ...prev.teamC, back: value, lay: checkValue + +incGap },
          teamB: { ...prev.teamB, back: 0, lay: 0 },
          teamA: { ...prev.teamA, back: 0, lay: 0 },
        };
      });
    }
  } else if (key === "d") {
    setLocalQuickBookmaker((prev: any) => {
      if (
        !prev?.teamA?.suspended ||
        !prev?.teamB?.suspended ||
        !prev?.teamC?.suspended ||
        prev?.teamBall
      ) {
      }
      return {
        ...prev,
        teamBall: false,
      };
    });
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
          teamA: { ...prev.teamA, back: value, lay: checkValue + +incGap },
          teamB: { ...prev.teamB, back: 0, lay: 0 },
          teamC: { ...prev.teamC, back: 0, lay: 0 },
        };
      });
      setLocalQuickBookmaker((prev: any) => {
        let data = {
          matchId: match?.id,
          id: Bid,
          type: type,
          backTeamA: prev.teamA.back ? prev.teamA.back : 0,
          backTeamB: prev.teamB.back ? prev.teamB.back : 0,
          backTeamC: prev.teamC.back ? prev.teamC.back : 0,
          layTeamA: prev.teamA.lay ? prev.teamA.lay : 0,
          layTeamB: prev.teamB.lay ? prev.teamB.lay : 0,
          layTeamC: prev.teamC.lay ? prev.teamC.lay : 0,
          statusTeamA: "active",
          statusTeamB: "suspended",
          statusTeamC: "suspended",
        };
        socketService.user.updateMatchBettingRate(data);
        return prev;
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
          teamB: { ...prev.teamB, back: value, lay: checkValue + +incGap },
          teamA: { ...prev.teamA, back: 0, lay: 0 },
          teamC: { ...prev.teamC, back: 0, lay: 0 },
        };
      });
      setLocalQuickBookmaker((prev: any) => {
        let data = {
          matchId: match?.id,
          id: Bid,
          type: type,
          backTeamA: prev.teamA.back ? prev.teamA.back : 0,
          backTeamB: prev.teamB.back ? prev.teamB.back : 0,
          backTeamC: prev.teamC.back ? prev.teamC.back : 0,
          layTeamA: prev.teamA.lay ? prev.teamA.lay : 0,
          layTeamB: prev.teamB.lay ? prev.teamB.lay : 0,
          layTeamC: prev.teamC.lay ? prev.teamC.lay : 0,
          statusTeamA: "suspended",
          statusTeamB: "active",
          statusTeamC: "suspended",
        };
        socketService.user.updateMatchBettingRate(data);
        return prev;
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
          teamC: { ...prev.teamC, back: value, lay: checkValue + +incGap },
          teamB: { ...prev.teamB, back: 0, lay: 0 },
          teamA: { ...prev.teamA, back: 0, lay: 0 },
        };
      });
      setLocalQuickBookmaker((prev: any) => {
        let data = {
          matchId: match?.id,
          id: Bid,
          type: type,
          backTeamA: prev.teamA.back ? prev.teamA.back : 0,
          backTeamB: prev.teamB.back ? prev.teamB.back : 0,
          backTeamC: prev.teamC.back ? prev.teamC.back : 0,
          layTeamA: prev.teamA.lay ? prev.teamA.lay : 0,
          layTeamB: prev.teamB.lay ? prev.teamB.lay : 0,
          layTeamC: prev.teamC.lay ? prev.teamC.lay : 0,
          statusTeamA: "suspended",
          statusTeamB: "suspended",
          statusTeamC: "active",
        };
        socketService.user.updateMatchBettingRate(data);
        return prev;
      });
    }
  } else if (key === "left") {
    setLocalQuickBookmaker((prev: any) => {
      if (
        !prev?.teamA?.suspended ||
        !prev?.teamB?.suspended ||
        !prev?.teamC?.suspended ||
        prev?.teamBall
      ) {
        let data = {
          matchId: match?.id,
          id: Bid,
          type: type,
          backTeamA: prev.teamA.back ? prev.teamA.back : 0,
          backTeamB: prev.teamB.back ? prev.teamB.back : 0,
          backTeamC: prev.teamC.back ? prev.teamC.back : 0,
          layTeamA: prev.teamA.lay ? prev.teamA.lay : 0,
          layTeamB: prev.teamB.lay ? prev.teamB.lay : 0,
          layTeamC: prev.teamC.lay ? prev.teamC.lay : 0,
          statusTeamA: "suspended",
          statusTeamB: "suspended",
          statusTeamC: "suspended",
        };
        socketService.user.updateMatchBettingRate(data);
      }
      return {
        ...prev,
        teamA: { ...prev.teamA, suspended: true },
        teamB: { ...prev.teamB, suspended: true },
        teamC: { ...prev.teamC, suspended: true },
        teamBall: false,
      };
    });
    setIsTab("");
    let value = +targetValue - +incGap;
    if (e.target.name === "teamArate") {
      setLocalQuickBookmaker((prev: any) => {
        if (+prev?.teamA?.back - incGap < 0) {
          return prev;
        }
        let checkValue = prev?.teamA?.lay
          ? prev?.teamA?.lay
          : prev?.teamA?.back;
        handleSuspend(value, +prev?.teamA?.lay - +incGap, incGap, setIncGap);
        return {
          ...prev,
          teamA: { ...prev.teamA, back: value, lay: checkValue - +incGap },
          teamB: { ...prev.teamB, back: 0, lay: 0 },
          teamC: { ...prev.teamC, back: 0, lay: 0 },
        };
      });
    }
    if (e.target.name === "teamBrate") {
      setLocalQuickBookmaker((prev: any) => {
        if (+prev?.teamB?.back - incGap < 0) {
          return prev;
        }
        let checkValue = prev?.teamB?.lay
          ? prev?.teamB?.lay
          : prev?.teamB?.back;
        handleSuspend(value, +prev?.teamB?.lay - +incGap, incGap, setIncGap);
        return {
          ...prev,
          teamB: { ...prev.teamB, back: value, lay: checkValue - +incGap },
          teamA: { ...prev.teamA, back: 0, lay: 0 },
          teamC: { ...prev.teamC, back: 0, lay: 0 },
        };
      });
    }
    if (e.target.name === "teamCrate") {
      setLocalQuickBookmaker((prev: any) => {
        if (+prev?.teamC?.back - incGap < 0) {
          return prev;
        }
        let checkValue = prev?.teamC?.lay
          ? prev?.teamC?.lay
          : prev?.teamC?.back;
        handleSuspend(value, +prev?.teamC?.lay - +incGap, incGap, setIncGap);
        return {
          ...prev,
          teamC: { ...prev.teamC, back: value, lay: checkValue - +incGap },
          teamB: { ...prev.teamB, back: 0, lay: 0 },
          teamA: { ...prev.teamA, back: 0, lay: 0 },
        };
      });
    }
  } else if (key === "a") {
    setLocalQuickBookmaker((prev: any) => {
      if (
        !prev?.teamA?.suspended ||
        !prev?.teamB?.suspended ||
        !prev?.teamC?.suspended ||
        prev?.teamBall
      ) {
      }
      return {
        ...prev,
        teamBall: false,
      };
    });
    setIsTab("");
    let value = +targetValue - +incGap;
    if (e.target.name === "teamArate") {
      setLocalQuickBookmaker((prev: any) => {
        if (+prev?.teamA?.back - incGap < 0) {
          return prev;
        }
        let checkValue = prev?.teamA?.lay
          ? prev?.teamA?.lay
          : prev?.teamA?.back;
        handleSuspend(value, +prev?.teamA?.lay - +incGap, incGap, setIncGap);
        return {
          ...prev,
          teamA: { ...prev.teamA, back: value, lay: checkValue - +incGap },
          teamB: { ...prev.teamB, back: 0, lay: 0 },
          teamC: { ...prev.teamC, back: 0, lay: 0 },
        };
      });
      setLocalQuickBookmaker((prev: any) => {
        let data = {
          matchId: match?.id,
          id: Bid,
          type: type,
          backTeamA: prev.teamA.back ? prev.teamA.back : 0,
          backTeamB: prev.teamB.back ? prev.teamB.back : 0,
          backTeamC: prev.teamC.back ? prev.teamC.back : 0,
          layTeamA: prev.teamA.lay ? prev.teamA.lay : 0,
          layTeamB: prev.teamB.lay ? prev.teamB.lay : 0,
          layTeamC: prev.teamC.lay ? prev.teamC.lay : 0,
          statusTeamA: "active",
          statusTeamB: "suspended",
          statusTeamC: "suspended",
        };
        socketService.user.updateMatchBettingRate(data);
        return prev;
      });
    }
    if (e.target.name === "teamBrate") {
      setLocalQuickBookmaker((prev: any) => {
        if (+prev?.teamB?.back - incGap < 0) {
          return prev;
        }
        let checkValue = prev?.teamB?.lay
          ? prev?.teamB?.lay
          : prev?.teamB?.back;
        handleSuspend(value, +prev?.teamB?.lay - +incGap, incGap, setIncGap);
        return {
          ...prev,
          teamB: { ...prev.teamB, back: value, lay: checkValue - +incGap },
          teamA: { ...prev.teamA, back: 0, lay: 0 },
          teamC: { ...prev.teamC, back: 0, lay: 0 },
        };
      });
      setLocalQuickBookmaker((prev: any) => {
        let data = {
          matchId: match?.id,
          id: Bid,
          type: type,
          backTeamA: prev.teamA.back ? prev.teamA.back : 0,
          backTeamB: prev.teamB.back ? prev.teamB.back : 0,
          backTeamC: prev.teamC.back ? prev.teamC.back : 0,
          layTeamA: prev.teamA.lay ? prev.teamA.lay : 0,
          layTeamB: prev.teamB.lay ? prev.teamB.lay : 0,
          layTeamC: prev.teamC.lay ? prev.teamC.lay : 0,
          statusTeamA: "suspended",
          statusTeamB: "active",
          statusTeamC: "suspended",
        };
        socketService.user.updateMatchBettingRate(data);
        return prev;
      });
    }
    if (e.target.name === "teamCrate") {
      setLocalQuickBookmaker((prev: any) => {
        if (+prev?.teamC?.back - incGap < 0) {
          return prev;
        }
        let checkValue = prev?.teamC?.lay
          ? prev?.teamC?.lay
          : prev?.teamC?.back;
        handleSuspend(value, +prev?.teamC?.lay - +incGap, incGap, setIncGap);
        return {
          ...prev,
          teamC: { ...prev.teamC, back: value, lay: checkValue - +incGap },
          teamB: { ...prev.teamB, back: 0, lay: 0 },
          teamA: { ...prev.teamA, back: 0, lay: 0 },
        };
      });
      setLocalQuickBookmaker((prev: any) => {
        let data = {
          matchId: match?.id,
          id: Bid,
          type: type,
          backTeamA: prev.teamA.back ? prev.teamA.back : 0,
          backTeamB: prev.teamB.back ? prev.teamB.back : 0,
          backTeamC: prev.teamC.back ? prev.teamC.back : 0,
          layTeamA: prev.teamA.lay ? prev.teamA.lay : 0,
          layTeamB: prev.teamB.lay ? prev.teamB.lay : 0,
          layTeamC: prev.teamC.lay ? prev.teamC.lay : 0,
          statusTeamA: "suspended",
          statusTeamB: "suspended",
          statusTeamC: "active",
        };
        socketService.user.updateMatchBettingRate(data);
        return prev;
      });
    }
  } else if (key === "up") {
    setLocalQuickBookmaker((prev: any) => {
      if (
        !prev?.teamA?.suspended ||
        !prev?.teamB?.suspended ||
        !prev?.teamC?.suspended ||
        prev?.teamBall
      ) {
        let data = {
          matchId: match?.id,
          id: Bid,
          type: type,
          backTeamA: prev.teamA.back ? prev.teamA.back : 0,
          backTeamB: prev.teamB.back ? prev.teamB.back : 0,
          backTeamC: prev.teamC.back ? prev.teamC.back : 0,
          layTeamA: prev.teamA.lay ? prev.teamA.lay : 0,
          layTeamB: prev.teamB.lay ? prev.teamB.lay : 0,
          layTeamC: prev.teamC.lay ? prev.teamC.lay : 0,
          statusTeamA: "suspended",
          statusTeamB: "suspended",
          statusTeamC: "suspended",
        };
        socketService.user.updateMatchBettingRate(data);
      }
      return {
        ...prev,
        teamA: { ...prev.teamA, suspended: true },
        teamB: { ...prev.teamB, suspended: true },
        teamC: { ...prev.teamC, suspended: true },
        teamBall: false,
      };
    });
    if (isTab == "tab") {
      setIsTab("");
    }
    if (e.target.name === "teamArate") {
      setLocalQuickBookmaker((prev: any) => {
        let result = handleHunderedValue(+targetValue, prev?.teamA?.lay);
        if (result) {
          return prev;
        }
        let value = prev?.teamA?.lay ? prev?.teamA?.lay : prev?.teamA?.back;
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
          teamB: { ...prev?.teamB, back: 0, lay: 0 },
          teamC: { ...prev?.teamC, back: 0, lay: 0 },
        };
      });
    } else if (e.target.name === "teamBrate") {
      setLocalQuickBookmaker((prev: any) => {
        let result = handleHunderedValue(+targetValue, prev?.teamB?.lay);
        if (result) {
          return prev;
        }
        let value = prev?.teamB?.lay ? prev?.teamB?.lay : prev?.teamB?.back;
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
          teamA: { ...prev?.teamA, back: 0, lay: 0 },
          teamC: { ...prev?.teamC, back: 0, lay: 0 },
        };
      });
    } else if (e.target.name === "teamCrate") {
      setLocalQuickBookmaker((prev: any) => {
        let result = handleHunderedValue(+targetValue, prev?.teamC?.lay);
        if (result) {
          return prev;
        }
        let value = prev?.teamC?.lay ? prev?.teamC?.lay : prev?.teamC?.back;
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
          teamB: { ...prev?.teamB, back: 0, lay: 0 },
          teamA: { ...prev?.teamA, back: 0, lay: 0 },
        };
      });
    }
  } else if (key === "w") {
    setLocalQuickBookmaker((prev: any) => {
      if (
        !prev?.teamA?.suspended ||
        !prev?.teamB?.suspended ||
        !prev?.teamC?.suspended ||
        prev?.teamBall
      ) {
      }
      return {
        ...prev,
        teamBall: false,
      };
    });
    if (isTab == "tab") {
      setIsTab("");
    }
    if (e.target.name === "teamArate") {
      setLocalQuickBookmaker((prev: any) => {
        let result = handleHunderedValue(+targetValue, prev?.teamA?.lay);
        if (result) {
          return prev;
        }
        let value = prev?.teamA?.lay ? prev?.teamA?.lay : prev?.teamA?.back;
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
          teamB: { ...prev?.teamB, back: 0, lay: 0 },
          teamC: { ...prev?.teamC, back: 0, lay: 0 },
        };
      });
      setLocalQuickBookmaker((prev: any) => {
        let data = {
          matchId: match?.id,
          id: Bid,
          type: type,
          backTeamA: prev.teamA.back ? prev.teamA.back : 0,
          backTeamB: prev.teamB.back ? prev.teamB.back : 0,
          backTeamC: prev.teamC.back ? prev.teamC.back : 0,
          layTeamA: prev.teamA.lay ? prev.teamA.lay : 0,
          layTeamB: prev.teamB.lay ? prev.teamB.lay : 0,
          layTeamC: prev.teamC.lay ? prev.teamC.lay : 0,
          statusTeamA: "active",
          statusTeamB: "suspended",
          statusTeamC: "suspended",
        };
        socketService.user.updateMatchBettingRate(data);
        return prev;
      });
    } else if (e.target.name === "teamBrate") {
      setLocalQuickBookmaker((prev: any) => {
        let result = handleHunderedValue(+targetValue, prev?.teamB?.lay);
        if (result) {
          return prev;
        }
        let value = prev?.teamB?.lay ? prev?.teamB?.lay : prev?.teamB?.back;
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
          teamA: { ...prev?.teamA, back: 0, lay: 0 },
          teamC: { ...prev?.teamC, back: 0, lay: 0 },
        };
      });
      setLocalQuickBookmaker((prev: any) => {
        let data = {
          matchId: match?.id,
          id: Bid,
          type: type,
          backTeamA: prev.teamA.back ? prev.teamA.back : 0,
          backTeamB: prev.teamB.back ? prev.teamB.back : 0,
          backTeamC: prev.teamC.back ? prev.teamC.back : 0,
          layTeamA: prev.teamA.lay ? prev.teamA.lay : 0,
          layTeamB: prev.teamB.lay ? prev.teamB.lay : 0,
          layTeamC: prev.teamC.lay ? prev.teamC.lay : 0,
          statusTeamA: "suspended",
          statusTeamB: "active",
          statusTeamC: "suspended",
        };
        socketService.user.updateMatchBettingRate(data);
        return prev;
      });
    } else if (e.target.name === "teamCrate") {
      setLocalQuickBookmaker((prev: any) => {
        let result = handleHunderedValue(+targetValue, prev?.teamC?.lay);
        if (result) {
          return prev;
        }
        let value = prev?.teamC?.lay ? prev?.teamC?.lay : prev?.teamC?.back;
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
          teamB: { ...prev?.teamB, back: 0, lay: 0 },
          teamA: { ...prev?.teamA, back: 0, lay: 0 },
        };
      });
      setLocalQuickBookmaker((prev: any) => {
        let data = {
          matchId: match?.id,
          id: Bid,
          type: type,
          backTeamA: prev.teamA.back ? prev.teamA.back : 0,
          backTeamB: prev.teamB.back ? prev.teamB.back : 0,
          backTeamC: prev.teamC.back ? prev.teamC.back : 0,
          layTeamA: prev.teamA.lay ? prev.teamA.lay : 0,
          layTeamB: prev.teamB.lay ? prev.teamB.lay : 0,
          layTeamC: prev.teamC.lay ? prev.teamC.lay : 0,
          statusTeamA: "suspended",
          statusTeamB: "suspended",
          statusTeamC: "active",
        };
        socketService.user.updateMatchBettingRate(data);
        return prev;
      });
    }
  } else if (key === "down") {
    setLocalQuickBookmaker((prev: any) => {
      if (
        !prev?.teamA?.suspended ||
        !prev?.teamB?.suspended ||
        !prev?.teamC?.suspended ||
        prev?.teamBall
      ) {
        let data = {
          matchId: match?.id,
          id: Bid,
          type: type,
          backTeamA: prev.teamA.back ? prev.teamA.back : 0,
          backTeamB: prev.teamB.back ? prev.teamB.back : 0,
          backTeamC: prev.teamC.back ? prev.teamC.back : 0,
          layTeamA: prev.teamA.lay ? prev.teamA.lay : 0,
          layTeamB: prev.teamB.lay ? prev.teamB.lay : 0,
          layTeamC: prev.teamC.lay ? prev.teamC.lay : 0,
          statusTeamA: "suspended",
          statusTeamB: "suspended",
          statusTeamC: "suspended",
        };
        socketService.user.updateMatchBettingRate(data);
      }
      return {
        ...prev,
        teamA: { ...prev.teamA, suspended: true },
        teamB: { ...prev.teamB, suspended: true },
        teamC: { ...prev.teamC, suspended: true },
        teamBall: false,
      };
    });
    setIsTab("");
    if (e.target.name === "teamArate") {
      setLocalQuickBookmaker((prev: any) => {
        if (
          prev?.teamA?.lay - 1 > prev?.teamA?.back ||
          prev?.teamA?.lay - incGap > prev?.teamA?.back
        ) {
          handleSuspend(
            prev?.teamA?.back,
            prev?.teamA?.lay - 1,
            incGap,
            setIncGap
          );
          return {
            ...prev,
            teamA: {
              ...prev?.teamA,
              lay: prev?.teamA?.lay ? prev?.teamA?.lay - 1 : prev?.teamA?.back,
            },
            teamB: { ...prev?.teamB, back: 0, lay: 0 },
            teamC: { ...prev?.teamC, back: 0, lay: 0 },
          };
        } else return prev;
      });
    } else if (e.target.name === "teamBrate") {
      setLocalQuickBookmaker((prev: any) => {
        if (
          prev?.teamB?.lay - 1 > prev?.teamB?.back ||
          prev?.teamB?.lay - incGap > prev?.teamB?.back
        ) {
          handleSuspend(
            prev?.teamB?.back,
            prev?.teamB?.lay - 1,
            incGap,
            setIncGap
          );
          return {
            ...prev,
            teamB: {
              ...prev?.teamB,
              lay: prev?.teamB?.lay ? prev?.teamB?.lay - 1 : prev?.teamB?.back,
            },
            teamA: { ...prev?.teamA, back: 0, lay: 0 },
            teamC: { ...prev?.teamC, back: 0, lay: 0 },
          };
        } else return prev;
      });
    } else if (e.target.name === "teamCrate") {
      setLocalQuickBookmaker((prev: any) => {
        if (
          prev?.teamC?.lay - 1 > prev?.teamC?.back ||
          prev?.teamC?.lay - incGap > prev?.teamC?.back
        ) {
          handleSuspend(
            prev?.teamC?.back,
            prev?.teamC?.lay - 1,
            incGap,
            setIncGap
          );
          return {
            ...prev,
            teamC: {
              ...prev?.teamC,
              lay: prev?.teamC?.lay ? prev?.teamC?.lay - 1 : prev?.teamC?.back,
            },
            teamB: { ...prev?.teamB, back: 0, lay: 0 },
            teamA: { ...prev?.teamA, back: 0, lay: 0 },
          };
        } else return prev;
      });
    }
  } else if (key === "z") {
    setLocalQuickBookmaker((prev: any) => {
      if (
        !prev?.teamA?.suspended ||
        !prev?.teamB?.suspended ||
        !prev?.teamC?.suspended ||
        prev?.teamBall
      ) {
      }
      return {
        ...prev,
        teamBall: false,
      };
    });
    setIsTab("");
    if (e.target.name === "teamArate") {
      setLocalQuickBookmaker((prev: any) => {
        if (
          prev?.teamA?.lay - 1 > prev?.teamA?.back ||
          prev?.teamA?.lay - incGap > prev?.teamA?.back
        ) {
          handleSuspend(
            prev?.teamA?.back,
            prev?.teamA?.lay - 1,
            incGap,
            setIncGap
          );
          return {
            ...prev,
            teamA: {
              ...prev?.teamA,
              lay: prev?.teamA?.lay ? prev?.teamA?.lay - 1 : prev?.teamA?.back,
            },
            teamB: { ...prev?.teamB, back: 0, lay: 0 },
            teamC: { ...prev?.teamC, back: 0, lay: 0 },
          };
        } else return prev;
      });
      setLocalQuickBookmaker((prev: any) => {
        let data = {
          matchId: match?.id,
          id: Bid,
          type: type,
          backTeamA: prev.teamA.back ? prev.teamA.back : 0,
          backTeamB: prev.teamB.back ? prev.teamB.back : 0,
          backTeamC: prev.teamC.back ? prev.teamC.back : 0,
          layTeamA: prev.teamA.lay ? prev.teamA.lay : 0,
          layTeamB: prev.teamB.lay ? prev.teamB.lay : 0,
          layTeamC: prev.teamC.lay ? prev.teamC.lay : 0,
          statusTeamA: "active",
          statusTeamB: "suspended",
          statusTeamC: "suspended",
        };
        socketService.user.updateMatchBettingRate(data);
        return prev;
      });
    } else if (e.target.name === "teamBrate") {
      setLocalQuickBookmaker((prev: any) => {
        if (
          prev?.teamB?.lay - 1 > prev?.teamB?.back ||
          prev?.teamB?.lay - incGap > prev?.teamB?.back
        ) {
          handleSuspend(
            prev?.teamB?.back,
            prev?.teamB?.lay - 1,
            incGap,
            setIncGap
          );
          return {
            ...prev,
            teamB: {
              ...prev?.teamB,
              lay: prev?.teamB?.lay ? prev?.teamB?.lay - 1 : prev?.teamB?.back,
            },
            teamA: { ...prev?.teamA, back: 0, lay: 0 },
            teamC: { ...prev?.teamC, back: 0, lay: 0 },
          };
        } else return prev;
      });
      setLocalQuickBookmaker((prev: any) => {
        let data = {
          matchId: match?.id,
          id: Bid,
          type: type,
          backTeamA: prev.teamA.back ? prev.teamA.back : 0,
          backTeamB: prev.teamB.back ? prev.teamB.back : 0,
          backTeamC: prev.teamC.back ? prev.teamC.back : 0,
          layTeamA: prev.teamA.lay ? prev.teamA.lay : 0,
          layTeamB: prev.teamB.lay ? prev.teamB.lay : 0,
          layTeamC: prev.teamC.lay ? prev.teamC.lay : 0,
          statusTeamA: "suspended",
          statusTeamB: "active",
          statusTeamC: "suspended",
        };
        socketService.user.updateMatchBettingRate(data);
        return prev;
      });
    } else if (e.target.name === "teamCrate") {
      setLocalQuickBookmaker((prev: any) => {
        if (
          prev?.teamC?.lay - 1 > prev?.teamC?.back ||
          prev?.teamC?.lay - incGap > prev?.teamC?.back
        ) {
          handleSuspend(
            prev?.teamC?.back,
            prev?.teamC?.lay - 1,
            incGap,
            setIncGap
          );
          return {
            ...prev,
            teamC: {
              ...prev?.teamC,
              lay: prev?.teamC?.lay ? prev?.teamC?.lay - 1 : prev?.teamC?.back,
            },
            teamB: { ...prev?.teamB, back: 0, lay: 0 },
            teamA: { ...prev?.teamA, back: 0, lay: 0 },
          };
        } else return prev;
      });
      setLocalQuickBookmaker((prev: any) => {
        let data = {
          matchId: match?.id,
          id: Bid,
          type: type,
          backTeamA: prev.teamA.back ? prev.teamA.back : 0,
          backTeamB: prev.teamB.back ? prev.teamB.back : 0,
          backTeamC: prev.teamC.back ? prev.teamC.back : 0,
          layTeamA: prev.teamA.lay ? prev.teamA.lay : 0,
          layTeamB: prev.teamB.lay ? prev.teamB.lay : 0,
          layTeamC: prev.teamC.lay ? prev.teamC.lay : 0,
          statusTeamA: "suspended",
          statusTeamB: "suspended",
          statusTeamC: "active",
        };
        socketService.user.updateMatchBettingRate(data);
        return prev;
      });
    }
  } else if (key === "esc") {
    setLocalQuickBookmaker((prev: any) => {
      if (
        !prev?.teamA?.suspended ||
        !prev?.teamB?.suspended ||
        !prev?.teamC?.suspended ||
        prev?.teamBall
      ) {
        let data = {
          matchId: match?.id,
          id: Bid,
          type: type,
          backTeamA: prev.teamA.back ? prev.teamA.back : 0,
          backTeamB: prev.teamB.back ? prev.teamB.back : 0,
          backTeamC: prev.teamC.back ? prev.teamC.back : 0,
          layTeamA: prev.teamA.lay ? prev.teamA.lay : 0,
          layTeamB: prev.teamB.lay ? prev.teamB.lay : 0,
          layTeamC: prev.teamC.lay ? prev.teamC.lay : 0,
          statusTeamA: "suspended",
          statusTeamB: "suspended",
          statusTeamC: "suspended",
        };
        socketService.user.updateMatchBettingRate(data);
      }
      return {
        ...prev,
        teamA: { ...prev.teamA, suspended: true },
        teamB: { ...prev.teamB, suspended: true },
        teamC: { ...prev.teamC, suspended: true },
        teamBall: false,
      };
    });
    setIsTab("");
    setIncGap(1);
    if (e.target.name === "teamArate") {
      setLocalQuickBookmaker((prev: any) => {
        let teamARateDecimal = +prev?.teamA?.back % 1;
        let value;
        if (teamARateDecimal >= 0.5) {
          value = Math.round(prev?.teamA?.back) - 1;
        } else {
          value = Math.round(prev?.teamA?.back);
        }
        return {
          ...prev,
          teamA: { ...prev?.teamA, lay: +value + 1, back: +value },
          teamB: { ...prev?.teamB, lay: 0, back: 0 },
          teamC: { ...prev?.teamC, lay: 0, back: 0 },
        };
      });
    } else if (e.target.name === "teamBrate") {
      setLocalQuickBookmaker((prev: any) => {
        let teamBRateDecimal = +prev?.teamB?.back % 1;
        let value;
        if (teamBRateDecimal >= 0.5) {
          value = Math.round(prev?.teamB?.back) - 1;
        } else {
          value = Math.round(prev?.teamB?.back);
        }
        return {
          ...prev,
          teamA: { ...prev?.teamA, lay: 0, back: 0 },
          teamB: { ...prev?.teamB, lay: +value + 1, back: +value },
          teamC: { ...prev?.teamC, lay: 0, back: 0 },
        };
      });
    } else if (e.target.name === "teamCrate") {
      setLocalQuickBookmaker((prev: any) => {
        let teamCRateDecimal = +prev?.teamC?.back % 1;
        let value;
        if (teamCRateDecimal >= 0.5) {
          value = Math.round(prev?.teamC?.back) - 1;
        } else {
          value = Math.round(prev?.teamC?.back);
        }
        return {
          ...prev,
          teamA: { ...prev?.teamA, lay: 0, back: 0 },
          teamB: { ...prev?.teamB, lay: 0, back: 0 },
          teamC: { ...prev?.teamC, lay: +value + 1, back: +value },
        };
      });
    }
  } else if (key === "enter" || key === "return") {
    if (isTab !== "tab") {
      if (e.target.name === "teamArate") {
        setLocalQuickBookmaker((prev: any) => {
          return {
            ...prev,
            teamA: {
              ...prev.teamA,
              suspended:
                [null, 0].includes(prev?.teamA?.lay) ||
                [null, 0].includes(prev?.teamA?.back)
                  ? true
                  : false,
            },
            teamB: { ...prev.teamB, suspended: true },
            teamC: { ...prev.teamC, suspended: true },
          };
        });
        setLocalQuickBookmaker((prev: any) => {
          let data = {
            matchId: match?.id,
            id: Bid,
            type: type,
            backTeamA: prev.teamA.back ? prev.teamA.back : 0,
            backTeamB: prev.teamB.back ? prev.teamB.back : 0,
            backTeamC: prev.teamC.back ? prev.teamC.back : 0,
            layTeamA: prev.teamA.lay ? prev.teamA.lay : 0,
            layTeamB: prev.teamB.lay ? prev.teamB.lay : 0,
            layTeamC: prev.teamC.lay ? prev.teamC.lay : 0,
            statusTeamA: "active",
            statusTeamB: "suspended",
            statusTeamC: "suspended",
          };
          socketService.user.updateMatchBettingRate(data);
          return prev;
        });
      } else if (e.target.name === "teamBrate") {
        setLocalQuickBookmaker((prev: any) => {
          return {
            ...prev,
            teamA: { ...prev.teamA, suspended: true },
            teamB: {
              ...prev.teamB,
              suspended:
                [null, 0].includes(prev?.teamB?.lay) ||
                [null, 0].includes(prev?.teamB?.back)
                  ? true
                  : false,
            },
            teamC: { ...prev.teamC, suspended: true },
          };
        });
        setLocalQuickBookmaker((prev: any) => {
          let data = {
            matchId: match?.id,
            id: Bid,
            type: type,
            backTeamA: prev.teamA.back ? prev.teamA.back : 0,
            backTeamB: prev.teamB.back ? prev.teamB.back : 0,
            backTeamC: prev.teamC.back ? prev.teamC.back : 0,
            layTeamA: prev.teamA.lay ? prev.teamA.lay : 0,
            layTeamB: prev.teamB.lay ? prev.teamB.lay : 0,
            layTeamC: prev.teamC.lay ? prev.teamC.lay : 0,
            statusTeamA: "suspended",
            statusTeamB: "active",
            statusTeamC: "suspended",
          };
          socketService.user.updateMatchBettingRate(data);
          return prev;
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
                [null, 0].includes(prev?.teamC?.lay) ||
                [null, 0].includes(prev?.teamC?.back)
                  ? true
                  : false,
            },
          };
        });
        setLocalQuickBookmaker((prev: any) => {
          let data = {
            matchId: match?.id,
            id: Bid,
            type: type,
            backTeamA: prev.teamA.back ? prev.teamA.back : 0,
            backTeamB: prev.teamB.back ? prev.teamB.back : 0,
            backTeamC: prev.teamC.back ? prev.teamC.back : 0,
            layTeamA: prev.teamA.lay ? prev.teamA.lay : 0,
            layTeamB: prev.teamB.lay ? prev.teamB.lay : 0,
            layTeamC: prev.teamC.lay ? prev.teamC.lay : 0,
            statusTeamA: "suspended",
            statusTeamB: "suspended",
            statusTeamC: "active",
          };
          socketService.user.updateMatchBettingRate(data);
          return prev;
        });
      }
    }
  } else if (key === "ctrl") {
    setIncGap(1);
    setIsTab("");
  } else if (key === "tab") {
    setIsTab("tab");
    if (targetValue > 0) {
      setLocalQuickBookmaker((prev: any) => {
        return {
          ...prev,
          teamA: {
            ...prev?.teamA,
            lay: 0,
            back: +targetValue,
            suspended: false,
          },
          teamB: {
            ...prev?.teamB,
            lay: 0,
            back: +targetValue,
            suspended: false,
          },
          teamC: {
            ...prev?.teamC,
            lay: 0,
            back: +targetValue,
            suspended: false,
          },
        };
      });
      setLocalQuickBookmaker((prev: any) => {
        let data = {
          matchId: match?.id,
          id: Bid,
          type: type,
          backTeamA: prev.teamA.back ? prev.teamA.back : 0,
          backTeamB: prev.teamB.back ? prev.teamB.back : 0,
          backTeamC: prev.teamC.back ? prev.teamC.back : 0,
          layTeamA: prev.teamA.lay ? prev.teamA.lay : 0,
          layTeamB: prev.teamB.lay ? prev.teamB.lay : 0,
          layTeamC: prev.teamC.lay ? prev.teamC.lay : 0,
          statusTeamA: "active",
          statusTeamB: "active",
          statusTeamC: "active",
        };
        socketService.user.updateMatchBettingRate(data);
        return prev;
      });
    }
  } else if (key === ",") {
    if (isTab == "tab") {
      setIsTab("");
    }
    setIncGap(1);
    if (e.target.name === "teamArate") {
      setLocalQuickBookmaker((prev: any) => {
        if (prev?.teamA?.back > 0.5 || +targetValue > 0.5) {
          let teamARateDecimal = prev?.teamA?.back % 1;
          let value: any;
          if (teamARateDecimal >= 0.5) {
            value = prev?.teamA?.back
              ? Math.round(prev?.teamA?.back)
              : +targetValue
              ? +targetValue
              : 0;
          } else {
            value = prev?.teamA?.back
              ? Math.round(prev?.teamA?.back)
              : +targetValue
              ? +targetValue
              : 0;
          }
          return {
            ...prev,
            teamA: { ...prev?.teamA, lay: value + 1, back: value - 0.5 },
            teamB: { ...prev?.teamB, back: 0, lay: 0 },
            teamC: { ...prev?.teamC, lay: 0, back: 0 },
          };
        }
      });
      setLocalQuickBookmaker((prev: any) => {
        let data = {
          matchId: match?.id,
          id: Bid,
          type: type,
          backTeamA: prev.teamA.back ? prev.teamA.back : 0,
          backTeamB: prev.teamB.back ? prev.teamB.back : 0,
          backTeamC: prev.teamC.back ? prev.teamC.back : 0,
          layTeamA: prev.teamA.lay ? prev.teamA.lay : 0,
          layTeamB: prev.teamB.lay ? prev.teamB.lay : 0,
          layTeamC: prev.teamC.lay ? prev.teamC.lay : 0,
          statusTeamA: "active",
          statusTeamB: "suspended",
          statusTeamC: "suspended",
        };
        socketService.user.updateMatchBettingRate(data);
        return prev;
      });
    } else if (e.target.name === "teamBrate") {
      setLocalQuickBookmaker((prev: any) => {
        if (prev?.teamB?.back > 0.5 || +targetValue > 0.5) {
          let teamARateDecimal = prev?.teamB?.back % 1;
          let value: any;
          if (teamARateDecimal >= 0.5) {
            value = prev?.teamB?.back
              ? Math.round(prev?.teamB?.back)
              : +targetValue
              ? +targetValue
              : 0;
          } else {
            value = prev?.teamB?.back
              ? Math.round(prev?.teamB?.back)
              : +targetValue
              ? +targetValue
              : 0;
          }
          return {
            ...prev,
            teamB: { ...prev?.teamB, lay: value + 1, back: value - 0.5 },
            teamA: { ...prev?.teamA, back: 0, lay: 0 },
            teamC: { ...prev?.teamC, lay: 0, back: 0 },
          };
        }
      });
      setLocalQuickBookmaker((prev: any) => {
        let data = {
          matchId: match?.id,
          id: Bid,
          type: type,
          backTeamA: prev.teamA.back ? prev.teamA.back : 0,
          backTeamB: prev.teamB.back ? prev.teamB.back : 0,
          backTeamC: prev.teamC.back ? prev.teamC.back : 0,
          layTeamA: prev.teamA.lay ? prev.teamA.lay : 0,
          layTeamB: prev.teamB.lay ? prev.teamB.lay : 0,
          layTeamC: prev.teamC.lay ? prev.teamC.lay : 0,
          statusTeamA: "suspended",
          statusTeamB: "active",
          statusTeamC: "suspended",
        };
        socketService.user.updateMatchBettingRate(data);
        return prev;
      });
    } else if (e.target.name === "teamCrate") {
      setLocalQuickBookmaker((prev: any) => {
        if (prev?.teamC?.back > 0.5 || +targetValue > 0.5) {
          let teamARateDecimal = prev?.teamC?.back % 1;
          let value: any;
          if (teamARateDecimal >= 0.5) {
            value = prev?.teamC?.back
              ? Math.round(prev?.teamC?.back)
              : +targetValue
              ? +targetValue
              : 0;
          } else {
            value = prev?.teamC?.back
              ? Math.round(prev?.teamC?.back)
              : +targetValue
              ? +targetValue
              : 0;
          }
          return {
            ...prev,
            teamA: { ...prev?.teamA, lay: 0, back: 0 },
            teamB: { ...prev?.teamB, back: 0, lay: 0 },
            teamC: { ...prev?.teamC, lay: value + 1, back: value - 0.5 },
          };
        }
      });
      setLocalQuickBookmaker((prev: any) => {
        let data = {
          matchId: match?.id,
          id: Bid,
          type: type,
          backTeamA: prev.teamA.back ? prev.teamA.back : 0,
          backTeamB: prev.teamB.back ? prev.teamB.back : 0,
          backTeamC: prev.teamC.back ? prev.teamC.back : 0,
          layTeamA: prev.teamA.lay ? prev.teamA.lay : 0,
          layTeamB: prev.teamB.lay ? prev.teamB.lay : 0,
          layTeamC: prev.teamC.lay ? prev.teamC.lay : 0,
          statusTeamA: "suspended",
          statusTeamB: "suspended",
          statusTeamC: "active",
        };
        socketService.user.updateMatchBettingRate(data);
        return prev;
      });
    }
  } else if (key === ".") {
    if (isTab == "tab") {
      setIsTab("");
    }
    setIncGap(1);
    if (e.target.name === "teamArate") {
      setLocalQuickBookmaker((prev: any) => {
        let teamARateDecimal = prev?.teamA?.back
          ? prev?.teamA?.back
          : +targetValue % 1;
        let value: number;
        if (teamARateDecimal >= 0.5) {
          value = prev?.teamA?.back
            ? Math.round(prev?.teamA?.back)
            : +targetValue
            ? +targetValue
            : 0;
        } else {
          value = prev?.teamA?.back
            ? Math.round(prev?.teamA?.back)
            : +targetValue
            ? +targetValue
            : 0;
        }

        let result = handleHunderedValue(value, value + 1.5);
        if (result) {
          return prev;
        }

        return {
          ...prev,
          teamA: { ...prev?.teamA, lay: value + 1.5, back: value },
          teamB: { ...prev?.teamB, back: 0, lay: 0 },
          teamC: { ...prev?.teamC, back: 0, lay: 0 },
        };
      });
      setLocalQuickBookmaker((prev: any) => {
        let data = {
          matchId: match?.id,
          id: Bid,
          type: type,
          backTeamA: prev.teamA.back ? prev.teamA.back : 0,
          backTeamB: prev.teamB.back ? prev.teamB.back : 0,
          backTeamC: prev.teamC.back ? prev.teamC.back : 0,
          layTeamA: prev.teamA.lay ? prev.teamA.lay : 0,
          layTeamB: prev.teamB.lay ? prev.teamB.lay : 0,
          layTeamC: prev.teamC.lay ? prev.teamC.lay : 0,
          statusTeamA: "active",
          statusTeamB: "suspended",
          statusTeamC: "suspended",
        };
        socketService.user.updateMatchBettingRate(data);
        return prev;
      });
    } else if (e.target.name === "teamBrate") {
      setLocalQuickBookmaker((prev: any) => {
        let teamARateDecimal = prev?.teamB?.back
          ? prev?.teamB?.back
          : +targetValue % 1;
        let value: number;
        if (teamARateDecimal >= 0.5) {
          value = prev?.teamB?.back
            ? Math.round(prev?.teamB?.back)
            : +targetValue
            ? +targetValue
            : 0;
        } else {
          value = prev?.teamB?.back
            ? Math.round(prev?.teamB?.back)
            : +targetValue
            ? +targetValue
            : 0;
        }
        return {
          ...prev,
          teamA: { ...prev?.teamA, back: 0, lay: 0 },
          teamB: { ...prev?.teamB, lay: value + 1.5, back: value },
          teamC: { ...prev?.teamC, back: 0, lay: 0 },
        };
      });
      setLocalQuickBookmaker((prev: any) => {
        let data = {
          matchId: match?.id,
          id: Bid,
          type: type,
          backTeamA: prev.teamA.back ? prev.teamA.back : 0,
          backTeamB: prev.teamB.back ? prev.teamB.back : 0,
          backTeamC: prev.teamC.back ? prev.teamC.back : 0,
          layTeamA: prev.teamA.lay ? prev.teamA.lay : 0,
          layTeamB: prev.teamB.lay ? prev.teamB.lay : 0,
          layTeamC: prev.teamC.lay ? prev.teamC.lay : 0,
          statusTeamA: "suspended",
          statusTeamB: "active",
          statusTeamC: "suspended",
        };
        socketService.user.updateMatchBettingRate(data);
        return prev;
      });
    } else if (e.target.name === "teamCrate") {
      setLocalQuickBookmaker((prev: any) => {
        let teamARateDecimal = prev?.teamC?.back
          ? prev?.teamC?.back
          : +targetValue % 1;
        let value: number;
        if (teamARateDecimal >= 0.5) {
          value = prev?.teamC?.back
            ? Math.round(prev?.teamC?.back)
            : +targetValue
            ? +targetValue
            : 0;
        } else {
          value = prev?.teamC?.back
            ? Math.round(prev?.teamC?.back)
            : +targetValue
            ? +targetValue
            : 0;
        }
        return {
          ...prev,
          teamA: { ...prev?.teamA, back: 0, lay: 0 },
          teamB: { ...prev?.teamB, back: 0, lay: 0 },
          teamC: { ...prev?.teamC, lay: value + 1.5, back: value },
        };
      });
      setLocalQuickBookmaker((prev: any) => {
        let data = {
          matchId: match?.id,
          id: Bid,
          type: type,
          backTeamA: prev.teamA.back ? prev.teamA.back : 0,
          backTeamB: prev.teamB.back ? prev.teamB.back : 0,
          backTeamC: prev.teamC.back ? prev.teamC.back : 0,
          layTeamA: prev.teamA.lay ? prev.teamA.lay : 0,
          layTeamB: prev.teamB.lay ? prev.teamB.lay : 0,
          layTeamC: prev.teamC.lay ? prev.teamC.lay : 0,
          statusTeamA: "suspended",
          statusTeamB: "suspended",
          statusTeamC: "active",
        };
        socketService.user.updateMatchBettingRate(data);
        return prev;
      });
    }
  } else if (key === "minus") {
    setLocalQuickBookmaker((prev: any) => {
      if (
        !prev?.teamA?.suspended ||
        !prev?.teamB?.suspended ||
        !prev?.teamC?.suspended ||
        prev?.teamBall
      ) {
        let data = {
          matchId: match?.id,
          id: Bid,
          type: type,
          backTeamA: prev.teamA.back ? prev.teamA.back : 0,
          backTeamB: prev.teamB.back ? prev.teamB.back : 0,
          backTeamC: prev.teamC.back ? prev.teamC.back : 0,
          layTeamA: prev.teamA.lay ? prev.teamA.lay : 0,
          layTeamB: prev.teamB.lay ? prev.teamB.lay : 0,
          layTeamC: prev.teamC.lay ? prev.teamC.lay : 0,
          statusTeamA: "suspended",
          statusTeamB: "suspended",
          statusTeamC: "suspended",
        };
        socketService.user.updateMatchBettingRate(data);
      }
      return {
        ...prev,
        teamA: { ...prev.teamA, suspended: true },
        teamB: { ...prev.teamB, suspended: true },
        teamC: { ...prev.teamC, suspended: true },
        teamBall: false,
      };
    });
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
          let teamARateDecimal = prev?.teamA?.back % 1;
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
            teamA: { ...prev?.teamA, back: value, lay: value + 1 },
            teamB: { ...prev?.teamB, lay: 0, back: 0 },
            teamC: { ...prev?.teamC, lay: 0, back: 0 },
          };
        });
      } else if (e.target.name === "teamBrate") {
        setLocalQuickBookmaker((prev: any) => {
          let result = handleZeroValue(+targetValue, prev?.teamB?.lay);
          if (result) {
            return;
          }
          let teamARateDecimal = prev?.teamB?.back % 1;
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
            teamB: { ...prev?.teamB, back: value, lay: value + 1 },
            teamA: { ...prev?.teamA, lay: 0, back: 0 },
            teamC: { ...prev?.teamC, lay: 0, back: 0 },
          };
        });
      } else if (e.target.name === "teamCrate") {
        setLocalQuickBookmaker((prev: any) => {
          let result = handleZeroValue(+targetValue, prev?.teamC?.lay);
          if (result) {
            return;
          }
          let teamARateDecimal = prev?.teamC?.back % 1;
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
            teamC: { ...prev?.teamC, back: value, lay: value + 1 },
            teamB: { ...prev?.teamB, lay: 0, back: 0 },
            teamA: { ...prev?.teamA, lay: 0, back: 0 },
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
          let value = Math.round(prev?.teamA?.back) - incGap;

          const newBody = {
            ...prev,
            teamA: {
              ...prev?.teamA,
              lay: value ? value + incGap : incGap,
              back: value ? value : 0,
            },
            teamB: { ...prev?.teamB, lay: 0, back: 0 },
            teamC: { ...prev?.teamC, lay: 0, back: 0 },
          };
          return newBody;
        });
      } else if (e.target.name === "teamBrate" && e.target.value >= 5) {
        setLocalQuickBookmaker((prev: any) => {
          let result = handleZeroValue(+targetValue, prev?.teamB?.lay);
          if (result) {
            return;
          }
          let value = Math.round(prev?.teamB?.back) - incGap;

          const newBody = {
            ...prev,
            teamB: {
              ...prev?.teamB,
              lay: value ? value + incGap : incGap,
              back: value ? value : 0,
            },
            teamA: { ...prev?.teamA, lay: 0, back: 0 },
            teamC: { ...prev?.teamC, lay: 0, back: 0 },
          };
          return newBody;
        });
      } else if (e.target.name === "teamCrate" && e.target.value >= 5) {
        setLocalQuickBookmaker((prev: any) => {
          let result = handleZeroValue(+targetValue, prev?.teamC?.lay);
          if (result) {
            return;
          }
          let value = Math.round(prev?.teamC?.back) - incGap;

          const newBody = {
            ...prev,
            teamC: {
              ...prev?.teamC,
              lay: value ? value + incGap : incGap,
              back: value ? value : 0,
            },
            teamB: { ...prev?.teamB, lay: 0, back: 0 },
            teamA: { ...prev?.teamA, lay: 0, back: 0 },
          };
          return newBody;
        });
      }
    }
  } else if (key === "*" || key === "l") {
    setLocalQuickBookmaker((prev: any) => {
      if (
        !prev?.teamA?.suspended ||
        !prev?.teamB?.suspended ||
        !prev?.teamC?.suspended ||
        prev?.teamBall
      ) {
        let data = {
          matchId: match?.id,
          id: Bid,
          type: type,
          backTeamA: prev.teamA.back ? prev.teamA.back : 0,
          backTeamB: prev.teamB.back ? prev.teamB.back : 0,
          backTeamC: prev.teamC.back ? prev.teamC.back : 0,
          layTeamA: prev.teamA.lay ? prev.teamA.lay : 0,
          layTeamB: prev.teamB.lay ? prev.teamB.lay : 0,
          layTeamC: prev.teamC.lay ? prev.teamC.lay : 0,
          statusTeamA: "suspended",
          statusTeamB: "suspended",
          statusTeamC: "suspended",
        };
        socketService.user.updateMatchBettingRate(data);
      }
      return {
        ...prev,
        teamA: { ...prev.teamA, suspended: true },
        teamB: { ...prev.teamB, suspended: true },
        teamC: { ...prev.teamC, suspended: true },
        teamBall: false,
      };
    });
    setIsTab("");
    if (e.target.name === "teamArate") {
      let value = e.target.value ? ++targetValue + 0.5 : 0;
      setIncGap(0.25);
      setLocalQuickBookmaker((prev: any) => {
        return {
          ...prev,
          teamA: { ...prev?.teamA, lay: value + 0.5, back: value },
          teamB: { ...prev?.teamB, back: 0, lay: 0 },
          teamC: { ...prev?.teamC, back: 0, lay: 0 },
        };
      });
    } else if (e.target.name === "teamBrate") {
      let value = e.target.value ? ++targetValue + 0.5 : 0;
      setIncGap(0.25);
      setLocalQuickBookmaker((prev: any) => {
        return {
          ...prev,
          teamA: { ...prev?.teamA, back: 0, lay: 0 },
          teamB: { ...prev?.teamB, lay: value + 0.5, back: value },
          teamC: { ...prev?.teamC, back: 0, lay: 0 },
        };
      });
    } else if (e.target.name === "teamCrate") {
      let value = e.target.value ? ++targetValue + 0.5 : 0;
      setIncGap(0.25);
      setLocalQuickBookmaker((prev: any) => {
        return {
          ...prev,
          teamA: { ...prev?.teamA, back: 0, lay: 0 },
          teamB: { ...prev?.teamB, back: 0, lay: 0 },
          teamC: { ...prev?.teamC, lay: value + 0.5, back: value },
        };
      });
    }
  } else if (key === "/") {
    setLocalQuickBookmaker((prev: any) => {
      if (
        !prev?.teamA?.suspended ||
        !prev?.teamB?.suspended ||
        !prev?.teamC?.suspended ||
        prev?.teamBall
      ) {
        let data = {
          matchId: match?.id,
          id: Bid,
          type: type,
          backTeamA: prev.teamA.back ? prev.teamA.back : 0,
          backTeamB: prev.teamB.back ? prev.teamB.back : 0,
          backTeamC: prev.teamC.back ? prev.teamC.back : 0,
          layTeamA: prev.teamA.lay ? prev.teamA.lay : 0,
          layTeamB: prev.teamB.lay ? prev.teamB.lay : 0,
          layTeamC: prev.teamC.lay ? prev.teamC.lay : 0,
          statusTeamA: "suspended",
          statusTeamB: "suspended",
          statusTeamC: "suspended",
        };
        socketService.user.updateMatchBettingRate(data);
      }
      return {
        ...prev,
        teamA: { ...prev.teamA, suspended: true },
        teamB: { ...prev.teamB, suspended: true },
        teamC: { ...prev.teamC, suspended: true },
        teamBall: false,
      };
    });
    setIncGap(5);
    setIsTab("");
    if (e.target.name === "teamArate") {
      let value = e.target.value ? ++targetValue : 0;
      setLocalQuickBookmaker((prev: any) => {
        return {
          ...prev,
          teamA: { ...prev?.teamA, lay: value + 5, back: value },
          teamB: { ...prev?.teamB, lay: 0, back: 0 },
          teamC: { ...prev?.teamC, lay: 0, back: 0 },
        };
      });
    } else if (e.target.name === "teamBrate") {
      let value = e.target.value ? ++targetValue : 0;
      setLocalQuickBookmaker((prev: any) => {
        return {
          ...prev,
          teamA: { ...prev?.teamA, lay: 0, back: 0 },
          teamB: { ...prev?.teamB, lay: value + 5, back: value },
          teamC: { ...prev?.teamC, lay: 0, back: 0 },
        };
      });
    } else if (e.target.name === "teamCrate") {
      let value = e.target.value ? ++targetValue : 0;
      setLocalQuickBookmaker((prev: any) => {
        return {
          ...prev,
          teamA: { ...prev?.teamA, lay: 0, back: 0 },
          teamB: { ...prev?.teamB, lay: 0, back: 0 },
          teamC: { ...prev?.teamC, lay: value + 5, back: value },
        };
      });
    }
  }
};
