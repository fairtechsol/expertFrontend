import { Box, Typography } from "@mui/material";
import { memo, useEffect, useState } from "react";
import { ARROWUP } from "../../../assets";
import { formatToINR } from "../../helper";
import SessionMarketBoxLive from "./SessionMarketBoxLive";

const SessionMarketLive = ({ title, sessionData, currentMatch, type }: any) => {
  
  const [matchSessionData, setMatchSessionData] = useState(sessionData);
  useEffect(() => {
    setMatchSessionData(
      sessionData?.section?.filter(
        (item: any) => !item?.activeStatus || item?.activeStatus === "unSave"
      )
    );
  }, [sessionData]);
  const [visible, setVisible] = useState(true);

  return (
    <Box
      sx={{
        display: "flex",
        backgroundColor: "white",
        flexDirection: "column",
        marginY: "4px",
        width: { lg: "100%", xs: "100%" },
        alignSelf: {
          xs: "center",
          md: "center",
          lg: "flex-start",
          boxShadow: "0px 5px 10px #0000001A",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          height: "20px",
          flexDirection: "row",
          width: "99.7%",
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
              fontSize: "10px",
              fontWeight: "bold",
              marginLeft: "7px",
              textTransform: "capitalize",
              lineHeight: 1,
            }}
          >
            {title}
            <span
              style={{
                fontSize: "8px",
              }}
            >{`(MIN: ${formatToINR(
              currentMatch?.betFairSessionMinBet
            )})`}</span>
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
            flex: 0.5,
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
              width: "12px",
              height: "12px",
              marginRight: "5px",
              marginLeft: "5px",
              cursor: "pointer",
            }}
          />
        </Box>
      </Box>
      {visible && (
        <Box
          sx={{
            width: "100%",
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              position: "relative",
              "::-webkit-scrollbar": {
                display: "none",
              },
            }}
          >
            {matchSessionData?.length > 0 &&
              matchSessionData?.map((match: any, index: any) => {
                if (!match?.id || match?.activeStatus === "unSave") {
                  return (
                    <Box key={index}>
                      <SessionMarketBoxLive
                        currentMatch={currentMatch}
                        newData={match}
                        index={index}
                        gtype={sessionData?.gtype}
                        type={type}
                      />
                    </Box>
                  );
                }
              })}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default memo(SessionMarketLive);
