import { Box, Typography } from "@mui/material";
import { memo } from "react";
import { BroadCast } from "../../assets";

interface SmallBoxProps {
  onClick: () => void;
  title: string;
  color: string;
  customStyle: any;
}

const SmallBox = ({ color, title, onClick, customStyle }: SmallBoxProps) => {
  return (
    <Box
      onClick={onClick}
      sx={[
        {
          width: {
            lg: "60px",
            xs: "25%",
          },
          display: "flex",
          marginRight: "10px",
          justifyContent: "center",
          paddingX: 1,
          alignItems: "center",
          height: "32px",
          background: color ? color : "#46e080",
          borderRadius: "3px",
          cursor: "pointer",
        },
        customStyle,
      ]}
    >
      <Typography
        sx={{
          fontSize: {
            lg: "11px",
            xs: "10px",
          },
          fontWeight: "600",
          color: color !== "#FFF" ? "white" : "",
          lineHeight: 1,
        }}
      >
        {title}
      </Typography>
      <img
        src={BroadCast}
        width={15}
        height={15}
        alt="stop"
        style={{ objectFit: "contain" }}
      />
    </Box>
  );
};

export default memo(SmallBox);
