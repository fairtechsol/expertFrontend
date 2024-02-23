import { useDispatch } from "react-redux";
import { UD } from "../../../assets";
import { Box, Typography } from "@mui/material";
import { AppDispatch } from "../../../store/store";
import { getSessionProfitLossMatchDetail } from "../../../store/actions/match/matchAction";

const PlaceBetComponent = ({ profitLossData, newData }: any) => {
  const dispatch: AppDispatch = useDispatch();
  return (
    <>
      <Box
        onClick={() => {
          dispatch(
            getSessionProfitLossMatchDetail({
              id: newData?.id,
              name: newData?.name,
            })
          );
        }}
        sx={{
          background: "#0B4F26",
          flexDirection: "row",
          display: "flex",
          alignItems: "center",
          top: "2px",
          width: "9vw",
          borderRadius: "5px",
          height: "26px",
          right: "8px",
          position: "absolute",
          cursor: "pointer",
        }}
      >
        <Box
          sx={{
            background: "#FDF21A",
            borderRadius: "3px",
            width: "40%",
            height: "85%",
            alignItems: "center",
            justifyContent: "center",
            display: "flex",

            flexDirection: "column",
            marginLeft: "2px",
          }}
        >
          <Typography
            sx={{
              fontSize: { lg: "8px" },
              fontWeight: "bold",
              textAlign: "center",
              color: "#FF4D4D",
              lineHeight: "1",
            }}
          >
            Total Bet
          </Typography>
          <Typography
            sx={{
              fontSize: { lg: ".5vw" },
              fontWeight: "bold",
              color: "#0B4F26",
              lineHeight: 1,
            }}
          >
            {profitLossData?.totalBet || 0}
          </Typography>
        </Box>
        <Box
          sx={{
            paddingX: "2px",
            width: "60%",
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
          }}
        >
          <Typography
            sx={{
              fontSize: {
                lg: !profitLossData?.maxLoss ? "10px" : "10px",
              },
              fontWeight: !profitLossData?.maxLoss ? "bold" : "bold",
              color: "white",
            }}
          >
            {newData?.result
              ? profitLossData
              : !profitLossData?.maxLoss
              ? "Profit/Loss"
              : profitLossData?.maxLoss}
          </Typography>
          <img
            src={UD}
            style={{ width: "12px", height: "12px", marginLeft: "5px" }}
          />
        </Box>
      </Box>
    </>
  );
};

export default PlaceBetComponent;
