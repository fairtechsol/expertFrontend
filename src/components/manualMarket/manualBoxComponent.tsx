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
  lock,
  teamRates,
  livestatus,
  ballStatus,
  isTeamC,
  status,
}: any) => {
  const theme = useTheme();
  const matchesMobile = useMediaQuery(theme.breakpoints.down("lg"));
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
          <Typography
            sx={{
              color: "black",
              fontSize: { lg: "10px", xs: "13px" },
              fontWeight: "600",
              marginLeft: "10px",
              lineHeight: "0.8",
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
              height: "40px",
              width: { lg: "65%", xs: "78%" },
              justifyContent: { xs: "flex-end", lg: "center" },
              alignItems: "center",
            }}
          ></Box>
          <Box
            sx={{
              background: "#000",
              height: isTeamC ? "125px" : "82px",
              position: "absolute",
              right: 0,
              top: 0,
              zIndex: 10,
              width: { lg: "65%", xs: "34.8%" },
              justifyContent: { xs: "center", lg: "center" },
              alignItems: "center",
              display: "flex",
            }}
          >
            <img
              src={BallStart}
              style={{
                width: "108px",
                height: "30px",
                marginBottom: isTeamC ? "45px" : "0",
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
              <ManualSeparateBox
                currentMatch={currentMatch}
                align={align}
                lock={lock}
                value={data?.back - 2}
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
                lock={lock}
                value={data?.back - 1}
                color={"#C2E6FF"}
              />
            )}
            <Box
              sx={{ width: ".45%", display: "flex", background: "pink" }}
            ></Box>
            <ManualSeparateBox
              currentMatch={currentMatch}
              align={align}
              value={data?.back}
              lock={lock}
              color={"#A7DCFF"}
            />
            <Box
              sx={{ width: ".45%", display: "flex", background: "pink" }}
            ></Box>
            <ManualSeparateBox
              currentMatch={currentMatch}
              align={align}
              value={data?.lay}
              lock={lock}
              color={"#FFB5B5"}
            />
            {!matchesMobile && (
              <Box
                sx={{ width: ".45%", display: "flex", background: "pink" }}
              ></Box>
            )}
            {!matchesMobile && (
              <ManualSeparateBox
                currentMatch={currentMatch}
                back={true}
                align={align}
                lock={lock}
                value={data?.lay + 1}
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
                value={data?.lay + 2}
                lock={lock}
                color={"#ECD6D6"}
              />
            )}
          </Box>
        </>
      )}
    </Box>
  );
};
export default memo(ManualBoxComponent);
