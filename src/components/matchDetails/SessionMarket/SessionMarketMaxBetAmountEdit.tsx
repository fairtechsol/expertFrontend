import { Box, TextField, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CancelDark } from "../../../assets";
import SessionResultCustomButton from "../../../components/addSession/AddSession/SessionResultCustomButton";
import {
  resetMultiSessionMaxLimitSuccess,
  updateMultiSessionMarketAmount,
} from "../../../store/actions/addSession";
import { AppDispatch, RootState } from "../../../store/store";
import { formatToINR } from "../../helper";

const SessionMarketMaxBetAmountEdit = ({
  newData,
  visible,
  onClickCancel,
}: any) => {
  const dispatch: AppDispatch = useDispatch();
  const { loading, multiMaxLimitUpdateSuccess } = useSelector(
    (state: RootState) => state.addSession
  );
  const myDivRef: any = useRef(null);
  const [value, setValue] = useState(newData?.maxBet ? newData?.maxBet : "");
  const [value1, setValue1] = useState(newData?.minBet ? newData?.minBet : "");
  const [exposureLimit, setExposureLimit] = useState(
    newData?.exposureLimit ? newData?.exposureLimit : null
  );
  const scrollToBottom = () => {
    myDivRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "center",
    });
  };
  const handleSubmit = (e: any) => {
    e.stopPropagation();
    try {
      const payload = {
        matchId: newData?.matchId,
        maxBet: parseInt(value),
        minBet: parseInt(value1),
        exposureLimit: parseFloat(exposureLimit),
        type: newData?.type,
      };
      dispatch(updateMultiSessionMarketAmount(payload));
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    if (multiMaxLimitUpdateSuccess) {
      onClickCancel();
      dispatch(resetMultiSessionMaxLimitSuccess());
    }
  }, [multiMaxLimitUpdateSuccess]);

  useEffect(() => {
    scrollToBottom();
  }, [visible]);

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/,/g, "");
    if (/^\d*\.?\d*$/.test(rawValue)) {
      setValue(rawValue);
    }
  };

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
          Session max limit
        </Typography>
        <img
          onClick={(e) => {
            e.stopPropagation();
            onClickCancel();
          }}
          src={CancelDark}
          style={{ width: "25px", height: "25px", cursor: "pointer" }}
        />
      </Box>

      <Typography
        sx={{
          color: "black",
          fontSize: { lg: "11px", md: "10px", xs: "9px" },
          marginLeft: "5px",
          fontWeight: "600",
          lineHeight: "11px",
          padding: 1,
          textTransform: "uppercase",
        }}
      >
        Market Name: {newData?.name}
      </Typography>
      <Box
        sx={{
          width: "100%",
          padding: "8px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 1,
          justifyContent: "space-between",
        }}
        ref={myDivRef}
      >
        <TextField
          label="Min Value"
          autoFocus
          placeholder="API Session Min Bet"
          variant="standard"
          type="text"
          value={value1}
          id="minBet"
          name="minBet"
          onChange={(e) => {
            setValue1(e?.target.value);
          }}
          InputProps={{
            disableUnderline: true,
            sx: {
              alignSelf: "center",
              border: "1px solid #303030",
              borderRadius: "5px",
              paddingY: "5px",
              paddingX: "1vw",
            },
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSubmit(e);
            }
          }}
        />
        <TextField
          label="Max Value"
          autoFocus
          placeholder="API Session Max Bet"
          variant="standard"
          type="text"
          value={value ? formatToINR(value) : ""}
          id="maxBet"
          name="maxBet"
          onChange={handleNumberChange}
          InputProps={{
            disableUnderline: true,
            sx: {
              alignSelf: "center",
              border: "1px solid #303030",
              borderRadius: "5px",
              paddingY: "5px",
              paddingX: "1vw",
            },
          }}
        />

        <TextField
          label="Exposure Limit"
          autoFocus
          placeholder="API Session Exposure Limit"
          variant="standard"
          type="text"
          value={exposureLimit ? formatToINR(exposureLimit) : ""}
          inputProps={{
            inputMode: "numeric",
            pattern: "[0-9]*",
          }}
          id="exposure"
          name="exposure"
          onChange={(e) => {
            const inputValue = e.target.value.replace(/,/g, "");
            if (/^\d*$/.test(inputValue)) {
              setExposureLimit(inputValue);
            }
          }}
          InputProps={{
            disableUnderline: true,
            sx: {
              alignSelf: "center",
              border: "1px solid #303030",
              borderRadius: "5px",
              paddingY: "5px",
              paddingX: "1vw",
            },
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSubmit(e);
            }
          }}
        />

        <Box
          sx={{
            display: "flex",
            paddingY: "5px",
            width: "100%",
            gap: 1,
            marginTop: 3,
          }}
        >
          <SessionResultCustomButton
            color="#0B4F26"
            id="DR"
            title="submit"
            loading={loading}
            onClick={(e: any) => handleSubmit(e)}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default SessionMarketMaxBetAmountEdit;
