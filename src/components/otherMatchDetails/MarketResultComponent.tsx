import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { memo } from "react";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import {  declareMatchStatusReset, otherDeclareMatchResult, unDeclareMatchResult } from "../../store/actions/match/matchDeclareActions";
import { CancelDark } from "../../assets";
import MarketCustomButton from "./MarketCustomButton";



const MarketResultComponent = ({
  currentMatch,
  onClick,
  teamA,
  teamB,
  stopAt,
  liveData
}: any) => {
  const dispatch: AppDispatch = useDispatch();
  const { success, error } = useSelector((state: RootState) => state.match);
  const [selected, setSelected] = useState(teamA);
  const [selected2, setSelected2] = useState("");
  const [loading, setLoading] = useState({ id: "", value: false });

  const handleSubmit = (e: any) => {
    e.preventDefault();
  };
//   const teamData = draw
//     ? [`${teamA}`, `${teamB}`, `${draw}`, `${tie}`]
//     : [`${teamA}`, `${teamB}`, `${tie}`];

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
        position: "absolute",
        width: { lg: "60%", xs: "100%", md: "30vw" },
        marginRight: {md: "6em", xs: "4em"},
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
            borderRadius: "10px 10px 0 0",
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
                <Box
                  onClick={() => {
                    setSelected(teamA);
                    setSelected2('UNDER');
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
                    height: "30px",
                    cursor: "pointer",
                    background: selected === teamA ? "#0B4F26" : "#F8C851",
                    overflow: "hidden",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "10px",
                      fontWeight: "700",
                      color: selected === teamA ? "white" : "black",
                      lineHeight: 1,
                      overflowWrap: "anywhere",
                    }}
                  >
                    {teamA}
                  </Typography>
                </Box>
              
         
                <Box
                  onClick={() => {
                    setSelected(teamB);
                    setSelected2('OVER');
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
                    height: "30px",
                    cursor: "pointer",
                    background: selected === teamB ? "#0B4F26" : "#F8C851",
                    overflow: "hidden",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "10px",
                      fontWeight: "700",
                      color: selected === teamB ? "white" : "black",
                      lineHeight: 1,
                      overflowWrap: "anywhere",
                    }}
                  >
                   {teamB}
                  </Typography>
                </Box>
          </Box>

          <Box
            sx={{
              width: "100%",
              height: "30px",
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
                      setLoading({ id: "DR", value: true });
                      dispatch(
                        otherDeclareMatchResult({
                          matchId: currentMatch?.id,
                          result: selected2,
                          betId:liveData?.id,
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
                          betId:liveData?.id,
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
