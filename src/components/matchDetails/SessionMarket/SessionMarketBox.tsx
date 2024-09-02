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
  newData,
  hideResult,
  hideTotalBet,
  profitLossData,
  index,
  hideEditMaxButton,
}: any) => {
  const dispatch: AppDispatch = useDispatch();
  const { statusBetLive, error, success } = useSelector(
    (state: RootState) => state.matchList
  );
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [maxLimitModal, setShowMaxLimitModal] = useState(false);

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
          background: visible
            ? "#FFAF45"
            : index % 2 === 0
            ? "#FFE094"
            : "#ECECEC", // Change color based on selected state and index

          height: "40px",
          width: "100%",
          boxShadow: visible ? 3 : 0,
        }}
        // className="example-2"
      >
        <Box
          sx={{
            display: "flex",
            background: visible
              ? "#FFAF45"
              : index % 2 === 0
              ? "#FFE094"
              : "#ECECEC", // Change color based on selected state and index

            height: "39px",
            width: "40%",
            alignItems: "center",
            boxShadow: visible ? 3 : 0,
            // backgroundColor:'red'
          }}
          // className="example-2"
        >
          <Box sx={{ paddingTop: "3px", width: { lg: "100%", xs: "70%" } }}>
            <Typography
              sx={{
                color: "black",
                maxHeight: "30px",
                fontSize: { lg: "11px", md: "10px", xs: "9px" },
                marginLeft: "3px",
                fontWeight: "600",
                lineHeight: "11px",
                overflow: "hidden",
                // textOverflow: "ellipsis",
                // whiteSpace: "nowrap",
                display: "-webkit-box",
                WebkitLineClamp: "2",
                WebkitBoxOrient: "vertical",
              }}
            >
              {newData?.RunnerName ?? newData?.name}
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
                max : {formatToINR(newData?.maxBet)}
              </Typography>
              {!hideEditMaxButton && (
                <Box
                  sx={{
                    width: "30px",
                    height: "18px",
                    background: "transparent",
                    marginLeft: "5px",
                    zIndex: "999",
                    // borderRadius: "3px",
                    // display: "flex",
                    // justifyContent: "center",
                    // alignItems: "center",
                    // paddingY: "2px",
                  }}
                  onClick={() => setShowMaxLimitModal(true)}
                >
                  <img src={edit} style={{ width: "18px", height: "12px" }} />
                </Box>
              )}
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            position: "absolute",
            top: "4px",
            minWidth: { lg: "36%", xs: "45%", md: "25%" },
            justifyContent: "flex-end",
            left: { lg: "7vw", md: "29vw", xs: "10vw" },
            display: "flex",
            zIndex: 100,
            gap: 0,
          }}
        >
          {newData?.activeStatus === "live" && !newData?.result && (
            <SmallBox
              loading={loading}
              hide={true}
              onClick={(e: any) => {
                if (loading) {
                  return;
                }
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
              width={{ lg: "33px", xs: "30px", md: "25px" }}
              color={newData?.activeStatus === "live" ? "#46e080" : "#FF4D4D"}
            />
          )}
          {newData?.result && (
            <SmallBox
              loading={false}
              hide={false}
              textSize={newData?.result === "No Result" ? "0.55em" : "10px"}
              width={{ lg: "60px", xs: "60px" }}
              title={`${newData?.result || 0}`}
              color="#FFF"
            />
          )}
          {newData?.activeStatus === "save" && !newData?.result && (
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
              textSize="8px"
              // width={"80px"}
              width="33px"
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
            className="example-2"
          >
            <CustomSessionResult
              newData={JSON.stringify(newData)}
              onClick={() => {
                setVisible(false);
              }}
            />
          </Box>
        )}
        {newData?.resultStatus ? (
          <Box
            sx={{
              margin: "1px",
              background: "rgba(0,0,0,1)",
              height: "40px",
              right: { lg: "25%", xs: "25%", md: "23%" },
              position: "absolute",
              width: { lg: "16%", xs: "20%" },
              justifyContent: { xs: "center", lg: "center" },
              alignItems: "center",
              display: "flex",
              backgroundColor: "#FF4D4D",
            }}
          >
            <h6
              style={{
                textTransform: "uppercase",
                fontSize: "9px",
                textAlign: "center",
                lineHeight: "11px",
                color: "#FFF",
                // color={newData?.resultStatus === "PENDING" ? "red" : "#FFF"}
                fontWeight: "400",
                overflowWrap: "anywhere",
              }}
            >
              {newData?.resultStatus}
            </h6>
          </Box>
        ) : !["ACTIVE", "active", "", undefined, null, 0].includes(
            newData?.GameStatus
          ) || newData?.result ? (
          <Box
            sx={{
              margin: "1px",
              background: "rgba(0,0,0,1)",
              height: "40px",
              right: { lg: "25%", xs: "25%", md: "23%" },
              position: "absolute",
              width: { lg: "16%", xs: "20%" },
              justifyContent: { xs: "center", lg: "center" },
              alignItems: "center",
              display: "flex",
            }}
          >
            {/* <img src={BallStart} style={{ width: '113px', height: "32px" }} /> */}
            <h6
              style={{
                textTransform: "uppercase",
                fontSize: "10px",
                textAlign: "center",
                lineHeight: "11px",
                color: "#FFF",
                fontWeight: "400",
              }}
            >
              {newData?.result ? `Declared` : newData?.GameStatus}
            </h6>
          </Box>
        ) : (
          <Box
            sx={{
              display: "flex",
              position: "relative",
              right: { lg: "-17.5%", xs: "-5%", md: "-7%" },
              // background: "white",
              height: "40px",
              width: { lg: "18.6%", xs: "40%" },
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <SeparateBox
              session={true}
              back={true}
              value={formatNumber(newData?.ex?.availableToLay[0]?.price || 0)}
              value2={formatNumber(newData?.ex?.availableToLay[0]?.size || 0)}
              lock={newData?.GameStatus === "SUSPENDED"}
              color="#F6D0CB"
            />

            <Box
              sx={{ width: ".45%", display: "flex", background: "pink" }}
            ></Box>

            <SeparateBox
              session={true}
              value={formatNumber(newData?.ex?.availableToBack[0]?.price || 0)}
              value2={formatNumber(newData?.ex?.availableToBack[0]?.price || 0)}
              lock={newData?.GameStatus === "SUSPENDED"}
              color="#B3E0FF"
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
      {newData?.ex?.availableToLay?.length > 1 &&
        [1, 2]?.map((item) => (
          <Box
            sx={{
              display: "flex",
              background: visible
                ? "#FFAF45"
                : index % 2 === 0
                ? "#FFE094"
                : "#ECECEC",
              height: "40px",
              width: "100%",
              boxShadow: visible ? 3 : 0,
            }}
          >
            <Box
              sx={{
                display: "flex",
                background: visible
                  ? "#FFAF45"
                  : index % 2 === 0
                  ? "#FFE094"
                  : "#ECECEC",

                height: "39px",
                width: "40%",
                alignItems: "center",
                boxShadow: visible ? 3 : 0,
                // backgroundColor:'red'
              }}
            >
              <Box sx={{ paddingTop: "3px", width: { lg: "100%", xs: "70%" } }}>
                <Box sx={{ display: "flex", flexDirection: "row" }}></Box>
              </Box>
            </Box>
            <Box
              sx={{
                position: "absolute",
                top: "4px",
                minWidth: { lg: "36%", xs: "45%", md: "25%" },
                justifyContent: "flex-end",
                left: { lg: "7vw", md: "29vw", xs: "10vw" },
                display: "flex",
                zIndex: 100,
                gap: 0,
              }}
            >
              {newData?.activeStatus === "live" && !newData?.result && (
                <SmallBox
                  loading={loading}
                  hide={true}
                  onClick={(e: any) => {
                    if (loading) {
                      return;
                    }
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
                  width={{ lg: "33px", xs: "30px", md: "25px" }}
                  color={
                    newData?.activeStatus === "live" ? "#46e080" : "#FF4D4D"
                  }
                />
              )}
              {newData?.result && (
                <SmallBox
                  loading={false}
                  hide={false}
                  textSize={newData?.result === "No Result" ? "0.55em" : "10px"}
                  width={{ lg: "60px", xs: "60px" }}
                  title={`${newData?.result || 0}`}
                  color="#FFF"
                />
              )}
              {newData?.activeStatus === "save" && !newData?.result && (
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
                  textSize="8px"
                  // width={"80px"}
                  width="33px"
                  color={
                    newData?.activeStatus === "live" ? "#46e080" : "#FF4D4D"
                  }
                  // title={"Live"}
                />
              )}
            </Box>
            {newData?.resultStatus ? (
              <Box
                sx={{
                  margin: "1px",
                  background: "rgba(0,0,0,1)",
                  height: "40px",
                  right: { lg: "25%", xs: "25%", md: "23%" },
                  position: "absolute",
                  width: { lg: "16%", xs: "20%" },
                  justifyContent: { xs: "center", lg: "center" },
                  alignItems: "center",
                  display: "flex",
                  backgroundColor: "#FF4D4D",
                }}
              >
                <h6
                  style={{
                    textTransform: "uppercase",
                    fontSize: "9px",
                    textAlign: "center",
                    lineHeight: "11px",
                    color: "#FFF",
                    // color={newData?.resultStatus === "PENDING" ? "red" : "#FFF"}
                    fontWeight: "400",
                    overflowWrap: "anywhere",
                  }}
                >
                  {newData?.resultStatus}
                </h6>
              </Box>
            ) : !["ACTIVE", "active", "", undefined, null, 0].includes(
                newData?.GameStatus
              ) || newData?.result ? (
              <Box
                sx={{
                  margin: "1px",
                  background: "rgba(0,0,0,1)",
                  height: "40px",
                  right: { lg: "25%", xs: "25%", md: "23%" },
                  position: "absolute",
                  width: { lg: "16%", xs: "20%" },
                  justifyContent: { xs: "center", lg: "center" },
                  alignItems: "center",
                  display: "flex",
                }}
              >
                {/* <img src={BallStart} style={{ width: '113px', height: "32px" }} /> */}
                <h6
                  style={{
                    textTransform: "uppercase",
                    fontSize: "10px",
                    textAlign: "center",
                    lineHeight: "11px",
                    color: "#FFF",
                    fontWeight: "400",
                  }}
                >
                  {newData?.result ? `Declared` : newData?.GameStatus}
                </h6>
              </Box>
            ) : (
              <Box
                sx={{
                  display: "flex",
                  position: "relative",
                  right: { lg: "-17.5%", xs: "-5%", md: "-7%" },
                  // background: "white",
                  height: "40px",
                  width: { lg: "18.6%", xs: "40%" },
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <SeparateBox
                  session={true}
                  back={true}
                  value={formatNumber(
                    newData?.ex?.availableToLay[item]?.price || 0
                  )}
                  value2={formatNumber(
                    newData?.ex?.availableToLay[item]?.size || 0
                  )}
                  lock={newData?.GameStatus === "SUSPENDED"}
                  color="#F6D0CB"
                />

                <Box
                  sx={{ width: ".45%", display: "flex", background: "pink" }}
                ></Box>

                <SeparateBox
                  session={true}
                  value={formatNumber(
                    newData?.ex?.availableToBack[item]?.price || 0
                  )}
                  value2={formatNumber(
                    newData?.ex?.availableToBack[item]?.price || 0
                  )}
                  lock={newData?.GameStatus === "SUSPENDED"}
                  color="#B3E0FF"
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
        ))}
      <ModalMUI
        open={maxLimitModal}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <>
          <SessionLimitEdit
            newData={{
              id: newData.id,
              name: newData.name,
              minBet: newData?.minBet,
              maxBet: newData?.maxBet,
            }}
            onClickCancel={() => {
              setShowMaxLimitModal(false);
            }}
          />
        </>
      </ModalMUI>
    </div>
  );
};

export default SessionMarketBox;
