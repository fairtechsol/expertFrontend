import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { memo, useState } from "react";
import AutoSizer from "react-virtualized-auto-sizer";
import { FixedSizeList as List } from "react-window";
import { ArrowDownPL, ARROWUP, ARROWUPPL, DeleteIcon } from "../../assets";
import { formatToINR } from "../../helpers";
import StyledImage from "../Common/StyledImages";
import RowComponent from "./RowComponent";

const SessionBetSeperate = ({
  profit,
  mark,
  mark2,
  allBetsData,
  betHistory,
  isArrow,
}: any) => {
  const [visible, setVisible] = useState(true);
  const theme = useTheme();
  const matchesMobile = useMediaQuery(theme.breakpoints.down("lg"));

  const Row = memo(({ index, style }: any) => {
    const i = allBetsData[index];
    const num = allBetsData.length - index;
    const formattedNum = num < 10 ? "0" + num : num.toString();

    return (
      <Box
        style={style}
        sx={{
          display: "flex",
          flexDirection: "row",
          position: "relative",
          gap: "1px",
        }}
      >
        <Box
          sx={{
            height: "40px",
            marginBottom: { xs: "1px", lg: "1px" },
            width: "30px",
            display: "flex",
            background: "black",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              color: "white",
              fontSize: "10px",
              fontWeight: "500",
            }}
          >
            {formattedNum}
          </Typography>
        </Box>
        <RowComponent header={false} data={i} />
        {i?.deleteReason && (
          <Box
            sx={{
              width: {
                xs: profit ? "100%" : "100%",
                alignItems: "flex-end",
                justifyContent: "center",
                display: "flex",
                lg: profit ? "100 % " : "100% ",
              },
              background: "rgba(0, 0, 0, 0.6)",
              height: "45px",
              position: "absolute",
            }}
          >
            <Box sx={{ width: mark2 ? "35%" : "35%" }} />
          </Box>
        )}
        {i?.deleteReason && betHistory === undefined && (
          <Box
            sx={{
              width: {
                xs: profit ? "100%" : "100%",
                alignItems: "flex-end",
                justifyContent: "center",
                display: "flex",
                lg: profit ? "100 % " : "100% ",
              },
              background: "rgba(0, 0, 0, 0.5)",
              height: "45px",
              position: "absolute",
            }}
          >
            <Box sx={{ width: mark2 ? "35%" : "35%" }} />
            <Box
              sx={{
                width: mark2 ? "65%" : "65%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-end",
                alignSelf: "flex-end",
              }}
            >
              {mark && (
                <Typography
                  sx={{
                    fontSize: "10px",
                    fontWeight: "700",
                    color: "white",
                    textTransform: "uppercase",
                  }}
                >
                  Bet <span style={{ color: "#e41b23" }}>deleted</span> due to $
                  {i?.deleteReason}
                </Typography>
              )}
            </Box>
          </Box>
        )}
        {profit && !i?.deleteReason && (
          <Box
            sx={{
              height: "40px",
              width: "30%",
              background: i.totalLoss > 0 ? "#10DC61" : "#E32A2A",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                px: "10px",
                height: "100%",
              }}
            >
              <Typography
                sx={{
                  fontSize: { xs: "11px", lg: "14px" },
                  color: "white",
                  fontWeight: "700",
                }}
              >
                {Number(i.totalLoss) >= 0 ? (
                  <>
                    <span style={{ visibility: "hidden" }}>-</span>
                    {formatToINR(Number(i.totalLoss).toFixed(2))}
                  </>
                ) : (
                  formatToINR(Number(i.totalLoss).toFixed(2))
                )}
              </Typography>
              {!isArrow && (
                <StyledImage
                  sx={{
                    width: { xs: "12px", lg: "15px" },
                    height: { xs: "12px", lg: "15px" },
                  }}
                  src={i.myProfitLoss > 0 ? ARROWUPPL : ArrowDownPL}
                  alt="updown icon"
                />
              )}
            </Box>
          </Box>
        )}
        {profit && i?.deleteReason && (
          <Box
            sx={{
              height: "40px",
              width: "30%",
              margin: { xs: "1px", lg: "1px" },
              display: "flex",
              background: "black",
              justifyContent: "center",
              alignItems: "center",
              paddingX: "2px",
              zIndex: 999,
            }}
          >
            <StyledImage
              sx={{
                width: { xs: "15px", lg: "20px" },
                height: { lg: "20px", xs: "14px" },
                marginRight: "5px",
              }}
              src={DeleteIcon}
              alt="delete"
            />
            <Typography
              sx={{
                fontSize: { xs: "7px", lg: ".5vw" },
                color: "white",
                fontWeight: "700",
                width: { lg: "65%", xs: "55%" },
                textTransform: "uppercase",
              }}
            >
              Bet <span style={{ color: "#e41b23" }}>Deleted</span> Due {"\n"}
              {i?.deleteReason}
            </Typography>
          </Box>
        )}
        {i?.deleteReason && betHistory && (
          <Box
            sx={{
              height: "40px",
              width: "30%",
              margin: { xs: "1px", lg: "1px" },
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              paddingX: "2px",
              zIndex: 999,
              position: "absolute",
              right: 0,
            }}
          >
            <StyledImage
              sx={{
                width: { xs: "15px", lg: "20px" },
                height: { lg: "20px", xs: "14px" },
                marginRight: "5px",
              }}
              src={DeleteIcon}
              alt="delete"
            />
            <Typography
              sx={{
                fontSize: { xs: "7px", lg: ".5vw" },
                color: "white",
                fontWeight: "700",
                width: { lg: "65%", xs: "55%" },
                textTransform: "uppercase",
              }}
            >
              Bet <span style={{ color: "#e41b23" }}>Deleted</span> Due {"\n"}
              {i?.deleteReason}
            </Typography>
          </Box>
        )}
      </Box>
    );
  });

  const maxHeight = window.innerWidth < 768 ? 200 : 420;
  const dynamicHeight = Math.min(allBetsData.length * 41, maxHeight);
  return (
    <Box
      sx={[
        {
          width: { md: "100%", xs: "100%", lg: "100%" },
          display: "flex",
          flexDirection: "column",
          marginX: { lg: "0vw", xs: "0px", md: "0px" },
          marginY: { lg: ".5vh", xs: "2px" },
          marginTop: { xs: "0" },
          borderRadius: "2px",
          background: "white",
          padding: "1px",
          alignSelf: {
            xs: "center",
            md: "center",
            lg: "flex-start",
          },
        },
      ]}
    >
      <Box
        sx={{
          display: "flex",
          height: 38,
          flexDirection: "row",
          width: "100%",
          alignSelf: "center",
        }}
      >
        <Box
          sx={{
            flex: 1,
            background: "#f1c550",
            alignItems: "center",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography
            sx={{
              fontSize: { lg: "13px", md: "10px", xs: "10px" },
              fontWeight: "bold",
              marginLeft: "7px",
            }}
          >
            Session Bets: {allBetsData?.length < 10 ? 0 : ""}
            {allBetsData?.length || 0}
          </Typography>
        </Box>

        <Box
          sx={{
            flex: 0.1,
            background: "#262626",
          }}
        >
          <div className="slanted" />
        </Box>

        <Box
          sx={{
            flex: 1,
            background: "#262626",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <img
            onClick={() => {
              setVisible(!visible);
            }}
            src={ARROWUP}
            alt="arrow up"
            style={{
              transform: visible ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.3s ease",
              width: "15px",
              height: "15px",
              marginRight: "5px",
              marginLeft: "5px",
            }}
          />
        </Box>
      </Box>
      {visible && (
        <>
          <Box sx={{ display: "flex", flexDirection: "row", gap: "1px" }}>
            <Box
              sx={{
                height: "25px",
                width: "30px",
                display: "flex",
                background: "black",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography
                sx={{ fontWeight: "400", fontSize: "10px", color: "white" }}
              >
                No
              </Typography>
            </Box>
            <RowComponent
              header={true}
              data={["Place Time", "Username", "Odds", "Yes/No", "Stake"]}
            />
            {profit && (
              <Box
                sx={{
                  height: "25px",
                  width: "30%",
                  display: "flex",
                  background: "#319E5B",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography
                  sx={{
                    fontWeight: "400",
                    fontSize: { xs: "10px", lg: ".7vw" },
                    color: "white",
                  }}
                >
                  {matchesMobile ? "P/L" : "Profit Loss"}
                </Typography>
              </Box>
            )}
          </Box>

          <Box
            sx={{
              height: dynamicHeight,
              overflowY: "auto",
              "::-webkit-scrollbar": {
                display: "none",
              },
            }}
          >
            <AutoSizer>
              {({ height, width }) => (
                <List
                  height={height}
                  itemCount={allBetsData?.length || 0}
                  itemKey={(index, data) => data?.allBetsData?.[index]?.id}
                  itemSize={41} // Adjust based on your row height
                  width={width}
                >
                  {Row}
                </List>
              )}
            </AutoSizer>
          </Box>
        </>
      )}
    </Box>
  );
};

export default memo(SessionBetSeperate);
