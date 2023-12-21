import { Box, Switch, Typography, styled } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateMatchActiveStatus } from "../../store/actions/match/matchAction";
import { AppDispatch } from "../../store/store";

const BoxButtonWithBettings = ({
  title,
  matchId,
  containerStyle,
  titleStyle,
  updateBettings,
  setUpdateBettings,
  bettingId,
  notSwitch,
  matchBettingType,
}: any) => {
  const dispatch: AppDispatch = useDispatch();
  const [background, setBackground] = useState("#0B4F26");

  const [checked, setChecked] = useState(
    notSwitch
      ? false
      : updateBettings.find((item: any) => bettingId === item.id)?.isActive
  );
  useEffect(() => {
    if (checked) {
      setBackground("#0B4F26");
    } else {
      setBackground("#FF4D4D");
    }
  }, [checked]);

  useEffect(() => {
    if (updateBettings) {
      setChecked(
        notSwitch
          ? false
          : updateBettings.find((item: any) => bettingId === item.id)?.isActive
      );
    }
  }, [updateBettings, notSwitch]);

  const MaterialUISwitch = styled(Switch)(({}) => ({
    width: 50,
    height: 35,
    padding: 7,
    "& .MuiSwitch-switchBase": {
      marginTop: "8px",
      marginRight: "1px",
      padding: 0,
      paddingLeft: "3px",
      transform: "translateX(6px)",
      "&.Mui-checked": {
        color: "#10DC61",
        transform: "translateX(20px)",
        "& + .MuiSwitch-track": {
          opacity: 1,
          backgroundColor: "white",
        },
        "& .MuiSwitch-thumb": {
          backgroundColor: "#10DC61",
        },
      },
    },
    "& .MuiSwitch-thumb": {
      backgroundColor: "#FF4D4D",
      width: 18,
      height: 18,
      "&:before": {
        content: "''",
        position: "absolute",
        width: "100%",
        height: "100%",
        left: 0,
        top: 0,
      },
    },
    "& .MuiSwitch-track": {
      opacity: 1,
      backgroundColor: "white",
      borderRadius: 20,
    },
  }));
  return (
    <Box
      sx={[
        {
          height: "35px",
          minWidth: "100px",
          width: { xs: "100%", sm: "48%", md: "15%" },
          marginLeft: "10px",
          marginTop: { xs: 1, md: 0 },
          borderRadius: "5px",
          border: notSwitch && "1px solid #0B4F26",
          background: notSwitch ? "#FFF" : background,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        },
        containerStyle,
      ]}
    >
      <Typography
        sx={[
          {
            color: notSwitch ? "#575757" : "white",
            fontWeight: notSwitch ? "700" : "500",
            fontSize: "13px",
            marginLeft: "1vw",
            lineHeight: "14px",
            // overflow: "hidden",
            // WebkitLineClamp: { xs: 1, md: 1 },
            // WebkitBoxOrient: "vertical",
            // lineClamp: { xs: 1, md: 1 },
            whiteSpace: "nowrap",
            width: { xs: "100%", md: "70%" },
            overflow: "hidden",
            textOverflow: "ellipsis",
          },
          titleStyle,
        ]}
      >
        {title}
      </Typography>
      {notSwitch ? (
        <Typography
          sx={{
            marginRight: "10px",
            color: notSwitch
              ? Number(updateBettings) > 0
                ? "#46E080"
                : "#FF4D4D"
              : "white",
            fontWeight: notSwitch ? "700" : "500",
            fontSize: "13px",
            marginLeft: "0.3vw",
            lineHeight: "14px",
          }}
        >
          {updateBettings}
        </Typography>
      ) : (
        <MaterialUISwitch
          checked={checked}
          onChange={() => {
            let payload = {
              matchId: matchId,
              bettingId: bettingId,
              matchBettingType: matchBettingType,
              isActive: !checked,
            };
            dispatch(updateMatchActiveStatus(payload));
            setChecked(!checked);
            setUpdateBettings((pre: any) => {
              const body = pre?.map((val: any) => {
                if (val.id === bettingId) {
                  return { ...val, isActive: !checked };
                }
                return val;
              });
              return body;
            });
          }}
        />
      )}
    </Box>
  );
};

export default BoxButtonWithBettings;
