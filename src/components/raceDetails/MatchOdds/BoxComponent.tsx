import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import moment from "moment";
import { memo } from "react";
import { formatNumber } from "../../helper";
import SeparateBox from "../SeparateBox";
import MoneyBox from "./MoneyBox";
const BoxComponent = ({
  name,
  data,
  currentMatch,
  align,
  lock,
  teamRates,
  livestatus,
}: any) => {
  const theme = useTheme();
  const matchesMobile = useMediaQuery(theme.breakpoints.down("lg"));
  const { ex, status, adjustmentFactor, removalDate } = data ?? {};
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
          width: { lg: "35%", xs: "65%" },
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            flexDirection: "row",
            display: "flex",
            width: { lg: "50%", xs: "60%" },
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography
            sx={{
              color: "black",
              fontSize: { lg: "10px", xs: "13px" },
              fontWeight: "600",
              marginLeft: "10px",
              lineHeight: "1.2",
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
            }}
          >
            {name}
          </Typography>
        </Box>
        {name != "DRAW" && <MoneyBox value={teamRates} />}
      </Box>

      {!["ACTIVE", "OPEN", "", undefined, null, "active", "open"].includes(
        status?.toLowerCase()
      ) || livestatus ? (
        <Box
          sx={{
            display: "flex",
            background: "#319E5B",
            height: "40px",
            width: { lg: "65%", xs: "35%" },
            justifyContent: { xs: "flex-end", lg: "center" },
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              background: "rgba(0,0,0,1)",
              height: "40px",
              width: { lg: "100%", xs: "100%" },
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
                fontSize: matchesMobile
                  ? status === "REMOVED"
                    ? "10px"
                    : "12px"
                  : status === "REMOVED"
                  ? "14px"
                  : "22px",
              }}
            >
              {livestatus
                ? "SUSPENDED"
                : status === "REMOVED"
                ? `${status} - ${adjustmentFactor}%, ${moment(
                    removalDate
                  ).format("MM/DD/YYYY HH:mm:ss A ([IST])")}`
                : status}
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
              <SeparateBox
                currentMatch={currentMatch}
                align={align}
                lock={lock}
                value={
                  ex?.availableToBack?.length > 0
                    ? ex?.availableToBack[2]?.price ?? 0
                    : 0
                }
                value2={formatNumber(
                  ex?.availableToBack?.length > 0
                    ? ex?.availableToBack[2]?.size ?? 0
                    : 0
                )}
                color="#CEEBFF"
              />
            )}
            <Box
              sx={{ width: ".45%", display: "flex", background: "pink" }}
            ></Box>
            {!matchesMobile && (
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
                color="#C2E6FF"
              />
            )}
            <Box
              sx={{ width: ".45%", display: "flex", background: "pink" }}
            ></Box>
            <SeparateBox
              currentMatch={currentMatch}
              align={align}
              value={
                ex?.availableToBack?.length > 0
                  ? ex?.availableToBack[0]?.price ?? 0
                  : 0
              }
              lock={lock}
              value2={formatNumber(
                ex?.availableToBack?.length > 0
                  ? ex?.availableToBack[0]?.size ?? 0
                  : 0
              )}
              color="#A7DCFF"
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
              color="#FFB5B5"
            />
            {!matchesMobile && (
              <Box
                sx={{ width: ".45%", display: "flex", background: "pink" }}
              ></Box>
            )}
            {!matchesMobile && (
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
                color="#FFB5B5"
              />
            )}
            {!matchesMobile && (
              <Box
                sx={{ width: ".45%", display: "flex", background: "pink" }}
              ></Box>
            )}
            {!matchesMobile && (
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
                color="#ECD6D6"
              />
            )}
          </Box>
        </>
      )}
    </Box>
  );
};
export default memo(BoxComponent);
