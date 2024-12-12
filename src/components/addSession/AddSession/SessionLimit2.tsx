import { useEffect, useState } from "react";
//import { updateMarketRates } from "../../../store/actions/addMatch/addMatchAction";
import {
  resetSessionMaxLimitSuccess,
  updateSession,
} from "../../../store/actions/addSession";
import { AppDispatch, RootState } from "../../../store/store";
import { useDispatch, useSelector } from "react-redux";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Box } from "@mui/material";
import MatchListInput from "../../addMatch/MatchListInput";

const SessionLimit2 = ({
  open,
  handleClose,
  matchOddsLive,
  title,
  exposureLimit,
}: any) => {
  const [selected, setSelected] = useState<any>({
    maxLimit: 0,
    minLimit: 0,
    exposureLimit: null,
  });
  const dispatch: AppDispatch = useDispatch();
  const { maxLimitUpdateSuccess } = useSelector(
    (state: RootState) => state.addSession
  );

  const handleSubmit = (e: any) => {
    e.preventDefault();
    try {
      if (matchOddsLive?.id) {
        // if (selected?.maxLimit >= selected?.minLimit) {
        const payload = {
          id: matchOddsLive?.id,
          maxBet: selected?.maxLimit,
          minBet: selected?.minLimit,
          exposureLimit: parseFloat(selected?.exposureLimit),
        };
        dispatch(updateSession(payload));
        //   }
        // } else {
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleChange = (e: any) => {
    try {
      const { name, value } = e.target;
      setSelected((prev: any) => {
        return {
          ...prev,
          [name]: value,
        };
      });
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    try {
      setSelected({
        maxLimit: matchOddsLive?.maxBet,
        minLimit: matchOddsLive?.minBet,
        exposureLimit: exposureLimit,
      });
    } catch (error) {
      console.error(error);
    }
  }, [open]);

  useEffect(() => {
    if (maxLimitUpdateSuccess) {
      dispatch(resetSessionMaxLimitSuccess());
      handleClose();
    }
  }, [maxLimitUpdateSuccess]);
  return (
    <Dialog open={open} onClose={handleClose}>
      <form onSubmit={handleSubmit}>
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
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              gap: 1,
            }}
          >
            <Box sx={{ display: "flex", width: "100%", gap: 1 }}>
              <Box
                sx={{
                  width: {
                    xs: "100%",
                    lg: "50%",
                    md: "50%",
                  },
                }}
              >
                <MatchListInput
                  label="Min Limit*"
                  type="number"
                  placeholder="Enter Min Bet..."
                  name="minLimit"
                  id="minLimit"
                  value={selected.minLimit}
                  onChange={handleChange}
                />
              </Box>
              <Box
                sx={{
                  width: {
                    xs: "100%",
                    lg: "50%",
                    md: "50%",
                  },
                }}
              >
                <MatchListInput
                  label="Max Limit*"
                  type="number"
                  placeholder="Enter Max Bet..."
                  name="maxLimit"
                  id="maxLimit"
                  value={selected.maxLimit}
                  onChange={handleChange}
                />
              </Box>
              <Box
                sx={{
                  width: {
                    xs: "100%",
                    lg: "50%",
                    md: "50%",
                  },
                }}
              >
                <MatchListInput
                  label="Exposure Limit"
                  type="number"
                  placeholder="Enter Exposure Bet..."
                  name="exposureLimit"
                  id="exposureLimit"
                  step="1"
                  value={selected.exposureLimit}
                  onChange={handleChange}
                />
              </Box>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions
          sx={{
            background: "linear-gradient(90deg, #004A25 5%, #FDCB52 100%)",
          }}
        >
          <button
            type="submit"
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
          >
            Submit
          </button>

          <button
            type="button"
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
            onClick={() => {
              handleClose();
            }}
          >
            Cancel
          </button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default SessionLimit2;
