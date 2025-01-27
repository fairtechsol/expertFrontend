import { Box, TextField, Typography } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  resetMarketListMinMax,
  updateMarketRates,
} from "../../../store/actions/addMatch/addMatchAction";
import { AppDispatch, RootState } from "../../../store/store";
import MatchListInput from "../../addMatch/MatchListInput";
import { formatToINR } from "../../helper";
import { MaterialUISwitch } from "../../tabList/materialUiSwitch";

const TournamentMarketAdd = ({
  open,
  handleClose,
  matchOddsLive,
  currentMatch,
  title,
  exposureLimit,
  isManual,
  isCommissionActive,
}: any) => {
  const [selected, setSelected] = useState<any>({
    maxLimit: 0,
    minLimit: 0,
    betLimit: 0,
    exposureLimit: null,
    ...(isManual ? { name: "" } : {}),
    runners: [],
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
      type: "tournament",
      name: matchOddsLive?.name,
      maxBet: parseFloat(selected.maxLimit),
      minBet: parseFloat(selected.minLimit),
      exposureLimit: parseFloat(selected.exposureLimit),
      betLimit: selected.betLimit,
      marketId: matchOddsLive?.mid?.toString(),
      isCommissionActive: commission,
      gtype: matchOddsLive?.gtype,
      sNo: matchOddsLive?.sno,
      ...(isManual ? { name: selected.name } : {}),
      runners: (isManual ? selected?.runners : matchOddsLive?.runners)?.map(
        (item: any) => {
          return {
            id: item.id,
            matchId: currentMatch?.id,
            runnerName: item?.runnerName || item?.nat,
            //   metaData: null,
            selectionId: item?.selectionId?.toString(),
            sortPriority:
              item?.sortPriority?.toString() || item?.selectionId?.toString(),
          };
        }
      ),
      ...(matchOddsLive?.id && { id: matchOddsLive.id }),
    };
    dispatch(updateMarketRates(data));
    handleClose();
  };

  const handlclose = () => {
    handleClose();
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
        minLimit: matchOddsLive?.id
          ? matchOddsLive?.minBet
          : currentMatch?.betFairSessionMinBet,
        exposureLimit: exposureLimit,
        betLimit: matchOddsLive?.betLimit,
        ...(isManual ? { name: matchOddsLive?.name } : {}),
        runners: matchOddsLive?.runners,
      });
      setCommission(isCommissionActive);
    } catch (error) {
      console.error(error);
    }
  }, [
    matchOddsLive?.maxBet,
    matchOddsLive?.betLimit,
    matchOddsLive?.minBet,
    isCommissionActive,
    matchOddsLive?.minBet,
    exposureLimit,
  ]);

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
            {isManual && (
              <Box
                sx={{
                  width: {
                    xs: "100%",
                  },
                }}
              >
                <MatchListInput
                  label="Market name*"
                  type="text"
                  placeholder="Enter Markt Name..."
                  name="name"
                  id="name"
                  value={selected.name}
                  onChange={(e: any) => {
                    setSelected({ ...selected, name: e.target.value });
                  }}
                />
              </Box>
            )}
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
              {/* <Box
                sx={{
                  width: {
                    xs: "100%",
                    lg: "50%",
                    md: "50%",
                  },
                }}
              >
                <MatchListInput
                  label={"Bet Limit*"}
                  type={"number"}
                  placeholder="Enter Bet Limit..."
                  name="betLimit"
                  id="betLimit"
                  onChange={handleChange}
                  value={selected.betLimit}
                />
              </Box> */}
            </Box>
            {isManual && (
              <Box
                sx={{
                  width: {
                    xs: "100%",
                  },
                }}
              >
                <Box sx={{ display: "flex" }}>
                  <Box
                    sx={{
                      background: "#319E5B",
                      width: "100%",
                      px: "5px",
                      color: "white",
                    }}
                  >
                    Team Names
                  </Box>
                </Box>
                <Box sx={{ display: "flex" }}>
                  <Box sx={{ background: "#f1c550", width: "100%" }}>
                    {selected.runners?.map((item: any, index: any) => {
                      return (
                        <Box
                          sx={{
                            borderWidth: 0,
                            justifyContent: "space-between",
                            alignItems: "center",
                            display: "flex",
                            width: "100%",
                          }}
                          key={item.id}
                        >
                          <TextField
                            name={`runners[${index}].runnerName`}
                            id={`teamName${index}`}
                            value={item.runnerName || item.nat}
                            onChange={(e: any) => {
                              setSelected({
                                ...selected,
                                runners: selected?.runners?.map(
                                  (items: any) => {
                                    if (items.id == item.id) {
                                      return {
                                        ...items,
                                        runnerName: e.target.value,
                                      };
                                    }
                                    return items;
                                  }
                                ),
                              });
                            }}
                            placeholder={`Team ${String.fromCharCode(
                              (index % 26) + 65
                            )}`}
                            size="small"
                            fullWidth
                            variant="standard"
                            sx={{ outline: "none" }}
                          />
                        </Box>
                      );
                    })}
                  </Box>
                </Box>
              </Box>
            )}
            <Box
              sx={{
                width: {
                  xs: "100%",
                  lg: "50%",
                  md: "50%",
                },
              }}
            >
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
            type="submit"
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
            onClick={handlclose}
          >
            Cancel
          </button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default TournamentMarketAdd;
