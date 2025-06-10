import { Box, CircularProgress, Typography } from "@mui/material";
import { memo } from "react";
import { BroadCast } from "../../assets";

interface SmallBoxProps {
  color: string;
  title?: string;
  width: any;
  textSize?: string;
  onClick?: (v: any) => void;
  hide?: boolean;
  customStyle?: any;
  loading?: boolean;
  height: string;
}

const SmallBox = ({
  color,
  title,
  width,
  textSize,
  onClick,
  hide,
  customStyle,
  loading,
  height,
}: SmallBoxProps) => {
  return (
    <Box
      onClick={onClick}
      sx={[
        {
          width: {
            lg: width ? width.lg : "80px",
            xs: width ? width.xs : "25%",
          },
          display: "flex",
          marginRight: "2px",
          justifyContent: "center",
          paddingX: 1,
          zIndex: 2,
          alignItems: "center",
          height: height ? height : "32px",
          background: color ? color : "#46e080",
          borderRadius: "2px",
          cursor: "pointer",
        },
        customStyle,
      ]}
    >
      <Typography
        sx={{
          fontSize: {
            lg: textSize ? textSize : "8px",
            xs: textSize ? textSize : "8px",
          },
          fontWeight: "600",
          color: color !== "#FFF" ? "white" : "",
          lineHeight: 1,
        }}
      >
        {loading ? (
          <CircularProgress
            sx={{
              color: "#FFF",
            }}
            size={14}
            thickness={2}
            value={60}
          />
        ) : (
          title
        )}
      </Typography>
      {hide && !loading && (
        <img
          src={BroadCast}
          height={15}
          width={15}
          alt="stop"
          style={{ objectFit: "contain" }}
        />
      )}
    </Box>
  );
};

export default memo(SmallBox);
