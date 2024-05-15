import { Box, Typography, TextField } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { memo } from "react";
import { toast } from "react-toastify";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import {
  declareMatchStatusReset,
  otherDeclareMatchResult,
  otherUnDeclareMatchResult,
} from "../../store/actions/match/matchDeclareActions";
import { CancelDark } from "../../assets";
import MarketCustomButton from "./MarketCustomButton";

const MarketResultComponent = ({
  currentMatch,
  onClick,
  // teamA,
  // teamB,
  stopAt,
  liveData,
}: any) => {
  const dispatch: AppDispatch = useDispatch();
  const { success, error } = useSelector((state: RootState) => state.match);
  const [selected, setSelected] = useState("");
  const [loading, setLoading] = useState({ id: "", value: false });
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: any) => {
    e.preventDefault();
  };

  useEffect(() => {
    try {
      if (success) {
        setLoading({ id: "", value: false });
        dispatch(declareMatchStatusReset());
        onClick();
        // navigate("/expert/match");
      }
      if (error) {
        setLoading({ id: "", value: false });
      }
    } catch (e) {
      console.log(e);
    }
  }, [success, error]);

 

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);
  
  return (
    <Box
      sx={{
        position: "absolute",
        width: { lg: "40%", xs: "80%", md: "20vw" },
        marginRight: { md: "6em", xs: "4em" },
        borderRadius: 2,
        boxShadow: "0px 5px 10px #1A568414",
        background: "white",
        zIndex: 999,
      }}
    >
      <Box
        sx={[
          {
            width: "100%",
            justifyContent: "space-between",
            paddingX: "10px",
            display: "flex",
            alignItems: "center",
            height: "30px",
            borderRadius: "8px 8px 0 0",
            background: "#ff4d4d",
          },
        ]}
      >
        <Typography
          sx={{
            fontWeight: "bold",
            color: "white",
            fontSize: "12px",
            lineHeight: "0.9",
          }}
        >
          Market Result
        </Typography>
        <img
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
          src={CancelDark}
          style={{ width: "25px", height: "25px", cursor: "pointer" }}
        />
      </Box>
      <Box sx={{ padding: 0 }}>
        <form onSubmit={handleSubmit}>
          {!stopAt && (
            <Box
              sx={{
                width: "100%",
                flexWrap: "wrap",
                flexDirection: "row",
                display: "flex",
                alignSelf: "center",
                alignItems: "center",
                justifyContent: "center",
                px: "5px",
                py: "5px",
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  border: "none",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "30px",
                }}
              >
                <Typography
                  sx={{
                    width: "50%",
                    fontSize: "12px",
                    fontWeight: "700",
                    color: "black",
                    lineHeight: 1,
                    // overflowWrap: "anywhere",
                    // textAlign:'center'
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {"Score : "}
                </Typography>
                <TextField
                inputRef={inputRef}
                  autoFocus
                  placeholder="Score"
                  variant="standard"
                  value={selected}
                  // onChange={(e) => setSelected(e?.target.value)}
                  onChange={(e: any) => {
                    const numericValue = e.target.value.replace(/[^0-9]/g, "");
                    setSelected(numericValue);
                  }}
                  InputProps={{
                    disableUnderline: true,
                    sx: {
                      width: "69%",
                      alignSelf: "end",
                      border: "1px solid #303030",
                      borderRadius: "5px",
                      paddingY: "5px",
                      paddingX: "0.5vw",
                      height: "28px",
                      backgroundColor: "white",
                      display: "flex",
                      // justifyContent:'flex-start'
                    },
                  }}
                />
              </Box>
            </Box>
          )}

          <Box
            sx={{
              width: "100%",
              height: "40px",
              paddingY: "10px",
              justifyContent: "space-evenly",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              background: "#000",
            }}
          >
            {stopAt ? (
              <MarketCustomButton
                color={"#FF4D4D"}
                loading={loading}
                id="UD"
                title={"Un Declare"}
                onClick={() => {
                  try {
                    if (loading?.value) {
                      return false;
                    }
                    setLoading({ id: "UD", value: true });
                    dispatch(
                      otherUnDeclareMatchResult({
                        matchId: currentMatch?.id,
                        betId: liveData?.id,
                      })
                    );
                  } catch (e) {
                    console.log(e);
                  }
                }}
              />
            ) : (
              <>
                <MarketCustomButton
                  id="DR"
                  color={"#0B4F26"}
                  loading={loading}
                  title={"Declare"}
                  onClick={() => {
                    try {
                      if (loading?.value) {
                        return false;
                      }
                      if (selected === "") {
                        toast.error("Please enter score first");
                        return false;
                      }
                      setLoading({ id: "DR", value: true });
                      dispatch(
                        otherDeclareMatchResult({
                          matchId: currentMatch?.id,
                          result: selected,
                          betId: liveData?.id,
                        })
                      );
                    } catch (e) {
                      console.log(e);
                    }
                  }}
                />
                <MarketCustomButton
                  id="DNR"
                  color={"#0B4F26"}
                  loading={loading}
                  title={"No Result"}
                  onClick={() => {
                    try {
                      if (loading?.value) {
                        return false;
                      }
                      setLoading({ id: "DNR", value: true });
                      dispatch(
                        otherDeclareMatchResult({
                          matchId: currentMatch?.id,
                          result: "No Result",
                          betId: liveData?.id,
                        })
                      );
                    } catch (e) {
                      console.log(e);
                    }
                  }}
                />
              </>
            )}
          </Box>
        </form>
      </Box>
    </Box>
  );
};
export default memo(MarketResultComponent);
