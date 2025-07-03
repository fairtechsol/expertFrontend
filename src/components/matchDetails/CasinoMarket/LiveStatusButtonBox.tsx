import { Box } from "@mui/material";
import { memo } from "react";
import { BroadCast } from "../../../assets";

interface LiveStatusButtonBoxProps {
  color?: any;
  width: any;
  onClick: any;
  hide: any;
  height: any;
}

const LiveStatusButtonBox = ({
  color,
  width,
  onClick,
  hide,
  height,
}: LiveStatusButtonBoxProps) => {
  return (
    <Box
      onClick={onClick}
      sx={{
        width: {
          lg: width ? width.lg : "80px",
          xs: width ? width.xs : "25%",
        },
        display: "flex",
        justifyContent: "center",
        paddingX: 1,
        alignItems: "center",
        height: height ? height : "32px",
        background: color ? color : "#46e080",
        borderRadius: "3px",
        cursor: "pointer",
      }}
    >
      {hide && (
        <img
          src={BroadCast}
          height={15}
          width={15}
          style={{ objectFit: "contain" }}
          alt="stop"
        />
      )}
    </Box>
  );
};

export default memo(LiveStatusButtonBox);
