import { Box, Typography } from "@mui/material";
import ModalMUI from "@mui/material/Modal";
import { memo, useEffect, useState } from "react";
import { TiArrowLeftThick } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";
import { edit } from "../../../assets";
import { sessionBetLiveStatus } from "../../../store/actions/match/matchAction";
import { AppDispatch, RootState } from "../../../store/store";
import CommissionDot from "../../Common/CommissionDot";
import { formatNumber } from "../../helper";
import Result from "../Result";
import SeparateBox from "../SeparateBox";
import SmallBox from "../SmallBox";
import CustomSessionResult from "./CustomSessionResult";
import PlaceBetComponent from "./PlaceBetComponent";
import SessionLimitEdit from "./SessionLimitEdit";

const SessionMarketBox = ({
  newData,
  hideResult,
  hideTotalBet,
  profitLossData,
  index,
  hideEditMaxButton,
  section,
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
        />
      )}
      <Box
        sx={{
          display: "flex",
          background: visible
            ? "#FFAF45"
            : section === "completed"
            ? "#E15151"
            : index % 2 === 0
            ? "#FFE094"
            : "#ECECEC",
          height: "30px",
          width: "100%",
          boxShadow: visible ? 3 : 0,
        }}
      >
        <Box
          sx={{
            display: "flex",
            background: visible
              ? "#FFAF45"
              : section === "completed"
              ? "#E15151"
              : index % 2 === 0
              ? "#FFE094"
              : "#ECECEC",
            height: "30px",
            width: "40%",
            alignItems: "center",
            boxShadow: visible ? 3 : 0,
            justifyContent: "space-between",
          }}
        >
          {!hideEditMaxButton && (
            <img
              onClick={() => setShowMaxLimitModal(true)}
              src={edit}
              style={{
                width: "14px",
                height: "12px",
                marginLeft: "4px",
                zIndex: "999",
                cursor: "pointer",
              }}
            />
          )}
          <Box
            sx={{
              paddingTop: "3px",
              width: { lg: "100%", xs: "100%", md: "100%" },
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                color: "black",
                maxHeight: "30px",
                fontSize: { lg: "9px", md: "9px", xs: "8px" },
                fontWeight: "bold",
                overflow: "hidden",
                marginLeft: "7px",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                display: "flex",
                WebkitLineClamp: "2",
                WebkitBoxOrient: "vertical",
              }}
            >
              {newData?.RunnerName ?? newData?.name}
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            position: "absolute",

            minWidth: { lg: "36%", xs: "45%", md: "25%" },
            justifyContent: "flex-end",
            left: { lg: "11vw", md: "31vw", xs: "11.5vw" },
            display: "flex",
            height: "30px",
            zIndex: 100,
            gap: 0,
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              minWidth: { lg: "20%", xs: "20%", md: "25%" },
              justifyContent: "flex-end",
              display: "flex",
              flexDirection: "column",
              height: "25px",
              zIndex: 100,
              alignItems: "center",
              paddingRight: "10px",
              lineHeight: 2,
            }}
          >
            <Typography
              sx={{
                color: "black",
                fontSize: { lg: "9px", md: "9px", xs: "7px" },
                marginLeft: "7px",
                fontWeight: "500",
              }}
            >
              {!hideEditMaxButton && <>max: {formatNumber(newData?.maxBet)} </>}
            </Typography>
            <Typography
              sx={{
                color: "black",
                fontSize: { lg: "9px", md: "9px", xs: "7px" },
                marginLeft: "7px",
                fontWeight: "500",
              }}
            >
              {!hideEditMaxButton && (
                <>
                  {newData?.exposureLimit
                    ? `Exp: ${formatNumber(newData?.exposureLimit)}`
                    : ""}{" "}
                </>
              )}
            </Typography>
          </Box>
          {newData?.isCommissionActive && <CommissionDot />}
          <Typography sx={{ marginRight: "10px", zIndex: "999" }}>
            {(newData?.activeStatus === "live" ||
              newData?.activeStatus === "save") &&
              !newData?.result && (
                <TiArrowLeftThick
                  cursor={"pointer"}
                  color="blue"
                  size={20}
                  style={{
                    backgroundColor: "lightgray",
                    display: "flex",
                    alignItems: "center",
                  }}
                  onClick={(e: any) => {
                    if (loading) {
                      return;
                    }
                    e.preventDefault();
                    dispatch(
                      sessionBetLiveStatus({
                        status: "unSave",
                        betId: newData?.id,
                      })
                    );
                  }}
                />
              )}
          </Typography>
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
                dispatch(
                  sessionBetLiveStatus({
                    status: "save",
                    betId: newData?.id,
                  })
                );
              }}
              textSize="8px"
              width={{ lg: "20px", xs: "20px", md: "20px" }}
              color={newData?.activeStatus === "live" ? "#46e080" : "#FF4D4D"}
              height="20px"
            />
          )}
          {newData?.result && (
            <SmallBox
              loading={false}
              hide={false}
              textSize={newData?.result === "No Result" ? "0.55em" : "10px"}
              width={{ lg: "35px", xs: "35px", md: "35px" }}
              title={`${newData?.result || 0}`}
              color="#FFF"
              height="20px"
            />
          )}
          {newData?.activeStatus === "save" &&
            !newData?.result &&
            !newData?.resultStatus && (
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
                width={{ lg: "20px", xs: "20px", md: "20px" }}
                color={newData?.activeStatus === "live" ? "#46e080" : "#FF4D4D"}
                height="20px"
              />
            )}
          {!hideResult && (
            <Result
              onClick={() => {
                setVisible(true);
              }}
              height="20px"
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
              newData={newData}
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
              height: "30px",
              right: { lg: "18.6%", xs: "18.8%", md: "14.9%" },
              position: "absolute",
              width: { lg: "16.9%", xs: "20%" },
              justifyContent: { xs: "center", lg: "center" },
              alignItems: "center",
              display: "flex",
              backgroundColor: newData?.selfDeclare ? "#46e080" : "#FF4D4D",
            }}
          >
            <h6
              style={{
                textTransform: "uppercase",
                fontSize: "9px",
                textAlign: "center",
                lineHeight: "11px",
                color: "#FFF",
                fontWeight: "400",
                overflowWrap: "anywhere",
              }}
            >
              {Math.max(
                newData?.ex?.availableToLay?.length ?? 0,
                newData?.ex?.availableToBack?.length ?? 0
              ) <= 1 && newData?.resultStatus}
            </h6>
          </Box>
        ) : !["ACTIVE", "active", "", undefined, null, 0, "open"].includes(
            newData?.GameStatus?.toLowerCase()
          ) || newData?.result ? (
          <Box
            sx={{
              margin: "1px",
              background: "rgba(0,0,0,1)",
              height: "30px",
              right: { lg: "18.6%", xs: "16.8%", md: "14.9%" },
              position: "absolute",
              width: { lg: "16.9%", xs: "26%", md: "19.9%" },
              justifyContent: { xs: "center", lg: "center" },
              alignItems: "center",
              display: "flex",
            }}
          >
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
              {Math.max(
                newData?.ex?.availableToLay?.length ?? 0,
                newData?.ex?.availableToBack?.length ?? 0
              ) <= 1 && (newData?.result ? `Declared` : newData?.GameStatus)}
            </h6>
          </Box>
        ) : (
          <Box
            sx={{
              display: "flex",
              position: "relative",
              right: { lg: "-22.5%", xs: "-15%", md: "-24%" },
              height: "30px",
              width: { lg: "18.6%", xs: "28%", md: "20%" },
              justifyContent: "end",
              alignItems: "end",
            }}
          >
            <SeparateBox
              value={formatNumber(
                newData?.type === "oddEven"
                  ? newData?.ex?.availableToBack[0]?.price || 0
                  : newData?.ex?.availableToLay[0]?.price || 0
              )}
              value2={formatNumber(
                newData?.type === "oddEven"
                  ? newData?.ex?.availableToBack[0]?.size || 0
                  : newData?.ex?.availableToLay[0]?.size || 0
              )}
              lock={newData?.GameStatus === "SUSPENDED"}
              color={newData?.type === "oddEven" ? "#B3E0FF" : "#F6D0CB"}
            />

            <Box sx={{ width: ".45%", display: "flex", background: "pink" }} />

            <SeparateBox
              value={formatNumber(
                newData?.type === "oddEven"
                  ? newData?.ex?.availableToLay[0]?.price || 0
                  : newData?.ex?.availableToBack[0]?.price || 0
              )}
              value2={formatNumber(
                newData?.type === "oddEven"
                  ? newData?.ex?.availableToLay[0]?.size || 0
                  : newData?.ex?.availableToBack[0]?.size || 0
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
      {Array.from(
        {
          length:
            Math.max(
              newData?.ex?.availableToLay?.length ?? 0,
              newData?.ex?.availableToBack?.length ?? 0
            ) - 1,
        },
        (_, i) => i + 1
      )?.map((item: number) => (
        <>
          <Box
            key={item}
            sx={{
              display: "flex",
              background: visible
                ? "#FFAF45"
                : index % 2 === 0
                ? "#FFE094"
                : "#ECECEC",
              height: "30px",
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

                height: "30px",
                width: "40%",
                alignItems: "center",
                boxShadow: visible ? 3 : 0,
              }}
            >
              <Box sx={{ paddingTop: "3px", width: { lg: "100%", xs: "70%" } }}>
                <Box sx={{ display: "flex", flexDirection: "row" }} />
              </Box>
            </Box>

            {newData?.resultStatus ? (
              <Box
                sx={{
                  margin: "1px",
                  background: "rgba(0,0,0,1)",
                  height: "30px",
                  position: "absolute",
                  justifyContent: { xs: "center", lg: "center" },
                  alignItems: "center",
                  display: "flex",
                  backgroundColor: newData?.selfDeclare ? "#46e080" : "#FF4D4D",
                  right: { lg: "18.6%", xs: "16.8%", md: "14.9%" },
                  width: { lg: "16.9%", xs: "26%", md: "20%" },
                }}
              >
                <h6
                  style={{
                    textTransform: "uppercase",
                    fontSize: "9px",
                    textAlign: "center",
                    lineHeight: "11px",
                    color: "#FFF",
                    fontWeight: "400",
                    overflowWrap: "anywhere",
                    marginTop:
                      Math.max(
                        newData?.ex?.availableToLay?.length ?? 0,
                        newData?.ex?.availableToBack?.length ?? 0
                      ) === 2
                        ? "-5px"
                        : "0",
                  }}
                >
                  {item === 1 && newData?.resultStatus}
                </h6>
              </Box>
            ) : !["ACTIVE", "active", "", undefined, null, 0, "open"].includes(
                newData?.GameStatus?.toLowerCase()
              ) || newData?.result ? (
              <Box
                sx={{
                  margin: "1px",
                  background: "rgba(0,0,0,1)",
                  height: "30px",
                  right: { lg: "18.6%", xs: "16.8%", md: "14.9%" },
                  position: "absolute",
                  width: { lg: "16.9%", xs: "26%", md: "20%" },
                  justifyContent: { xs: "center", lg: "center" },
                  alignItems: "center",
                  display: "flex",
                }}
              >
                <h6
                  style={{
                    textTransform: "uppercase",
                    fontSize: "10px",
                    textAlign: "center",
                    lineHeight: "11px",
                    color: "#FFF",
                    fontWeight: "400",
                    marginTop:
                      Math.max(
                        newData?.ex?.availableToLay?.length ?? 0,
                        newData?.ex?.availableToBack?.length ?? 0
                      ) === 2
                        ? "-5px"
                        : "0",
                  }}
                >
                  {item === 1 &&
                    (newData?.result ? `Declared` : newData?.GameStatus)}
                </h6>
              </Box>
            ) : (
              <Box
                sx={{
                  display: "flex",
                  position: "relative",
                  right: { lg: "-23.5%", xs: "-16%", md: "-25%" },
                  // background: "white",
                  height: "30px",
                  width: { lg: "18.6%", xs: "28%", md: "20%" },
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <SeparateBox
                  value={formatNumber(
                    newData?.type === "oddEven"
                      ? newData?.ex?.availableToBack[item]?.price || 0
                      : newData?.ex?.availableToLay[item]?.price || 0
                  )}
                  value2={formatNumber(
                    newData?.type === "oddEven"
                      ? newData?.ex?.availableToBack[item]?.size || 0
                      : newData?.ex?.availableToLay[item]?.size || 0
                  )}
                  lock={newData?.GameStatus === "SUSPENDED"}
                  color={newData?.type === "oddEven" ? "#B3E0FF" : "#F6D0CB"}
                />
                <Box
                  sx={{ width: ".45%", display: "flex", background: "pink" }}
                />
                <SeparateBox
                  value={formatNumber(
                    newData?.type === "oddEven"
                      ? newData?.ex?.availableToLay[item]?.price || 0
                      : newData?.ex?.availableToBack[item]?.price || 0
                  )}
                  value2={formatNumber(
                    newData?.type === "oddEven"
                      ? newData?.ex?.availableToLay[item]?.size || 0
                      : newData?.ex?.availableToBack[item]?.size || 0
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
        </>
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
        <SessionLimitEdit
          newData={{
            id: newData.id,
            name: newData.name,
            minBet: newData?.minBet,
            maxBet: newData?.maxBet,
            exposureLimit: newData?.exposureLimit,
            isCommissionActive: newData?.isCommissionActive,
          }}
          onClickCancel={() => {
            setShowMaxLimitModal(false);
          }}
        />
      </ModalMUI>
    </div>
  );
};

export default memo(SessionMarketBox);
