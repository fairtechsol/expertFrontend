import { useState } from "react";
import { Box, Typography } from "@mui/material";
import SessionResultOvers from "./SessionResultOvers";
import SessionResultModal from "./SessionResultModal";
import { useNavigate } from "react-router-dom";
import { resetPlacedBets } from "../../../store/actions/addSession";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store/store";

const SessionResult = ({ sessionProLoss, matchId, mode, setMode }: any) => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const [selected, setSelected] = useState<any>([]);
  const [sessionData] = useState<any>([]);

  const changeSelected = (item: any) => {
    if (mode === "0") {
      return false;
    }
    const x: any = [...selected];
    const itemId = item.betId.id;

    if (x.includes(itemId)) {
      return;
    }
    dispatch(resetPlacedBets());
    navigate(`/expert/live/${item?.betId?.id}`, {
      state: {
        createSession: false,
        match: matchId,
      },
    });
    setSelected([item.betId.id]);
  };

  return (
    <>
      {sessionProLoss?.length > 0 && (
        <Box
          sx={{
            flex: 1,
            background: "#F8C851",
            marginTop: "5px",
            borderRadius: "5px",
            py: "30px",
            px: "20px",
            pt: "5px",
          }}
        >
          <Typography
            sx={{ color: "#0B4F26", fontSize: "25px", fontWeight: "600" }}
          >
            Session Result
          </Typography>
          <Box sx={{ display: "flex", marginTop: "8px" }}>
            <Box
              sx={{
                flex: 1,
                justifyContent: "space-between",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <SessionResultOvers
                sessionData={sessionProLoss && sessionProLoss}
                mode={mode}
                changeSelected={changeSelected}
                selected={selected}
              />
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  marginTop: "14px",
                }}
              >
                <Box
                  onClick={(e) => {
                    e.stopPropagation();
                    if (mode === "0") {
                      setMode("1");
                    } else {
                      setMode("0");
                      setSelected([]);
                    }
                  }}
                  sx={{
                    position: "relative",
                    width: "30%",
                    display: "flex",
                    maxWidth: "120px",
                    background: "#FF4D4D",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "35px",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  <Typography
                    sx={{ color: "white", fontWeight: "500", fontSize: "12px" }}
                  >
                    Un Declare
                  </Typography>
                  <Box
                    sx={{
                      position: "absolute",
                      zIndex: 999,
                      top: "40px",
                      left: 0,
                    }}
                  >
                    {false && sessionData.length > 0 && (
                      <SessionResultModal
                        undeclare={true}
                        onClick={() => {
                          //   setVisible1(false);
                        }}
                      />
                    )}
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
};

export default SessionResult;
