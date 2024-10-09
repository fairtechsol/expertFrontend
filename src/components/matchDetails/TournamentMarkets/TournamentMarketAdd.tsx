import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Box } from "@mui/material";
import { AppDispatch } from "../../../store/store";
import { updateMarketRates } from "../../../store/actions/addMatch/addMatchAction";
import MatchListInput from "../../addMatch/MatchListInput";

const TournamentMarketAdd = ({
  open,
  handleClose,
  matchOddsLive,
  currentMatch,
  title,
}: any) => {
  const [selected, setSelected] = useState<any>({
    maxLimit: "",
    betLimit: "",
  });
  const dispatch: AppDispatch = useDispatch();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    let data = {
      matchId: currentMatch?.id,
      type: "tournament",
      name: matchOddsLive?.name,
      maxBet: parseFloat(selected.maxLimit),
      betLimit: parseFloat(selected.betLimit),
      marketId:
        matchOddsLive?.mid?.toString() || matchOddsLive?.marketId?.toString(),
      gtype: matchOddsLive?.gtype,
      runners: matchOddsLive?.runners?.map((item: any) => {
        return {
          matchId: currentMatch?.id,
          runnerName: item?.nat,
          //   metaData: null,
          selectionId: item?.selectionId?.toString(),
          sortPriority: item?.selectionId?.toString(),
        };
      }),
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
      });
    } catch (error) {
      console.error(error);
    }
  }, [matchOddsLive?.maxBet, matchOddsLive?.betLimit]);

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
                  label={"Max Limit*"}
                  type={"number"}
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
                  label={"Bet Limit*"}
                  type={"number"}
                  placeholder="Enter Bet Limit..."
                  name="betLimit"
                  id="betLimit"
                  onChange={handleChange}
                  value={selected.betLimit}
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
      </form>
    </Dialog>
  );
};

export default TournamentMarketAdd;
