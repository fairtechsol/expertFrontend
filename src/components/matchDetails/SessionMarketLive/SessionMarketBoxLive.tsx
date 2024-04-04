import { useState } from "react";
import { Box, Typography } from "@mui/material";
import Divider from "../../Common/Divider";
import SeparateBox from "../SeparateBox";
import { formatNumber } from "../../helper";
import SmallBox from "../SmallBox";
import Result from "../Result";
import SessionResultModal from "../../addSession/SessionResult/SessionResultModal";
import { addSession } from "../../../store/actions/addSession";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store/store";

const SessionMarketBoxLive = ({
  newData,
  currentMatch,
  setLocalState,
  updateSessionData,
  hideResult,
  index
}: any) => {
  const dispatch: AppDispatch = useDispatch();

  const [live, setLive] = useState<any>(
    newData?.isActive === false ? true : false
  );
  const [visible, setVisible] = useState(false);

  const handleLive = () => {
    const payload = {
      matchId: currentMatch?.id,
      type: "session",
      name: newData?.RunnerName,
      // minBet: "any",
      // maxBet: "any",
      selectionId: newData?.SelectionId,
      yesRate: newData?.BackPrice1,
      noRate: newData?.LayPrice1,
      yesPercent: newData?.leftYesRatePercent,
      noPercent: newData?.leftNoRatePercent,
    };
    dispatch(addSession(payload));
  };

  return (
    <div style={{ position: "relative" }}>
      {live && (
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
          height: "38px",
          width: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            background: index % 2 === 0 ? "#FFE094" : "#ECECEC",
            height: "40px",
            width: "55%",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              color: "black",
              fontSize: { lg: "10px", md: "10px", xs: "10px" },
              marginLeft: { lg: "7px", md: "20px", xs: "20px" },
              fontWeight: "600",
              lineHeight: 1
            }}
          >
            {newData?.RunnerName}
          </Typography>
        </Box>

        <Box
          sx={{
            position: "absolute",
            top: "5px",
            right: { lg: "24%", md: "35%", xs: "30%" },
            display: "flex",
            zIndex: 100,
          }}
        >
          {live && (
            <SmallBox
              hide={true}
              onClick={(e: any) => {
                e.preventDefault();
                setLive(!live);
                handleLive();
              }}
              textSize={"8px"}
              width={"28px"}
              color={"#FF4D4D"}
            />
          )}
          {newData?.betStatus === 2 && newData?.betRestult && (
            <SmallBox
              hide={false}
              textSize={"12px"}
              width={"80px"}
              title={`Score : ${newData?.betRestult || 0}`}
              color={"#FFF"}
            />
          )}
          {!live && (
            <SmallBox
              hide={true}
              onClick={(e: any) => {
                e.preventDefault();
                // setLive(!live);
                // handleLive(0);
              }}
              textSize={"8px"}
              width={"33px"}
              // title={"Live"}
            />
          )}
          {!hideResult && (
            <Result
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
              top: "100%",
              right: "0vh",
            }}
          >
            <SessionResultModal
              newData={newData}
              setLocalState={setLocalState}
              //   currentMatch={currentMatch}
              //   setLive={setLive}
              updateSessionData={updateSessionData}
              onClick={() => {
                setVisible(false);
              }}
            />
          </Box>
        )}

        {!["ACTIVE", "", undefined, null].includes(newData?.GameStatus) ? (
          <Box
            sx={{
              margin: "1px",
              background: "rgba(0,0,0,1)",
              height: "38px",
              right: "0vh",
              position: "absolute",
              width: { lg: "27%", xs: "27%" },
              justifyContent: { xs: "center", lg: "center" },
              alignItems: "center",
              display: "flex",
            }}
          >
            {/* <img src={BallStart} style={{ width: '113px', height: "32px" }} /> */}

            <Typography
              style={{
                fontSize: "10px",
                textTransform: "uppercase",
                textAlign: "center",
                width: "100%",
                color: "white",
                fontWeight: "400",
              }}
            >
              {newData?.betStatus === 2
                ? `Result Declared`
                : newData?.GameStatus}
            </Typography>
          </Box>
        ) : (
          <Box
            sx={{
              display: "flex",
              position: "relative",
              background: index % 2 === 0 ? "#FFE094" : "#ECECEC",
              height: "38px",
              // marginLeft: "40px",
              width: { lg: "45%", xs: "60%" },
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <SeparateBox
              session={true}
              back={true}
              width={"30%"}
              value={newData?.LayPrice1}
              value2={formatNumber(newData?.LaySize1)}
              lock={newData?.GameStatus === "SUSPENDED"}
              color={"#F6D0CB"}
            />

            <Box
              sx={{ width: ".45%", display: "flex", background: "pink" }}
            ></Box>

            <SeparateBox
              session={true}
              width={"30%"}
              value={newData?.BackPrice1}
              value2={formatNumber(newData?.BackSize1)}
              lock={newData?.GameStatus === "SUSPENDED"}
              color={"#B3E0FF"}
            />
          </Box>
        )}
      </Box>
      <Divider />
    </div>
  );
};

export default SessionMarketBoxLive;
