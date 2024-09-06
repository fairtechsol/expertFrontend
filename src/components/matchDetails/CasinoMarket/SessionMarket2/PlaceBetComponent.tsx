import { Box, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { UD } from "../../../../assets";
import { getSessionProfitLossMatchDetail } from "../../../../store/actions/match/matchAction";
import { AppDispatch } from "../../../../store/store";
const PlaceBetComponent = ({ profitLossData, newData }: any) => {
  const dispatch: AppDispatch = useDispatch();
  return (
    <>
      <Box
        onClick={() => {
          if (newData?.type === "fancy1" || newData?.type === "oddEven") {
            return;
          } else {
            dispatch(
              getSessionProfitLossMatchDetail({
                id: newData?.id,
                name: newData?.name,
              })
            );
          }
        }}
        sx={{
          background: "#0B4F26",
          flexDirection: "row",
          display: "flex",
          alignItems: "center",
          top: "2px",
          width: { lg: "7vw", xs: "20vw", md: "20vw" },
          borderRadius: "5px",
          height: "35px",
          right: "6px",
          position: "absolute",
          cursor: "pointer",
        }}
      >
        <Box
          sx={{
            background: "#FDF21A",
            borderRadius: "3px",
            width: "35%",
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
              fontSize: { lg: "7px", xs: "6px", md: "9px" },
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
              fontSize: { lg: ".6vw", xs: "1.5vw", md: "1.5vw" },
              fontWeight: "bold",
              color: "#0B4F26",
              lineHeight: 1,
            }}
          >
            {profitLossData?.totalBet ?? 0}
          </Typography>
        </Box>
        <Box
          sx={{
            paddingX: "2px",
            width: "60%",
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
            overflowWrap: "anywhere",
          }}
        >
          <Typography
            sx={{
              fontSize: {
                lg: !profitLossData?.maxLoss ? "9px" : "9px",
                xs: !profitLossData?.maxLoss ? "7px" : "7px",
                md: !profitLossData?.maxLoss ? "9px" : "9px",
              },
              fontWeight: !profitLossData?.maxLoss ? "bold" : "bold",
              color: "white",
            }}
          >
            {newData?.result
              ? newData?.resultData?.profitLoss ?? 0
              : !profitLossData?.maxLoss
              ? "P/L"
              : profitLossData?.maxLoss ?? 0}
          </Typography>
          <img
            src={UD}
            style={{ width: "10px", height: "10px", marginLeft: "4px" }}
          />
        </Box>
      </Box>
    </>
  );
};

export default PlaceBetComponent;
