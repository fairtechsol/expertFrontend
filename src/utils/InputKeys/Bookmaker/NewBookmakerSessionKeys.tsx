import { socketService } from "../../../socketManager";
import { rates } from "./Rates";
import { handleHunderedValue, handleSuspend, handleZeroValue } from "./Utils";

export const handleKeysMatchEvents = (
    Bid: any,
    key: any,
    e: any,
    setLocalQuickBookmaker: any,
    match: any,
    incGap: number,
    setIncGap: any,
    isTab: string,
    setIsTab: any,
) => {
    try {
        e.preventDefault();
        let targetValue = e.target.value;
        if (key === "shift") {
            setLocalQuickBookmaker((prev: any) => {
                return {
                    ...prev,
                    teamBall: match?.matchType === "cricket" ? true : false,
                };
            });
            setLocalQuickBookmaker((prev: any) => {
                let data = {
                    matchId: match?.id,
                    id: Bid,
                    teams: prev.teams?.map((item: any) => ({
                        back: item.back,
                        lay: item.lay,
                        id: item.id,
                        status: match?.matchType === "cricket" ? "ball start" : "suspended",
                    })),
                };
                socketService.user.updateMatchBettingRate(data);
                return prev;
            });
        } else if (key === "`") {
            setLocalQuickBookmaker((prev: any) => {
                if (
                    prev.teams?.find((item: any) => !item.suspended) ||
                    prev?.teamBall
                ) {
                    let data = {
                        matchId: match?.id,
                        id: Bid,
                        teams: prev.teams?.map((item: any) => ({
                            back: 0,
                            lay: 0,
                            id: item.id,
                            status: "suspended",
                        })),
                    };
                    socketService.user.updateMatchBettingRate(data);
                }
                return {
                    ...prev,
                    teams: prev.teams?.map((item: any) => ({
                        ...item,
                        suspended: true,
                    })),
                    teamBall: false,
                };
            });
            setIsTab("");
            // innerRefTeam.current.focus();
            setLocalQuickBookmaker((prev: any) => {
                return {
                    ...prev,
                    teams: prev.teams?.map((item: any) => {
                        return {
                            ...item,
                            back: 0,
                            lay: 0,
                            suspended: true,
                        };
                    }),
                };
            });
        } else if (key === "right") {
            setIsTab("");
            let value = +targetValue ? +targetValue + +incGap : +incGap;
            setLocalQuickBookmaker((prev: any) => {
                const currTeam = prev.teams?.find(
                    (item: any) => item.id == e.target.name
                );
                let result = handleHunderedValue(+targetValue, +currTeam?.lay, match);
                if (result) {
                    return prev;
                }
                let checkValue = currTeam?.lay ?? value;
                handleSuspend(
                    +targetValue + +incGap,
                    +checkValue + +incGap,
                    incGap,
                    setIncGap
                );
                return {
                    ...prev,
                    teams: prev.teams?.map((item: any) => {
                        if (item.id == e.target.name) {
                            return {
                                ...item,
                                back: value,
                                lay: checkValue + +incGap,
                                rightBack: value,
                                rightLay: checkValue + +incGap,
                            };
                        }
                        else {
                            return {
                                ...item,
                                back: Number(rates[checkValue + +incGap] ?? 0),
                                lay: Number(rates[value] ?? 0),
                                rightBack: Number(rates[checkValue + +incGap] ?? 0),
                                rightLay: Number(rates[value] ?? 0),
                            };
                        }
                        // return { ...item, back: 0, lay: 0, rightBack: 0, rightLay: 0 };
                    }),
                };
            });

            setLocalQuickBookmaker((prev: any) => {
                if (
                    prev.teams?.find((item: any) => !item.suspended) ||
                    prev?.teamBall
                ) {
                    let data = {
                        matchId: match?.id,
                        id: Bid,
                        teams: prev.teams?.map((item: any) => ({
                            back: item.back ?? 0,
                            lay: item.lay ?? 0,
                            id: item.id,
                            status: "suspended",
                        })),
                    };
                    socketService.user.updateMatchBettingRate(data);
                }
                return {
                    ...prev,
                    teams: prev.teams?.map((item: any) => ({
                        ...item,
                        suspended: true,
                    })),
                    teamBall: false,
                };
            });
        } else if (key === "d") {
            setLocalQuickBookmaker((prev: any) => {
                if (
                    prev.teams?.find((item: any) => !item.suspended) ||
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
            setLocalQuickBookmaker((prev: any) => {
                const currTeam = prev.teams?.find(
                    (item: any) => item.id == e.target.name
                );
                let result = handleHunderedValue(+targetValue, +currTeam?.lay, match);
                if (result) {
                    return prev;
                }
                let checkValue = currTeam?.lay ? currTeam?.lay : value;
                handleSuspend(
                    +targetValue + +incGap,
                    +checkValue + +incGap,
                    incGap,
                    setIncGap
                );
                return {
                    ...prev,
                    teams: prev.teams?.map((item: any) => {
                        if (item.id == e.target.name) {
                            return {
                                ...item,
                                back: value,
                                lay: checkValue + +incGap,
                            };
                        }
                        else {
                            return {
                                ...item,
                                back: Number(rates[checkValue + +incGap] ?? 0),
                                lay: Number(rates[value] ?? 0),
                            }
                        }
                        // return { ...item, back: 0, lay: 0 };
                    }),
                };
            });
            setLocalQuickBookmaker((prev: any) => {
                let data = {
                    matchId: match?.id,
                    id: Bid,
                    teams: prev.teams?.map((item: any) => {
                        if (item.id == e.target.name) {
                            return {
                                back: item.back ?? 0,
                                lay: item.lay ?? 0,
                                id: item.id,
                                status: "active",
                            };
                        }
                        else {
                            return {
                                back: Number(rates[item.lay] ?? 0),
                                lay: Number(rates[item.back] ?? 0),
                                id: item.id,
                                status: "active",
                            }
                        }
                        // return {
                        //     back: item.back ?? 0,
                        //     lay: item.lay ?? 0,
                        //     id: item.id,
                        //     status: "suspended",
                        // };
                    }),
                };
                socketService.user.updateMatchBettingRate(data);
                return prev;
            });
        } else if (key === "left") {
            setIsTab("");
            let value = +targetValue - +incGap;
            setLocalQuickBookmaker((prev: any) => {
                const currTeam = prev.teams?.find(
                    (item: any) => item.id == e.target.name
                );
                if (+currTeam?.back - incGap < 0) {
                    return prev;
                }
                let checkValue = currTeam?.lay ?? currTeam?.back;
                handleSuspend(value, +currTeam?.lay - +incGap, incGap, setIncGap);
                return {
                    ...prev,
                    teams: prev.teams?.map((item: any) => {
                        if (item.id == e.target.name) {
                            return {
                                ...item,
                                back: value,
                                lay: checkValue - +incGap,
                                rightBack: value,
                                rightLay: checkValue - +incGap,
                            };
                        } else {
                            return {
                                ...item,
                                back: Number(rates[checkValue - +incGap] ?? 0),
                                lay: Number(rates[value] ?? 0),
                                rightBack: Number(rates[checkValue - +incGap] ?? 0),
                                rightLay: Number(rates[value] ?? 0),
                            };
                        }
                        // return { ...item, back: 0, lay: 0, rightBack: 0, rightLay: 0 };
                    }),
                };
            });

            setLocalQuickBookmaker((prev: any) => {
                if (
                    prev.teams?.find((item: any) => !item.suspended) ||
                    prev?.teamBall
                ) {
                    let data = {
                        matchId: match?.id,
                        id: Bid,
                        teams: prev.teams?.map((item: any) => ({
                            back: item.back ?? 0,
                            lay: item.lay ?? 0,
                            id: item.id,
                            status: "suspended",
                        })),
                    };
                    socketService.user.updateMatchBettingRate(data);
                }
                return {
                    ...prev,
                    teams: prev.teams?.map((item: any) => ({
                        ...item,
                        suspended: true,
                    })),
                    teamBall: false,
                };
            });
        } else if (key === "a") {
            setLocalQuickBookmaker((prev: any) => {
                if (
                    prev.teams?.find((item: any) => !item.suspended) ||
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
            setLocalQuickBookmaker((prev: any) => {
                const currTeam = prev.teams?.find(
                    (item: any) => item.id == e.target.name
                );
                if (+currTeam?.back - incGap < 0) {
                    return prev;
                }
                let checkValue = currTeam?.lay ? currTeam?.lay : currTeam?.back;
                handleSuspend(value, +currTeam?.lay - +incGap, incGap, setIncGap);
                return {
                    ...prev,
                    teams: prev.teams?.map((item: any) => {
                        if (item.id == e.target.name) {
                            return {
                                ...item,
                                back: value,
                                lay: checkValue - +incGap,
                            };
                        } else {
                            return {
                                ...item,
                                back: Number(rates[checkValue - +incGap] ?? 0),
                                lay: Number(rates[value] ?? 0),
                            }
                        }
                        // return { ...item, back: 0, lay: 0 };
                    }),
                };
            });
            setLocalQuickBookmaker((prev: any) => {
                let data = {
                    matchId: match?.id,
                    id: Bid,
                    teams: prev.teams?.map((item: any) => {
                        if (item.id == e.target.name) {
                            return {
                                back: item.back ?? 0,
                                lay: item.lay ?? 0,
                                id: item.id,
                                status: "active",
                            };
                        }
                        return {
                            back: Number(rates[item.lay] ?? 0),
                            lay: Number(rates[item.back] ?? 0),
                            id: item.id,
                            status: "active",

                            // back: item.back ?? 0,
                            // lay: item.lay ?? 0,
                            // id: item.id,
                            // status: "suspended",
                        };
                    }),
                };
                socketService.user.updateMatchBettingRate(data);
                return prev;
            });
        } else if (key === "up") {
            if (isTab == "tab") {
                setIsTab("");
            }

            setLocalQuickBookmaker((prev: any) => {
                const currTeam = prev.teams?.find(
                    (item: any) => item.id == e.target.name
                );
                let result = handleHunderedValue(+targetValue, currTeam?.lay, match);
                if (result) {
                    return prev;
                }
                let value = currTeam?.lay ? currTeam?.lay : currTeam?.back;
                handleSuspend(+targetValue, value + 1, incGap, setIncGap);
                return {
                    ...prev,
                    teams: prev.teams?.map((item: any) => {
                        if (item.id == e.target.name) {
                            return {
                                ...item,
                                lay:
                                    incGap < 1
                                        ? value + incGap
                                        : value === 0
                                            ? 1
                                            : value
                                                ? value + 1
                                                : NaN,
                                rightLay:
                                    incGap < 1
                                        ? value + incGap
                                        : value === 0
                                            ? 1
                                            : value
                                                ? value + 1
                                                : NaN,
                            };
                        } else {
                            return {
                                ...item,
                                back: Number(rates[incGap < 1
                                    ? value + incGap
                                    : value === 0
                                        ? 1
                                        : value
                                            ? value + 1
                                            : 0]),
                                rightBack: Number(rates[incGap < 1
                                    ? value + incGap
                                    : value === 0
                                        ? 1
                                        : value
                                            ? value + 1
                                            : 0]),
                            }
                        }
                        // return {
                        //     ...item,
                        //     back: 0,
                        //     lay: 0,
                        //     rightBack: 0,
                        //     rightLay: 0,
                        // };
                    }),
                };
            });

            setLocalQuickBookmaker((prev: any) => {
                let data = {
                    matchId: match?.id,
                    id: Bid,
                    teams: prev.teams?.map((item: any) => {
                        return {
                            back: item.back ?? 0,
                            lay: item.lay ?? 0,
                            id: item.id,
                            status: "suspended",
                        };
                    }),
                };
                socketService.user.updateMatchBettingRate(data);
                return {
                    ...prev,
                    teams: prev.teams?.map((item: any) => ({ ...item, suspended: true })),
                };
            });
        } else if (key === "w") {
            setLocalQuickBookmaker((prev: any) => {
                if (
                    prev.teams?.find((item: any) => !item.suspended) ||
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
            setLocalQuickBookmaker((prev: any) => {
                const currTeam = prev.teams?.find(
                    (item: any) => item.id == e.target.name
                );
                let result = handleHunderedValue(+targetValue, currTeam?.lay, match);
                if (result) {
                    return prev;
                }
                let value = currTeam?.lay ? currTeam?.lay : currTeam?.back;
                handleSuspend(+targetValue, value + 1, incGap, setIncGap);
                return {
                    ...prev,
                    teams: prev.teams?.map((item: any) => {
                        if (item.id == e.target.name) {
                            return {
                                ...item,
                                lay:
                                    incGap < 1
                                        ? value + incGap
                                        : value === 0
                                            ? 1
                                            : value
                                                ? value + 1
                                                : 0,
                            };
                        } else {
                            return {
                                ...item,
                                back: Number(rates[incGap < 1
                                    ? value + incGap
                                    : value === 0
                                        ? 1
                                        : value
                                            ? value + 1
                                            : 0]),
                            };
                            // return {
                            //     ...item,
                            //     back: 0,
                            //     lay: 0,
                            // };
                        }
                    }),
                };
            });
            setLocalQuickBookmaker((prev: any) => {
                let data = {
                    matchId: match?.id,
                    id: Bid,
                    teams: prev.teams?.map((item: any) => {
                        if (item.id == e.target.name) {
                            return {
                                back: item.back ?? 0,
                                lay: item.lay ?? 0,
                                id: item.id,
                                status: "active",
                            };
                        }
                        return {
                            back: item.back ?? 0,
                            lay: item.lay ?? 0,
                            id: item.id,
                            status: "suspended",
                        };
                    }),
                };
                socketService.user.updateMatchBettingRate(data);
                return prev;
            });
        } else if (key === "down") {
            setIsTab("");
            setLocalQuickBookmaker((prev: any) => {
                const currTeam = prev.teams?.find(
                    (item: any) => item.id == e.target.name
                );
                if (
                    currTeam?.lay - 1 > currTeam?.back ||
                    currTeam?.lay - incGap > currTeam?.back
                ) {
                    handleSuspend(currTeam?.back, currTeam?.lay - 1, incGap, setIncGap);
                    return {
                        ...prev,
                        teams: prev.teams?.map((item: any) => {
                            if (item.id == e.target.name) {
                                return {
                                    ...item,
                                    lay: currTeam?.lay ? currTeam?.lay - 1 : currTeam?.back,
                                    rightLay: currTeam?.lay ? currTeam?.lay - 1 : currTeam?.back,
                                };
                            } else {
                                return {
                                    ...item,
                                    back: Number(rates[currTeam?.lay ? currTeam?.lay - 1 : currTeam?.back] ?? 0),
                                    rightBack: Number(rates[currTeam?.lay ? currTeam?.lay - 1 : currTeam?.back] ?? 0),
                                }
                            }
                            // return {
                            //     ...item,
                            //     back: 0,
                            //     lay: 0,
                            //     rightBack: 0,
                            //     rightLay: 0,
                            // };
                        }),
                    };
                } else return prev;
            });

            setLocalQuickBookmaker((prev: any) => {
                let data = {
                    matchId: match?.id,
                    id: Bid,
                    teams: prev.teams?.map((item: any) => {
                        return {
                            back: item.back ?? 0,
                            lay: item.lay ?? 0,
                            id: item.id,
                            status: "suspended",
                        };
                    }),
                };
                socketService.user.updateMatchBettingRate(data);
                return {
                    ...prev,
                    teams: prev.teams?.map((item: any) => ({ ...item, suspended: true })),
                };
            });
        } else if (key === "z") {
            setLocalQuickBookmaker((prev: any) => {
                if (
                    prev.teams?.find((item: any) => !item.suspended) ||
                    prev?.teamBall
                ) {
                }
                return {
                    ...prev,
                    teamBall: false,
                };
            });
            setIsTab("");
            setLocalQuickBookmaker((prev: any) => {
                const currTeam = prev.teams?.find(
                    (item: any) => item.id == e.target.name
                );
                if (
                    currTeam?.lay - 1 > currTeam?.back ||
                    currTeam?.lay - incGap > currTeam?.back
                ) {
                    handleSuspend(currTeam?.back, currTeam?.lay - 1, incGap, setIncGap);
                    return {
                        ...prev,
                        teams: prev.teams?.map((item: any) => {
                            if (item.id == e.target.name) {
                                return {
                                    ...item,
                                    lay: currTeam?.lay ? currTeam?.lay - 1 : currTeam?.back,
                                };
                            } else {
                                return {
                                    ...item,
                                    back: Number(rates[currTeam?.lay ? currTeam?.lay - 1 : currTeam?.back] ?? 0),
                                }

                            }
                            // return { ...item, back: 0, lay: 0 };
                        }),
                    };
                } else return prev;
            });
            setLocalQuickBookmaker((prev: any) => {
                let data = {
                    matchId: match?.id,
                    id: Bid,
                    teams: prev.teams?.map((item: any) => {
                        if (item.id == e.target.name) {
                            return {
                                back: item.back ?? 0,
                                lay: item.lay ?? 0,
                                id: item.id,
                                status: "active",
                            };
                        }
                        return {
                            back: item.back ?? 0,
                            lay: item.lay ?? 0,
                            id: item.id,
                            status: "suspended",
                        };
                    }),
                };
                socketService.user.updateMatchBettingRate(data);
                return prev;
            });
        } else if (key === "esc") {
            setIsTab("");
            setIncGap(1);
            setLocalQuickBookmaker((prev: any) => {
                const currTeam = prev.teams?.find(
                    (item: any) => item.id == e.target.name
                );
                let teamARateDecimal = +currTeam?.back % 1;
                let value = 0;
                if (teamARateDecimal >= 0.5) {
                    value = Math.round(currTeam?.back) - 1;
                } else {
                    value = Math.round(currTeam?.back);
                }
                return {
                    ...prev,
                    teams: prev.teams?.map((item: any) => {
                        if (item.id == e.target.name) {
                            return {
                                ...item,
                                lay: +value + 1,
                                back: +value,
                                rightLay: +value + 1,
                                rightBack: +value,
                            };
                        }
                        else {
                            return {
                                ...item,
                                back: Number(rates[+value + 1] ?? 0),
                                lay: Number(rates[+value] ?? 0),
                                rightBack: Number(rates[+value + 1] ?? 0),
                                rightLay: Number(rates[+value] ?? 0),
                            }

                        }
                        // return {
                        //     ...item,
                        //     back: 0,
                        //     lay: 0,
                        //     rightBack: 0,
                        //     rightLay: 0,
                        // };
                    }),
                };
            });

            setLocalQuickBookmaker((prev: any) => {
                let data = {
                    matchId: match?.id,
                    id: Bid,
                    teams: prev.teams?.map((item: any) => {
                        return {
                            back: item.back ?? 0,
                            lay: item.lay ?? 0,
                            id: item.id,
                            status: "suspended",
                        };
                    }),
                };
                socketService.user.updateMatchBettingRate(data);
                return {
                    ...prev,
                    teams: prev.teams?.map((item: any) => ({ ...item, suspended: true })),
                };
            });
        } else if (key === "enter" || key === "return") {
            if (isTab !== "tab") {
                setLocalQuickBookmaker((prev: any) => {
                    const currTeam = prev.teams?.find(
                        (item: any) => item.id == e.target.name
                    );
                    return {
                        ...prev,
                        teams: prev.teams?.map((item: any) => {
                            if (item.id == e.target.name) {
                                return {
                                    ...item,
                                    suspended:
                                        [null, 0].includes(currTeam?.lay) ||
                                            [null, 0].includes(currTeam?.back)
                                            ? true
                                            : false,
                                };
                            }
                            return {
                                ...item,
                                suspended: false,
                            };
                        }),
                    };
                });
                setLocalQuickBookmaker((prev: any) => {
                    let data = {
                        matchId: match?.id,
                        id: Bid,
                        teams: prev.teams?.map((item: any) => {
                            if (item.id == e.target.name) {
                                return {
                                    back: item.back ?? 0,
                                    lay: item.lay ?? 0,
                                    id: item.id,
                                    status: "active",
                                };
                            } else {
                                return {
                                    ...item,
                                    back: Number(rates[item.lay ?? 0] ?? 0),
                                    lay: Number(rates[item.back ?? 0] ?? 0),
                                    id: item.id,
                                    status: "active",
                                }
                            }
                            // return {
                            //     back: item.back ?? 0,
                            //     lay: item.lay ?? 0,
                            //     id: item.id,
                            //     status: "suspended",
                            // };
                        }),
                    };
                    socketService.user.updateMatchBettingRate(data);
                    return prev;
                });
            } else {
                setLocalQuickBookmaker((prev: any) => {
                    let data = {
                        matchId: match?.id,
                        id: Bid,
                        teams: prev.teams?.map((item: any) => {
                            return {
                                back: item.back ?? 0,
                                lay: item.lay ?? 0,
                                id: item.id,
                                status: "active",
                            };
                        }),
                    };
                    socketService.user.updateMatchBettingRate(data);
                    return prev;
                });
            }
            setLocalQuickBookmaker((prev: any) => {
                return {
                    ...prev,
                    teamBall: false,
                };
            });
        } else if (key === "ctrl") {
            setIncGap(1);
            setIsTab("");
        } else if (key === "tab") {
            setIsTab("tab");
            if (targetValue > 0) {
                setLocalQuickBookmaker((prev: any) => {
                    return {
                        ...prev,
                        teams: prev.teams?.map((item: any) => {
                            return {
                                ...item,
                                lay: 0,
                                back: +targetValue,
                                suspended: false,
                            };
                        }),
                        teamBall: false,
                    };
                });
                setLocalQuickBookmaker((prev: any) => {
                    let data = {
                        matchId: match?.id,
                        id: Bid,
                        teams: prev.teams?.map((item: any) => {
                            return {
                                back: item.back ?? 0,
                                lay: item.lay ?? 0,
                                id: item.id,
                                status: "active",
                            };
                        }),
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
            setLocalQuickBookmaker((prev: any) => {
                const currTeam = prev.teams?.find(
                    (item: any) => item.id == e.target.name
                );
                if (currTeam?.back > 0.5 || +targetValue > 0.5) {
                    let teamARateDecimal = currTeam?.back % 1;
                    let value: any;
                    if (teamARateDecimal >= 0.5) {
                        value = currTeam?.back
                            ? Math.round(currTeam?.back)
                            : +targetValue
                                ? +targetValue
                                : 0;
                    } else {
                        value = currTeam?.back
                            ? Math.round(currTeam?.back)
                            : +targetValue
                                ? +targetValue
                                : 0;
                    }
                    return {
                        ...prev,
                        teams: prev.teams?.map((item: any) => {
                            if (item.id == e.target.name) {
                                return {
                                    ...item,
                                    lay: value + 1,
                                    back: value - 0.5,
                                };
                            } else {
                                return {
                                    ...item,
                                    back: Number(rates[value + 1] ?? 0),
                                    lay: Number(rates[value - 0.5] ?? 0),
                                }
                            }
                            // return { ...item, back: 0, lay: 0 };
                        }),
                    };
                } else return prev;
            });
            setLocalQuickBookmaker((prev: any) => {
                let data = {
                    matchId: match?.id,
                    id: Bid,
                    teams: prev.teams?.map((item: any) => {
                        if (item.id == e.target.name) {
                            return {
                                back: item.back ?? 0,
                                lay: item.lay ?? 0,
                                id: item.id,
                                status: "active",
                            };
                        }
                        return {
                            back: item.back ?? 0,
                            lay: item.lay ?? 0,
                            id: item.id,
                            status: "suspended",
                        };
                    }),
                };
                socketService.user.updateMatchBettingRate(data);
                return prev;
            });
        } else if (key === ".") {
            if (isTab == "tab") {
                setIsTab("");
            }
            setIncGap(1);
            setLocalQuickBookmaker((prev: any) => {
                const currTeam = prev.teams?.find(
                    (item: any) => item.id == e.target.name
                );
                let teamARateDecimal = currTeam?.back
                    ? currTeam?.back
                    : +targetValue % 1;
                let value: number;
                if (teamARateDecimal >= 0.5) {
                    value = currTeam?.back
                        ? Math.round(currTeam?.back)
                        : +targetValue
                            ? +targetValue
                            : 0;
                } else {
                    value = currTeam?.back
                        ? Math.round(currTeam?.back)
                        : +targetValue
                            ? +targetValue
                            : 0;
                }

                let result = handleHunderedValue(value, value + 1.5, match);
                if (result) {
                    return prev;
                }

                return {
                    ...prev,
                    teams: prev.teams?.map((item: any) => {
                        if (item.id == e.target.name) {
                            return {
                                ...item,
                                lay: value + 1.5,
                                back: value,
                            };
                        } else {
                            return {
                                ...item,
                                back: Number(rates[value + 1.5] ?? 0),
                                lay: Number(rates[value] ?? 0),
                            }
                        }
                        // return { ...item, back: 0, lay: 0 };
                    }),
                };
            });
            setLocalQuickBookmaker((prev: any) => {
                let data = {
                    matchId: match?.id,
                    id: Bid,
                    teams: prev.teams?.map((item: any) => {
                        if (item.id == e.target.name) {
                            return {
                                back: item.back ?? 0,
                                lay: item.lay ?? 0,
                                id: item.id,
                                status: "active",
                            };
                        }
                        return {
                            back: item.back ?? 0,
                            lay: item.lay ?? 0,
                            id: item.id,
                            status: "suspended",
                        };
                    }),
                };
                socketService.user.updateMatchBettingRate(data);
                return prev;
            });
        } else if (key === "minus") {
            if (isTab == "tab") {
                setIsTab("");
            }
            if (incGap != 5) {
                setIncGap(0.5);
                setLocalQuickBookmaker((prev: any) => {
                    const currTeam = prev.teams?.find(
                        (item: any) => item.id == e.target.name
                    );
                    let result = handleZeroValue(+targetValue, currTeam?.lay);
                    if (result) {
                        return prev;
                    }
                    let teamARateDecimal = currTeam?.back % 1;
                    let value: any;
                    if (teamARateDecimal >= 0.5) {
                        value = parseFloat(e.target.value) - 1;
                    } else {
                        value = parseFloat(e.target.value) - 0.5;
                    }

                    if (!value) {
                        return prev;
                    }
                    return {
                        ...prev,
                        teams: prev.teams?.map((item: any) => {
                            if (item.id == e.target.name) {
                                return {
                                    ...item,
                                    back: value,
                                    lay: value + 1,
                                    rightBack: value,
                                    rightLay: value + 1,
                                };
                            } else {
                                return {
                                    ...item,
                                    back: Number(rates[value + 1] ?? 0),
                                    lay: Number(rates[value] ?? 0),
                                    rightBack: Number(rates[value + 1] ?? 0),
                                    rightLay: Number(rates[value] ?? 0),
                                }
                            }
                            // return { ...item, lay: 0, back: 0, rightBack: 0, rightLay: 0 };
                        }),
                    };
                });
            } else {
                if (e.target.value >= 5) {
                    setLocalQuickBookmaker((prev: any) => {
                        const currTeam = prev.teams?.find(
                            (item: any) => item.id == e.target.name
                        );
                        let result = handleZeroValue(+targetValue, currTeam?.lay);
                        if (result) {
                            return prev;
                        }
                        let value = Math.round(currTeam?.back) - incGap;

                        const newBody = {
                            ...prev,
                            teams: prev.teams?.map((item: any) => {
                                if (item.id == e.target.name) {
                                    return {
                                        ...item,
                                        lay: value ? value + incGap : incGap,
                                        back: value ? value : 0,
                                        rightBack: value ? value : 0,
                                        rightLay: value ? value + incGap : incGap,
                                    };
                                } else {
                                    return {
                                        ...item,
                                        back: Number(rates[value ? value + incGap : incGap] ?? 0),
                                        lay: Number(rates[value ? value : 0] ?? 0),
                                        rightBack: Number(rates[value ? value + incGap : incGap] ?? 0),
                                        rightLay: Number(rates[value ? value : 0] ?? 0),
                                    }
                                }
                                // return { ...item, lay: 0, back: 0, rightBack: 0, rightLay: 0 };
                            }),
                        };
                        return newBody;
                    });
                }
            }
            setLocalQuickBookmaker((prev: any) => {
                let data = {
                    matchId: match?.id,
                    id: Bid,
                    teams: prev.teams?.map((item: any) => {
                        return {
                            back: item.back ?? 0,
                            lay: item.lay ?? 0,
                            id: item.id,
                            status: "suspended",
                        };
                    }),
                };
                socketService.user.updateMatchBettingRate(data);
                return {
                    ...prev,
                    teams: prev.teams?.map((item: any) => ({ ...item, suspended: true })),
                };
            });
        } else if (key === "*" || key === "l") {
            setIsTab("");
            let value = e.target.value ? +targetValue + 0.5 : 0;
            setIncGap(0.25);
            setLocalQuickBookmaker((prev: any) => {
                const currTeam = prev.teams?.find(
                    (item: any) => item.id == e.target.name
                );
                if (currTeam?.lay > 99.5) {
                    return prev;
                }
                return {
                    ...prev,
                    teams: prev.teams?.map((item: any) => {
                        if (item.id == e.target.name) {
                            return {
                                ...item,
                                lay: value + 0.5,
                                back: value,
                                rightBack: value,
                                rightLay: value + 0.5,
                            };
                        } else {
                            return {
                                ...item,
                                back: Number(rates[value + 0.5] ?? 0),
                                lay: Number(rates[value] ?? 0),
                                rightBack: Number(rates[value + 0.5] ?? 0),
                                rightLay: Number(rates[value] ?? 0),
                            }
                        }
                        // return {
                        //     ...item,
                        //     back: 0,
                        //     lay: 0,
                        //     rightBack: 0,
                        //     rightLay: 0,
                        // };
                    }),
                };
            });

            setLocalQuickBookmaker((prev: any) => {
                let data = {
                    matchId: match?.id,
                    id: Bid,
                    teams: prev.teams?.map((item: any) => {
                        return {
                            back: item.back ?? 0,
                            lay: item.lay ?? 0,
                            id: item.id,
                            status: "suspended",
                        };
                    }),
                };
                socketService.user.updateMatchBettingRate(data);
                return {
                    ...prev,
                    teams: prev.teams?.map((item: any) => ({ ...item, suspended: true })),
                };
            });
        } else if (key === "/") {
            setIncGap(5);
            setIsTab("");
            let value = e.target.value ? +targetValue : 0;
            setLocalQuickBookmaker((prev: any) => {
                const currTeam = prev.teams?.find(
                    (item: any) => item.id == e.target.name
                );
                if (currTeam?.lay > 99.5) {
                    return prev;
                }
                return {
                    ...prev,
                    teams: prev.teams?.map((item: any) => {
                        if (item.id == e.target.name) {
                            return {
                                ...item,
                                lay: value + 5,
                                back: value,
                                rightBack: value,
                                rightLay: value + 5,
                            };
                        } else {
                            return {
                                ...item,
                                back: Number(rates[value + 5] ?? 0),
                                lay: Number(rates[value] ?? 0),
                                rightBack: Number(rates[value + 5] ?? 0),
                                rightLay: Number(rates[value] ?? 0),
                            }
                        }
                        // return {
                        //     ...item,
                        //     back: 0,
                        //     lay: 0,
                        //     rightBack: 0,
                        //     rightLay: 0,
                        // };
                    }),
                };
            });
            setLocalQuickBookmaker((prev: any) => {
                let data = {
                    matchId: match?.id,
                    id: Bid,
                    teams: prev.teams?.map((item: any) => {
                        return {
                            back: item.back ?? 0,
                            lay: item.lay ?? 0,
                            id: item.id,
                            status: "suspended",
                        };
                    }),
                };
                socketService.user.updateMatchBettingRate(data);
                return {
                    ...prev,
                    teams: prev.teams?.map((item: any) => ({ ...item, suspended: true })),
                };
            });
        }
    } catch (error) {
        console.error(error);
    }
};
