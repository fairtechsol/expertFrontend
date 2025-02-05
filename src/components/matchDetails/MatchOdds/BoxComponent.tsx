import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { memo } from "react";
import { formatNumber } from "../../helper";
import SeparateBox from "../SeparateBox";
import MoneyBox from "./MoneyBox";
// import Whitebox from "../WhiteBox";
const BoxComponent = ({
  name,
  data,
  // teamImage,
  // liveData,
  currentMatch,
  align,
  lock,
  teamRates,
  livestatus,
  liveData
}: any) => {
  const theme = useTheme();
  const matchesMobile = useMediaQuery(theme.breakpoints.down("lg"));
  const { ex, status } = data ?? {};
  return (
    <Box
      sx={{
        display: "flex",
        background: "white",
        height: "30px",
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
          height: "30px",
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
          <Typography
            sx={{
              color: "black",
              fontSize: { lg: "8px", xs: "8px" },
              fontWeight: "600",
              marginLeft: "5px",
              lineHeight: "1.2",
              overflowWrap: "anywhere",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: matchesMobile ? "ellipsis" : "",
              width: matchesMobile ? "6ch" : "100ch",
            }}
          >
            {name}
          </Typography>
        </Box>
        {name != "DRAW" && <MoneyBox value={teamRates} />}
      </Box>

      {(![ "", undefined, null, "active", "open"].includes(status?.toLowerCase()) ||
      livestatus)&&
      !(
        !["ACTIVE", "OPEN", ""].includes(liveData?.status) &&
        liveData?.gtype == "match"
      ) ? (
        <Box
          sx={{
            display: "flex",
            background: "white",
            height: "30px",
            width: { lg: "65%", xs: "78%" },
            justifyContent: { xs: "flex-end", lg: "flex-end" },
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              background: "rgba(0,0,0,1)",
              height: "30px",
              width: { lg: "33.4%", xs: "50.4%" },
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
              fontSize: { lg: "10px", sm: "8.5px", md: "10px", xs: "10px" },
            }}
          >
            <h4
              style={{
                textTransform: "uppercase",
                color: "#FFF",
                fontWeight: "400",
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
              height: "30px",
              width: { lg: "65%", xs: "78%" },
              justifyContent: { xs: "flex-end", lg: "flex-end" },
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                background: "white",
                height: "30px",
                width: { lg: "36.5%", xs: "55%" },
                justifyContent: { xs: "flex-end", lg: "flex-end" },
                alignItems: "center",
              }}
            >
              {/* {!matchesMobile &&
              (liveData?.type != "bookmaker2" ||
              liveData?.type != "tiedMatch3" ? (
                <SeparateBox
                  currentMatch={currentMatch}
                  align={align}
                  lock={lock}
                  value={
                    ex?.availableToBack?.length > 0
                      ? ex?.availableToBack[
                          ex?.availableToBack?.length > 1 ? 0 : 2
                        ]?.price ?? 0
                      : 0
                  }
                  value2={formatNumber(
                    ex?.availableToBack?.length > 0
                      ? ex?.availableToBack[
                          ex?.availableToBack?.length > 1 ? 0 : 2
                        ]?.size ?? 0
                      : 0
                  )}
                  color={"#CEEBFF"}
                />
              ) : (
                <Whitebox />
              ))}
            <Box
              sx={{ width: ".45%", display: "flex", background: "pink" }}
            ></Box>
            {!matchesMobile &&
              (liveData?.type != "bookmaker2" ||
              liveData?.type != "tiedMatch3" ? (
                <SeparateBox
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
                />
              ) : (
                <Whitebox />
              ))}
            <Box
              sx={{ width: ".45%", display: "flex", background: "pink" }}
            ></Box> */}
              <SeparateBox
                currentMatch={currentMatch}
                align={align}
                value={
                  ex?.availableToBack?.length > 0
                    ? ex?.availableToBack[
                        ex?.availableToBack?.length > 1 ? 2 : 0
                      ]?.price ?? 0
                    : 0
                }
                lock={lock}
                value2={formatNumber(
                  ex?.availableToBack?.length > 0
                    ? ex?.availableToBack[
                        ex?.availableToBack?.length > 1 ? 2 : 0
                      ]?.size ?? 0
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
              {/* {!matchesMobile && (
              <Box
                sx={{ width: ".45%", display: "flex", background: "pink" }}
              ></Box>
            )} */}
              {/* {!matchesMobile &&
              (liveData?.type != "bookmaker2" ||
              liveData?.type != "tiedMatch3" ? (
                <SeparateBox
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
                />
              ) : (
                <Whitebox />
              ))}
            {!matchesMobile && (
              <Box
                sx={{ width: ".45%", display: "flex", background: "pink" }}
              ></Box>
            )}
            {!matchesMobile &&
              (liveData?.type != "bookmaker2" ||
              liveData?.type != "tiedMatch3" ? (
                <SeparateBox
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
                />
              ) : (
                <Whitebox />
              ))} */}
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
};
export default memo(BoxComponent);
