import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sessionBetLiveStatus } from "../../../store/actions/match/matchAction";
import { AppDispatch, RootState } from "../../../store/store";
import Divider from "../../Common/Divider";
import { formatNumber, formatToINR } from "../../helper";
import Result from "../Result";
import SeparateBox from "../SeparateBox";
import SmallBox from "../SmallBox";
import CustomSessionResult from "./CustomSessionResult";
import PlaceBetComponent from "./PlaceBetComponent";
import { edit } from "../../../assets";
import SessionLimitEdit from "./SessionLimitEdit";
import ModalMUI from "@mui/material/Modal";

const SessionMarketBox = ({
  currentMatch,
  newData,
  setLocalState,
  updateSessionData,
  hideResult,
  hideTotalBet,
  setIObtes,
  profitLossData,
}: any) => {
  const dispatch: AppDispatch = useDispatch();
  const { statusBetLive, error, success } = useSelector(
    (state: RootState) => state.matchList
  );
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [visible3, setVisible3] = useState(false);
  const [maxBetValue, setMaxBetValue] = useState(null);

  // const [live, setLive] = useState<boolean>(false);

  useEffect(() => {
    if (statusBetLive) {
      setLoading(false);
    }
    if (error) {
      setLoading(false);
    }
  }, [statusBetLive, error]);

  useEffect(() => {
    if (success) {
      setVisible(false);
    }
  }, [success]);

  return (
    <div style={{ position: "relative" }}>
      {!["live"].includes(newData?.activeStatus) && (
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
          height: "40px",
          width: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            background: "white",
            height: "39px",
            width: "40%",
            alignItems: "center",
            // backgroundColor:'red'
          }}
        >
          <Box sx={{paddingTop:'3px'}}>
            <Typography
              sx={{
                color: "black",
                fontSize: { lg: "11px", md: "10px", xs: "9px" },
                marginLeft: "3px",
                fontWeight: "600",
                lineHeight:'11px'
              }}
            >
              {newData?.name}
            
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "row" }}>
              <Typography
                sx={{
                  color: "black",
                  fontSize: { lg: "9px", md: "9px", xs: "7px" },
                  marginLeft: "7px",
                  fontWeight: "500",
                }}
              >
                max : {maxBetValue ? formatToINR(maxBetValue) : formatToINR(newData?.maxBet)}
              </Typography>
              <Box
                sx={{
                  width: "30px",
                  height: "18px",
                  background: "transparent",
                  marginLeft: "5px",
                  // borderRadius: "3px",
                  // display: "flex",
                  // justifyContent: "center",
                  // alignItems: "center",
                  // paddingY: "2px",
                }}
                onClick={() => setVisible3(true)}
              >
                <img src={edit} style={{ width: "18px", height: "12px" }} />
              </Box>
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            position: "absolute",
            top: "4px",
            width: "30%",
            justifyContent: "flex-end",
            left: { lg: "14vw", md: "25vw", xs: "13vh" },
            display: "flex",
            zIndex: 100,
          }}
        >
          {newData?.activeStatus === "live" && (
            <SmallBox
              loading={loading}
              hide={true}
              onClick={(e: any) => {
                e.preventDefault();
                setLoading(true);
                // setLive(false);
                dispatch(
                  sessionBetLiveStatus({
                    status: "save",
                    betId: newData?.id,
                  })
                );
              }}
              textSize={"8px"}
              width={{ lg: "33px", xs: "20px", md: "25px" }}
              color={newData?.activeStatus === "live" ? "#46e080" : "#FF4D4D"}
            />
          )}
          {newData?.activeStatus === "result" && newData?.result && (
            <SmallBox
              loading={false}
              hide={false}
              textSize={"12px"}
              width={{ lg: "80px", xs: "20px", md: "20px" }}
              title={`Score : ${newData?.result || 0}`}
              color={"#FFF"}
            />
          )}
          {newData?.activeStatus === "save" && (
            <SmallBox
              hide={true}
              loading={loading}
              onClick={(e: any) => {
                e.preventDefault();
                setLoading(true);
                dispatch(
                  sessionBetLiveStatus({
                    status: "live",
                    betId: newData?.id,
                  })
                );
              }}
              textSize={"8px"}
              // width={"80px"}
              width={"33px"}
              color={newData?.activeStatus === "live" ? "#46e080" : "#FF4D4D"}
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
              newData={JSON.stringify(newData)}
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
        {!["ACTIVE", "active", "", undefined, null, 0].includes(
          newData?.status
        ) || newData?.activeStatus === "result" ? (
          <Box
            sx={{
              margin: "1px",
              background: "rgba(0,0,0,1)",
              height: "40px",
              right: { lg: "20.5%", xs: "19%", md: "20%" },
              position: "absolute",
              width: { lg: "18%", xs: "20%" },
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
              {newData?.result
                ? `Result Declared`
                : newData?.status}
            </h6>
          </Box>
        ) : (
          <Box
            sx={{
              display: "flex",
              position: "relative",
              background: "white",
              height: "40px",
              // marginLeft: "2vh",
              width: { lg: "18.6%", xs: "40%", paddingLeft: "0px" },
              justifyContent: "center",
              alignItems: "center",
              margin: "auto",
            }}
          >
            <SeparateBox
              session={true}
              back={true}
              value={formatNumber(newData?.noRate)}
              value2={formatNumber(newData?.noPercent)}
              lock={newData?.status === "SUSPENDED"}
              color={"#F6D0CB"}
            />

            <Box
              sx={{ width: ".45%", display: "flex", background: "pink" }}
            ></Box>

            <SeparateBox
              session={true}
              value={formatNumber(newData?.yesRate)}
              value2={formatNumber(newData?.yesPercent)}
              lock={newData?.status === "SUSPENDED"}
              color={"#B3E0FF"}
            />
          </Box>
        )}
        {!hideTotalBet && (
          <PlaceBetComponent
            width={7}
            profitLossData={profitLossData && profitLossData[newData?.id]}
            newData={newData}
          />
        )}
      </Box>

      <Divider />
      {/* {visible3 && (
           
          )} */}
      <ModalMUI
        open={visible3}
        // onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <SessionLimitEdit
          // newData={newData}
          newData={{
            id: newData.id,
            name: newData.name,
            minBet: newData?.minBet,
            maxBet: maxBetValue ? maxBetValue : newData.maxBet,
          }}
          maxValue={setMaxBetValue}
          // setResultPending={setResultPending}
          onClick={() => {
            setVisible3(false);
            // setIsDisable(true);
            // getSessionResult(match?.id);
          }}
          onClickCancel={() => {
            setVisible3(false);
          }}
        />
      </ModalMUI>
    </div>
  );
};

export default SessionMarketBox;
