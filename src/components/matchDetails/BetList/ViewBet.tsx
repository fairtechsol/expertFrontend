import { Box, Button, Popover, Typography } from "@mui/material";
import moment from "moment";
import { useCallback, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FixedSizeList as List } from "react-window";
import { ARROWUP } from "../../../assets";
import {
    declareFinalMatchResult,
    unDeclareFinalMatchResult,
} from "../../../store/actions/match/matchDeclareActions";
import { AppDispatch, RootState } from "../../../store/store";
import { betListColorConstants } from "../../../utils/Constants";
import { formatToINR } from "../../helper";

const ROW_HEIGHT = 30;

const ViewBetList = ({ tag, allBetRates, title }: any) => {
    const dispatch: AppDispatch = useDispatch();
    const listRef = useRef<any>(null);
    const [visibleImg, setVisibleImg] = useState(true);
    const [showButton, setShowButton] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);

    const { matchDetail } = useSelector(
        (state: RootState) => state.addMatch.addMatch
    );

    const handleClose = () => setAnchorEl(null);

    const handleConfirm = () => {
        if (matchDetail?.stopAt) {
            dispatch(unDeclareFinalMatchResult({ matchId: matchDetail?.id }));
        }
        dispatch(declareFinalMatchResult({ matchId: matchDetail?.id }));
        handleClose();
    };

    const scrollToTop = () => {
        listRef.current?.scrollToItem(0, 'smooth');
    };

    const handleScroll = useCallback(({ scrollOffset }: { scrollOffset: number }) => {
        setShowButton(scrollOffset > 0);
    }, []);

    const getBetStyle = (bet: any) => {
        const marketKey = bet?.marketType === "tournament"
            ? bet.bettingName?.toLowerCase()?.replace(/[^a-zA-Z0-9_]/g, "")
            : bet?.marketType;

        const defaultStyle = {
            textColor: "#000",
            background: "#319E5B"
        };

        if (bet?.marketType === "tournament") {
            return betListColorConstants[marketKey] || {
                ...defaultStyle,
                background: betListColorConstants.tournament.background,
                textColor: betListColorConstants.tournament.textColor
            };
        }

        return betListColorConstants[marketKey] || defaultStyle;
    };

    const handleDomain = (url: any) => {
        url = url?.replace(/^(?:https?:\/\/)/, "");
        const parts = url?.split(".");
        return parts?.[parts.length - 2] || "";
    };

    const Row = ({ index, style }: { index: number; style: React.CSSProperties }) => {
        // const bet = allBetRates[allBetRates.length - 1 - index];
        const bet = allBetRates[index];
        if (!bet) return null;
        const serialNumber = allBetRates.length - index;
        const { textColor, background } = getBetStyle(bet);
        const isBackOrYes = ["YES", "BACK"].includes(bet?.betType);
        const betBackground = isBackOrYes ? "#B3E0FF" : "rgb(255, 146, 146)";
        const marketName = bet?.marketType === "MANUAL BOOKMAKER"
            ? "Quick Bookmaker"
            : bet?.bettingName ?? bet?.marketType;

        const betTypeDisplay = bet?.marketType === "oddEven"
            ? bet?.teamName?.match(/[-_](odd|even)$/i)?.[1]?.toUpperCase() || bet?.betType
            : bet?.betType;

        return (
            <div style={style}>
                <div style={{ display: "flex", position: "relative", height: ROW_HEIGHT }}>
                    {/* Row Number */}
                    <Box sx={{
                        width: { lg: "4%", xs: "6%" },
                        border: "1px solid white",
                        background: "black",
                        height: "30px",
                        justifyContent: "center",
                        alignItems: "center",
                        display: "flex",
                    }}>
                        <Typography sx={{
                            fontSize: !tag ? "10px" : "11px",
                            fontWeight: tag ? "bold" : "600",
                            color: "white",
                        }}>
                            {serialNumber < 10 ? `0${serialNumber}` : serialNumber}
                        </Typography>
                    </Box>

                    {/* Username */}
                    <Box sx={{
                        border: "1px solid white",
                        background,
                        height: "30px",
                        justifyContent: "center",
                        alignItems: "flex-start",
                        paddingLeft: "5px",
                        display: "flex",
                        flexDirection: "column",
                        width: { lg: "16%", xs: "50%" },
                    }}>
                        <Typography sx={{
                            fontSize: { lg: "10px", xs: "0.5rem", md: "9px" },
                            fontWeight: "600",
                            color: textColor,
                            wordWrap: "break-word",
                            textTransform: "capitalize",
                            lineHeight: 1,
                            overflow: "hidden",
                            display: "flex",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            alignItems: "center",
                        }}>
                            {bet?.user?.userName}
                            {bet?.isCommissionActive && (
                                <Box sx={{ marginLeft: "5px" }}>
                                    <Box sx={{
                                        width: 10,
                                        height: 10,
                                        borderRadius: "50%",
                                        backgroundColor: "#74ee15",
                                        marginRight: "5px",
                                    }} />
                                </Box>
                            )}
                        </Typography>
                        {bet?.domain && (
                            <Typography sx={{
                                fontSize: { lg: "7px", xs: "0.3rem", md: "9px" },
                                fontWeight: "600",
                                color: textColor,
                                overflowWrap: "anywhere",
                                overflow: "hidden",
                                lineHeight: 1,
                            }}>
                                {handleDomain(bet?.domain)}
                            </Typography>
                        )}
                    </Box>

                    {/* Market Name */}
                    <Box sx={{
                        border: "1px solid white",
                        background,
                        height: "30px",
                        justifyContent: "center",
                        alignItems: "flex-start",
                        paddingLeft: "5px",
                        display: "flex",
                        flexDirection: "column",
                        width: { lg: "10%", xs: "35%" },
                    }}>
                        <Typography sx={{
                            fontSize: { lg: "10px", xs: "0.5rem", md: "9px" },
                            fontWeight: "600",
                            color: textColor,
                            wordWrap: "break-word",
                            textTransform: "capitalize",
                            lineHeight: 1,
                        }}>
                            {marketName}
                        </Typography>
                    </Box>

                    {/* Team Name */}
                    <Box sx={{
                        border: "1px solid white",
                        background: betBackground,
                        height: "30px",
                        justifyContent: "center",
                        alignItems: "center",
                        display: "flex",
                        flexDirection: "column",
                        width: { lg: "28%", xs: "50%" },
                    }}>
                        <Typography sx={{
                            fontSize: { lg: "10px", xs: "0.5rem", md: "9px" },
                            fontWeight: "600",
                            color: "black",
                            wordWrap: "break-word",
                            textAlign: "center",
                            lineHeight: 1,
                        }}>
                            {bet?.teamName}
                        </Typography>
                    </Box>

                    {/* Odds */}
                    <Box sx={{
                        border: "1px solid white",
                        background: betBackground,
                        height: "30px",
                        justifyContent: "center",
                        alignItems: "center",
                        display: "flex",
                        flexDirection: "column",
                        width: { lg: "7%", xs: "25%" },
                    }}>
                        <Typography sx={{
                            fontSize: { lg: "11px", xs: "10px" },
                            fontWeight: "600",
                            color: "black",
                            lineHeight: 1,
                        }}>
                            {bet?.odds}
                        </Typography>
                        {(bet?.betType === "NO" || bet?.betType === "YES") && bet?.rate && (
                            <Typography sx={{ fontSize: { lg: "9px", xs: "6px" }, fontWeight: "600", color: "black" }}>
                                {bet?.rate}
                            </Typography>
                        )}
                    </Box>

                    {/* Bet Type */}
                    <Box sx={{
                        border: "1px solid white",
                        background: betBackground,
                        height: "30px",
                        justifyContent: "center",
                        alignItems: "center",
                        display: "flex",
                        flexDirection: "column",
                        width: { lg: "7%", xs: "25%" },
                    }}>
                        <Typography sx={{
                            fontSize: { lg: "11px", xs: "10px" },
                            fontWeight: "600",
                            color: "black",
                            textTransform: "capitalize",
                            lineHeight: 1.5,
                        }}>
                            {betTypeDisplay}
                        </Typography>
                    </Box>

                    {/* Amount */}
                    <Box sx={{
                        border: "1px solid white",
                        background: betBackground,
                        height: "30px",
                        justifyContent: "center",
                        alignItems: "center",
                        display: "flex",
                        flexDirection: "column",
                        width: { lg: "10%", xs: "35%" },
                    }}>
                        <Typography sx={{
                            fontSize: "12px",
                            fontWeight: "600",
                            color: "black",
                        }}>
                            {formatToINR(bet?.amount)}
                        </Typography>
                    </Box>

                    {/* Stake */}
                    <Box sx={{
                        border: "1px solid white",
                        background: "#0B4F26",
                        height: "30px",
                        justifyContent: "center",
                        alignItems: "center",
                        display: "flex",
                        flexDirection: "column",
                        width: { lg: "12%", xs: "35%" },
                    }}>
                        <Typography sx={{
                            fontSize: "12px",
                            fontWeight: "600",
                            color: "white",
                        }}>
                            {bet.myStake
                                ? formatToINR(+bet.myStake)
                                : formatToINR((+bet?.amount * +bet?.user?.fwPartnership || 0) / 100)
                            }
                        </Typography>
                    </Box>

                    {/* Time */}
                    <Box sx={{
                        border: "1px solid white",
                        background: betBackground,
                        height: "30px",
                        justifyContent: "center",
                        alignItems: "center",
                        display: "flex",
                        flexDirection: "column",
                        width: { lg: "11%", xs: "45%" },
                    }}>
                        <Typography sx={{
                            fontSize: { lg: "10px", xs: "0.5rem", md: "9px" },
                            fontWeight: "600",
                            color: "black",
                        }}>
                            {moment.utc(bet?.createdAt).utcOffset("+05:30").format("LTS")}
                        </Typography>
                        <Typography sx={{
                            fontSize: { lg: "8px", xs: "0.4rem", md: "8px" },
                            fontWeight: "600",
                            color: "black",
                        }}>
                            {moment.utc(bet?.createdAt).utcOffset("+05:30").format("L")}
                        </Typography>
                    </Box>

                    {/* Deleted/Result Overlay */}
                    {bet?.deleteReason && (
                        <Box sx={{
                            background: "rgba(0,0,0,0.5)",
                            width: "100%",
                            height: "30px",
                            position: "absolute",
                            display: "flex",
                        }}>
                            <Box sx={{ flex: 1, display: "flex" }}>
                                <Box sx={{ width: "34%", height: "30px" }}></Box>
                                <Box sx={{
                                    width: "66%",
                                    height: "30px",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "flex-end",
                                }}>
                                    <Typography sx={{
                                        fontSize: "10px",
                                        fontWeight: "700",
                                        color: "white",
                                        textTransform: "uppercase",
                                    }}>
                                        Bet <span style={{ color: "#e41b23" }}>deleted</span> due to {bet?.deleteReason}
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                    )}

                    {bet?.result && ["LOSS", "WIN", "TIE"].includes(bet.result) && (
                        <Box sx={{
                            background: "rgba(0,0,0,0.5)",
                            width: "100%",
                            height: "30px",
                            position: "absolute",
                            display: "flex",
                        }} />
                    )}
                </div>
            </div>
        );
    };

    return (
        <Box sx={{ width: "100%", margin: "0", marginTop: ".25vh", background: "white" }}>
            <Box sx={{ display: "flex", height: 20, flexDirection: "row", width: "100%", alignSelf: "center" }}>
                <Box>
                    {showButton && (
                        <Button
                            variant="contained"
                            onClick={scrollToTop}
                            sx={{
                                position: "fixed",
                                width: "100px",
                                fontSize: "9px",
                                bottom: 20,
                                right: 20,
                                backgroundColor: "#F8C851",
                                color: "#000",
                                "&:hover": { backgroundColor: "#F8C851" },
                                zIndex: 1000,
                            }}
                        >
                            Scroll to Top
                        </Button>
                    )}
                </Box>
                <Box sx={{ flex: 1, background: "#f1c550", alignItems: "center", display: "flex", justifyContent: "space-between" }}>
                    <Typography sx={{ fontSize: "9px", fontWeight: "bold", marginLeft: "7px", lineHeight: 1 }}>
                        {`All Bets${title ? ` (${title})` : ""}`}
                    </Typography>

                    <Popover
                        open={Boolean(anchorEl)}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                        transformOrigin={{ vertical: "top", horizontal: "right" }}
                    >
                        <Box sx={{ padding: 2, textAlign: "center" }}>
                            <Typography>
                                {`Are you sure you want to ${matchDetail?.stopAt ? "Un Declare" : "Declare"} the final result?`}
                            </Typography>
                            <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: 1 }}>
                                <Button onClick={handleClose} color="error" size="small" variant="contained">Cancel</Button>
                                <Button onClick={handleConfirm} color="primary" variant="contained" size="small">
                                    {matchDetail?.stopAt ? "Un Declare" : "Declare"}
                                </Button>
                            </Box>
                        </Box>
                    </Popover>
                </Box>
                <Box sx={{ flex: 0.1, background: "#262626" }}>
                    <div className="slanted"></div>
                </Box>
                <Box sx={{ width: "100px", flex: 1, background: "#262626", display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
                    <Box sx={{
                        width: "90px",
                        height: "90%",
                        background: "white",
                        justifyContent: "center",
                        borderRadius: "3px",
                        alignItems: "center",
                        display: "flex",
                    }}>
                        <Typography sx={{ fontSize: "8px", fontWeight: "700", color: "#FF1111" }}>
                            Total Bet:&nbsp;
                        </Typography>
                        <Typography sx={{ fontSize: "8px", fontWeight: "700", color: "#0B4F26" }}>
                            {allBetRates?.length || 0}
                        </Typography>
                    </Box>
                    <img
                        onClick={() => setVisibleImg(!visibleImg)}
                        src={ARROWUP}
                        style={{
                            transform: visibleImg ? "rotate(180deg)" : "rotate(0deg)",
                            width: "12px",
                            height: "12px",
                            marginRight: "5px",
                            marginLeft: "5px",
                            cursor: "pointer",
                        }}
                    />
                </Box>
            </Box>

            <Box sx={{ width: "100%" }}>
                {visibleImg && (
                    <Box sx={{
                        maxHeight: "90vh",
                        width: { xs: "auto", lg: "auto", md: "auto" },
                    }}>
                        <List
                            ref={listRef}
                            height={window.innerHeight * 0.9}
                            itemCount={allBetRates.length}
                            itemSize={ROW_HEIGHT}
                            width="100%"
                            onScroll={handleScroll}
                        >
                            {Row}
                        </List>
                    </Box>
                )}
            </Box>
        </Box>
    );
};

export default ViewBetList;