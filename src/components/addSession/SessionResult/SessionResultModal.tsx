import { Box, TextField, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import SessionResultCustomButton from "../AddSession/SessionResultCustomButton";
import { CancelDark } from "../../../assets";
import { useFormik } from "formik";
import { resultDeclare } from "../../../store/actions/match/matchAction";
import { AppDispatch } from "../../../store/store";
import { useDispatch } from "react-redux";

const SessionResultModal = (props: any) => {
  const { newData, visible, onClickCancel, matchId, betId } = props;
  const dispatch: AppDispatch = useDispatch();
  const [selected, setSelected] = useState({ betId: "", matchId: "" });
  const [loading] = useState({ id: "", value: false });
  const myDivRef: any = useRef(null);

  const scrollToBottom = () => {
    myDivRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "center",
    });
  };

  const initialValues: any = {
    betId: "",
    score: "",
    matchId: "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    // validationSchema: changePasswordSchema,
    onSubmit: (values: any) => {
      let payload = {
        score: values.score,
        matchId: selected?.matchId,
        betId: selected?.betId,
      };
      dispatch(resultDeclare(payload));
      // console.log(values, "values 555555")
    },
  });

  const { handleSubmit, errors } = formik;

  useEffect(() => {
    scrollToBottom();
  }, [visible]);

  useEffect(() => {
    setSelected({
      betId: newData?.id,
      matchId: newData?.matchId
    })
  }, [newData])

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
          Session Result
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

      <form onSubmit={(e) => handleSubmit(e)}>
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
          {newData?.betStatus === 2 ? (
            <Typography
              sx={{
                color: "#0B4F26",
                fontSize: "13px",
                fontWeight: "600",
                textAlign: "center",
                paddingTop: "20px",
                paddingBottom: "20px",
              }}
            >
              Are you sure to Undeclare Result ?
            </Typography>
          ) : newData?.betStatus !== 3 && newData?.betStatus !== 2 ? (
            <>
              <TextField
                autoFocus
                placeholder="Enter score"
                variant="standard"
                // value={selected}
                value={formik.values.score}
                id="score"
                name="score"
                onChange={formik.handleChange}
                // onChange={(e) => {
                //   //   setError("");
                //   setSelected(e?.target.value);
                // }}
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
              />
              {errors && (
                <Box
                  style={{ color: "red", marginTop: "8px", fontSize: "11px" }}
                >
                  {/* {error} */}
                </Box>
              )}
            </>
          ) : (
            <Typography
              sx={{
                color: "#0B4F26",
                fontSize: "13px",
                fontWeight: "600",
                textAlign: "center",
                paddingTop: "20px",
                paddingBottom: "20px",
              }}
            >
              Are you sure to set No Result ?
            </Typography>
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
            {newData?.betStatus === 2 ? (
              <SessionResultCustomButton
                color={"#FF4D4D"}
                title={"Un Declare"}
                loading={loading}
                id="UD"
                onClick={() => {
                  if (loading?.value) {
                    return false;
                  }
                  //   undeclareResult();
                  // if (selected && /^\d+$/.test(selected)) {
                  // } else if (selected === "") {
                  //   setError("Please enter score");
                  // } else {
                  //   // toast.warn("Please enter score");
                  //   setError("Input field should contain numbers only");
                  // }
                }}
              />
            ) : (
              <>
                {newData?.betStatus !== 3 ? (
                  <SessionResultCustomButton
                    color={"#0B4F26"}
                    id="DR"
                    title={"Declare"}
                    loading={loading}
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
                ) : null}
              </>
            )}

            {newData?.betStatus !== 2 && newData?.isNoResult && (
              <SessionResultCustomButton
                color={"rgb(106 90 90)"}
                title={newData?.betStatus !== 3 ? "No Result" : "Yes"}
                loading={loading}
                id="NR"
                onClick={() => {
                  if (loading?.value) {
                    return false;
                  }

                  //   noResultDeclare();
                }}
              />
            )}
          </Box>
        </Box>
      </form>
    </Box>
  );
};

export default SessionResultModal;
