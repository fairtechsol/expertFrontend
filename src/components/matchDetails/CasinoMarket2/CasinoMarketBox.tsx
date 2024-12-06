import { Box, Typography } from "@mui/material";
import Divider from "../../Common/Divider";
import { formatNumber } from "../../helper";
import SeparateBox from "../SeparateBox";

const CasinoMarketBox = ({ newData, index }: any) => {
  return (
    <div>
      <Box
        sx={{
          display: "flex",
          background: "white",
          height: "30px",
          width: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            background: index % 2 === 0 ? "#FFE094" : "#ECECEC",
            height: "30px",
            width: "100%",
            justifyContent: "center",
            flexDirection: "column",
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
        </Box>

        {!["ACTIVE", "", undefined, null, "active", "open"].includes(newData?.gstatus?.toLowerCase()) ? (
          <Box
            sx={{
              margin: "1px",
              background: "rgba(0,0,0,1)",
              height: "30px",
              right: "0vh",
              position: "absolute",
              width: { lg: "27%", xs: "25%", md: "25.5%" },
              justifyContent: { xs: "center", lg: "center" },
              alignItems: "center",
              display: "flex",
            }}
          >
            <Typography
              sx={{
                fontSize: { lg: "10px", md: "9px", sm: "7px", xs: "10px" },
              }}
              style={{
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
              height: "30px",
              width: { lg: "65%", xs: "67%", md: "61%" },
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

            {/* {
              <PlaceBetComponent
                width={7}
                profitLossData={
                  matchDetail?.sessionProfitLoss &&
                  matchDetail?.sessionProfitLoss[
                    matchDetail?.updatedSesssionBettings?.cricketCasino
                      ?.section?.[0]?.id
                  ]
                }
                newData={
                  matchDetail?.updatedSesssionBettings?.cricketCasino
                    ?.section?.[0]?.id
                }
              />
            } */}
          </Box>
        )}
      </Box>
      <Divider />
    </div>
  );
};

export default CasinoMarketBox;
