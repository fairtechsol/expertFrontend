import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
// import { updateMatchActiveStatus } from "../../store/actions/match/matchAction";
// import { AppDispatch } from "../../store/store";
import { MaterialUISwitch } from "../matchList/materialUiSwitch";
import service from "../../service";
import { ApiConstants } from "../../utils/Constants";

const BoxButtonWithSwitch = (props: any) => {
  const {
    title,
    matchId,
    containerStyle,
    titleStyle,
    updateMatchStatus,
    setUpdateMatchStatus,
    place,
    disable,
    isManualBet,
    matchBettingType,
  } = props;
  // const dispatch: AppDispatch = useDispatch();
  const [background, setBackground] = useState<string>("#0B4F26");
  const value = updateMatchStatus[place]?.val;
  const [checked, setChecked] = useState<boolean>(value || false);

  useEffect(() => {
    if (checked) {
      setBackground("#0B4F26");
    } else {
      setBackground("#FF4D4D");
    }
  }, [checked]);

  // useEffect(() => {
  // setChecked(value);
  // }, [value]);

  return (
    <Box
      sx={[
        {
          height: "35px",
          minWidth: "250px",
          width: { xs: "100%", sm: "40%", md: "20%" },
          marginTop: { xs: 1, md: 0 },
          marginLeft: "10px",
          borderRadius: "5px",
          margin: "10px",
          border: undefined,
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
      {
        <MaterialUISwitch
          checked={checked}
          disabled={disable}
          onChange={async () => {
            try {
              if (!disable) {
                let payload = {
                  matchId: matchId,
                  type: matchBettingType,
                  isActive: !checked,
                  isManualBet: isManualBet,
                };
                // dispatch(updateMatchActiveStatus(payload));
                const resp: any = await service.post(
                  ApiConstants.MATCH.UPDATEACTIVESTATUS,
                  payload
                );
                if (resp?.statusCode === 200) {
                  setChecked(!checked);
                  setUpdateMatchStatus((prevStatus: any) => ({
                    ...prevStatus,
                    [place]: {
                      ...prevStatus[place],
                      val: !checked,
                    },
                  }));
                }
              } else {
                alert("You don't have privilege to change status.");
              }
            } catch (e) {
              console.log(e);
            }
          }}
        />
      }
    </Box>
  );
};

export default BoxButtonWithSwitch;
