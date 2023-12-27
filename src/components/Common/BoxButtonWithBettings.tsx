import { Box, Switch, Typography, styled } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateMatchActiveStatus } from "../../store/actions/match/matchAction";
import { AppDispatch } from "../../store/store";

const BoxButtonWithBettings = ({
  title,
  disable,
  matchId,
  containerStyle,
  titleStyle,
  updateBettings,
  setUpdateBettings,
  bettingId,
  matchBettingType,
}: any) => {
  const dispatch: AppDispatch = useDispatch();
  const [background, setBackground] = useState("#0B4F26");

  const [checked, setChecked] = useState(
    updateBettings.find((item: any) => bettingId === item.id)?.isActive || false
  );
  useEffect(() => {
    if (checked) {
      setBackground("#0B4F26");
    } else {
      setBackground("#FF4D4D");
    }
  }, [checked]);

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
          margin: "10px",
          marginTop: { xs: 1, md: 0 },
          borderRadius: "5px",
          background: background,
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
            color: "white",
            fontWeight: "500",
            fontSize: "13px",
            marginLeft: "1vw",
            lineHeight: "14px",
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
      <MaterialUISwitch
        checked={checked}
        onChange={() => {
          if (!disable) {
            let payload = {
              matchId: matchId,
              bettingId: bettingId,
              type: matchBettingType,
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
          } else {
            alert("You don't have privilege to change status.");
          }
        }}
      />
    </Box>
  );
};

export default BoxButtonWithBettings;
