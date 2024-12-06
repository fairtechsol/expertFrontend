import { Fragment, useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import SeparateBox from "../SeparateBox";
import { formatNumber } from "../../helper";
import SmallBox from "../SmallBox";
import { addSession } from "../../../store/actions/addSession";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store/store";
import { sessionBetLiveStatus } from "../../../store/actions/match/matchAction";

const SessionMarketBoxLive = ({
  currentMatch,
  newData,
  index,
  gtype,
  type,
}: any) => {
  const dispatch: AppDispatch = useDispatch();

  const [live, setLive] = useState<any>(newData?.ActiveStatus ? true : false);

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

  useEffect(() => {
    if (newData?.ActiveStatus) {
      setLive(true);
    } else setLive(false);
  }, [newData]);

  return (
    <div style={{ position: "relative" }}>
      {!live && (
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
          height: "25px",
          width: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            background: index % 2 === 0 ? "#FFE094" : "#ECECEC",
            height: "25px",
            width: "100%",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              color: "black",
              fontSize: { lg: "10px", md: "10px", xs: "10px" },
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
            top: "5px",
            right: { lg: "30%", md: "45%", xs: "45%" },
            display: "flex",
            zIndex: 100,
          }}
        >
          {!live && (
            <SmallBox
              hide={true}
              onClick={(e: any) => {
                e.preventDefault();
                setLive(!live);
                if (newData?.id) {
                  dispatch(
                    sessionBetLiveStatus({
                      status: "live",
                      betId: newData?.id,
                    })
                  );
                } else handleLive();
              }}
              textSize="8px"
              width={{ lg: "20px", xs: "20px" }}
              color="#FF4D4D"
              height="20px"
            />
          )}
          {live && (
            <SmallBox
              hide={true}
              onClick={(e: any) => {
                e.preventDefault();
              }}
              textSize="8px"
              width={{ lg: "20px", xs: "20px" }}
              height="20px"
            />
          )}
        </Box>

        {!["ACTIVE", "", undefined, null, "active", "open"].includes(
          newData?.GameStatus?.toLowerCase()
        ) ? (
          <Box
            sx={{
              margin: "1px",
              background: "rgba(0,0,0,1)",
              height: "25px",
              right: "0vh",
              position: "absolute",
              width: { lg: "27.6%", xs: "25.4%", md: "25.5%" },
              justifyContent: { xs: "center", lg: "center" },
              alignItems: "center",
              display: "flex",
            }}
          >
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
              height: "25px",
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

            <Box
              sx={{ width: ".45%", display: "flex", background: "pink" }}
            ></Box>

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
      ).map((item: number) => {
        return (
          <Fragment key={item}>
            <Box
              sx={{
                display: "flex",
                background: "white",
                height: "25px",
                width: "100%",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  background: index % 2 === 0 ? "#FFE094" : "#ECECEC",
                  height: "25px",
                  width: "100%",
                  alignItems: "center",
                }}
              ></Box>
              {!["ACTIVE", "", undefined, null, "active", "open"].includes(
                newData?.GameStatus?.toLowerCase()
              ) ? (
                <Box
                  sx={{
                    margin: "1px",
                    background: "rgba(0,0,0,1)",
                    height: "25px",
                    right: "0vh",
                    position: "absolute",
                    width: { lg: "27.6%", xs: "25.4%", md: "25.5%" },
                    justifyContent: { xs: "center", lg: "center" },
                    alignItems: "center",
                    display: "flex",
                  }}
                >
                  <Typography
                    style={{
                      fontSize: "10px",
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
                    height: "25px",
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
                  ></Box>

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
            </Box>{" "}
          </Fragment>
        );
      })}
    </div>
  );
};

export default SessionMarketBoxLive;
