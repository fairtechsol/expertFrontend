import { Box, Typography } from "@mui/material";
import { memo } from "react";
import { MaterialUISwitch } from "../matchList/materialUiSwitch";

interface BoxButtonManualMatchProps {
  title: string;
  manualMatchToggle: boolean;
  setManualMatchToggle: (val: any) => void;
}

const BoxButtonManualMatch = ({
  title,
  manualMatchToggle,
  setManualMatchToggle,
}: BoxButtonManualMatchProps) => {
  return (
    <Box
      sx={{
        height: "35px",
        width: { xs: "30%", sm: "15%", md: "10%" },
        marginTop: { xs: 1, md: 0 },
        marginLeft: "10px",
        borderRadius: "25px",
        margin: "10px",
        background: "#0B4F26",
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
        checked={manualMatchToggle}
        onChange={async () => {
          try {
            setManualMatchToggle((state: boolean) => !state);
          } catch (e) {
            console.log(e);
          }
        }}
      />
    </Box>
  );
};

export default memo(BoxButtonManualMatch);
