import { Box, Typography } from "@mui/material";
import { memo, useEffect, useLayoutEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CancelDark } from "../../../assets";
import {
  declareMatchStatusReset,
  declareOtherMarketCricketResult,
  UnDeclareOtherMarketCricketResult,
} from "../../../store/actions/match/matchDeclareActions";
import { AppDispatch, RootState } from "../../../store/store";
import MatchOddsResultCustomButton from "../../updateBookmaker/BookmakerEdit/MatchOddsResultCustomButton";

const ResultComponentOtherMarket = ({
  currentMatch,
  onClick,
  liveData,
}: any) => {
  const dispatch: AppDispatch = useDispatch();
  const { success, error } = useSelector((state: RootState) => state.match);
  const [selected, setSelected] = useState("");
  const [loading, setLoading] = useState({ id: "", value: false });
  const [isBottom, setIsBottom] = useState(false);
  const boxRef = useRef(null);
  const handleSubmit = (e: any) => {
    e.preventDefault();
  };

  useEffect(() => {
    try {
      if (liveData?.runners?.length > 0) {
        setSelected(liveData?.runners[0]?.nat);
      } else setSelected(liveData?.metaData?.teamA);
    } catch (error) {
      console.log(error);
    }
  }, []);

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

  const checkPosition = () => {
    const box: any = boxRef.current;
    if (box) {
      const rect = box.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const isBottomState = windowHeight - rect.top < 300;

      if (isBottomState !== isBottom) {
        setIsBottom(isBottomState);
      }
    }
  };

  useLayoutEffect(() => {
    checkPosition();
    window.addEventListener("resize", checkPosition);

    return () => {
      window.removeEventListener("resize", checkPosition);
    };
  }, []);

  return (
    <Box
      ref={boxRef}
      sx={{
        position: "absolute",
        width: { lg: "20vw", xs: "40vw", md: "20vw", sm: "20vw" },
        // marginRight: { md: "6em", xs: "4em" },
        right: "1%",
        borderRadius: 2,
        boxShadow: "0px 5px 10px #1A568414",
        background: "white",
        zIndex: 999,
        top: !isBottom ? "24%" : "",
        bottom: isBottom ? "100%" : "",
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
          Match Result
        </Typography>
        <img
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
          src={CancelDark}
          style={{ width: "15px", height: "15px", cursor: "pointer" }}
        />
      </Box>
      <Box sx={{ padding: 0 }}>
        <form onSubmit={handleSubmit}>
          {liveData?.activeStatus !== "result" && (
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
              {[0, 1, ...(liveData?.runners?.length > 2 ? [2] : [])].map(
                (item: any, k: number) => {
                  return (
                    <Box
                      key={k}
                      onClick={() => {
                        setSelected(
                          liveData?.runners?.[item]?.nat ||
                            (item === 0
                              ? liveData?.metaData?.teamA
                              : liveData?.metaData?.teamB)
                        );
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
                        background:
                          selected ===
                          (liveData?.runners?.[item]?.nat ||
                            (item === 0
                              ? liveData?.metaData?.teamA
                              : liveData?.metaData?.teamB))
                            ? "#0B4F26"
                            : "#F8C851",
                        overflow: "hidden",
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: "10px",
                          fontWeight: "700",
                          color:
                            selected ===
                            (liveData?.runners?.[item]?.nat ||
                              (item === 0
                                ? liveData?.metaData?.teamA
                                : liveData?.metaData?.teamB))
                              ? "white"
                              : "black",
                          lineHeight: 1,
                          overflowWrap: "anywhere",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {liveData?.runners?.[item]?.nat ||
                          (item === 0
                            ? liveData?.metaData?.teamA
                            : liveData?.metaData?.teamB)}
                      </Typography>
                    </Box>
                  );
                }
              )}
            </Box>
          )}

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
            {liveData?.activeStatus === "result" ? (
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
                      UnDeclareOtherMarketCricketResult({
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
                        declareOtherMarketCricketResult({
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
                        declareOtherMarketCricketResult({
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
export default memo(ResultComponentOtherMarket);
