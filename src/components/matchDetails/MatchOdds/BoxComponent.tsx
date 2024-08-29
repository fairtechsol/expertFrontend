import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { memo } from "react";
import SeparateBox from "../SeparateBox";
import { formatNumber } from "../../helper";
import MoneyBox from "./MoneyBox";
import Whitebox from "../WhiteBox";
const BoxComponent = ({
  name,
  data,
  // teamImage,
  liveData,
  currentMatch,
  align,
  lock,
  teamRates,
  livestatus,
}: any) => {
  const theme = useTheme();
  const matchesMobile = useMediaQuery(theme.breakpoints.down("lg"));
  const { ex, status } = data ?? {};
  return (
    <Box
      sx={{
        display: "flex",
        background: "white",
        height: "40px",
        width: "100%",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Box
        sx={{
          display: "flex",
          background: "white",
          position: "relative",
          height: "40px",
          width: "35%",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            flexDirection: "row",
            display: "flex",
            width: "100%",
            alignItems: "center",
          }}
        >
          {/* {teamImage !== null && (
            <>
              <img
                src={`wallet/${teamImage}`}
                style={{
                  width: "22px",
                  height: "25px",
                  marginLeft: "10px",
                  backgroundSize: "contains",
                }}
                alt={name}
              />
            </>
          )} */}
          <Typography
            sx={{
              color: "black",
              fontSize: { lg: "10px", xs: "13px" },
              fontWeight: "600",
              marginLeft: "10px",
              lineHeight: "1.2",
            }}
          >
            {name}
          </Typography>
        </Box>
        {name != "DRAW" && <MoneyBox value={teamRates} />}
      </Box>

      {!["ACTIVE", "", undefined, null].includes(status) || livestatus ? (
        <Box
          sx={{
            display: "flex",
            background: "white",
            height: "40px",
            width: { lg: "65%", xs: "78%" },
            justifyContent: { xs: "flex-end", lg: "center" },
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              background: "rgba(0,0,0,1)",
              height: "40px",
              width: { lg: "100%", xs: "50.4%" },
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
            }}
          >
            <h4
              style={{
                textTransform: "uppercase",
                color: "#FFF",
                fontWeight: "400",
                fontSize: matchesMobile ? "12px" : "22px",
              }}
            >
              {livestatus ? "SUSPENDED" : status}
            </h4>
          </Box>
        </Box>
      ) : (
        <>
          <Box
            sx={{
              display: "flex",
              background: "white",
              height: "40px",
              width: { lg: "65%", xs: "78%" },
              justifyContent: { xs: "flex-end", lg: "center" },
              alignItems: "center",
            }}
          >
            {!matchesMobile && (
             liveData?.type != "bookmaker2"? <SeparateBox
                currentMatch={currentMatch}
                align={align}
                lock={lock}
                value={
                  ex?.availableToBack?.length > 0
                    ? ex?.availableToBack[ex?.availableToBack?.length>1?0:2]?.price ?? 0
                    : 0
                }
                value2={formatNumber(
                  ex?.availableToBack?.length > 0
                    ? ex?.availableToBack[ex?.availableToBack?.length>1?0:2]?.size ?? 0
                    : 0
                )}
                color={"#CEEBFF"}
              /> : 
              <Whitebox />
            )}
            <Box
              sx={{ width: ".45%", display: "flex", background: "pink" }}
            ></Box>
            {!matchesMobile && (
             liveData?.type != "bookmaker2"? <SeparateBox
                currentMatch={currentMatch}
                align={align}
                lock={lock}
                value={
                  ex?.availableToBack?.length > 0
                    ? ex?.availableToBack[1]?.price ?? 0
                    : 0
                }
                value2={formatNumber(
                  ex?.availableToBack?.length > 0
                    ? ex?.availableToBack[1]?.size ?? 0
                    : 0
                )}
                color={"#C2E6FF"}
              /> : 
              <Whitebox />
            )}
            <Box
              sx={{ width: ".45%", display: "flex", background: "pink" }}
            ></Box>
            <SeparateBox
              currentMatch={currentMatch}
              align={align}
              value={
                ex?.availableToBack?.length > 0
                  ? ex?.availableToBack[ex?.availableToBack?.length>1?2:0]?.price ?? 0
                  : 0
              }
              lock={lock}
              value2={formatNumber(
                ex?.availableToBack?.length > 0
                  ? ex?.availableToBack[ex?.availableToBack?.length>1?2:0]?.size ?? 0
                  : 0
              )}
              color={"#A7DCFF"}
            />
            <Box
              sx={{ width: ".45%", display: "flex", background: "pink" }}
            ></Box>
            <SeparateBox
              currentMatch={currentMatch}
              align={align}
              value={
                ex?.availableToLay?.length > 0
                  ? ex?.availableToLay[0]?.price ?? 0
                  : 0
              }
              lock={lock}
              value2={formatNumber(
                ex?.availableToLay?.length > 0
                  ? ex?.availableToLay[0]?.size ?? 0
                  : 0
              )}
              color={"#FFB5B5"}
            />
            {!matchesMobile && (
              <Box
                sx={{ width: ".45%", display: "flex", background: "pink" }}
              ></Box>
            )}
            {!matchesMobile && (
              liveData?.type != "bookmaker2" ? <SeparateBox
                currentMatch={currentMatch}
                back={true}
                align={align}
                lock={lock}
                value={
                  ex?.availableToLay?.length > 0
                    ? ex?.availableToLay[1]?.price ?? 0
                    : 0
                }
                value2={formatNumber(
                  ex?.availableToLay?.length > 0
                    ? ex?.availableToLay[1]?.size ?? 0
                    : 0
                )}
                color={"#FFB5B5"}
              /> : 
              <Whitebox />
            )}
            {!matchesMobile && (
              <Box
                sx={{ width: ".45%", display: "flex", background: "pink" }}
              ></Box>
            )}
            {!matchesMobile && (
             liveData?.type !="bookmaker2" ? <SeparateBox
                currentMatch={currentMatch}
                align={align}
                value={
                  ex?.availableToLay?.length > 0
                    ? ex?.availableToLay[2]?.price ?? 0
                    : 0
                }
                lock={lock}
                value2={formatNumber(
                  ex?.availableToLay?.length > 0
                    ? ex?.availableToLay[2]?.size ?? 0
                    : 0
                )}
                color={"#ECD6D6"}
              /> : 
              <Whitebox />
            )}
          </Box>
        </>
      )}
    </Box>
  );
};
export default memo(BoxComponent);
