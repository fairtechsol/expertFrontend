import { Box, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CancelDark } from "../../../assets";
import {
  noResultDeclare,
  resultDeclare,
  undeclareResult,
} from "../../../store/actions/match/matchAction";
import { AppDispatch, RootState } from "../../../store/store";
import SessionResultCustomButton from "../AddSession/SessionResultCustomButton";

interface SessionResultModalProps {
  newData?: any;
  visible?: boolean;
  onClickCancel: () => void;
}

const SessionResultModal = ({
  newData,
  visible,
  onClickCancel,
}: SessionResultModalProps) => {
  const dispatch: AppDispatch = useDispatch();
  const [selected, setSelected] = useState({ betId: "", matchId: "" });
  const { declareLoading } = useSelector((state: RootState) => state.matchList);
  const [loading, setLoading] = useState({ id: "", value: declareLoading });
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
    onSubmit: (values: any) => {
      if (declareLoading) {
        return;
      }
      if (newData?.betStatus === 0) {
        setLoading({ id: "DR", value: true });
        if (!values?.score && values?.score !== 0) {
          setLoading({ id: "NR", value: false });
          return;
        }
        let payload = {
          score: values.score.toString(),
          matchId: selected?.matchId,
          betId: selected?.betId,
        };
        dispatch(resultDeclare(payload));
      } else if (newData?.betStatus === 3) {
        setLoading({ id: "NR", value: true });
        let payload = {
          matchId: selected?.matchId,
          betId: selected?.betId,
        };
        dispatch(noResultDeclare(payload));
      } else if (newData?.betStatus === 2) {
        setLoading({ id: "UD", value: true });
        let payload = {
          matchId: selected?.matchId,
          betId: selected?.betId,
        };
        dispatch(undeclareResult(payload));
      }
    },
  });

  const { handleSubmit, errors } = formik;

  useEffect(() => {
    scrollToBottom();
  }, [visible]);

  useEffect(() => {
    setSelected({
      betId: newData?.id,
      matchId: newData?.matchId,
    });
  }, [newData]);

  useEffect(() => {
    if (declareLoading) {
      setLoading({ ...loading, value: true });
    } else {
      setLoading({ id: "", value: false });
    }
  }, [declareLoading]);

  return (
    <Box
      sx={{
        width: { lg: "250px", xs: "12rem" },
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
            onClickCancel?.();
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
                value={formik.values.score}
                type="number"
                id="score"
                name="score"
                onChange={formik.handleChange}
                InputProps={{
                  disableUnderline: true,
                  inputProps: { min: 0, step: 1 },
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
                />
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
                color="#FF4D4D"
                title="Un Declare"
                loading={loading}
                id="UD"
              />
            ) : (
              <>
                {newData?.betStatus !== 3 ? (
                  <SessionResultCustomButton
                    color="#0B4F26"
                    id="DR"
                    title="Declare"
                    loading={loading}
                  />
                ) : null}
              </>
            )}

            {newData?.betStatus !== 2 && newData?.isNoResult && (
              <SessionResultCustomButton
                color="rgb(106 90 90)"
                title={newData?.betStatus !== 3 ? "No Result" : "Yes"}
                loading={loading}
                id="NR"
              />
            )}
          </Box>
        </Box>
      </form>
    </Box>
  );
};

export default SessionResultModal;
