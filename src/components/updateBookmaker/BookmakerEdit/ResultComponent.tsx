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
}: any) => {
  const dispatch: AppDispatch = useDispatch();
  const { success, error } = useSelector((state: RootState) => state.match);
  const [selected, setSelected] = useState(teamA);
  const [loading, setLoading] = useState({ id: "", value: false });

  const handleSubmit = (e: any) => {
    e.preventDefault();
  };
  const teamData = draw
    ? [`${teamA}`, `${teamB}`, `${draw}`, `${tie}`]
    : [`${teamA}`, `${teamB}`, `${tie}`];

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
  return (
    <Box
      sx={{
        width: {lg: "100%", xs: "100%"},
        // height: "300px",
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
            paddingX: "10px",
            display: "flex",
            alignItems: "center",
            height: "50px",
            borderRadius: "10px 10px 0 0",
            background: "#ff4d4d",
          },
        ]}
      >
        <Typography
          sx={{ fontWeight: "bold", color: "white", fontSize: "18px" }}
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
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "14px",
                      fontWeight: "700",
                      color: selected === i ? "white" : "black",
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
                    dispatch(
                      unDeclareMatchResult({
                        matchId: currentMatch?.id,
                      })
                    );
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
                      dispatch(
                        declareMatchResult({
                          matchId: currentMatch?.id,
                          result: selected,
                        })
                      );
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
                      dispatch(
                        declareMatchResult({
                          matchId: currentMatch?.id,
                          result: "No Result",
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
export default memo(ResultComponent);
