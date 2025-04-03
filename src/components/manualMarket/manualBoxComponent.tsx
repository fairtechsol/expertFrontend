import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { memo } from "react";
import { BallStart } from "../../assets";
import MoneyBox from "../matchDetails/MatchOdds/MoneyBox";
import ManualSeparateBox from "./manualSeperateBox";
const ManualBoxComponent = ({
  name,
  data,
  currentMatch,
  align,
  teamRates,
  livestatus,
  ballStatus,
  isTeamC,
  status,
}: any) => {
  const theme = useTheme();
  const matchesMobile = useMediaQuery(theme.breakpoints.down("lg"));

  // const handleDecimal = (
  //   value: any,
  //   gap: any,
  //   type: any,
  //   rateThan100: boolean
  // ) => {
  //   let checkDecimal = value % 1;
  //   if (checkDecimal >= 0.5) {
  //     let getValue =
  //       type == "back" ? Math.round(value) - gap : Math.round(value - 1) + gap;
  //     let checkZeroHundred =
  //       type == "back"
  //         ? getValue < 1
  //           ? 0
  //           : Math.round(getValue)
  //         : rateThan100
  //         ? Math.round(getValue)
  //         : getValue >= 100
  //         ? 100
  //         : Math.round(getValue);
  //     let returnValue;
  //     if (type == "back") {
  //       let check = value % 1;
  //       returnValue =
  //         check >= 0.5
  //           ? getValue < 1
  //             ? checkZeroHundred
  //             : checkZeroHundred - 1
  //           : checkZeroHundred;
  //     } else {
  //       returnValue = checkZeroHundred;
  //     }
  //     return returnValue;
  //   } else {
  //     let getValue = type == "back" ? value - gap : value + gap;
  //     let checkZeroHundred =
  //       type == "back"
  //         ? getValue < 1
  //           ? 0
  //           : Math.round(getValue)
  //         : rateThan100
  //         ? Math.round(getValue)
  //         : getValue >= 100
  //         ? 100
  //         : Math.round(getValue);
  //     let returnValue;
  //     if (type == "back") {
  //       let check = value % 1;
  //       returnValue = check >= 0.5 ? checkZeroHundred - 1 : checkZeroHundred;
  //     } else {
  //       returnValue = checkZeroHundred;
  //     }
  //     return returnValue;
  //   }
  // };

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
        <MoneyBox value={teamRates} />
      </Box>
      {ballStatus ? (
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
          ></Box>
          <Box
            sx={{
              background: "#000",
              height: "100%",
              position: "absolute",
              right: 0,
              top: 0,
              zIndex: 10,
              width: { lg: "65%", xs: "34.8%" },
              justifyContent: { xs: "center", lg: "center" },
              alignItems: isTeamC ? "center" : "center",
              display: "flex",
            }}
          >
            <img
              src={BallStart}
              style={{
                width: "108px",
                height: "30px",
                // marginBottom: isTeamC
                //   ? name === "No" || name === "Yes"
                //     ? "0"
                //     : "45px"
                //   : "0",
              }}
              alt=""
            />
          </Box>
        </>
      ) : livestatus ? (
        <Box
          sx={{
            display: "flex",
            background: "white",
            height: "30px",
            width: { lg: "21.7%", xs: "78%" },
            justifyContent: { xs: "flex-end", lg: "flex-end" },
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              background: "rgba(0,0,0,1)",
              height: "30px",
              width: { lg: "100%", xs: "50.4%" },
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
                // fontSize: matchesMobile ? "10px" : "9px",
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
              width: { lg: "24%", xs: "78%" },
              justifyContent: { xs: "flex-end", lg: "flex-end" },
              alignItems: "center",
            }}
          >
            {/* {!matchesMobile && (
              <ManualSeparateBox
                currentMatch={currentMatch}
                align={align}
                lock={
                  data?.back
                    ? handleDecimal(
                        +data?.back,
                        2,
                        "back",
                        currentMatch?.rateThan100
                      ) > 0
                      ? false
                      : true
                    : true
                }
                value={
                  data?.back
                    ? handleDecimal(
                        +data?.back,
                        2,
                        "back",
                        currentMatch?.rateThan100
                      )
                    : 0
                }
                color={"#CEEBFF"}
              />
            )}
            <Box
              sx={{ width: ".45%", display: "flex", background: "pink" }}
            ></Box>
            {!matchesMobile && (
              <ManualSeparateBox
                currentMatch={currentMatch}
                align={align}
                lock={
                  data?.back
                    ? handleDecimal(
                        +data?.back,
                        1,
                        "back",
                        currentMatch?.rateThan100
                      ) > 0
                      ? false
                      : true
                    : true
                }
                value={
                  data?.back
                    ? handleDecimal(
                        +data?.back,
                        1,
                        "back",
                        currentMatch?.rateThan100
                      )
                    : 0
                }
                color={"#C2E6FF"}
              />
            )} */}
            <Box
              sx={{ width: ".45%", display: "flex", background: "pink" }}
            ></Box>
            <ManualSeparateBox
              currentMatch={currentMatch}
              align={align}
              lock={+data?.back > 0 ? false : true}
              value={+data?.back}
              color={"#A7DCFF"}
            />
            <Box
              sx={{ width: ".45%", display: "flex", background: "pink" }}
            ></Box>
            <ManualSeparateBox
              currentMatch={currentMatch}
              align={align}
              lock={
                currentMatch?.rateThan100
                  ? false
                  : +data?.lay < 100.25
                  ? false
                  : true
              }
              value={+data?.lay}
              color={"#FFB5B5"}
            />
            {/* {!matchesMobile && (
              <Box
                sx={{ width: ".45%", display: "flex", background: "pink" }}
              ></Box>
            )}
            {!matchesMobile && (
              <ManualSeparateBox
                currentMatch={currentMatch}
                back={true}
                align={align}
                lock={
                  currentMatch?.rateThan100
                    ? false
                    : +data?.lay <= 99.75
                    ? false
                    : true
                }
                value={
                  data?.lay
                    ? handleDecimal(
                        +data?.lay,
                        1,
                        "",
                        currentMatch?.rateThan100
                      )
                    : 0
                }
                color={"#FFB5B5"}
              />
            )}
            {!matchesMobile && (
              <Box
                sx={{ width: ".45%", display: "flex", background: "pink" }}
              ></Box>
            )}
            {!matchesMobile && (
              <ManualSeparateBox
                currentMatch={currentMatch}
                align={align}
                lock={
                  currentMatch?.rateThan100
                    ? false
                    : +data?.lay <= 98.75
                    ? false
                    : true
                }
                value={
                  data?.lay
                    ? handleDecimal(
                        +data?.lay,
                        2,
                        "",
                        currentMatch?.rateThan100
                      )
                    : 0
                }
                color={"#ECD6D6"}
              />
            )} */}
          </Box>
        </>
      )}
    </Box>
  );
};
export default memo(ManualBoxComponent);
