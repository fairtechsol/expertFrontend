import { Box, Switch, Theme, Typography, styled } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateMatchActiveStatus } from "../../store/actions/match/matchAction";
import { AppDispatch } from "../../store/store";

const BoxButtonWithSwitch = (props: any) => {
  const {
    title,
    matchId,
    id,
    containerStyle,
    titleStyle,
    updateMatchStatus,
    setUpdateMatchStatus,
    place,
    notSwitch,
    onClick,
    isManualBet,
    matchBettingType,
  } = props;
  const dispatch: AppDispatch = useDispatch();
  const [background, setBackground] = useState<string>("#0B4F26");
  const value = updateMatchStatus[place]?.val;
  const [checked, setChecked] = useState<boolean>(
    notSwitch ? false : value || false
  );

  useEffect(() => {
    if (notSwitch) {
      setChecked(false);
    } else {
      setChecked(!!value);
    }
  }, [notSwitch, place, updateMatchStatus]);

  useEffect(() => {
    if (checked) {
      setBackground("#0B4F26");
    } else {
      setBackground("#FF4D4D");
    }
  }, [checked]);

  const MaterialUISwitch = styled(Switch)(({}: { theme: Theme }) => ({
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
      onClick={() => {
        if (notSwitch) {
          onClick(id);
        }
      }}
      sx={[
        {
          height: "35px",
          width: { xs: "100%", sm: "48%", md: "15%" },
          marginTop: { xs: 1, md: 0 },
          marginLeft: "10px",
          borderRadius: "5px",
          border: notSwitch ? "1px solid #0B4F26" : undefined,
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
            display: "-webkit-box",
            overflow: "hidden",
            WebkitLineClamp: { xs: 1, md: 2 },
            WebkitBoxOrient: "vertical",
            lineClamp: { xs: 1, md: 2 },
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
              ? Number(updateMatchStatus) > 0
                ? "#46E080"
                : "#FF4D4D"
              : "white",
            fontWeight: notSwitch ? "700" : "500",
            fontSize: "13px",
            marginLeft: "0.3vw",
            lineHeight: "14px",
          }}
        >
          {updateMatchStatus}
        </Typography>
      ) : (
        <MaterialUISwitch
          checked={checked}
          onChange={() => {
            let payload = {
              matchId: matchId,
              matchBettingType: matchBettingType,
              isActive: !checked,
              isManualBet: isManualBet,
            };
            dispatch(updateMatchActiveStatus(payload));
            setChecked(!checked);
            setUpdateMatchStatus((prevStatus: any) => ({
              ...prevStatus,
              [place]: {
                ...prevStatus[place],
                val: !checked,
              },
            }));
          }}
        />
      )}
    </Box>
  );
};

export default BoxButtonWithSwitch;
