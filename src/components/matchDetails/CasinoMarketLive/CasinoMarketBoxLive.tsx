import { Box, Typography } from "@mui/material";
import { memo, useEffect, useState } from "react";
import { formatNumber } from "../../helper";
import SeparateBox from "../SeparateBox";

interface CasinoMarketBoxLiveProps {
  newData: any;
  index: number;
}

const CasinoMarketBoxLive = ({ newData, index }: CasinoMarketBoxLiveProps) => {
  const [live, setLive] = useState<any>(newData?.ActiveStatus ? true : false);

  useEffect(() => {
    if (newData?.ActiveStatus) {
      setLive(true);
    } else setLive(false);
  }, [newData]);

  return (
    <div style={{ position: "relative" }}>
      {!live && (
        <Box
          sx={{
            margin: "1px",
            width: { lg: "100%", xs: "100%" },
            height: "100%",
            right: 0,
            position: "absolute",
            background: "rgba(0,0,0,0.4)",
            zIndex: 2,
          }}
        />
      )}
      <Box
        sx={{
          display: "flex",
          background: "white",
          height: "25px",
          width: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            background: index % 2 === 0 ? "#FFE094" : "#ECECEC",
            height: "25px",
            width: "100%",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              color: "black",
              fontSize: { lg: "10px", md: "10px", xs: "10px" },
              marginLeft: { lg: "7px", md: "20px", xs: "20px" },
              fontWeight: "600",
              lineHeight: 1,
            }}
          >
            {`${index} number`}
          </Typography>
        </Box>

        {!["ACTIVE", "", undefined, null, "active", "open"].includes(
          newData?.gstatus?.toLowerCase()
        ) ? (
          <Box
            sx={{
              margin: "1px",
              background: "rgba(0,0,0,1)",
              height: "25px",
              right: "0vh",
              position: "absolute",
              width: { lg: "27%", xs: "25%", md: "25.5%" },
              justifyContent: { xs: "center", lg: "center" },
              alignItems: "center",
              display: "flex",
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
        ) : (
          <Box
            sx={{
              display: "flex",
              position: "relative",
              background: index % 2 === 0 ? "#FFE094" : "#ECECEC",
              height: "25px",
              width: { lg: "85%", xs: "100%", md: "100%" },
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <SeparateBox
              width="30%"
              value={newData?.odds?.[0]?.odds || 0}
              value2={formatNumber(newData?.odds?.[0]?.size) || 0}
              lock={newData?.gstatus === "SUSPENDED"}
              color="#B3E0FF"
            />
          </Box>
        )}
      </Box>
    </div>
  );
};

export default memo(CasinoMarketBoxLive);
