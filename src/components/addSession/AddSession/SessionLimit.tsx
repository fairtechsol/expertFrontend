import { Box, TextField, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import SessionResultCustomButton from "../AddSession/SessionResultCustomButton";
import { CancelDark } from "../../../assets";
import { AppDispatch, RootState } from "../../../store/store";
import { useDispatch, useSelector } from "react-redux";
import {
  resetSessionMaxLimitSuccess,
  updateSession,
} from "../../../store/actions/addSession";

const SessionLimit = (props: any) => {
  const { newData, visible, onClickCancel } = props;
  const dispatch: AppDispatch = useDispatch();
  const { loading, maxLimitUpdateSuccess } = useSelector(
    (state: RootState) => state.addSession
  );
  const myDivRef: any = useRef(null);
  const [error, setError] = useState(false);
  const [value, setValue] = useState(newData?.maxBet ? newData?.maxBet : "");

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
      if (newData?.id) {
        if (value > newData?.minBet) {
          setError(false);
          const payload = {
            id: newData?.id,
            maxBet: parseInt(value),
            minBet: newData?.minBet,
          };
          dispatch(updateSession(payload));
        } else {
          setError(true);
        }
      } else {
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
  }, [visible]);

  return (
    <Box
      sx={{
        width: "250px",
        height: "180px",
        padding: 0.2,
        borderRadius: 2,
        boxShadow: "0px 5px 10px #1A568414",
        background: "white",
      }}
    >
      <Box
        sx={[
          {
            width: "100%",
            justifyContent: "space-between",
            paddingX: "20px",
            display: "flex",
            alignItems: "center",
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
          sx={{ fontWeight: "bold", color: "white", fontSize: "14px" }}
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

      {/* <form> */}
      <Box
        sx={{
          width: "100%",
          flexWrap: "wrap",
          padding: "8px",
          flexDirection: "row",
          display: "flex",
          alignSelf: "center",
          alignItems: "center",
          justifyContent: "center",
        }}
        ref={myDivRef}
      >
        <TextField
          autoFocus
          placeholder="API Session Max Bet"
          variant="standard"
          type="number"
          // value={selected}
          value={value}
          id="score"
          name="score"
          onChange={(e) => {
            setValue(e?.target.value);
            setError(false);
          }}
          // touched={touched.score}
          // error={Boolean(errors.score)}
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
              // Call your function here
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

        <Box
          sx={{
            display: "flex",
            paddingY: "5px",
            width: "100%",
            gap: 1,
            marginTop: 2,
            marginBottom: 2,
          }}
        >
          <SessionResultCustomButton
            color={"#0B4F26"}
            id="DR"
            title={"submit"}
            loading={loading}
            onClick={(e: any) => handleSubmit(e)}
            // onClick={() => {
            //   if (loading?.value) {
            //     return false;
            //   }
            //   if (selected !== "" && /^\d+$/.test(selected)) {
            //     declareResult();
            //   } else if (selected === "") {
            //     setError("Please enter score");
            //   } else {
            //     // toast.warn("Please enter score");
            //     setError("Input field should contain numbers only");
            //   }
            // }}
          />
        </Box>
      </Box>
      {/* </form> */}
    </Box>
  );
};

export default SessionLimit;
