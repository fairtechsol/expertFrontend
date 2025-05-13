import { Box, Typography } from "@mui/material";
import { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CancelDark } from "../../assets";
import {
  UnDeclareRaceResult,
  declareMatchStatusReset,
  declareRaceResult,
} from "../../store/actions/match/matchDeclareActions";
import { AppDispatch, RootState } from "../../store/store";
import MatchOddsResultCustomButton from "../updateBookmaker/BookmakerEdit/MatchOddsResultCustomButton";

const ResultComponent = ({ currentMatch, onClick, stopAt, liveData }: any) => {
  const dispatch: AppDispatch = useDispatch();
  const { success, error } = useSelector((state: RootState) => state.match);
  const [selected, setSelected] = useState(liveData?.runners[0]?.id);
  const [loading, setLoading] = useState({ id: "", value: false });
  const handleSubmit = (e: any) => {
    e.preventDefault();
  };

  useEffect(() => {
    try {
      if (success) {
        setLoading({ id: "", value: false });
        dispatch(declareMatchStatusReset());
        onClick();
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
        width: { lg: stopAt ? "50%" : "100%", xs: "100%", md: "100%" },
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
          alt="cancel"
          width={25}
          height={25}
          style={{ cursor: "pointer" }}
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
                px: "10px",
                py: "5px",
              }}
            >
              {liveData?.runners.map((item: any, k: number) => {
                return (
                  <Box
                    key={k}
                    onClick={() => {
                      setSelected(item?.id);
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
                      background: selected === item?.id ? "#0B4F26" : "#F8C851",
                      overflow: "hidden",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "14px",
                        fontWeight: "700",
                        color: selected === item?.id ? "white" : "black",
                        lineHeight: 1,
                        overflowWrap: "anywhere",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {item?.runnerName}
                    </Typography>
                  </Box>
                );
              })}
            </Box>
          )}
          <Box
            sx={{
              width: "100%",
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
                      UnDeclareRaceResult({
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
                        declareRaceResult({
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
                        declareRaceResult({
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
export default memo(ResultComponent);
