import { Box, Typography } from "@mui/material";
import { memo } from "react";
import Divider from "../../Common/Divider";
import { formatNumber } from "../../helper";
import SeparateBox from "../SeparateBox";

interface CasinoMarketBoxProps {
  newData: any;
  index: number;
  profitLoss: any;
  sessionData: any;
}

const CasinoMarketBox = ({
  sessionData,
  newData,
  profitLoss,
  index,
}: CasinoMarketBoxProps) => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          background: "white",
          height: "28px",
          width: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            background: sessionData?.isComplete
              ? "#E15151"
              : index % 2 === 0
              ? "#FFE094"
              : "#ECECEC",
            height: "28px",
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              color: "black",
              fontSize: "10px",
              marginLeft: { lg: "7px", md: "20px", xs: "20px" },
              fontWeight: "600",
              lineHeight: 1,
              margin: "4px",
            }}
          >
            {newData?.nat || `${index} Number`}
          </Typography>
          <Typography
            sx={{
              color:
                +profitLoss?.profitLoss?.[index]?.profitLoss ||
                +profitLoss?.profitLoss?.[index] > 0
                  ? "green"
                  : +profitLoss?.profitLoss?.[index]?.profitLoss ||
                    +profitLoss?.profitLoss?.[index] < 0
                  ? "#7B2626"
                  : "black",
              fontSize: { lg: "10px", md: "10px", xs: "10px" },
              marginLeft: { lg: "7px", md: "20px", xs: "20px" },
              fontWeight: "600",
              lineHeight: 1,
              textAlign: "center",
              zIndex: "99",
            }}
          >
            {parseFloat(
              +profitLoss?.profitLoss?.[index]?.profitLoss ||
                (+profitLoss?.profitLoss?.[index] as any) ||
                0
            ).toFixed(2)}
          </Typography>
        </Box>

        {!["ACTIVE", "", undefined, null, "active", "open"].includes(
          newData?.gstatus?.toLowerCase()
        ) ? (
          <Box
            sx={{
              display: "flex",
              position: "relative",
              background: sessionData?.isComplete
                ? "#E15151"
                : index % 2 === 0
                ? "#FFE094"
                : "#ECECEC",
              height: "28px",
              width: { lg: "20%", xs: "17%", md: "10%" },
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                width: "75%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "rgba(0,0,0,1)",
              }}
            >
              <Typography
                style={{
                  fontSize: "10px",
                  textTransform: "uppercase",
                  textAlign: "center",
                  width: "100%",
                  color: "white",
                  fontWeight: "400",
                }}
              >
                {newData?.gstatus}
              </Typography>
            </Box>
          </Box>
        ) : (
          <Box
            sx={{
              display: "flex",
              position: "relative",
              background: sessionData?.isComplete
                ? "#E15151"
                : index % 2 === 0
                ? "#FFE094"
                : "#ECECEC",
              height: "28px",
              width: { lg: "20%", xs: "17%", md: "10%" },
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <SeparateBox
              width="75%"
              value={(newData?.odds && newData?.odds[0]?.odds) || 0}
              value2={
                formatNumber(newData?.odds && newData?.odds[0]?.size) || 0
              }
              lock={newData?.gstatus === "Suspended"}
              color="#B3E0FF"
              mWidth="90%"
            />
          </Box>
        )}
      </Box>
      <Divider />
    </>
  );
};

export default memo(CasinoMarketBox);
