import { Box, Typography } from "@mui/material";
import { memo, useMemo } from "react";
import { Lock } from "../../../assets";

interface SeparateBoxInterface {
  color: string;
  value: number | string;
  width: string;
  value2: number | string;
  lock: boolean;
}

const SeparateBox = ({
  color,
  value,
  width,
  value2,
  lock,
}: SeparateBoxInterface) => {
  const isLocked = useMemo(() => {
    return (
      lock ||
      value === 0 ||
      value === "0" ||
      value === undefined ||
      value === null
    );
  }, [lock, value]);

  const textColor = useMemo(
    () => (color === "white" ? "white" : "black"),
    [color]
  );

  const boxStyles = useMemo(
    () => ({
      background: isLocked ? "#FDF21A" : color,
      border: color !== "white" ? "1px solid #2626264D" : "0px solid white",
      width: {
        xs: "45.5%",
        lg: width || "45.5%",
      },
      height: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
    }),
    [isLocked, color, width]
  );

  return (
    <Box sx={boxStyles}>
      {!isLocked ? (
        <Box sx={{ alignItems: "center", justifyContent: "space-around" }}>
          <Typography
            sx={{
              fontSize: "12px",
              color: textColor,
              fontWeight: 600,
              textAlign: "center",
            }}
          >
            {value}
          </Typography>
          {value2 && (
            <Typography
              sx={{
                fontSize: "8px",
                marginTop: -0.4,
                color: textColor,
                textAlign: "center",
                fontWeight: 600,
              }}
            >
              {value2}
            </Typography>
          )}
        </Box>
      ) : (
        <img src={Lock} style={{ width: "10px", height: "15px" }} alt="lock" />
      )}
    </Box>
  );
};

export default memo(SeparateBox);
