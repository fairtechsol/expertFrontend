
import { Box, Button, Typography } from "@mui/material";
import { memo, useCallback, useMemo, useRef, useState } from "react";
import AutoSizer from "react-virtualized-auto-sizer";
import { FixedSizeList as List } from "react-window";
import Header from "./Header";
import Row from "./Row";

const ROW_HEIGHT = 40; // Define row height as constant

// Memoized Row component to prevent unnecessary re-renders
const MemoizedRow = memo(({ data, index, style }: { data: any, index: number, style: React.CSSProperties }) => {
  const num = data.betData.length - index;

  // alert(data.items[index])
  console.log("data", data);
  const item = data.betData[index];
  return (
    <div style={style}>
      <Row index={num} values={item} />
    </div>
  );
});

const BetsList = ({ betData, name }: any) => {
  const listRef = useRef<any>(null);
  const [showButton, setShowButton] = useState(false);

  // Memoize the itemData to prevent unnecessary re-renders
  const itemData = useMemo(() => ({
    betData,
    // Include other props that Row might need
  }), [betData]);

  const scrollToTop = useCallback(() => {
    listRef.current?.scrollToItem(0, "start");
  }, []);

  const handleScroll = useCallback(({ scrollOffset }: { scrollOffset: number }) => {
    setShowButton(scrollOffset > 0);
  }, []);

  // Calculate dynamic height based on window size
  const listHeight = useMemo(() => Math.min(window.innerHeight * 0.75, ROW_HEIGHT * betData.length), [betData.length]);

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
      {/* Header Section */}
      <Box
        sx={{
          height: "42px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px",
          backgroundColor: "#F8C851",
        }}
      >
        <Typography
          sx={{
            color: "#000000",
            fontSize: { lg: "20px", xs: "14px", md: "18px" },
            fontWeight: "600",
          }}
        >
          {name} Bets
        </Typography>

        {/* Scroll to Top Button */}
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

        {/* Bet Count Display */}
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
          <Typography sx={{ color: "red", fontWeight: "700", fontSize: "14px" }}>
            All Bets
          </Typography>
          <Typography sx={{ color: "#0B4F26", fontWeight: "700", marginTop: "-5px" }}>
            {betData?.length}
          </Typography>
        </Box>
      </Box>

      {/* List Content */}
      <Box
        sx={{
          flex: 1,
          justifyContent: "space-between",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Header />
        <AutoSizer>
          {({ width }) => (
            <List
              ref={listRef}
              height={listHeight}
              itemCount={betData?.length || 0}
              itemSize={ROW_HEIGHT}
              width={width}
              itemKey={(index, data) => data?.betData[index]?.betId}
              onScroll={handleScroll}
              itemData={itemData} // Pass memoized data
            >
              {MemoizedRow}
            </List>
          )}
        </AutoSizer>
      </Box>
    </Box>
  );
};

export default memo(BetsList);