import { memo, useState } from "react";
import { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import Divider from "../../Common/Divider";
import { ARROWUP } from "../../../assets";
import { formatToINR } from "../../helper";
import CasinoMarketBoxLive from "./CasinoMarketBoxLive";
import { AppDispatch } from "../../../store/store";
import { useDispatch } from "react-redux";
import { addSession } from "../../../store/actions/addSession";
import LiveStatusButtonBox from "../CasinoMarket/LiveStatusButtonBox";

const CasinoMarketLive = ({
  title,
  sessionData,
  currentMatch,
  type,
  gtype,
}: any) => {
  const [matchSessionData, setMatchSessionData] = useState(sessionData);
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

  useEffect(() => {
    setMatchSessionData(
      sessionData?.section?.filter((item: any) => !item?.activeStatus)
    );
  }, [sessionData]);

  return (
    <Box
      sx={{
        display: "flex",
        backgroundColor: "white",
        flexDirection: "column",
        marginY: { lg: "4px" },
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
          height: "35px",
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
            // height: "40px",
          }}
        >
          <Typography
            sx={{
              fontSize: "10px",
              fontWeight: "bold",
              marginLeft: "7px",
            }}
          >
            {title}{" "}
            {`(MIN: ${formatToINR(currentMatch?.betFairSessionMinBet)})`}
          </Typography>
        </Box>
        <Box
          sx={
            {
              // top: "5px",
              // right: { lg: "30%", md: "35%", xs: "30%" },
              // display: "flex",
              // zIndex: 100,
            }
          }
        >
          {!live && (
            <LiveStatusButtonBox
              hide={true}
              onClick={(e: any) => {
                e.preventDefault();
                setLive(!live);
                handleLive();
              }}
              textSize="8px"
              width="28px"
              color="#FF4D4D"
            />
          )}
          {live && (
            <LiveStatusButtonBox
              hide={true}
              onClick={(e: any) => {
                e.preventDefault();
              }}
              textSize="8px"
              width="33px"
            />
          )}
        </Box>

        <Box
          sx={{
            flex: 0.1,
            background: "#262626",
            // '#262626'
          }}
        >
          <div className="slanted"></div>
        </Box>
        <Box
          sx={{
            flex: 0.5,
            background: "#262626",
            // '#262626' ,
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          {/* <SmallBoxSeason /> */}
          <img
            onClick={() => {
              setVisible(!visible);
            }}
            src={ARROWUP}
            style={{
              transform: visible ? "rotate(180deg)" : "rotate(0deg)",
              width: "15px",
              height: "15px",
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
              maxHeight: { lg: "85vh", xs: "40vh" },
              overflowY: "auto",
              "::-webkit-scrollbar": {
                display: "none",
              },
            }}
          >
            {matchSessionData?.length > 0 &&
              matchSessionData?.map((match: any, index: any) => {
                return (
                  <Box key={index}>
                    <CasinoMarketBoxLive
                      currentMatch={currentMatch}
                      newData={match}
                      index={index}
                      gtype={sessionData?.gtype}
                      type={type}
                    />
                    <Divider />
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
