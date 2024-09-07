import { useState } from "react";
import { useDispatch } from "react-redux";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { TextField } from "@mui/material";
import { AppDispatch } from "../../../store/store";
import { updateMarketRates } from "../../../store/actions/addMatch/addMatchAction";

const OtherMarketAdd = ({
  open,
  handleClose,
  matchOddsLive,
  currentMatch,
  title,
}: any) => {
  const [selected, setSelected] = useState<any>();
  const dispatch: AppDispatch = useDispatch();

  const handleSubmit = () => {
    let data = {
      matchId: currentMatch?.id,
      type: matchOddsLive?.type,
      name: matchOddsLive?.name,
      maxBet: parseFloat(selected),
      marketId: matchOddsLive?.marketId,
      gtype: matchOddsLive?.gtype,
      metaData: {
        teamA:
          (matchOddsLive?.runners?.length > 0 &&
            matchOddsLive?.runners[0]?.nat) ??
          "",
        teamB:
          (matchOddsLive?.runners?.length > 0 &&
            matchOddsLive?.runners[1]?.nat) ??
          "",
      },
      ...(matchOddsLive?.id && { id: matchOddsLive.id }),
    };
    dispatch(updateMarketRates(data));
    handleClose(); // Close the dialog after submission
  };
  const handlclose = () => {
    handleClose();
  };
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle
        sx={{
          textAlign: "center",
          color: "#fff",
          background: "linear-gradient(90deg, #004A25 5%, #FDCB52 100%)",
          fontFamily: "Poppins, sans-serif",
        }}
      >
        {title}
      </DialogTitle>
      <DialogContent sx={{ backgroundColor: "#fff" }}>
        <div
          style={{
            width: "100%",
            height: "80px",
            backgroundColor: "#fff",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TextField
            type="number"
            placeholder="Enter maximum bet value"
            onChange={(e: any) => {
              setSelected(e.target.value);
            }}
            // style={{
            //   width: "80%",
            //   height: "50px",
            // }}
          />
        </div>
      </DialogContent>
      <DialogActions
        sx={{
          background: "linear-gradient(90deg, #004A25 5%, #FDCB52 100%)",
        }}
      >
        <button
          style={{
            width: "25%",
            height: "40px",
            color: "#fff",
            backgroundColor: "#004A25",
            fontSize: "14px",
            borderRadius: "5px",
            border: "1px #004A25 solid",
            cursor: "pointer",
            fontFamily: "Poppins, sans-serif",
          }}
          onClick={handleSubmit}
        >
          Submit
        </button>

        <button
          style={{
            width: "25%",
            height: "40px",
            color: "#fff",
            backgroundColor: "#004A25",
            fontSize: "14px",
            borderRadius: "5px",
            border: "1px #004A25 solid",
            cursor: "pointer",
            fontFamily: "Poppins, sans-serif",
          }}
          onClick={handlclose}
        >
          Cancel
        </button>
      </DialogActions>
    </Dialog>
  );
};

export default OtherMarketAdd;
