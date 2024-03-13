import { Box, TextField, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import SessionResultCustomButton from "../../../components/addSession/AddSession/SessionResultCustomButton";
import { CancelDark } from "../../../assets";
import { AppDispatch } from "../../../store/store";
import { useDispatch } from "react-redux";
import { updateSession } from "../../../store/actions/addSession";

const SessionLimitEdit = (props: any) => {
  const { newData, visible, onClickCancel, maxValue } = props;
  const dispatch: AppDispatch = useDispatch();
  const [loading] = useState({ id: "", value: false });
  const myDivRef: any = useRef(null);
  const [value, setValue] = useState(newData?.maxBet ? newData?.maxBet :  "");

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
          id: newData?.id,
          maxBet: parseInt(value),
          minBet: newData?.minBet,
        };
        dispatch(updateSession(payload));
      
        maxValue(value);
      
    } catch (error) {
      console.log("error", error);
    } finally {
      onClickCancel();
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [visible]);

//   console.log(newData)

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
          placeholder="Betfair Session Max Bet"
          variant="standard"
          type="number"
          // value={selected}
          value={value}
          id="score"
          name="score"
          onChange={(e) => {
            setValue(e?.target.value);
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
            if (e.key === 'Enter') {
              // Call your function here
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

export default SessionLimitEdit;
