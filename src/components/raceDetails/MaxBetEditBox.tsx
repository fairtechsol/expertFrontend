import { Box, Button, TextField, Typography } from "@mui/material";
import { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { CancelDark } from "../../assets";
import { editRace, resetRaceEdit } from "../../store/actions/match/matchAction";
import { AppDispatch, RootState } from "../../store/store";

interface MaxBetEditProps {
  onClickCancel: () => void;
  matchOdd: any;
  id: string;
}

const MaxBetEdit = ({ onClickCancel, matchOdd, id }: MaxBetEditProps) => {
  const dispatch: AppDispatch = useDispatch();
  const { editRaceSuccess } = useSelector(
    (state: RootState) => state.matchList
  );
  const [minValue, setMinValue] = useState(
    matchOdd?.minBet ? matchOdd?.minBet : 0
  );
  const [maxValue, setMaxValue] = useState(
    matchOdd?.maxBet ? matchOdd?.maxBet : 0
  );

  const handleSubmit = () => {
    if (minValue < 1 || maxValue < minValue) {
      toast.error("Enter correct value!");
      return;
    }
    let editMatchpayload: any = {
      id: id,
      minBet: parseFloat(minValue),
      maxBet: parseFloat(maxValue),
    };
    dispatch(editRace(editMatchpayload));
  };

  useEffect(() => {
    if (editRaceSuccess) {
      onClickCancel();
      dispatch(resetRaceEdit());
    }
  }, [editRaceSuccess]);

  return (
    <Box
      sx={{
        width: { lg: "30%", xs: "60%", md: "40%" },
        padding: 0.2,
        borderRadius: 2,
        boxShadow: "0px 5px 10px #1A568414",
        background: "white",
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "column",
      }}
    >
      <Box
        sx={[
          {
            width: "100%",
            justifyContent: "space-between",
            paddingX: "20px",
            paddingY: "10px",
            display: "flex",
            alignItems: "flex-start",
            height: "40px",
            background: "white",
            borderRadius: 2,
          },
          (theme: any) => ({
            backgroundImage: theme.palette.primary.headerGradient,
          }),
        ]}
      >
        <Typography
          sx={{
            fontWeight: "bold",
            color: "white",
            fontSize: "14px",
            lineHeight: "1",
          }}
        >
          Match odd limit
        </Typography>
        <img
          onClick={(e) => {
            e.stopPropagation();
            onClickCancel();
          }}
          src={CancelDark}
          alt="cancel"
          width={25}
          height={25}
          style={{ cursor: "pointer" }}
        />
      </Box>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          marginTop: "10px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            paddingLeft: "5px",
            width: "30%",
          }}
        >
          <Typography>Minimum Bet :</Typography>
        </Box>

        <TextField
          autoFocus
          placeholder="API Match Odd Min Bet"
          variant="standard"
          type="number"
          // value={selected}
          value={minValue}
          id="score"
          name="score"
          onChange={(e) => {
            setMinValue(e?.target.value);
          }}
          InputProps={{
            disableUnderline: true,
            sx: {
              width: "100%",
              alignSelf: "center",
              border: "1px solid #303030",
              borderRadius: "5px",
              paddingY: "5px",
              paddingX: "1vw",
              marginLeft: "5px",
            },
          }}
        />
      </Box>

      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          marginTop: "10px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            paddingLeft: "5px",
            width: "30%",
          }}
        >
          <Typography>Maximum Bet :</Typography>
        </Box>

        <TextField
          autoFocus
          placeholder="API Match Odd Max Bet"
          variant="standard"
          type="number"
          value={maxValue}
          id="score"
          name="score"
          onChange={(e) => {
            setMaxValue(e?.target.value);
          }}
          InputProps={{
            disableUnderline: true,
            sx: {
              width: "100%",
              alignSelf: "center",
              border: "1px solid #303030",
              borderRadius: "5px",
              paddingY: "5px",
              paddingX: "1vw",
              marginLeft: "5px",
            },
          }}
        />
      </Box>

      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          marginTop: "10px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            paddingLeft: "5px",
            width: "30%",
          }}
        />

        <Button
          variant="contained"
          sx={{
            width: "50%",
            textAlign: "center",
            backgroundColor: "#0B4F26",
            color: "#fff",
            marginBottom: "10px",
          }}
          onClick={handleSubmit}
        >
          SUBMIT
        </Button>
      </Box>
    </Box>
  );
};

export default memo(MaxBetEdit);
