import { useEffect, useState } from "react";
import Divider from "../../Common/Divider";
import { Box, Typography } from "@mui/material";
import Result from "../Result";
import SmallBox from "../SmallBox";
import SeparateBox from "../SeparateBox";
import { formatNumber } from "../../helper";
import CustomSessionResult from "./CustomSessionResult";
import PlaceBetComponent from "./PlaceBetComponent";
import {
  matchListReset,
  sessionBetLiveStatus,
} from "../../../store/actions/match/matchAction";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";

const SessionMarketBox = ({
  currentMatch,
  newData,
  setLocalState,
  updateSessionData,
  hideResult,
  hideTotalBet,
  setData,
  setIObtes,
}: any) => {
  const dispatch: AppDispatch = useDispatch();
  const { success, loading } = useSelector(
    (state: RootState) => state.matchList
  );
  const [visible, setVisible] = useState(false);
  const [live, setLive] = useState<boolean>(false);

  useEffect(() => {
    if (success) {
      setVisible(false);
      dispatch(matchListReset());
    }
  }, [success]);
  return (
    <div style={{ position: "relative" }}>
      {!["live"].includes(JSON.parse(newData)?.activeStatus) && (
        <Box
          sx={{
            margin: "1px",
            width: { lg: "100%", xs: "100%" },
            height: "100%",
            right: 0,
            position: "absolute",
            background: "rgba(0,0,0,0.4)",
            zIndex: 2,
          }}
        ></Box>
      )}
      <Box
        sx={{
          display: "flex",
          background: "white",
          height: "30px",
          width: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            background: "white",
            height: "30px",
            width: "40%",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              color: "black",
              fontSize: { lg: "10px", md: "10px", xs: "8px" },
              marginLeft: "7px",
              fontWeight: "600",
            }}
          >
            {JSON.parse(newData)?.name}
          </Typography>
        </Box>

        <Box
          sx={{
            position: "absolute",
            top: "4px",
            width: "30%",
            justifyContent: "flex-end",
            left: { lg: "14vw", md: "24vw" },
            display: "flex",
            zIndex: 100,
          }}
        >
          {JSON.parse(newData)?.activeStatus === "live" && (
            <SmallBox
              loading={loading}
              hide={true}
              onClick={(e: any) => {
                e.preventDefault();
                setLive(!live);
                dispatch(
                  sessionBetLiveStatus({
                    status: live ? "live" : "save",
                    betId: JSON.parse(newData)?.id,
                  })
                );
              }}
              textSize={"8px"}
              width={"33px"}
              color={
                JSON.parse(newData)?.activeStatus === "live"
                  ? "#46e080"
                  : "#FF4D4D"
              }
            />
          )}
          {JSON.parse(newData)?.activeStatus === "result" &&
            JSON.parse(newData)?.result && (
              <SmallBox
                loading={false}
                hide={false}
                textSize={"12px"}
                width={"80px"}
                title={`Score : ${JSON.parse(newData)?.result || 0}`}
                color={"#FFF"}
              />
            )}
          {JSON.parse(newData)?.activeStatus === "save" && (
            <SmallBox
              hide={true}
              loading={loading}
              onClick={(e: any) => {
                e.preventDefault();
                // setLive(!live);
                // handleLive(0);
              }}
              textSize={"8px"}
              // width={"80px"}
              width={"33px"}
              // title={"Live"}
            />
          )}
          {!hideResult && (
            <Result
              width={7}
              onClick={() => {
                setVisible(true);
              }}
            />
          )}
        </Box>
        {visible && (
          <Box
            sx={{
              position: "absolute",
              zIndex: 105,
              top: 0,
              right: 0,
              width: "100%",
              display: "flex",
              justifyContent: "end",
            }}
          >
            <CustomSessionResult
              newData={newData}
              visible={visible}
              setIObtes={setIObtes}
              setLocalState={setLocalState}
              currentMatch={currentMatch}
              //   setLive={setLive}
              updateSessionData={updateSessionData}
              onClick={() => {
                setVisible(false);
              }}
            />
          </Box>
        )}
        {!["ACTIVE", "", undefined, null, 0].includes(newData?.suspended) ||
        newData?.betStatus === 2 ? (
          <Box
            sx={{
              margin: "1px",
              background: "rgba(0,0,0,1)",
              height: "32px",
              right: "20.5%",
              position: "absolute",
              width: { lg: "18%", xs: "18%" },
              justifyContent: { xs: "center", lg: "center" },
              alignItems: "center",
              display: "flex",
            }}
          >
            {/* <img src={BallStart} style={{ width: '113px', height: "32px" }} /> */}
            <h6
              style={{
                textTransform: "uppercase",
                fontSize: "12px",
                textAlign: "center",
                lineHeight: "11px",
                color: "#FFF",
                fontWeight: "400",
              }}
            >
              {newData?.betStatus === 2
                ? `Result Declared`
                : JSON.parse(newData)?.status}
            </h6>
          </Box>
        ) : (
          <Box
            sx={{
              display: "flex",
              position: "relative",
              background: "white",
              height: "30px",
              marginLeft: "4vh",
              width: { lg: "18.6%", xs: "60%", paddingLeft: "6px" },
              justifyContent: "center",
              alignItems: "center",
              margin: "auto",
            }}
          >
            <SeparateBox
              session={true}
              back={true}
              value={formatNumber(JSON.parse(newData)?.noRate)}
              value2={formatNumber(JSON.parse(newData)?.noPercent)}
              lock={JSON.parse(newData)?.suspended === "suspended"}
              color={"#F6D0CB"}
            />

            <Box
              sx={{ width: ".45%", display: "flex", background: "pink" }}
            ></Box>

            <SeparateBox
              session={true}
              value={formatNumber(JSON.parse(newData)?.yesRate)}
              value2={formatNumber(JSON.parse(newData)?.yesPercent)}
              lock={JSON.parse(newData)?.status === "suspended"}
              color={"#B3E0FF"}
            />
          </Box>
        )}
        {!hideTotalBet && (
          <PlaceBetComponent width={7} newData={newData} setData={setData} />
        )}
      </Box>
      <Divider />
    </div>
  );
};

export default SessionMarketBox;
