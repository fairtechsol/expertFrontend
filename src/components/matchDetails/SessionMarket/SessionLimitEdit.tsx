import { Box, TextField, Typography } from "@mui/material";
import { memo, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CancelDark } from "../../../assets";
import SessionResultCustomButton from "../../../components/addSession/AddSession/SessionResultCustomButton";
import {
  resetSessionMaxLimitSuccess,
  updateSession,
} from "../../../store/actions/addSession";
import { AppDispatch, RootState } from "../../../store/store";
import { formatToINR } from "../../helper";
import { MaterialUISwitch } from "../../tabList/materialUiSwitch";

interface SessionLimitEditProps {
  newData: any;
  onClickCancel: () => void;
}

const SessionLimitEdit = ({
  newData,
  onClickCancel,
}: SessionLimitEditProps) => {
  const dispatch: AppDispatch = useDispatch();
  const { loading, maxLimitUpdateSuccess } = useSelector(
    (state: RootState) => state.addSession
  );
  const myDivRef: any = useRef(null);
  const [error, setError] = useState(false);
  const [value, setValue] = useState(newData?.maxBet ? newData?.maxBet : "");
  const [commission, setCommission] = useState(
    newData?.isCommissionActive ? newData?.isCommissionActive : false
  );
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
      if (value > newData?.minBet) {
        setError(false);
        const payload = {
          id: newData?.id,
          maxBet: parseInt(value),
          minBet: newData?.minBet,
          exposureLimit: parseFloat(exposureLimit),
          isCommissionActive: commission,
        };
        dispatch(updateSession(payload));
      } else {
        setError(true);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    if (maxLimitUpdateSuccess) {
      onClickCancel();
      dispatch(resetSessionMaxLimitSuccess());
    }
  }, [maxLimitUpdateSuccess]);

  useEffect(() => {
    scrollToBottom();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/,/g, "");
    if (/^\d*$/.test(rawValue)) {
      setValue(rawValue);
      setError(false);
    }
  };

  return (
    <Box
      sx={{
        width: { lg: "30%", xs: "60%", md: "40%" },
        // height: "180px",
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
          alt="cancel"
          width={25}
          height={25}
          style={{ cursor: "pointer" }}
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
        }}
      >
        SESSION NAME: {newData?.name}
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
          label="Max Limit"
          autoFocus
          placeholder="API Session Max Bet"
          variant="standard"
          type="text"
          value={value ? formatToINR(value) : ""}
          id="score"
          name="score"
          onChange={handleChange}
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
        {error && (
          <Box
            sx={{
              color: "red",
              marging: "2px",
              fontSize: "12px",
            }}
          >
            Max Bet Should be Greater Than Min Bet
          </Box>
        )}
        <TextField
          label="Exposure Limit"
          autoFocus
          placeholder="API Session Exposure Limit"
          variant="standard"
          type="text"
          value={exposureLimit ? formatToINR(exposureLimit) : ""}
          id="exposure"
          name="exposure"
          inputProps={{
            inputMode: "numeric",
            pattern: "[0-9]*",
          }}
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
        <div
          style={{
            display: "flex",
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

export default memo(SessionLimitEdit);
