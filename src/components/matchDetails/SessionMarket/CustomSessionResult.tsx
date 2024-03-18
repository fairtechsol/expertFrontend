import { useEffect, useState } from "react";
import { CancelDark } from "../../../assets";
import { Box, TextField, Typography } from "@mui/material";
import SessionResultCustomButton from "../../addSession/AddSession/SessionResultCustomButton";
import { AppDispatch, RootState } from "../../../store/store";
import { useDispatch, useSelector } from "react-redux";
import {
  noResultDeclare,
  resultDeclare,
  undeclareResult,
} from "../../../store/actions/match/matchAction";

const CustomSessionResult = ({ onClick, newData }: any) => {
  const dispatch: AppDispatch = useDispatch();
  const { declareLoading } = useSelector((state: RootState) => state.matchList);
  const [selected, setSelected] = useState("");
  const [loader, setLoading] = useState({ id: "", value: false });
  const [confirmNoResult, setConfirmNoResults] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const handleUndeclareResult = async () => {
    const payload = {
      matchId: JSON.parse(newData)?.matchId,
      betId: JSON.parse(newData)?.id,
    };
    dispatch(undeclareResult(payload));
  };

  const handleNoResultDeclare = async () => {
    const payload = {
      matchId: JSON.parse(newData)?.matchId,
      betId: JSON.parse(newData)?.id,
    };
    dispatch(noResultDeclare(payload));
  };

  const handleDeclare = () => {
    const payload = {
      score: selected,
      matchId: JSON.parse(newData)?.matchId,
      betId: JSON.parse(newData)?.id,
    };
    dispatch(resultDeclare(payload));
  };

  const handleInputKeyPress = (event: any) => {
    try {
      if (event.key === "Enter") {
        if (JSON.parse(newData)?.activeStatus !== "result") {
          handleDeclare();
        } else if (JSON.parse(newData)?.activeStatus === "result") {
          handleUndeclareResult();
        }
      }
    } catch (error) {
      console.error("Error in handleInputKeyPress:", error);
    }
  };

  useEffect(() => {
    setLoading((prev: any) => {
      return {
        ...prev,
        value: declareLoading,
      };
    });
  }, [declareLoading]);

  return (
    <Box
      sx={{
        width: "38%",

        marginRight: "8px",
        // height: "180px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "4px",
        border: "1px solid",
        // borderRadius: 2,
        // boxShadow: "0px 5px 10px #1A568414",
        background: "white",
        gap: 1,
      }}
    >
      {!confirmNoResult ? (
        <>
          {JSON.parse(newData)?.activeStatus !== "result" && (
            <TextField
              autoFocus
              placeholder="Score"
              variant="standard"
              value={selected}
              // onChange={(e) => setSelected(e?.target.value)}
              onChange={(e: any) => {
                const numericValue = e.target.value.replace(/[^0-9]/g, "");
                setSelected(numericValue);
              }}
              onKeyDown={handleInputKeyPress}
              InputProps={{
                disableUnderline: true,
                sx: {
                  alignSelf: "center",
                  border: "1px solid #303030",
                  borderRadius: "5px",
                  paddingY: "5px",
                  paddingX: "0.5vw",
                  height: "28px",
                },
              }}
            />
          )}
          {!showPopup ? (
            <>
              {JSON.parse(newData)?.activeStatus === "result" &&
              JSON.parse(newData)?.result ? (
                <SessionResultCustomButton
                  color={"#FF4D4D"}
                  title={"Un Declare"}
                  loading={loader}
                  id="UD"
                  session={true}
                  onClick={(e: any) => {
                    e.stopPropagation();
                    setShowPopup(true);
                  }}
                />
              ) : (
                <>
                  {JSON.parse(newData)?.activeStatus !== "result" ? (
                    <SessionResultCustomButton
                      color={"#0B4F26"}
                      id="DR"
                      session={true}
                      title={"Declare"}
                      loading={loader}
                      onClick={() => {
                        if (loader?.value) {
                          return false;
                        } else {
                          setLoading({ id: "DR", value: true });
                          handleDeclare();
                        }
                      }}
                    />
                  ) : null}
                </>
              )}
            </>
          ) : (
            <>
              <Typography
                sx={{
                  color: "#0B4F26",
                  fontSize: "12px",
                  fontWeight: "500",
                  height: "28px",
                  lineHeight: 1.2,
                  textAlign: "center",
                }}
              >
                Are you sure to Undeclare Result ?
              </Typography>
              {JSON.parse(newData)?.activeStatus === "result" && (
                <SessionResultCustomButton
                  color={"rgb(106 90 90)"}
                  title={"Yes"}
                  loading={loader}
                  id="UD"
                  session={true}
                  onClick={() => {
                    if (loader?.value) {
                      return false;
                    } else {
                      setLoading({ id: "UD", value: true });
                      handleUndeclareResult();
                    }
                  }}
                />
              )}
            </>
          )}

          {JSON.parse(newData)?.activeStatus !== "result" && (
            <SessionResultCustomButton
              color={"rgb(106 90 90)"}
              title={"No Result"}
              loading={loader}
              id="NR"
              session={true}
              onClick={(e: any) => {
                e.stopPropagation();
                setConfirmNoResults(true);
              }}
            />
          )}
        </>
      ) : (
        <>
          <Typography
            sx={{
              color: "#0B4F26",
              fontSize: "12px",
              fontWeight: "500",
              height: "28px",
              lineHeight: 1.2,
              textAlign: "center",
            }}
          >
            Are you sure to set No Result ?
          </Typography>
          {JSON.parse(newData)?.activeStatus !== "result" && (
            <SessionResultCustomButton
              color={"rgb(106 90 90)"}
              title={"Yes"}
              loading={loader}
              id="NR"
              session={true}
              onClick={() => {
                if (loader?.value) {
                  return false;
                } else {
                  setLoading({ id: "NR", value: true });
                  handleNoResultDeclare();
                }
              }}
            />
          )}
        </>
      )}

      <img
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
        src={CancelDark}
        alt="Cancel"
        style={{ width: "25px", height: "25px", cursor: "pointer" }}
      />
    </Box>
  );
};
export default CustomSessionResult;
