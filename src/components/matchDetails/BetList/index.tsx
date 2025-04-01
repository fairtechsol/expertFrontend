// import { Box, Button, Popover, Typography } from "@mui/material";
// import moment from "moment";
// // import { betVerifyStatus } from "../../../store/actions/match/matchAction";
// import { useCallback, useEffect, useMemo, useRef, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { ARROWUP } from "../../../assets";
// import {
//   declareFinalMatchResult,
//   unDeclareFinalMatchResult,
// } from "../../../store/actions/match/matchDeclareActions";
// import { AppDispatch, RootState } from "../../../store/store";
// import { betListColorConstants } from "../../../utils/Constants";
// import { formatToINR } from "../../helper";
// import Row from "./Row";

// const ITEMS_PER_PAGE = 100;
// const BUFFER_SIZE = 30;
// const ROW_HEIGHT = 30;

// const BetList = ({ tag, allBetRates, title, isMatchDeclare }: any) => {
//   const dispatch: AppDispatch = useDispatch();


//   const [newData, setNewBets] = useState<any[]>([]);
//   const [visibleImg, setVisibleImg] = useState(true);
//   const scrollRef = useRef<HTMLDivElement | null>(null);
//   const [showButton, setShowButton] = useState(false);
//   const [visibleRange, setVisibleRange] = useState({
//     start: 0,
//     end: ITEMS_PER_PAGE,
//   });

//   const [anchorEl, setAnchorEl] = useState(null);

//   const handleOpen = (event: any) => setAnchorEl(event.currentTarget);
//   const handleClose = () => setAnchorEl(null);

//   const handleConfirm = () => {
//     if (matchDetail?.stopAt) {
//       dispatch(unDeclareFinalMatchResult({ matchId: matchDetail?.id }));
//     }
//     dispatch(declareFinalMatchResult({ matchId: matchDetail?.id }));
//     handleClose();
//   };

//   const { matchDetail } = useSelector(
//     (state: RootState) => state.addMatch.addMatch
//   );

//   const scrollToTop = () => {
//     if (scrollRef.current) {
//       scrollRef.current.scrollTo({
//         top: 0,
//         behavior: "smooth",
//       });
//     }
//   };

//   const handleScroll = useCallback(() => {
//     if (scrollRef.current) {
//       const { scrollTop, clientHeight } = scrollRef.current;
//       setShowButton(scrollTop > 0);

//       // Calculate visible range based on scroll position
//       const start = Math.floor(scrollTop / ROW_HEIGHT);
//       const visibleCount = Math.ceil(clientHeight / ROW_HEIGHT);

//       setVisibleRange({
//         start: Math.max(0, start - BUFFER_SIZE),
//         end: Math.min(newData.length, start + visibleCount + BUFFER_SIZE),
//       });
//     }
//   }, [newData.length]);

//   const processNextChunk = useCallback(() => {
//     const chunk = allBetRates.map((v: any) => ({
//       values: [
//         {
//           name: v?.user?.userName,
//           color: betListColorConstants[
//             v?.marketType == "tournament"
//               ? v.bettingName?.toLowerCase()?.replace(/[^a-zA-Z0-9_]/g, "")
//               : v?.marketType
//           ]
//             ? betListColorConstants[
//               v?.marketType == "tournament"
//                 ? v.bettingName?.toLowerCase()?.replace(/[^a-zA-Z0-9_]/g, "")
//                 : v?.marketType
//             ]?.textColor
//             : v?.marketType == "tournament"
//               ? betListColorConstants.tournament.textColor
//               : "#000",
//           background: betListColorConstants[
//             v?.marketType == "tournament"
//               ? v.bettingName?.toLowerCase()?.replace(/[^a-zA-Z0-9_]/g, "")
//               : v?.marketType
//           ]
//             ? betListColorConstants[
//               v?.marketType == "tournament"
//                 ? v.bettingName?.toLowerCase()?.replace(/[^a-zA-Z0-9_]/g, "")
//                 : v?.marketType
//             ]?.background
//             : v?.marketType == "tournament"
//               ? betListColorConstants.tournament.background
//               : "#319E5B",
//           deleteReason: v?.deleteReason,
//           result: v?.result,
//           isVerified: v?.isVerified,
//           width: { lg: "16%", xs: "50%" },
//           domain: v?.domain,
//           verifyBy: v?.verifyBy,
//           id: v?.id,
//           matchId: v?.matchId,
//           isCommissionActive: v?.isCommissionActive,
//         },
//         {
//           name:
//             v?.marketType == "MANUAL BOOKMAKER"
//               ? "Quick Bookmaker"
//               : v?.bettingName ?? v?.marketType,
//           color: betListColorConstants[
//             v?.marketType == "tournament"
//               ? v.bettingName?.toLowerCase()?.replace(/[^a-zA-Z0-9_]/g, "")
//               : v?.marketType
//           ]
//             ? betListColorConstants[
//               v?.marketType == "tournament"
//                 ? v.bettingName?.toLowerCase()?.replace(/[^a-zA-Z0-9_]/g, "")
//                 : v?.marketType
//             ]?.textColor
//             : v?.marketType == "tournament"
//               ? betListColorConstants.tournament.textColor
//               : "#000",
//           background: betListColorConstants[
//             v?.marketType == "tournament"
//               ? v.bettingName?.toLowerCase()?.replace(/[^a-zA-Z0-9_]/g, "")
//               : v?.marketType
//           ]
//             ? betListColorConstants[
//               v?.marketType == "tournament"
//                 ? v.bettingName?.toLowerCase()?.replace(/[^a-zA-Z0-9_]/g, "")
//                 : v?.marketType
//             ]?.background
//             : v?.marketType == "tournament"
//               ? betListColorConstants.tournament.background
//               : "#319E5B",
//           deleteReason: v?.deleteReason,
//           result: v?.result,
//           verifyBy: v?.verifyBy,
//           width: { lg: "10%", xs: "35%" },
//           overflowWrap: "anywhere",
//         },
//         {
//           name: v?.teamName,
//           color: "black",
//           background: ["YES", "BACK"].includes(v?.betType)
//             ? "#B3E0FF"
//             : "rgb(255, 146, 146)",
//           deleteReason: v?.deleteReason,
//           result: v?.result,
//           verifyBy: v?.verifyBy,
//           width: { lg: "28%", xs: "50%" },
//           overflowWrap: "anywhere",
//           textAlign: "center",
//         },
//         {
//           name: v?.odds,
//           color: "black",
//           rate: (v?.betType === "NO" || v?.betType === "YES") && v?.rate,
//           background: ["YES", "BACK"].includes(v?.betType)
//             ? "#B3E0FF"
//             : "rgb(255, 146, 146)",
//           small: true,
//           deleteReason: v?.deleteReason,
//           result: v?.result,
//           verifyBy: v?.verifyBy,
//           width: { lg: "7%", xs: "25%" },
//           fSize: "13px",
//           lHeight: 1,
//         },
//         {
//           name:
//             v?.marketType === "oddEven"
//               ? v?.teamName?.match(/[-_](odd|even)$/i)?.[1]?.toUpperCase() ||
//               v?.betType
//               : v?.betType,
//           color: "black",
//           background: ["YES", "BACK"].includes(v?.betType)
//             ? "#B3E0FF"
//             : "rgb(255, 146, 146)",
//           small: true,
//           deleteReason: v?.deleteReason,
//           result: v?.result,
//           verifyBy: v?.verifyBy,
//           width: { lg: "7%", xs: "25%" },
//         },
//         {
//           name: formatToINR(v?.amount),
//           color: "black",
//           background: ["YES", "BACK"].includes(v?.betType)
//             ? "#B3E0FF"
//             : "rgb(255, 146, 146)",
//           deleteReason: v?.deleteReason,
//           result: v?.result,
//           verifyBy: v?.verifyBy,
//           width: { lg: "10%", xs: "35%" },
//           fSize: "12px",
//         },
//         {
//           name: +v.myStake
//             ? formatToINR(+v.myStake)
//             : formatToINR((+v?.amount * +v?.user?.fwPartnership || 0) / 100),
//           color: "white",
//           background: "#0B4F26",
//           deleteReason: v?.deleteReason,
//           result: v?.result,
//           verifyBy: v?.verifyBy,
//           width: { lg: "12%", xs: "35%" },
//         },
//         {
//           name: moment.utc(v?.createdAt).utcOffset("+05:30").format("LTS"),
//           color: "black",
//           background: ["YES", "BACK"].includes(v?.betType)
//             ? "#B3E0FF"
//             : "rgb(255, 146, 146)",
//           time: true,
//           date: moment.utc(v?.createdAt).utcOffset("+05:30").format("L"),
//           deleteReason: v?.deleteReason,
//           result: v?.result,
//           verifyBy: v?.verifyBy,
//           width: { lg: "11%", xs: "45%" },
//         },
//       ],
//     }));
//     setNewBets(chunk);
//   }, [allBetRates]);

//   useEffect(() => {
//     setNewBets([]);
//     if (allBetRates?.length) {
//       processNextChunk();
//     }
//   }, [allBetRates, processNextChunk]);

//   useEffect(() => {
//     const scrollElement = scrollRef.current;
//     if (scrollElement) {
//       scrollElement.addEventListener("scroll", handleScroll);
//       return () => {
//         scrollElement.removeEventListener("scroll", handleScroll);
//       };
//     }
//   }, [handleScroll]);
//   // Calculate visible items
//   const visibleItems = useMemo(() => {
//     // console.log("newData :", newData)
//     return newData.slice(visibleRange.start, visibleRange.end);
//   }, [newData, visibleRange]);

//   return (
//     <Box
//       sx={{
//         width: "100%",
//         margin: "0",
//         marginTop: ".25vh",
//         background: "white",
//       }}
//     >
//       <Box
//         sx={{
//           display: "flex",
//           height: 20,
//           flexDirection: "row",
//           width: "100%",
//           alignSelf: "center",
//         }}
//       >
//         <Box>
//           {showButton && (
//             <Button
//               variant="contained"
//               onClick={scrollToTop}
//               sx={{
//                 position: "fixed",
//                 width: "100px",
//                 fontSize: "9px",
//                 bottom: 20,
//                 right: 20,
//                 backgroundColor: "#F8C851",
//                 color: "#000",
//                 "&:hover": {
//                   backgroundColor: "#F8C851",
//                 },
//                 zIndex: 1000,
//               }}
//             >
//               Scroll to Top
//             </Button>
//           )}
//         </Box>
//         <Box
//           sx={[
//             {
//               flex: 1,
//               background: "#f1c550",
//               alignItems: "center",
//               display: "flex",
//               justifyContent: "space-between",
//             },
//           ]}
//         >
//           <Typography
//             sx={{
//               fontSize: "9px",
//               fontWeight: "bold",
//               marginLeft: "7px",
//               lineHeight: 1,
//             }}
//           >
//             {`All Bets${title ? ` (${title})` : ""}`}
//           </Typography>
//           {isMatchDeclare && (
//             <Box onClick={handleOpen} sx={{ zIndex: 2, cursor: "pointer" }}>
//               <Box
//                 sx={{
//                   display: "flex",
//                   marginX: "2px",
//                   justifyContent: "center",
//                   paddingX: 0.5,
//                   alignItems: "center",
//                   height: "18px",
//                   background: matchDetail?.stopAt ? "red" : "white",
//                   borderRadius: "2px",
//                 }}
//               >
//                 <Typography
//                   sx={{
//                     fontSize: { lg: "8px", xs: "6px" },
//                     fontWeight: "600",
//                     color: matchDetail?.stopAt ? "white" : "#0B4F26",
//                   }}
//                 >
//                   {matchDetail?.stopAt ? "Final Result Un Declare" : "Final Result Declare"}
//                 </Typography>
//               </Box>
//             </Box>
//           )}

//           {/* Dialog Component */}
//           <Popover
//             open={Boolean(anchorEl)}
//             anchorEl={anchorEl}
//             onClose={handleClose}
//             anchorOrigin={{
//               vertical: "bottom",
//               horizontal: "right",
//             }}
//             transformOrigin={{
//               vertical: "top",
//               horizontal: "right",
//             }}
//           >
//             <Box sx={{ padding: 2, textAlign: "center" }}>
//               <Typography>
//                 {`Are you sure you want to ${matchDetail?.stopAt ? "Un Declare" : "Declare"} the final result?`}
//               </Typography>
//               <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: 1 }}>
//                 <Button onClick={handleClose} color="error" size="small" variant="contained" >Cancel</Button>
//                 <Button onClick={handleConfirm} color="primary" variant="contained" size="small">
//                   {matchDetail?.stopAt ? "Un Declare" : "Declare"}
//                 </Button>
//               </Box>
//             </Box>
//           </Popover>
//         </Box>
//         <Box
//           sx={{
//             flex: 0.1,
//             background: "#262626",
//           }}
//         >
//           <div className="slanted"></div>
//         </Box>
//         <Box
//           sx={{
//             width: "100px",
//             flex: 1,
//             background: "#262626",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "flex-end",
//           }}
//         >
//           <Box
//             sx={{
//               width: "90px",
//               height: "90%",
//               background: "white",
//               justifyContent: "center",
//               borderRadius: "3px",
//               alignItems: "center",
//               display: "flex",
//             }}
//           >
//             <Typography
//               sx={{
//                 fontSize: "8px",
//                 fontWeight: "700",
//                 color: "#FF1111",
//               }}
//             >
//               Total Bet:&nbsp;
//             </Typography>
//             <Typography
//               sx={{
//                 fontSize: "8px",
//                 fontWeight: "700",
//                 color: "#0B4F26",
//               }}
//             >
//               {allBetRates?.length || 0}
//             </Typography>
//           </Box>
//           <img
//             onClick={() => {
//               setVisibleImg(!visibleImg);
//             }}
//             src={ARROWUP}
//             style={{
//               transform: visibleImg ? "rotate(180deg)" : "rotate(0deg)",
//               width: "12px",
//               height: "12px",
//               marginRight: "5px",
//               marginLeft: "5px",
//               cursor: "pointer",
//             }}
//           />
//         </Box>
//       </Box>

//       <Box sx={{ width: "100%" }}>
//         {visibleImg && (
//           <>
//             <Box
//               ref={scrollRef}
//               sx={{
//                 maxHeight: "90vh",
//                 width: { xs: "auto", lg: "auto", md: "auto" },
//                 overflow: "auto",
//               }}
//             >
//               {/* Virtual list spacer */}
//               <div style={{ height: visibleRange.start * ROW_HEIGHT }} />

//               {visibleItems.map((i: any, k: number) => {
//                 const num = allBetRates.length - (k + visibleRange.start);
//                 return (
//                   <div
//                     key={k + visibleRange.start}
//                     style={{
//                       display: "flex",
//                       position: "relative",
//                       height: ROW_HEIGHT,
//                     }}
//                   >
//                     <Box
//                       sx={{
//                         width: { lg: "4%", xs: "6%" },
//                         border: "1px solid white",
//                         background: "black",
//                         height: "30px",
//                         justifyContent: "center",
//                         alignItems: "center",
//                         display: "flex",
//                       }}
//                     >
//                       <Typography
//                         sx={{
//                           fontSize: !tag ? "10px" : "11px",
//                           fontWeight: tag ? "bold" : "600",
//                           color: "white",
//                         }}
//                       >
//                         {num < 10 ? "0" + num : num.toString()}
//                       </Typography>
//                     </Box>

//                     {/* <Box
//                       sx={{
//                         width: { lg: "4%", xs: "6%" },
//                         border: "1px solid white",
//                         background: "black",
//                         height: "30px",
//                         justifyContent: "center",
//                         alignItems: "center",
//                         display: "flex",
//                       }}
//                     >
//                       <Typography
//                         sx={{
//                           fontSize: !tag ? "10px" : "11px",
//                           fontWeight: tag ? "bold" : "600",
//                           color: "white",
//                         }}
//                       >

//                         <Box sx={{}}>
//                           {i?.values?.[0]?.isVerified ? (
//                             <img onClick={() => {
//                               dispatch(betVerifyStatus({
//                                 matchId: i?.values?.[0]?.matchId,
//                                 isVerified: false,
//                                 id: i?.values?.[0]?.id,
//                                 domain: i?.values?.[0]?.domain
//                               }));
//                           }} src={CHECK} style={{ width: "30px", height: "28px", marginTop: 5 }} />
//                           ) : (
//                             <Typography onClick={() => {
//                               dispatch(betVerifyStatus({
//                                 matchId: i?.values?.[0]?.matchId,
//                                 isVerified: true,
//                                 id: i?.values?.[0]?.id,
//                                 domain: i?.values?.[0]?.domain
//                               }));
//                             }}
//                               sx={{
//                                 width: "20px",
//                                 height: "20px",
//                                 borderRadius: "50%",
//                                 backgroundColor: "white",
//                                 border: "1px solid #ccc"
//                               }} />
//                           )}
//                         </Box>
//                       </Typography>
//                     </Box> */}
//                     <Row index={k + visibleRange.start} values={i?.values} verifyBy={i?.values?.[0]?.verifyBy} />
//                     {i?.values?.[0]?.deleteReason && (
//                       <Box
//                         sx={{
//                           background: "rgba(0,0,0,0.5)",
//                           width: "100%",
//                           height: "30px",
//                           position: "absolute",
//                           display: "flex",
//                         }}
//                       >
//                         <Box sx={{ flex: 1, display: "flex" }}>
//                           <Box sx={{ width: "34%", height: "30px" }}></Box>
//                           <Box
//                             sx={{
//                               width: "66%",
//                               height: "30px",
//                               display: "flex",
//                               justifyContent: "center",
//                               alignItems: "flex-end",
//                             }}
//                           >
//                             {
//                               <Typography
//                                 sx={{
//                                   fontSize: "10px",
//                                   fontWeight: "700",
//                                   color: "white",
//                                   textTransform: "uppercase",
//                                 }}
//                               >
//                                 Bet{" "}
//                                 <span style={{ color: "#e41b23" }}>
//                                   deleted
//                                 </span>{" "}
//                                 due to {i?.values?.[0]?.deleteReason}
//                               </Typography>
//                             }
//                           </Box>
//                         </Box>
//                       </Box>
//                     )}
//                     {i?.values?.[0]?.result && ["LOSS", "WIN", "TIE"].includes(i.values[0].result) && (
//                       <Box
//                         sx={{
//                           background: "rgba(0,0,0,0.5)",
//                           width: "100%",
//                           height: "30px",
//                           position: "absolute",
//                           display: "flex",
//                         }}
//                       >
//                       </Box>
//                     )}
//                   </div>
//                 );
//               })}

//               {/* Virtual list spacer */}
//               <div
//                 style={{
//                   height: (allBetRates.length - visibleRange.end) * ROW_HEIGHT,
//                 }}
//               />
//             </Box>
//           </>
//         )}
//       </Box>
//     </Box>
//   );
// };

// export default BetList;


import { Box, Button, Popover, Typography } from "@mui/material";
import moment from "moment";
import { useCallback, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AutoSizer from "react-virtualized-auto-sizer";
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

const BetList = ({ tag, allBetRates, title }: any) => {
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
  const cHeight = allBetRates.length * 32 > window.innerHeight * 0.9 ? window.innerHeight * 0.9 : allBetRates.length * 32;

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
            // maxHeight: "90vh",
            height: cHeight,
            overflow: "hidden",
            "::-webkit-scrollbar": {
              display: "none",
            },
            width: { xs: "auto", lg: "auto", md: "auto" },
          }}>
            <AutoSizer>
              {({ height, width }) => (
                <List
                  ref={listRef}
                  height={height}
                  // height={window.innerHeight * 0.9}
                  itemCount={allBetRates.length}
                  itemSize={ROW_HEIGHT}
                  // width="100%"
                  width={width}
                  onScroll={handleScroll}
                >
                  {Row}
                </List>
              )}
            </AutoSizer>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default BetList;
