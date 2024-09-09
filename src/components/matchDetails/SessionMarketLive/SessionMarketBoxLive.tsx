import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import Divider from "../../Common/Divider";
import SeparateBox from "../SeparateBox";
import { formatNumber } from "../../helper";
import SmallBox from "../SmallBox";
import { addSession } from "../../../store/actions/addSession";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store/store";

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
              fontWeight: "600",
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
                handleLive();
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

        {!["ACTIVE", "", undefined, null].includes(newData?.GameStatus) ? (
          <Box
            sx={{
              margin: "1px",
              background: "rgba(0,0,0,1)",
              height: "25px",
              right: "0vh",
              position: "absolute",
              width: { lg: "27%", xs: "25%", md: "25.5%" },
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
              {newData?.GameStatus}
            </Typography>
          </Box>
        ) : (
          <Box
            sx={{
              display: "flex",
              position: "relative",
              background: index % 2 === 0 ? "#FFE094" : "#ECECEC",
              height: "28px",
              width: { lg: "85%", xs: "38.5%", md: "39%" },
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <SeparateBox
              width="30%"
              value={newData?.ex?.availableToLay[0]?.price}
              value2={formatNumber(newData?.ex?.availableToLay[0]?.size)}
              lock={newData?.GameStatus === "SUSPENDED"}
              color={type === "oddEven" ? "#B3E0FF" : "#F6D0CB"}
            />

            <Box
              sx={{ width: ".45%", display: "flex", background: "pink" }}
            ></Box>

            <SeparateBox
              width="30%"
              value={newData?.ex?.availableToBack[0]?.price}
              value2={formatNumber(newData?.ex?.availableToBack[0]?.size)}
              lock={newData?.GameStatus === "SUSPENDED"}
              color="#B3E0FF"
            />
          </Box>
        )}
      </Box>
      <Divider />
      {Array.from(
        { length: newData?.ex?.availableToLay?.length - 1 },
        (_, i) => i + 1
      ).map((item: number) => {
        return (
          <>
            <Box
              key={item}
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
                  position: "relative",
                  background: index % 2 === 0 ? "#FFE094" : "#ECECEC",
                  height: "28px",
                  width: "100%",
                  justifyContent: "flex-end",
                  alignItems: "center",
                }}
              >
                <SeparateBox
                  width="13.8%"
                  mWidth="12.5%"
                  value={newData?.ex?.availableToLay[item]?.price}
                  value2={formatNumber(newData?.ex?.availableToLay[item]?.size)}
                  lock={newData?.GameStatus === "SUSPENDED"}
                  color="#F6D0CB"
                />

                <Box
                  sx={{ width: ".22%", display: "flex", background: "pink" }}
                ></Box>

                <SeparateBox
                  width="13.8%"
                  mWidth="12.5%"
                  value={newData?.ex?.availableToBack[item]?.price}
                  value2={formatNumber(
                    newData?.ex?.availableToBack[item]?.size
                  )}
                  lock={newData?.GameStatus === "SUSPENDED"}
                  color="#B3E0FF"
                />
              </Box>
            </Box>
            <Divider />
          </>
        );
      })}
    </div>
  );
};

export default SessionMarketBoxLive;
