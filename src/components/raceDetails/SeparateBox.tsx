import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import React from "react";
import { Popover } from "react-tiny-popover";
import { Lock } from "../../assets";

const SeparateBox = ({ color, empty, value, width, value2, lock }: any) => {
  const theme = useTheme();
  const matchesMobile = useMediaQuery(theme.breakpoints.down("lg"));
  const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);
  return (
    <>
      <Popover
        isOpen={isPopoverOpen}
        align={matchesMobile ? "end" : "center"}
        positions={["bottom"]} // preferred positions by priority
        onClickOutside={() => setIsPopoverOpen(false)}
        content={<div></div>}
      >
        <Box
          onClick={() => {
            if (lock || color == "white") {
              return null;
            }
            setIsPopoverOpen(!isPopoverOpen);
            // dispatch(setColorValue(color));
          }}
          sx={{
            background: lock || [0, "0"].includes(value) ? "#FDF21A" : color,
            border:
              color != "white" ? "1px solid #2626264D" : "0px solid white",
            width: { xs: "32%", lg: width ? width : "45%" },
            height: "94%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          {!empty && !lock && ![0, "0"].includes(value) && (
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
            <img src={Lock} style={{ width: "10px", height: "15px" }} />
          )}
        </Box>
      </Popover>
    </>
  );
};

export default SeparateBox;
