// import { Box, Button, Typography } from "@mui/material";
// import { useEffect, useRef, useState } from "react";
// import Header from "./Header";
// import Row from "./Row";

// const BetsList = ({ betData, name }: any) => {
//   const scrollRef = useRef<HTMLDivElement | null>(null);
//   const [showButton, setShowButton] = useState(false);

//   const scrollToTop = () => {
//     if (scrollRef.current) {
//       scrollRef.current.scrollTo({
//         top: 0,
//         behavior: "smooth",
//       });
//     }
//   };

//   const handleScroll = () => {
//     if (scrollRef.current) {
//       const { scrollTop } = scrollRef.current;
//       setShowButton(scrollTop > 0);
//     }
//   };

//   useEffect(() => {
//     const scrollElement = scrollRef.current;
//     if (scrollElement) {
//       scrollElement.addEventListener("scroll", handleScroll);
//       return () => {
//         scrollElement.removeEventListener("scroll", handleScroll);
//       };
//     }
//   }, []);


//   return (
//     <Box
//       sx={{
//         flex: 1,
//         background: "white",
//         borderRadius: "5px",
//         minHeight: "75vh",
//         border: "2px solid white",
//         position: "relative",
//       }}
//     >
//       <Box
//         sx={[
//           {
//             height: "42px",
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//             padding: "10px",
//             backgroundColor: "#F8C851",
//           },
//         ]}
//       >
//         <Typography
//           sx={{
//             color: "#000000",
//             fontSize: { lg: "20px", xs: "14px", md: "18px" },
//             fontWeight: "600",
//           }}
//         >
//           {name ? name : "Bookmaker"} Bets
//         </Typography>
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
//           sx={{
//             height: "35px",
//             width: "100px",
//             background: "white",
//             borderRadius: "5px",
//             display: "flex",
//             justifyContent: "center",
//             flexDirection: "column",
//             alignItems: "center",
//           }}
//         >
//           <Typography
//             sx={{ color: "red", fontWeight: "700", fontSize: "14px" }}
//           >
//             All Bets
//           </Typography>
//           <Typography
//             sx={{ color: "#0B4F26", fontWeight: "700", marginTop: "-5px" }}
//           >
//             {betData?.length}
//           </Typography>
//         </Box>
//       </Box>
//       <Box
//         sx={{
//           flex: 1,
//           justifyContent: "space-between",
//           display: "flex",
//           flexDirection: "column",
//         }}
//       >
//         <Header />
//         <Box
//           className="myScroll"
//           ref={scrollRef}
//           sx={{
//             maxHeight: "75vh",
//             overflow: "hidden",
//             overflowY: "auto",
//             "::-webkit-scrollbar": {
//               display: "none",
//             },
//           }}
//         >
//           {betData?.length > 0 &&
//             betData?.map((i: any, k: any) => {
//               const num = betData?.length - k;
//               return <Row key={k} index={num} values={i} />;
//             })}
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// export default BetsList;




import { Box, Button, Typography } from "@mui/material";
import { useRef, useState } from "react";
import { FixedSizeList as List } from "react-window";
import Header from "./Header";
import Row from "./Row";

const BetsList = ({ betData, name }: any) => {
  const listRef = useRef<List>(null);
  const [showButton, setShowButton] = useState(false);

  const scrollToTop = () => {
    if (listRef.current) {
      listRef.current.scrollToItem(0, "smooth");
    }
  };

  const handleScroll = ({ scrollOffset }: { scrollOffset: number }) => {
    setShowButton(scrollOffset > 0);
  };

  // Render each row using react-window
  const RowRenderer = ({ index, style }: { index: number; style: React.CSSProperties }) => {
    // Reverse index since you want to show countdown
    const num = betData.length - index;
    const item = betData[index];
    return (
      <div style={style}>
        <Row index={num} values={item} />
      </div>
    );
  };
  return (
    <Box
      sx={{
        flex: 1,
        background: "white",
        borderRadius: "5px",
        minHeight: "75vh",
        border: "2px solid white",
        position: "relative",
      }}
    >
      <Box
        sx={[
          {
            height: "42px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "10px",
            backgroundColor: "#F8C851",
          },
        ]}
      >
        <Typography
          sx={{
            color: "#000000",
            fontSize: { lg: "20px", xs: "14px", md: "18px" },
            fontWeight: "600",
          }}
        >
          {name ? name : "Bookmaker"} Bets
        </Typography>
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
                "&:hover": {
                  backgroundColor: "#F8C851",
                },
                zIndex: 1000,
              }}
            >
              Scroll to Top
            </Button>
          )}
        </Box>
        <Box
          sx={{
            height: "35px",
            width: "100px",
            background: "white",
            borderRadius: "5px",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{ color: "red", fontWeight: "700", fontSize: "14px" }}
          >
            All Bets
          </Typography>
          <Typography
            sx={{ color: "#0B4F26", fontWeight: "700", marginTop: "-5px" }}
          >
            {betData?.length}
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          flex: 1,
          justifyContent: "space-between",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Header />
        <Box
          sx={{
            maxHeight: "75vh",
            overflow: "hidden",
            "::-webkit-scrollbar": {
              display: "none",
            },
          }}
        >
          <List
            ref={listRef}
            height={window.innerHeight * 0.75} // Adjust based on your needs
            itemCount={betData?.length || 0}
            itemSize={40} // Adjust based on your row height
            width="100%"
            onScroll={handleScroll}
          >
            {RowRenderer}
          </List>
        </Box>
      </Box>
    </Box>
  );
};

export default BetsList;