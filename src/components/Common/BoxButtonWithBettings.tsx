import { Box, Tooltip, Typography } from "@mui/material";
import { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
// import { updateMatchActiveStatus } from "../../store/actions/match/matchAction";
// import { AppDispatch } from "../../store/store";
import { MaterialUISwitch } from "../matchList/materialUiSwitch";
import service from "../../service";
import { ApiConstants } from "../../utils/Constants";

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
  // const dispatch: AppDispatch = useDispatch();
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

  return (
    <Box
      sx={[
        {
          height: "35px",
          minWidth: "250px",
          width: { xs: "100%", sm: "40%", md: "20%" },
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
      <Tooltip title={title.includes('over_under') ? "Over under" : title}>
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
        {title.includes('over_under') ? "Over under" : title}
      </Typography>
      </Tooltip>
      <MaterialUISwitch
        checked={checked}
        disabled={disable}
        onChange={async () => {
          if (!disable) {
            let payload = {
              matchId: matchId,
              bettingId: bettingId,
              type: matchBettingType,
              isActive: !checked,
            };
            let overUnderPayload ={
              matchId: matchId,
              type: "over_under",
              isActive: !checked,
            }
            // dispatch(updateMatchActiveStatus(payload));
            const resp: any = title.includes('over_under') ? await service.post(
              ApiConstants.MATCH.UPDATEMULTIPLEACTIVESTATUS,
              overUnderPayload
            ) : await service.post(
              ApiConstants.MATCH.UPDATEACTIVESTATUS,
              payload
            );
            if (resp.statusCode === 200) {
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
            }
          } else {
            alert("You don't have privilege to change status.");
          }
        }}
      />
    </Box>
  );
};

export default BoxButtonWithBettings;
