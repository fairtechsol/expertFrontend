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
import { Box, Typography } from "@mui/material";
import MatchListInput from "../addMatch/MatchListInput";
import { MaterialUISwitch } from "../tabList/materialUiSwitch";
import { formatToINR } from "../helper";

const MaxBetAdd = ({
  open,
  handleClose,
  matchOddsLive,
  currentMatch,
  title,
  exposureLimit,
  isCommissionActive,
}: any) => {
  const [selected, setSelected] = useState<any>({
    maxLimit: 0,
    minLimit: 0,
    betLimit: 0,
    exposureLimit: null,
  });
  const [commission, setCommission] = useState(
    isCommissionActive ? isCommissionActive : false
  );
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
      isCommissionActive: commission,
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
      // Remove commas from the input value for raw numeric processing
      const rawValue = value.replace(/,/g, ""); 
  
      // Update state only if it's a valid number
      if (/^\d*$/.test(rawValue)) {
        setSelected((prev: any) => ({
          ...prev,
          [name]: rawValue, // Store the raw number
        }));
      }
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
            <Box
              sx={{
                display: "flex",
                width: "100%",
                gap: 1,
                flexDirection: {
                  xs: "column",
                  md: "row",
                },
              }}
            >
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
                  type="text"
                  placeholder="Enter Min Bet..."
                  name="minLimit"
                  id="minLimit"
                  value={formatToINR(selected.minLimit)}
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
                  type="text"
                  placeholder="Enter Max Bet..."
                  name="maxLimit"
                  id="maxLimit"
                  value={formatToINR(selected.maxLimit)}
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
                  type="text"
                  placeholder="Enter Exposure Limit"
                  name="exposureLimit"
                  id="exposureLimit"
                  step="1"
                  value={formatToINR(selected.exposureLimit)}
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
                    type="text"
                    placeholder="Enter Bet Limit..."
                    name="betLimit"
                    id="betLimit"
                    onChange={handleChange}
                    value={formatToINR(selected.betLimit)}
                  />
                </Box>
              )}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "6px",
                  background: "#004a25",
                  color: "#fff",
                  borderRadius: "8px",
                  padding: "1px 5px",
                }}
              >
                <Typography
                  sx={{
                    color: "#fff",
                    fontSize: { lg: "11px", md: "10px", xs: "9px" },
                  }}
                >
                  Set Commission
                </Typography>
                <MaterialUISwitch
                  id="commission-switch"
                  checked={commission}
                  onChange={() => {
                    setCommission((p: boolean) => !p);
                  }}
                />
              </div>
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
