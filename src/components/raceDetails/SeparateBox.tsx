import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import React, { memo } from "react";
import { Popover } from "react-tiny-popover";
import { Lock } from "../../assets";

interface SeparateBoxProps {
  color: any;
  value: any;
  value2: any;
  lock: any;
}

const SeparateBox = ({ color, value, value2, lock }: SeparateBoxProps) => {
  const theme = useTheme();
  const matchesMobile = useMediaQuery(theme.breakpoints.down("lg"));
  const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);
  return (
    <Popover
      isOpen={isPopoverOpen}
      align={matchesMobile ? "end" : "center"}
      positions={["bottom"]}
      onClickOutside={() => setIsPopoverOpen(false)}
      content={<div />}
    >
      <Box
        onClick={() => {
          if (lock || color == "white") {
            return null;
          }
          setIsPopoverOpen(!isPopoverOpen);
        }}
        sx={{
          background: lock || [0, "0"].includes(value) ? "#FDF21A" : color,
          border: color != "white" ? "1px solid #2626264D" : "0px solid white",
          width: { xs: "32%", lg: "45%" },
          height: "94%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        {!lock && ![0, "0"].includes(value) && (
          <Box sx={{ alignItems: "center", justifyContent: "space-around" }}>
            <Typography
              sx={{
                fontSize: "13px",
                color: color == "white" ? "white" : "black",
                fontWeight: "700",
                textAlign: "center",
              }}
            >
              {value}
            </Typography>
            <Typography
              sx={{
                fontSize: { lg: "9px", xs: "9px" },
                marginTop: -0.4,
                color: color == "white" ? "white" : "black",
                textAlign: "center",
                fontWeight: "600",
              }}
            >
              {value2}
            </Typography>
          </Box>
        )}
        {[0, "0"].includes(value) && (
          <img
            src={Lock}
            width={10}
            height={15}
            // style={{ width: "10px", height: "15px" }}
            alt="lock"
          />
        )}
      </Box>
    </Popover>
  );
};

export default memo(SeparateBox);
