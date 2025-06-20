import { Box, Typography } from "@mui/material";
import { useState, memo } from "react";
import { ARROWUP } from "../../../assets";
import Divider from "../../Common/Divider";
// import Stop from "./Stop";
import SessionMarketBox from "./SessionMarketBox";
// import { sessionBetLiveStatus } from "../../../store/actions/match/matchAction";
// import { AppDispatch } from "../../../store/store";
// import { useDispatch } from "react-redux";
import { customSortUpdated } from "../../../helpers";
// import { formatToINR } from "../../helper";

const SessionMarket2 = ({
  // currentMatch,
  hideResult,
  // stopAllHide,
  title,
  hideTotalBet,
  sessionData,
  profitLossData,
  hideEditMaxButton,
  cstmStyle,
}: // maxHeight,
any) => {
  // const dispatch: AppDispatch = useDispatch();
  const [visible, setVisible] = useState(true);
  return (
    <Box
      sx={{
        display: "flex",
        backgroundColor: "white",
        flexDirection: "column",
        marginY: { lg: "3px" },
        width: "100%",
        alignSelf: {
          xs: "center",
          md: "center",
          lg: "flex-start",
          boxShadow: "0px 5px 10px #0000001A",
        },
        marginBottom: "1rem",
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
              textTransform: "capitalize",
            }}
          >
            {title}
          </Typography>
          {/* {!stopAllHide && (
            <Stop
              onClick={() => {
                dispatch(
                  sessionBetLiveStatus({
                    status: "save",
                    matchId: currentMatch?.id,
                    stopAllSessions: true,
                  })
                );
              }}
            />
          )} */}
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
            alt={"Up Arrow"}
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
            sx={[
              {
                display: "flex",
                flexDirection: "column",
                width: "100%",
                position: "relative",
                // maxHeight: { lg: maxHeight ? maxHeight : "30vh", xs: "40vh" },
                // overflowY: "auto",
                "::-webkit-scrollbar": {
                  display: "none",
                },
                // maxHeight: "300px",
                // overflowY: "scroll",
              },
              cstmStyle,
            ]}
          >
            {sessionData?.section?.length > 0 &&
              sessionData?.section
                ?.filter(
                  (item: any) =>
                    !item?.isComplete &&
                    item?.activeStatus !== "unSave" &&
                    ((item?.resultData && item?.resultData === null) ||
                      item?.result === null)
                )
                ?.slice()
                .sort(customSortUpdated)
                ?.map((match: any, index: number) => {
                  if (match.id) {
                    return (
                      <Box key={match?.SelectionId}>
                        <SessionMarketBox
                          hideResult={hideResult}
                          hideTotalBet={hideTotalBet}
                          newData={match}
                          profitLossData={profitLossData}
                          index={index}
                          hideEditMaxButton={hideEditMaxButton}
                        />
                        <Divider />
                      </Box>
                    );
                  } else {
                    return null;
                  }
                })}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default memo(SessionMarket2);
