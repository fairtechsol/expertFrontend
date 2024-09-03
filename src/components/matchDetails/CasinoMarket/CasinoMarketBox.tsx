import { Box, Typography } from "@mui/material";
import Divider from "../../Common/Divider";
import SeparateBox from "../SeparateBox";
import { formatNumber } from "../../helper";

const CasinoMarketBox = ({ newData, index }: any) => {
  
  return (
    <div>
      <Box
        sx={{
          display: "flex",
          background: "white",
          height: "40px",
          width: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            background: index % 2 === 0 ? "#FFE094" : "#ECECEC",
            height: "40px",
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
            {`${index} Number`}
          </Typography>
        </Box>

        {!["ACTIVE", "", undefined, null].includes(newData?.gstatus) ? (
          <Box
            sx={{
              margin: "1px",
              background: "rgba(0,0,0,1)",
              height: "40px",
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
              height: "40px",
              width: { lg: "85%", xs: "100%", md: "100%" },
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <SeparateBox
              width="30%"
              value={(newData?.odds && newData?.odds[0]?.odds) || 0}
              value2={
                formatNumber(newData?.odds && newData?.odds[0]?.size) || 0
              }
              lock={newData?.gstatus === "Suspended"}
              color="#B3E0FF"
            />
          </Box>
        )}
      </Box>
      <Divider />
    </div>
  );
};

export default CasinoMarketBox;
