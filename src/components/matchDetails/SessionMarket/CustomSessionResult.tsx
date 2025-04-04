import { Box, Button, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CancelDark } from "../../../assets";
import {
  noResultDeclare,
  resultDeclare,
  undeclareResult,
} from "../../../store/actions/match/matchAction";
import { AppDispatch, RootState } from "../../../store/store";
import SessionResultCustomButton from "../../addSession/AddSession/SessionResultCustomButton";

const CustomSessionResult = ({ onClick, newData }: any) => {
  const dispatch: AppDispatch = useDispatch();
  const { declareLoading } = useSelector((state: RootState) => state.matchList);
  const [selected, setSelected] = useState("");
  const [loader, setLoading] = useState({ id: "", value: false });
  const [confirmNoResult, setConfirmNoResults] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedFancyButton, setSelectedFancyButton] = useState("yes");

  const handleUndeclareResult = async () => {
    const payload = {
      matchId: newData?.matchId,
      betId: newData?.id,
    };
    dispatch(undeclareResult(payload));
  };

  const handleNoResultDeclare = async () => {
    const payload = {
      matchId: newData?.matchId,
      betId: newData?.id,
    };
    dispatch(noResultDeclare(payload));
  };

  const handleDeclare = () => {
    const payload = {
      score: newData?.type === "fancy1" ? selectedFancyButton : selected,
      matchId: newData?.matchId,
      betId: newData?.id,
    };
    dispatch(resultDeclare(payload));
  };

  const handleInputKeyPress = (event: any) => {
    try {
      if (event.key === "Enter") {
        if (newData?.activeStatus !== "result") {
          handleDeclare();
        } else if (newData?.activeStatus === "result") {
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
        id: declareLoading === false ? "" : prev?.id,
        value: declareLoading,
      };
    });
  }, [declareLoading]);

  return (
    <Box
      sx={{
        width: { lg: "65%", xs: "70%" },
        marginRight: "8px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "0 4px",
        border: "1px solid",
        background: "#FFAF45",
        gap: 1,
      }}
    >
      {!confirmNoResult ? (
        <>
          {newData?.activeStatus !== "result" &&
            (newData?.type === "fancy1" ? (
              <>
                <Button
                  sx={{
                    padding: 0,
                    minWidth: "30px",
                    color: selectedFancyButton === "yes" ? "white" : "",
                    background: selectedFancyButton === "yes" ? "red" : "",
                  }}
                  onClick={() => setSelectedFancyButton("yes")}
                >
                  YES
                </Button>
                <Button
                  sx={{
                    padding: 0,
                    minWidth: "30px",
                    color: selectedFancyButton === "no" ? "white" : "",
                    background: selectedFancyButton === "no" ? "red" : "",
                  }}
                  onClick={() => setSelectedFancyButton("no")}
                >
                  NO
                </Button>
              </>
            ) : (
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
                    backgroundColor: "white",
                  },
                }}
              />
            ))}
          {!showPopup ? (
            <>
              {newData?.activeStatus === "result" && newData?.result ? (
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
                  {newData?.activeStatus !== "result" ? (
                    <SessionResultCustomButton
                      color={"#0B4F26"}
                      id="DR"
                      session={true}
                      title={"Declare"}
                      loading={loader}
                      disable={loader?.value}
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
              {newData?.activeStatus === "result" && (
                <SessionResultCustomButton
                  color={"rgb(106 90 90)"}
                  title={"Yes"}
                  loading={loader}
                  id="UD"
                  session={true}
                  disable={loader?.value}
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

          {newData?.activeStatus !== "result" && (
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
          {newData?.activeStatus !== "result" && (
            <SessionResultCustomButton
              color={"rgb(106 90 90)"}
              title={"Yes"}
              loading={loader}
              id="NR"
              session={true}
              disable={loader?.value}
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
