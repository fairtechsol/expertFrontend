import { Box, Typography } from "@mui/material";
import { memo } from "react";
import SeparateBox from "../SeparateBox";
import { formatNumber } from "../../helper";
import MoneyBox from "./MoneyBox";

const BoxComponent = ({
  name,
  data,
  currentMatch,
  align,
  lock,
  teamRates,
  livestatus,
}: any) => {
  const { ex, status } = data ?? {};

  return (
    <Box
      sx={{
        display: "flex",
        background: "white",
        height: "30px",
        width: "100%",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Box
        sx={{
          display: "flex",
          background: "white",
          position: "relative",
          height: "30px",
          width: "35%",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            flexDirection: "row",
            display: "flex",
            width: "100%",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              color: "black",
              fontSize: { lg: "8px", xs: "8px" },
              fontWeight: "600",
              marginLeft: "10px",
              lineHeight: "1.2",
            }}
          >
            {name}
          </Typography>
        </Box>
        {name != "DRAW" && <MoneyBox value={teamRates} />}
      </Box>

      {!["ACTIVE", "", undefined, null, "OPEN"].includes(status) ||
      livestatus ? (
        <></>
      ) : (
        <>
          <Box
            sx={{
              display: "flex",
              background: "white",
              height: "30px",
              width: { lg: "65%", xs: "78%" },
              justifyContent: { xs: "flex-end", lg: "flex-end" },
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                background: "white",
                height: "30px",
                width: { lg: "50%", xs: "60%" },
                justifyContent: { xs: "flex-end", lg: "flex-end" },
                alignItems: "center",
              }}
            >
              <SeparateBox
                currentMatch={currentMatch}
                align={align}
                value={
                  ex?.availableToBack?.length > 0
                    ? ex?.availableToBack[
                        ex?.availableToBack?.length > 1 ? 2 : 0
                      ]?.price ?? 0
                    : 0
                }
                lock={lock}
                value2={formatNumber(
                  ex?.availableToBack?.length > 0
                    ? ex?.availableToBack[
                        ex?.availableToBack?.length > 1 ? 2 : 0
                      ]?.size ?? 0
                    : 0
                )}
                color={"#A7DCFF"}
              />
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
};
export default memo(BoxComponent);
