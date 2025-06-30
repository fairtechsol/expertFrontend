import { Box, Typography } from "@mui/material";
import { Fragment, memo } from "react";
import { useDispatch } from "react-redux";
import { BroadCast } from "../../../assets";
import { addSession } from "../../../store/actions/addSession";
import { sessionBetLiveStatus } from "../../../store/actions/match/matchAction";
import { AppDispatch } from "../../../store/store";
import { formatNumber } from "../../helper";
import SeparateBox from "./SeparateBox";

interface SessionMarketBoxLiveProps {
  currentMatch: any;
  newData: any;
  index: number;
  gtype: string;
  type: string;
}

const SessionMarketBoxLive = ({
  currentMatch,
  newData,
  index,
  gtype,
  type,
}: SessionMarketBoxLiveProps) => {
  const dispatch: AppDispatch = useDispatch();

  const handleLive = () => {
    const payload = {
      matchId: currentMatch?.id,
      type: type,
      name: newData?.RunnerName,
      gtype: gtype,
      selectionId: (newData?.SelectionId).toString(),
      yesRate: newData?.ex?.availableToBack[0]?.price,
      noRate: newData?.ex?.availableToLay[0]?.price,
      yesPercent: newData?.ex?.availableToBack[0]?.size,
      noPercent: newData?.ex?.availableToLay[0]?.price,
    };
    dispatch(addSession(payload));
  };

  const handleToggle = (e: any) => {
    e.preventDefault();
    if (newData?.id) {
      dispatch(
        sessionBetLiveStatus({
          status: "live",
          betId: newData?.id,
        })
      );
    } else {
      handleLive();
    }
  };

  return (
    <div style={{ position: "relative" }}>
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
      <Box
        sx={{
          display: "flex",
          background: "white",
          height: 25,
          width: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            background: index % 2 === 0 ? "#FFE094" : "#ECECEC",
            height: 25,
            width: "100%",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              color: "black",
              fontSize: 10,
              marginLeft: { lg: "7px", md: "20px", xs: "20px" },
              fontWeight: "bold",
              lineHeight: 1,
            }}
          >
            {newData?.RunnerName}
          </Typography>
        </Box>

        <Box
          sx={{
            position: "absolute",
            top: 3,
            right: { lg: "30%", md: "45%", xs: "45%" },
            display: "flex",
            zIndex: 100,
          }}
        >
          <Box
            onClick={handleToggle}
            sx={{
              width: "20px",
              display: "flex",
              marginRight: "2px",
              justifyContent: "center",
              paddingX: 1,
              zIndex: 2,
              alignItems: "center",
              height: "20px",
              background: "#FF4D4D",
              borderRadius: "2px",
              cursor: "pointer",
            }}
          >
            <img
              src={BroadCast}
              width={15}
              height={15}
              alt="stop"
              style={{ objectFit: "contain" }}
            />
          </Box>
        </Box>

        {!["ACTIVE", "", undefined, null, "active", "open"].includes(
          newData?.GameStatus?.toLowerCase()
        ) ? (
          <Box
            sx={{
              margin: "1px",
              background: "rgba(0,0,0,1)",
              height: 25,
              right: "0vh",
              position: "absolute",
              width: { lg: "27.5%", xs: "25.4%", md: "25.5%" },
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
            }}
          >
            <Typography
              style={{
                fontSize: 10,
                textTransform: "uppercase",
                textAlign: "center",
                width: "100%",
                color: "white",
                fontWeight: "400",
              }}
            >
              {Math.max(
                newData?.ex?.availableToLay?.length ?? 0,
                newData?.ex?.availableToBack?.length ?? 0
              ) <= 1 && newData?.GameStatus}
            </Typography>
          </Box>
        ) : (
          <Box
            sx={{
              display: "flex",
              position: "relative",
              background: index % 2 === 0 ? "#FFE094" : "#ECECEC",
              height: 25,
              width: { lg: "85%", xs: "38.5%", md: "39%" },
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <SeparateBox
              width="30%"
              value={
                type === "oddEven"
                  ? newData?.ex?.availableToBack[0]?.price
                  : newData?.ex?.availableToLay[0]?.price
              }
              value2={formatNumber(
                type === "oddEven"
                  ? newData?.ex?.availableToBack[0]?.size
                  : newData?.ex?.availableToLay[0]?.size
              )}
              lock={newData?.GameStatus === "SUSPENDED"}
              color={type === "oddEven" ? "#B3E0FF" : "#F6D0CB"}
            />

            <Box sx={{ width: ".45%", display: "flex", background: "pink" }} />

            <SeparateBox
              width="30%"
              value={
                type === "oddEven"
                  ? newData?.ex?.availableToLay[0]?.price
                  : newData?.ex?.availableToBack[0]?.price
              }
              value2={formatNumber(
                type === "oddEven"
                  ? newData?.ex?.availableToLay[0]?.size
                  : newData?.ex?.availableToBack[0]?.size
              )}
              lock={newData?.GameStatus === "SUSPENDED"}
              color="#B3E0FF"
            />
          </Box>
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
      ).map((item: number, index: number) => {
        return (
          <Fragment key={index}>
            <Box
              sx={{
                display: "flex",
                background: "white",
                height: 25,
                width: "100%",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  background: index % 2 === 0 ? "#FFE094" : "#ECECEC",
                  height: 25,
                  width: "100%",
                  alignItems: "center",
                }}
              />
              {!["ACTIVE", "", undefined, null, "active", "open"].includes(
                newData?.GameStatus?.toLowerCase()
              ) ? (
                <Box
                  sx={{
                    margin: "1px",
                    background: "rgba(0,0,0,1)",
                    height: 25,
                    right: "0vh",
                    position: "absolute",
                    width: { lg: "27.5%", xs: "25.4%", md: "25.5%" },
                    justifyContent: { xs: "center", lg: "center" },
                    alignItems: "center",
                    display: "flex",
                  }}
                >
                  <Typography
                    style={{
                      fontSize: 10,
                      textTransform: "uppercase",
                      textAlign: "center",
                      width: "100%",
                      color: "white",
                      fontWeight: "400",
                      marginTop:
                        Math.max(
                          newData?.ex?.availableToLay?.length ?? 0,
                          newData?.ex?.availableToBack?.length ?? 0
                        ) === 2
                          ? "-25px"
                          : "0",
                    }}
                  >
                    {item === 1 && newData?.GameStatus}
                  </Typography>
                </Box>
              ) : (
                <Box
                  sx={{
                    display: "flex",
                    position: "relative",
                    background: index % 2 === 0 ? "#FFE094" : "#ECECEC",
                    height: 25,
                    width: { lg: "85%", xs: "38.5%", md: "39%" },
                    justifyContent: "flex-end",
                    alignItems: "center",
                  }}
                >
                  <SeparateBox
                    width="30%"
                    value={
                      type === "oddEven"
                        ? newData?.ex?.availableToBack[item]?.price || 0
                        : newData?.ex?.availableToLay[item]?.price || 0
                    }
                    value2={formatNumber(
                      type === "oddEven"
                        ? newData?.ex?.availableToBack[item]?.size || 0
                        : newData?.ex?.availableToLay[item]?.size || 0
                    )}
                    lock={newData?.GameStatus === "SUSPENDED"}
                    color="#F6D0CB"
                  />

                  <Box
                    sx={{
                      width: ".20%",
                      display: "flex",
                      background: "pink",
                    }}
                  />

                  <SeparateBox
                    width="30%"
                    value={
                      type === "oddEven"
                        ? newData?.ex?.availableToLay[item]?.price || 0
                        : newData?.ex?.availableToBack[item]?.price || 0
                    }
                    value2={formatNumber(
                      type === "oddEven"
                        ? newData?.ex?.availableToLay[item]?.size || 0
                        : newData?.ex?.availableToBack[item]?.size || 0
                    )}
                    lock={newData?.GameStatus === "SUSPENDED"}
                    color="#B3E0FF"
                  />
                </Box>
              )}
            </Box>
          </Fragment>
        );
      })}
    </div>
  );
};

export default memo(SessionMarketBoxLive);
