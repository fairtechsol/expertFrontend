import { useEffect, useState } from "react";
import {
  resetMarketListMinMax,
  updateMarketRates,
} from "../../store/actions/addMatch/addMatchAction";
import { AppDispatch, RootState } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Box } from "@mui/material";
import MatchListInput from "../addMatch/MatchListInput";

const MaxBetAdd = ({
  open,
  handleClose,
  matchOddsLive,
  currentMatch,
  title,
  exposureLimit,
}: any) => {
  const [selected, setSelected] = useState<any>({
    maxLimit: 0,
    minLimit: 0,
    betLimit: 0,
    exposureLimit: null,
  });
  const dispatch: AppDispatch = useDispatch();
  const { maxLimitSuccess, maxLimitLoading } = useSelector(
    (state: RootState) => state.addMatch.addMatch
  );

  const handleSubmit = (e: any) => {
    e.preventDefault();
    let data = {
      matchId: currentMatch?.id,
      type: matchOddsLive?.type,
      name: matchOddsLive?.name,
      maxBet: parseFloat(selected.maxLimit),
      minBet: parseFloat(selected.minLimit),
      exposureLimit: parseFloat(selected.exposureLimit),
      marketId: matchOddsLive?.mid?.toString(),
      gtype: matchOddsLive?.gtype,
      ...(matchOddsLive?.id && { id: matchOddsLive.id }),
    };
    if (
      ["matchOdd", "completeMatch", "tiedMatch1"]?.includes(matchOddsLive?.type)
    ) {
      data.betLimit = selected.betLimit;
    }
    dispatch(updateMarketRates(data));
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
        betLimit: matchOddsLive?.betLimit,
        exposureLimit: exposureLimit,
        minLimit: matchOddsLive?.id
          ? matchOddsLive?.minBet
          : currentMatch?.betFairSessionMinBet,
      });
    } catch (error) {
      console.error(error);
    }
  }, [open]);

  useEffect(() => {
    if (maxLimitSuccess) {
      dispatch(resetMarketListMinMax());
      handleClose();
    }
  }, [maxLimitSuccess]);

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
                  placeholder="Enter Exposure Limit"
                  name="exposureLimit"
                  id="exposureLimit"
                  step="1"
                  value={selected.exposureLimit}
                  onChange={handleChange}
                />
              </Box>
              {["matchOdd", "completeMatch", "tiedMatch1"]?.includes(
                matchOddsLive?.type
              ) && (
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
                    label="Bet Limit*"
                    type="number"
                    placeholder="Enter Bet Limit..."
                    name="betLimit"
                    id="betLimit"
                    onChange={handleChange}
                    value={selected.betLimit}
                  />
                </Box>
              )}
            </Box>
          </Box>
        </DialogContent>
        <DialogActions
          sx={{
            background: "linear-gradient(90deg, #004A25 5%, #FDCB52 100%)",
          }}
        >
          <button
            type={"submit"}
            disabled={maxLimitLoading}
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
            {maxLimitLoading ? "Loading..." : "Submit"}
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

export default MaxBetAdd;
