import { Box, Typography } from "@mui/material";
import Divider from "../../Common/Divider";
import { formatNumber } from "../../helper";
import SeparateBox from "../SeparateBox";

const CasinoMarketBox = ({ newData, index, profitLoss }: any) => {
  return (
    <div>
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
            background: index % 2 === 0 ? "#FFE094" : "#ECECEC",
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
              color: profitLoss?.profitLoss?.[index]
                ? profitLoss?.profitLoss?.[index] > 0
                  ? "green"
                  : profitLoss?.profitLoss?.[index] < 0
                  ? "red"
                  : "red"
                : "red",
              fontSize: { lg: "10px", md: "10px", xs: "10px" },
              marginLeft: { lg: "7px", md: "20px", xs: "20px" },
              fontWeight: "600",
              lineHeight: 1,
              textAlign: "center",
            }}
          >
            {profitLoss?.profitLoss
              ? parseFloat(profitLoss?.profitLoss?.[index] || 0).toFixed(2)
              : 0}
          </Typography>
        </Box>

        {!["ACTIVE", "", undefined, null].includes(newData?.gstatus) ? (
          <Box
            sx={{
              margin: "1px",
              background: "rgba(0,0,0,1)",
              height: "28px",
              right: "0vh",
              position: "absolute",
              width: { lg: "12%", xs: "13%", md: "8%" },
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
    </div>
  );
};

export default CasinoMarketBox;
