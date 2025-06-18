import { Box, Typography } from "@mui/material";
import { memo, useEffect, useState } from "react";
import service from "../../service";
import { ApiConstants } from "../../utils/Constants";
import { MaterialUISwitch } from "../matchList/materialUiSwitch";

interface BoxButtonWithSwitchProps {
  title: string;
  matchId: string;
  updateMatchStatus: any;
  setUpdateMatchStatus: (val: any) => void;
  place: number;
  disable: boolean;
  isManualBet: boolean;
  matchBettingType: string;
}

const BoxButtonWithSwitch = ({
  title,
  matchId,
  updateMatchStatus,
  setUpdateMatchStatus,
  place,
  disable,
  isManualBet,
  matchBettingType,
}: BoxButtonWithSwitchProps) => {
  const [background, setBackground] = useState<string>("#0B4F26");
  const value = updateMatchStatus[place]?.val;
  const [checked, setChecked] = useState<boolean>(value || false);

  const handleChange = async () => {
    try {
      if (!disable) {
        let payload = {
          matchId: matchId,
          type: matchBettingType,
          isActive: !checked,
          isManualBet: isManualBet,
        };
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
  };

  useEffect(() => {
    if (checked) {
      setBackground("#0B4F26");
    } else {
      setBackground("#FF4D4D");
    }
  }, [checked]);

  return (
    <Box
      sx={{
        height: "35px",
        minWidth: "250px",
        width: { xs: "100%", sm: "40%", md: "20%" },
        marginLeft: "10px",
        borderRadius: "5px",
        margin: "10px",
        background: background,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Typography
        sx={{
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
        }}
      >
        {title}
      </Typography>
      <MaterialUISwitch
        checked={checked}
        disabled={disable}
        onChange={handleChange}
      />
    </Box>
  );
};

export default memo(BoxButtonWithSwitch);
