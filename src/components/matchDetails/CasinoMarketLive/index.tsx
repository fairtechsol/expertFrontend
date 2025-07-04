import { Box, Typography } from "@mui/material";
import { memo, useState } from "react";
import { useDispatch } from "react-redux";
import { ARROWUP } from "../../../assets";
import { addSession } from "../../../store/actions/addSession";
import { sessionBetLiveStatus } from "../../../store/actions/match/matchAction";
import { AppDispatch } from "../../../store/store";
import { formatToINR } from "../../helper";
import LiveStatusButtonBox from "../CasinoMarket/LiveStatusButtonBox";
import CasinoMarketBoxLive from "./CasinoMarketBoxLive";

const CasinoMarketLive = ({
  title,
  sessionData,
  currentMatch,
  type,
  gtype,
}: any) => {
  const [live, setLive] = useState<any>(false);
  const [visible, setVisible] = useState(true);
  const dispatch: AppDispatch = useDispatch();

  const handleLive = () => {
    const payload = {
      matchId: currentMatch?.id,
      type: type,
      name: title,
      gtype: gtype,
      selectionId: (sessionData?.SelectionId).toString(),
      yesRate: 0,
      noRate: 0,
      yesPercent: 0,
      noPercent: 0,
    };
    dispatch(addSession(payload));
  };

  const handleClick = (e: any) => {
    e.preventDefault();
    setLive(!live);
    if (sessionData?.id) {
      dispatch(
        sessionBetLiveStatus({
          status: "live",
          betId: sessionData?.id,
        })
      );
    } else handleLive();
  };

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
          {!live && (
            <LiveStatusButtonBox
              hide={true}
              onClick={handleClick}
              width={{ lg: "20px", xs: "20px" }}
              color="#FF4D4D"
              height="20px"
            />
          )}
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
              overflowY: "auto",
              "::-webkit-scrollbar": {
                display: "none",
              },
            }}
          >
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]?.map((match: any, index: any) => {
              return (
                <Box key={index}>
                  <CasinoMarketBoxLive
                    newData={
                      sessionData?.section?.length > 0
                        ? sessionData?.section[match]
                        : {}
                    }
                    index={index}
                  />
                </Box>
              );
            })}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default memo(CasinoMarketLive);
