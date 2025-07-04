import { Box, Typography } from "@mui/material";
import { memo, useState } from "react";
import { ARROWUP } from "../../../assets";
import Divider from "../../Common/Divider";
import CasinoMarketBox from "./CasinoMarketBox";

interface CasinoMarketProps {
  title: string;
  sessionData: any;
}

const CasinoMarket = ({ title, sessionData }: CasinoMarketProps) => {
  const [visible, setVisible] = useState(true);
  return (
    <Box
      sx={{
        display: "flex",
        position: "relative",
        backgroundColor: "white",
        flexDirection: "column",
        marginY: { lg: "6px" },
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
          height: "22px",
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
              fontSize: "9px",
              fontWeight: "bold",
              marginLeft: "7px",
              lineHeight: 1,
            }}
          >
            {title}
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
              transform: !visible ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.3s ease",
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
            position: "relative",
            width: "100%",
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {sessionData?.activeStatus !== "live" && (
            <Box
              sx={{
                margin: "1px",
                width: "100%",
                height: "100%",
                right: 0,
                position: "absolute",
                background: "rgba(0, 0, 0, 0.4)",
                zIndex: 2,
              }}
            >
              {sessionData?.resultStatus ? (
                <Typography
                  sx={{
                    color: "#fff",
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontWeight: "500",
                    textTransform: "uppercase",
                  }}
                >
                  Result {sessionData?.resultStatus}
                </Typography>
              ) : (
                !["ACTIVE", "active", "", undefined, null, 0, "open"].includes(
                  sessionData?.GameStatus?.toLowerCase()
                ) ||
                (sessionData?.result && (
                  <Typography
                    sx={{
                      color: "#fff",
                      height: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      fontWeight: "500",
                      textTransform: "uppercase",
                    }}
                  >
                    {sessionData?.result
                      ? `Declared (Score = ${sessionData?.result})`
                      : sessionData?.GameStatus}
                  </Typography>
                ))
              )}
            </Box>
          )}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              position: "relative",
              overflowY: "auto",
              "::-webkit-scrollbar": {
                display: "none",
              },
            }}
          >
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]?.map((item: number) => (
              <CasinoMarketBox
                key={item}
                newData={
                  sessionData?.section?.length > 0
                    ? sessionData?.section[item]
                    : {}
                }
                index={item}
              />
            ))}
            <Divider />
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default memo(CasinoMarket);
