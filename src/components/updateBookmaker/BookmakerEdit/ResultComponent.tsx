import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { memo } from "react";
import { CancelDark } from "../../../assets";
import MatchOddsResultCustomButton from "./MatchOddsResultCustomButton";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import {
  declareMatchResult,
  declareMatchStatusReset,
  otherDeclareMatchResult,
  otherUnDeclareMatchResult,
  unDeclareMatchResult,
} from "../../../store/actions/match/matchDeclareActions";

const ResultComponent = ({
  currentMatch,
  onClick,
  teamA,
  teamB,
  tie,
  draw,
  stopAt,
  liveData,
}: any) => {
  const dispatch: AppDispatch = useDispatch();
  const { success, error } = useSelector((state: RootState) => state.match);
  const [selected, setSelected] = useState(teamA);
  const [loading, setLoading] = useState({ id: "", value: false });
  const handleSubmit = (e: any) => {
    e.preventDefault();
  };
  const teamData =
    draw && tie
      ? [`${teamA}`, `${teamB}`, `${draw}`, `${tie}`]
      : draw
      ? [`${teamA}`, `${teamB}`, `${draw}`]
      : tie
      ? [`${teamA}`, `${teamB}`, `${tie}`]
      : [`${teamA}`, `${teamB}`];

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

  console.log(stopAt, "stopAt");
  return (
    <Box
      sx={{
        position: "absolute",
        width: { lg: "100%", xs: "100%", md: "100%" },
        marginRight: { md: "6em", xs: "4em" },
        // height: "300px",
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
            height: "50px",
            borderRadius: "8px 8px 0 0",
            background: "#ff4d4d",
          },
        ]}
      >
        <Typography
          sx={{
            fontWeight: "bold",
            color: "white",
            fontSize: "18px",
            lineHeight: "0.9",
          }}
        >
          Match Result
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
          <Box
            sx={{
              width: "100%",
              flexWrap: "wrap",
              flexDirection: "row",
              display: "flex",
              alignSelf: "center",
              alignItems: "center",
              justifyContent: "center",
              px: "10px",
              py: "5px",
            }}
          >
            {teamData.map((i, k) => {
              return (
                <Box
                  key={k}
                  onClick={() => {
                    setSelected(i);
                  }}
                  sx={{
                    width: "40%",
                    marginY: "5px",
                    marginX: "5px",
                    borderRadius: "3px",
                    border: "2px solid #2626261A",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "50px",
                    cursor: "pointer",
                    background: selected === i ? "#0B4F26" : "#F8C851",
                    overflow: "hidden",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "14px",
                      fontWeight: "700",
                      color: selected === i ? "white" : "black",
                      lineHeight: 1,
                      overflowWrap: "anywhere",
                    }}
                  >
                    {i}
                  </Typography>
                </Box>
              );
            })}
          </Box>

          <Box
            sx={{
              width: "100%",
              // height: "60px",
              paddingY: "10px",
              justifyContent: "space-evenly",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              background: "#000",
            }}
          >
            {stopAt ? (
              <MatchOddsResultCustomButton
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
                    if (currentMatch.matchType === "cricket") {
                      dispatch(
                        unDeclareMatchResult({
                          matchId: currentMatch?.id,
                        })
                      );
                    } else {
                      liveData?.type === "matchOdd"
                        ? dispatch(
                            otherUnDeclareMatchResult({
                              matchId: currentMatch?.id,
                            })
                          )
                        : dispatch(
                            otherUnDeclareMatchResult({
                              matchId: currentMatch?.id,
                              betId: liveData?.id,
                            })
                          );
                    }
                  } catch (e) {
                    console.log(e);
                  }
                }}
              />
            ) : (
              <>
                <MatchOddsResultCustomButton
                  id="DR"
                  color={"#0B4F26"}
                  loading={loading}
                  title={"Declare"}
                  onClick={() => {
                    try {
                      if (loading?.value) {
                        return false;
                      }
                      setLoading({ id: "DR", value: true });
                      if (currentMatch.matchType === "cricket") {
                        dispatch(
                          declareMatchResult({
                            matchId: currentMatch?.id,
                            result: selected,
                          })
                        );
                      } else {
                        liveData?.type === "matchOdd"
                          ? dispatch(
                              otherDeclareMatchResult({
                                matchId: currentMatch?.id,
                                result: selected,
                              })
                            )
                          : dispatch(
                              otherDeclareMatchResult({
                                matchId: currentMatch?.id,
                                result: selected,
                                betId: liveData?.id,
                              })
                            );
                      }
                    } catch (e) {
                      console.log(e);
                    }
                  }}
                />
                <MatchOddsResultCustomButton
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
                      if (currentMatch.matchType === "cricket") {
                        dispatch(
                          declareMatchResult({
                            matchId: currentMatch?.id,
                            result: "No Result",
                          })
                        );
                      } else {
                        liveData?.type === "matchOdd"
                          ? dispatch(
                              otherDeclareMatchResult({
                                matchId: currentMatch?.id,
                                result: "No Result",
                              })
                            )
                          : dispatch(
                              otherDeclareMatchResult({
                                matchId: currentMatch?.id,
                                result: "No Result",
                                betId: liveData?.id,
                              })
                            );
                      }
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
export default memo(ResultComponent);
